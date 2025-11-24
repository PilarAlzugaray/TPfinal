// scripts/compra.js

// --- FUNCIÓN ASÍNCRONA DE API DE TERCEROS Cambio dolar ---
async function obtenerTasaDolarVenta() {
    const API_URL = "https://dolarapi.com/v1/dolares/blue";
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error("Error al obtener la cotización del dólar.");
            return 1; 
        }
        const data = await response.json();
        return data.venta; 
    } catch (error) {
        console.error("Fallo de conexión con dolarapi.com:", error);
        return 1; 
    }
}
// --- FIN FUNCIÓN ASÍNCRONA ---


document.addEventListener("DOMContentLoaded", async function() { 
    const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat"));
    const functionInfo = JSON.parse(localStorage.getItem("functionInfo"));

    let precioBaseUSD = selectedSeat ? selectedSeat.price : 0;
    const dolarRateElement = document.getElementById("dolarRate");
    const currencySelector = document.getElementById("currencyMethod"); 
    const paymentMethodSelector = document.getElementById("paymentMethod"); // Añadido
    const installmentsSelector = document.getElementById("installments"); // Añadido
    
    // 1. Obtener la Tasa del Dólar (Asíncrono)
    let tasaDolarBlue = await obtenerTasaDolarVenta();
    
    if (tasaDolarBlue === 1) {
        dolarRateElement.innerText = "Error (Usando tasa 1:1)";
    } else {
        dolarRateElement.innerText = `$${tasaDolarBlue.toFixed(2)} ARS (Venta)`;
    }
    
    if (!selectedSeat || !functionInfo) { /* ... lógica de error ... */ return; }

    // Mostrar información inicial
    document.getElementById("selectedSeatInfo").innerText = `Asiento Seleccionado: ${selectedSeat.seatNumber}`;
    document.getElementById("functionDateInfo").innerText = `Función: ${functionInfo.name}`;
    document.getElementById("basePriceUSD").innerText = `$${precioBaseUSD} USD`;
    
    
    // Función de actualización del resumen (usa la tasa obtenida)
    function updateFinalPrice(price, currency) {
        // La conversión a ARS SÓLO ocurre aquí para la vista
        const finalDisplayPrice = currency === 'ARS' ? price * tasaDolarBlue : price;
        const finalCurrency = currency === 'ARS' ? 'ARS' : 'USD';

        document.getElementById("finalPriceDisplay").innerText = 
            `$${finalDisplayPrice.toFixed(2)} ${finalCurrency}`;
    }
    
    // --- FUNCIÓN CENTRAL DE RECALCULAR Y MOSTRAR ---
    function recalculateAndDisplay() {
        const paymentMethod = paymentMethodSelector.value;
        const selectedCurrency = currencySelector.value;
        
        let precioCalculado = precioBaseUSD;
        
        // 1. Aplicar descuento/recargo
        if (paymentMethod === "efectivo") {
            precioCalculado *= 0.90; 
        } else if (paymentMethod === "credito") {
            const cuotas = parseInt(installmentsSelector.value);
            if (cuotas === 2) precioCalculado *= 1.06; 
            else if (cuotas === 3) precioCalculado *= 1.12; 
            else if (cuotas === 6) precioCalculado *= 1.20; 
        }
        
        // 2. MOSTRAR el precio calculado con la moneda correcta
        updateFinalPrice(precioCalculado, selectedCurrency);
    }
    // ---------------------------------------------

    
    // 3. LISTENERS (Disparadores del recálculo)
    
    // Listener 1: Cambio de Método de Pago (ej. de débito a efectivo)
    paymentMethodSelector.addEventListener("change", function() {
        const paymentMethod = this.value;
        const creditOptions = document.getElementById("creditOptions");
        const debitOptions = document.getElementById("debitOptions");

        creditOptions.style.display = "none";
        debitOptions.style.display = "none";

        if (paymentMethod === "credito") creditOptions.style.display = "block";
        else if (paymentMethod === "debito") debitOptions.style.display = "block";
        
        // ¡FORZAR RECALCULO!
        recalculateAndDisplay(); 
    });
    
    // Listener 2: Cambio de Cuotas (solo si es crédito)
    installmentsSelector.addEventListener("change", recalculateAndDisplay); 
    
    // Listener 3: Cambio de Moneda (USD/ARS)
    currencySelector.addEventListener("change", recalculateAndDisplay); 
    
    
    // 4. LLAMADA INICIAL (Para mostrar el precio inicial correcto)
    recalculateAndDisplay(); 


    document.getElementById("finalizePurchase").addEventListener("click", function() {
        // ... (Tu lógica de validación de campos) ...
        const paymentMethod = paymentMethodSelector.value;
        const selectedCurrency = currencySelector.value; 
        
        let precioFinalParaGuardar = precioBaseUSD;
        
        // 1. Aplicar descuento/recargo (LÓGICA IDÉNTICA A recalculateAndDisplay)
        if (paymentMethod === "efectivo") {
            precioFinalParaGuardar *= 0.90; 
        } else if (paymentMethod === "credito") {
            const cuotas = parseInt(installmentsSelector.value);
            if (cuotas === 2) precioFinalParaGuardar *= 1.06; 
            else if (cuotas === 3) precioFinalParaGuardar *= 1.12; 
            else if (cuotas === 6) precioFinalParaGuardar *= 1.20; 
        }

        // 2. CONVERSIÓN FINAL A ARS (Solo si ARS fue la moneda seleccionada para el pago)
        if (selectedCurrency === 'ARS') {
            precioFinalParaGuardar *= tasaDolarBlue;
        }
        
        // ... (resto de la lógica de guardar y redirigir) ...
        alert("Compra exitosa! Precio final: " + precioFinalParaGuardar.toFixed(2) + " " + selectedCurrency);
        // ...
    });

    // ... (Tus funciones validarCamposCredito y validarCamposDebito) ...
});

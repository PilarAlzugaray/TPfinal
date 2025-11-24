// entrada.js

// Función para obtener los datos de localStorage y mostrarlos en la página
function mostrarDetallesCompra() {
    // Obtener los detalles de la compra desde localStorage
    const detalleCompra = JSON.parse(localStorage.getItem("detalleCompra"));
    const paymentMethod = localStorage.getItem("paymentMethod");

    // Mostrar los datos en el HTML si existen //
    if (detalleCompra) {
        document.getElementById("seat").textContent = detalleCompra.asiento || "Asiento no disponible";
        document.getElementById("amount").textContent = detalleCompra.precio || "Monto no disponible";
        document.getElementById("method").textContent = paymentMethod || "Método de pago no disponible";
        document.getElementById("date").textContent = detalleCompra.funcion.split(" - ")[1] || "Fecha no disponible"; // Extrae solo la fecha de la función
    } else {
        document.querySelector('.entrada-confirmada').innerHTML = '<p>No se encontraron detalles de la compra.</p>';
    }
}

// Llamar a la función para mostrar los detalles al cargar la página
document.addEventListener("DOMContentLoaded", mostrarDetallesCompra);

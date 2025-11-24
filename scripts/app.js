document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    const selectedMusicalElement = document.getElementById('selected-musical'); // Elemento para mostrar el nombre del musical
    const popup = document.getElementById('popup-cart'); // Referencia al pop-up
    const closePopupButton = document.querySelector('.close-popup'); // Botón para cerrar el pop-up;

    // Añadir al carrito
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const musicalName = this.getAttribute('data-name');

            // Verificar si ya hay un musical en el carrito
            if (cart.length === 0) { // Solo permite un musical
                cart.push(musicalName);
                updateCartDisplay(musicalName);
                showPopup(musicalName); // Mostrar el pop-up
            } else {
                alert(`Solo puedes añadir un musical al carrito.`);
            }
        });
    });

    // Actualizar la visualización del carrito de compra 
    function updateCartDisplay(musicalName) {
        selectedMusicalElement.textContent = musicalName; // Mostrar el nombre del musical
    }

    // Función para mostrar el pop-up
    function showPopup(musicalName) {
        popup.classList.remove('hide');
        popup.classList.add('show');
        popup.style.display = 'flex'; // Mostrar el pop-up
    }

    // Cerrar el pop-up
    closePopupButton.addEventListener('click', function () {
        popup.classList.add('hide');
        popup.style.display = 'none'; // Ocultar el pop-up
    });

    // Proceder a la selección de asientos
    document.getElementById('proceed-seat-selection').addEventListener('click', function () {
        alert('Procediendo a la selección de asientos...');
        // Aquí podrías redirigir a la página de selección de asientos
        window.location.href = 'asientos.html';
    });
});

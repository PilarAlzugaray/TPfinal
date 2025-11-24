// login.js 
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Obtener los valores de usuario y contraseña
    const username = document.getElementById("Username").value;
    const password = document.getElementById("Password").value;

    // Aquí deberías tener la lógica para verificar el usuario y la contraseña
    // En este ejemplo, vamos a usar credenciales ficticias
    const users = {
        'palzugaray': '987',
        'agettar': '654',
        'dabreu': '321',
        'mrivera': '987'
    };

    // Verificar si las credenciales son correctas
    if (users[username] && users[username] === password) {
        // Si las credenciales son válidas, redirigir a la página de inicio!
        window.location.href = 'inicio.html'; // Cambia a la URL de tu página de inicio
    } else {
        // Si las credenciales son incorrectas, mostrar un mensaje de error
        document.getElementById("errorMessage").textContent = "Usuario o contraseña incorrectos.";
    }
});

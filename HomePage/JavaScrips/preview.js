// Obtener el elemento input de texto
var inputUrl = document.getElementById('urlImagen');
        
// Obtener la etiqueta de la imagen
var imgElement = document.getElementById('imagenMostrada');

// Guardar la URL de la imagen predeterminada
var imagenPredeterminada = imgElement.src;

// Agregar un evento de escucha para el evento input
inputUrl.addEventListener('input', function() {
    // Obtener el valor del input
    var url = inputUrl.value;
    
    // Actualizar el src de la imagen con la URL ingresada
    imgElement.src = url;
    imgElement.style.width = "200px";
});

// Agregar un evento de escucha para el evento blur (cuando se sale del campo de texto)
inputUrl.addEventListener('blur', function() {
    // Si el campo de texto está vacío, restaurar la imagen predeterminada
    if (inputUrl.value === '') {
        imgElement.src = imagenPredeterminada;
        imgElement.style.width = "200px";
    }
});
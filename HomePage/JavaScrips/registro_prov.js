//Funcionamiento para registrar el proveedor en eljson
const nombrep = document.getElementById("nombrep");
const contactop = document.getElementById("contactop");
const direccionp = document.getElementById("direccionp");
const terminos = document.getElementById("terminos");
const costo_producto = document.getElementById("costo_producto");
const cantidad_disponiblep = document.getElementById("cantidad_disponiblep");
const urlImagen = document.getElementById("urlImagen");

const btn_prov = document.getElementById("btn_prov"); 

btn_prov.addEventListener('click', function () {
    const data1 = {
        nombre: nombrep.value, 
        contacto: contactop.value, 
        direccion: direccionp.value, 
        terminos_pago: terminos.value, 
        costo_producto: costo_producto.value,
        cantidad_disponible: cantidad_disponiblep.value, 
        imagen: urlImagen.value, 
    }
    registrar_prov(data1);
});


function registrar_prov(agregar_prov){
    return fetch("http://localhost:3000/proveedores", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agregar_prov)
      })
        .then(response => response.json())
        .catch(error => {
          console.error('Error al crear el pedido:', error);
          throw error;
        });
}
//Funcionamiento para registrar el producto en el  json

const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const categoria = document.getElementById("categoria");
const proveedor = document.getElementById("proveedor");
const ubicacion = document.getElementById("ubicacion");
const costo_unitario = document.getElementById("costo_unitario");
const precio_venta = document.getElementById("precio_venta");
const cantidad_disponible = document.getElementById("cantidad_disponible");
const imagen = document.getElementById("urlImagen");

const btn_prod = document.getElementById("btn_prod"); 

btn_prod.addEventListener('click', function () {
    const data = {
        nombre: nombre.value, 
        descripcion: descripcion.value, 
        categoria: categoria.value, 
        proveedor: proveedor.value,
        ubicacion: ubicacion.value, 
        costoUnitario: costo_unitario.value,
        precioVenta: precio_venta.value, 
        cantidadDisponible: cantidad_disponible.value, 
        imagen: imagen.value
    }
    registrar_prod(data);
});


function registrar_prod(agregar_productos){
    return fetch("http://localhost:3000/productos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(agregar_productos)
      })
        .then(response => response.json())
        .catch(error => {
          console.error('Error al crear el pedido:', error);
          throw error;
        });
}

//Funcion para llenar el select de proveedores
const llenar_proveedor = () => {
  const api_prove = "http://localhost:3000/proveedores"; 

  fetch(api_prove)
    .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
    .then(data => {
        const select_prov = document.getElementById('proveedor');
        
        select_prov.innerHTML = "";
        select_prov.innerHTML = '<option selected>Seleccione un proveedor</option>';

        data.forEach(element => {
          select_prov.innerHTML += `<option>${element.nombre}</option>`;
        });
    });
}

llenar_proveedor();
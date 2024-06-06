
mostrarPedidos(); 
function mostrarPedidos() {
    const api2 = "http://localhost:3000/pedidos";
    const tableBody = document.getElementById('pedidosTableBody');
    tableBody.innerHTML = '';
    fetch(api2)
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(data => {
            tableBody.innerHTML = ""
            data.forEach(element => {
                tableBody.innerHTML += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.nombreProveedor}</td>
                    <td>${element.producto}</td>
                    <td>${element.cantidad}</td>
                    <td>${element.estado}</td>
                    <td>${element.metodoDePago}</td>
                </tr> 
                `
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos JSON', error);
        });
}


productos_inventarios();
function productos_inventarios() {
    const api = "http://localhost:3000/productos";
    const tabla_inventario = document.getElementById("tabla_inventario");
    fetch(api)
        .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
        .then(data => {
            tabla_inventario.innerHTML = ""
            data.forEach(element => {
                tabla_inventario.innerHTML += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.nombre}</td>
                    <td>${element.categoria}</td>
                    <td>${element.cantidadDisponible}</td>
                    <td>${element.proveedor}</td>
                    <td>${element.ubicacion}</td>
                </tr>
                `
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos JSON', error);
        });
}

ver_compras();
function ver_compras() {
    const api = "http://localhost:3000/compras";
    const tabla_compras = document.getElementById("tabla_compras");
  
    fetch(api)
      .then(respuesta => respuesta.ok ? respuesta.json() : Promise.reject(respuesta))
      .then(data => {
        tabla_compras.innerHTML = "";
        data.forEach(element => {
          const productosNombres = element.productos.map(producto => producto.nombre).join(", ");
          const productosCantidades = element.productos.map(producto => producto.cantidad).join(", ");
  
          tabla_compras.innerHTML += `
            <tr>
              <td>${element.id}</td>
              <td>${productosNombres}</td>
              <td>${productosCantidades}</td>
              <td>${element.total}</td>
            </tr>
          `;
        });
      })
      .catch(error => {
        console.error('Error al cargar los datos JSON', error);
      });
  }
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    document.getElementById('comprar').addEventListener('click', comprarProductos);
});

// Cambio principal: cargarProductos ahora utiliza el endpoint de tu servidor
function cargarProductos() {
    fetch('http://localhost:3000/productos')
        .then(response => response.json())
        .then(productos => mostrarProductos(productos))
        .catch(error => console.error('Error al cargar los productos:', error));
}

function mostrarProductos(productos) {
    const divProductos = document.getElementById('productos');
    divProductos.innerHTML = ''; // Limpiar antes de cargar
    productos.forEach(producto => {
        const htmlProducto = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">Precio: $${producto.precioVenta}</p>
                        <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
        divProductos.innerHTML += htmlProducto;
    });
}



function actualizarCarritoUI() {
    // Similar a antes, pero asegúrate de reflejar cambios en la UI correctamente
}

function comprarProductos() {
  let totalCompra = 0;
  let compras = [];

  Promise.all(carrito.map(item => {
      // Registrar la salida de productos
      return fetch('http://localhost:3000/transacciones/salida', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              productoId: item.id,
              cantidad: item.cantidad
          }),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Salida de producto registrada:', data);
          totalCompra += item.precioVenta * item.cantidad;
          compras.push({ productoId: item.id, cantidad: item.cantidad });
          // Actualizar inventario (cantidadDisponible) del producto
          return fetch(`http://localhost:3000/productos/${item.id}`)
              .then(response => response.json())
              .then(producto => {
                  const cantidadActualizada = (producto.cantidadDisponible+((item.cantidad*2)/2)) - (item.cantidad);
                  console.log(item.cantidad);
                  return fetch(`http://localhost:3000/productos/${item.id}`, {
                      method: 'PUT',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ cantidadDisponible: cantidadActualizada }),
                  })
                  .then(response => response.json())
                  .then(data => console.log('Producto actualizado:', data))
                  .catch(error => console.error('Error al actualizar producto:', error));
              })
              .catch(error => console.error('Error al obtener el producto:', error));
      })
      .catch(error => console.error('Error al registrar salida de producto:', error));
  }))
  .then(() => {
      // Registrar las compras en la API después de que se completen todas las operaciones de salida
      return fetch('http://localhost:3000/compras', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(compras),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Compras registradas:', data);
          alert(`Compra realizada con éxito. Total: $${totalCompra.toFixed(2)}. Actualizando inventario...`);
          carrito = [];
          cargarProductos(); // Para reflejar los cambios en la UI
      })
      .catch(error => console.error('Error al registrar compras:', error));
  })
  .catch(error => console.error('Error al procesar las compras:', error));
}



function agregarAlCarrito(idProducto) {
  fetch(`http://localhost:3000/productos/${idProducto}`)
      .then(response => response.json())
      .then(producto => {
          const productoEnCarrito = carrito.find(p => p.id === producto.id);
          if (productoEnCarrito) {
              productoEnCarrito.cantidad += 1; // Incrementar en 1 en lugar de aumentar en la cantidad de productos
          } else {
              producto.cantidad = 1; // Si es nuevo en el carrito, establece la cantidad en 1
              carrito.push(producto);
          }
          mostrarCarrito();
      })
      .catch(error => console.error("Error al agregar producto al carrito:", error));
}

function mostrarCarrito() {
  const tbodyItemsCarrito = document.getElementById('itemsCarrito');
  const totalCarritoElement = document.getElementById('totalCarrito');
  tbodyItemsCarrito.innerHTML = ''; // Limpiar el carrito actualmente dibujado
  let totalCarrito = 0;

  carrito.forEach((producto, index) => {
      const fila = document.createElement('tr');
      const totalProducto = producto.precioVenta * producto.cantidad;
      totalCarrito += totalProducto;
      fila.innerHTML = `
          <td>${producto.nombre}</td>
          <td>$${producto.precioVenta}</td>
          <td><input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidadEnCarrito(${index}, this.value)"></td>
          <td>$${totalProducto.toFixed(2)}</td>
          <td><button onclick="eliminarDelCarrito(${index})" class="btn btn-danger btn-sm">Eliminar</button></td>
      `;
      tbodyItemsCarrito.appendChild(fila);
  });

  totalCarritoElement.textContent = `$${totalCarrito.toFixed(2)}`;
}


// Función para actualizar la cantidad de un producto en el carrito
function actualizarCantidadEnCarrito(index, nuevaCantidad) {
  carrito[index].cantidad = parseInt(nuevaCantidad);
  mostrarCarrito(); // Actualizar el carrito para mostrar la nueva cantidad
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito(); // Actualizar la visualización del carrito
}


const API_URL = 'http://localhost:3000';

// Función para obtener los proveedores de la API
function obtenerProveedores() {
  return fetch(`${API_URL}/proveedores`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error al obtener los proveedores:', error);
    });
}

// Función para llenar el select de proveedores
function llenarSelectProveedores(proveedores) {
    const selectProveedor = document.getElementById('proveedor');
    proveedores.forEach(proveedor => {
    const option = document.createElement('option');
    option.value = proveedor.id;
    option.textContent = proveedor.nombre;
    selectProveedor.appendChild(option);

  });
}

// Función para obtener los pedidos existentes de la API
function obtenerPedidos() {
  return fetch(`${API_URL}/pedidos`)
    .then(response => response.json())
    .catch(error => {
      console.error('Error al obtener los pedidos:', error);
    });
}


// Función para crear un nuevo pedido en la API
function crearPedido(pedido) {
  return fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pedido)
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error al crear el pedido:', error);
      throw error;
    });
}

// Función para eliminar un pedido de la API
function eliminarPedido(pedidoId) {
  return fetch(`${API_URL}/pedidos/${pedidoId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el pedido');
      }
    })
    .catch(error => {
      console.error('Error al eliminar el pedido:', error);
      throw error;
    });
}



// Función para mostrar los pedidos en la tabla
function mostrarPedidos(pedidos) {
    const tableBody = document.getElementById('pedidosTableBody');
    tableBody.innerHTML = '';
  
    pedidos.forEach(pedido => {
      const row = `
        <tr>
          <td>${pedido.id}</td>
          <td>${pedido.nombreProveedor}</td>
          <td>${pedido.producto}</td>
          <td>${pedido.cantidad}</td>
          <td>${pedido.estado}</td>
          <td>${pedido.metodoDePago}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }

// Función para manejar el envío del formulario de nuevo pedido
function handlePedidoFormSubmit(event) {
    event.preventDefault();
  
    const proveedorId = document.getElementById('proveedor').value;
    const producto = document.getElementById('producto').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const metodoDePago = document.getElementById('MDePago').value; 
    const nuevoPedido = {
      proveedorId: proveedorId,
      producto: producto,
      cantidad: cantidad,
      estado: 'Pendiente',
      metodoDePago: metodoDePago
    };

  crearPedido(nuevoPedido)
    .then(() => {
      document.getElementById('pedidoForm').reset();

      obtenerPedidos()
        .then(pedidos => {
          mostrarPedidos(pedidos);
        });
    })
    .catch(error => {
      console.error('Error al crear el pedido:', error);
    });
}

// Función para manejar el clic en el botón de eliminar pedido
function eliminarPedidoClick(pedidoId) {
  eliminarPedido(pedidoId)
    .then(() => {
      obtenerPedidos()
        .then(pedidos => {
          mostrarPedidos(pedidos);
        });
    })
    .catch(error => {
      console.error('Error al eliminar el pedido:', error);
    });
}

// Event listener para el envío del formulario de nuevo pedido
document.getElementById('pedidoForm').addEventListener('submit', handlePedidoFormSubmit);

// Obtener los proveedores y llenar el select al cargar la página
obtenerProveedores()
  .then(proveedores => {
    llenarSelectProveedores(proveedores);
  });

// Obtener los pedidos existentes y mostrarlos al cargar la página
obtenerPedidos()
  .then(pedidos => {
    mostrarPedidos(pedidos);
  });
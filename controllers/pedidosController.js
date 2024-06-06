const fs = require('fs');
const rutaPedidos = './models/pedidos.json';
const rutaProveedores = './models/proveedores.json';

// Obtener todos los pedidos
const obtenerPedidos = (req, res) => {
  const pedidosData = fs.readFileSync(rutaPedidos);
  const pedidos = JSON.parse(pedidosData);
  res.json(pedidos);
};

// Función para obtener el nombre del proveedor por su ID
function obtenerNombreProveedor(proveedorId) {
    const proveedoresData = fs.readFileSync(rutaProveedores);
    const proveedores = JSON.parse(proveedoresData);
    const proveedor = proveedores.find(p => p.id === parseInt(proveedorId));
    return proveedor ? proveedor.nombre : 'Desconocido';
  }

// Crear un nuevo pedido
const crearPedido = (req, res) => {
    const pedidosData = fs.readFileSync(rutaPedidos);
    const pedidos = JSON.parse(pedidosData);
    const nuevoPedido = req.body;
    nuevoPedido.id = pedidos.length + 1;
    nuevoPedido.nombreProveedor = obtenerNombreProveedor(nuevoPedido.proveedorId); 
    pedidos.push(nuevoPedido);
    fs.writeFileSync(rutaPedidos, JSON.stringify(pedidos, null, 2));
    res.status(201).json(nuevoPedido);
  };

// Eliminar un pedido
const eliminarPedido = (req, res) => {
  const pedidosData = fs.readFileSync(rutaPedidos);
  const pedidos = JSON.parse(pedidosData);
  const pedidoId = parseInt(req.params.id);
  const pedidoIndex = pedidos.findIndex(pedido => pedido.id === pedidoId);
  if (pedidoIndex === -1) {
    res.status(404).send('Pedido no encontrado');
  } else {
    const pedidoEliminado = pedidos.splice(pedidoIndex, 1)[0];
    fs.writeFileSync(rutaPedidos, JSON.stringify(pedidos, null, 2));
    res.json(pedidoEliminado);
  }
};

module.exports = {
  obtenerPedidos,
  crearPedido,
  eliminarPedido
};
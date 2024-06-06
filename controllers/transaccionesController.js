const fs = require('fs');
const rutaTransacciones = './models/transacciones.json';
const rutaProductos = './models/productos.json';

// Obtener todas las transacciones
const obtenerTransacciones = (req, res) => {
  const transaccionesData = fs.readFileSync(rutaTransacciones);
  const transacciones = JSON.parse(transaccionesData);
  res.json(transacciones);
};

// Registrar una entrada de producto
const registrarEntrada = (req, res) => {
  const transaccionesData = fs.readFileSync(rutaTransacciones);
  const transacciones = JSON.parse(transaccionesData);
  const productosData = fs.readFileSync(rutaProductos);
  let productos = JSON.parse(productosData);

  const { productoId, cantidad } = req.body;
  const producto = productos.find(p => p.id === productoId);

  if (!producto) {
      res.status(404).send('Producto no encontrado');
  } else {
      const fecha = new Date();
      const fechaFormateada = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;

      const nuevaTransaccion = {
          tipo: 'entrada',
          productoId,
          producto: producto.nombre,
          cantidad,
          fechaHora: fechaFormateada,
      };

      transacciones.push(nuevaTransaccion);
      producto.cantidadDisponible += cantidad;

      fs.writeFileSync(rutaTransacciones, JSON.stringify(transacciones, null, 2));
      fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 2));

      res.status(201).json(nuevaTransaccion);
  }
  console.log(req.body)
};


// Registrar una salida de producto
const registrarSalida = (req, res) => {
  const transaccionesData = fs.readFileSync(rutaTransacciones);
  const transacciones = JSON.parse(transaccionesData);
  const productosData = fs.readFileSync(rutaProductos);
  let productos = JSON.parse(productosData);

  const { productoId, cantidad } = req.body;
  const producto = productos.find(p => p.id === productoId);

  if (!producto) {
      res.status(404).send('Producto no encontrado');
  } else if (producto.cantidadDisponible < cantidad) {
      res.status(400).send('Cantidad insuficiente en inventario');
  } else {
      const fecha = new Date();
      const fechaFormateada = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`;

      const nuevaTransaccion = {
          tipo: 'salida',
          productoId,
          producto: producto.nombre,
          cantidad,
          fechaHora: fechaFormateada,
      };

      transacciones.push(nuevaTransaccion);
      producto.cantidadDisponible -= cantidad;

      fs.writeFileSync(rutaTransacciones, JSON.stringify(transacciones, null, 2));
      fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 2));

      res.status(201).json(nuevaTransaccion);
  }
};


module.exports = {
  obtenerTransacciones,
  registrarEntrada,
  registrarSalida,
};
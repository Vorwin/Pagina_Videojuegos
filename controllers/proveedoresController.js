const fs = require('fs');
const rutaProveedores = './models/proveedores.json';

// Obtener todos los proveedores
const obtenerProveedores = (req, res) => {
  const proveedoresData = fs.readFileSync(rutaProveedores);
  const proveedores = JSON.parse(proveedoresData);
  res.json(proveedores);
};

// Obtener un proveedor por ID
const obtenerProveedorPorId = (req, res) => {
  const proveedoresData = fs.readFileSync(rutaProveedores);
  const proveedores = JSON.parse(proveedoresData);
  const proveedor = proveedores.find(p => p.id === parseInt(req.params.id));
  if (!proveedor) {
    res.status(404).send('Proveedor no encontrado');
  } else {
    res.json(proveedor);
  }
};

// Agregar un nuevo proveedor
const agregarProveedor = (req, res) => {
  const proveedoresData = fs.readFileSync(rutaProveedores);
  const proveedores = JSON.parse(proveedoresData);
  const nuevoProveedor = req.body;
  nuevoProveedor.id = proveedores.length + 1;
  proveedores.push(nuevoProveedor);
  fs.writeFileSync(rutaProveedores, JSON.stringify(proveedores, null, 2));
  res.status(201).json(nuevoProveedor);
};

// Actualizar un proveedor existente
const actualizarProveedor = (req, res) => {
  const proveedoresData = fs.readFileSync(rutaProveedores);
  const proveedores = JSON.parse(proveedoresData);
  const id = parseInt(req.params.id);
  const proveedorIndex = proveedores.findIndex(p => p.id === id);
  if (proveedorIndex === -1) {
    res.status(404).send('Proveedor no encontrado');
  } else {
    const proveedorActualizado = req.body;
    proveedorActualizado.id = id;
    proveedores[proveedorIndex] = proveedorActualizado;
    fs.writeFileSync(rutaProveedores, JSON.stringify(proveedores, null, 2));
    res.json(proveedorActualizado);
  }
};

// Eliminar un proveedor
const eliminarProveedor = (req, res) => {
  const proveedoresData = fs.readFileSync(rutaProveedores);
  const proveedores = JSON.parse(proveedoresData);
  const id = parseInt(req.params.id);
  const proveedorIndex = proveedores.findIndex(p => p.id === id);
  if (proveedorIndex === -1) {
    res.status(404).send('Proveedor no encontrado');
  } else {
    const proveedorEliminado = proveedores.splice(proveedorIndex, 1)[0];
    fs.writeFileSync(rutaProveedores, JSON.stringify(proveedores, null, 2));
    res.json(proveedorEliminado);
  }
};

module.exports = {
  obtenerProveedores,
  obtenerProveedorPorId,
  agregarProveedor,
  actualizarProveedor,
  eliminarProveedor
};
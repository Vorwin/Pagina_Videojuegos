const fs = require('fs');
const rutaProductos = './models/productos.json';

// Obtener todos los productos
const obtenerProductos = (req, res) => {
  const productosData = fs.readFileSync(rutaProductos);
  const productos = JSON.parse(productosData);
  res.json(productos);
};

// Obtener un producto por ID
const obtenerProductoPorId = (req, res) => {
  const productosData = fs.readFileSync(rutaProductos);
  const productos = JSON.parse(productosData);
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    res.status(404).send('Producto no encontrado');
  } else {
    res.json(producto);
  }
};

// Agregar un nuevo producto
const agregarProducto = (req, res) => {
  const productosData = fs.readFileSync(rutaProductos);
  const productos = JSON.parse(productosData);
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1;
  productos.push(nuevoProducto);
  fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 2));
  res.status(201).json(nuevoProducto);
};

// Actualizar un producto existente
const actualizarProducto = (req, res) => {
  const productosData = fs.readFileSync(rutaProductos);
  const productos = JSON.parse(productosData);
  const id = parseInt(req.params.id);
  const productoIndex = productos.findIndex(p => p.id === id);

  if (productoIndex === -1) {
    res.status(404).send('Producto no encontrado');
  } else {
    // Obtiene los campos del cuerpo de la solicitud para actualizar
    const camposParaActualizar = req.body;
    
    // Recorre cada campo en camposParaActualizar y actualiza solo esos campos en el producto
    Object.keys(camposParaActualizar).forEach(campo => {
      productos[productoIndex][campo] = camposParaActualizar[campo];
    });

    // Escribe de nuevo en el archivo con el producto actualizado
    fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 2));
    
    // Envía el producto actualizado como respuesta
    res.json(productos[productoIndex]);
  }
};

// Eliminar un producto
const eliminarProducto = (req, res) => {
  const productosData = fs.readFileSync(rutaProductos);
  const productos = JSON.parse(productosData);
  const id = parseInt(req.params.id);
  const productoIndex = productos.findIndex(p => p.id === id);
  if (productoIndex === -1) {
    res.status(404).send('Producto no encontrado');
  } else {
    const productoEliminado = productos.splice(productoIndex, 1)[0];
    fs.writeFileSync(rutaProductos, JSON.stringify(productos, null, 2));
    res.json(productoEliminado);
  }
};

// Buscar productos por categoría
const buscarPorCategoria = (req, res) => {
    const productosData = fs.readFileSync(rutaProductos);
    const productos = JSON.parse(productosData);
    const categoria = req.params.categoria;
    const productosFiltrados = productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    res.json(productosFiltrados);
  };
  
  // Buscar productos por nombre
  const buscarPorNombre = (req, res) => {
    const productosData = fs.readFileSync(rutaProductos);
    const productos = JSON.parse(productosData);
    const nombre = req.params.nombre.toLowerCase();
    const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(nombre));
    res.json(productosFiltrados);
  };
  
  // Buscar productos por proveedor
  const buscarPorProveedor = (req, res) => {
    const productosData = fs.readFileSync(rutaProductos);
    const productos = JSON.parse(productosData);
    const proveedor = req.params.proveedor;
    const productosFiltrados = productos.filter(p => p.proveedor === proveedor);
    res.json(productosFiltrados);
  };
  
  // Buscar productos por ubicación
  const buscarPorUbicacion = (req, res) => {
    const productosData = fs.readFileSync(rutaProductos);
    const productos = JSON.parse(productosData);
    const ubicacion = req.params.ubicacion;
    const productosFiltrados = productos.filter(p => p.ubicacion === ubicacion);
    res.json(productosFiltrados);
  };
  
  module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    buscarPorCategoria,
    buscarPorNombre,
    buscarPorProveedor,
    buscarPorUbicacion
  };


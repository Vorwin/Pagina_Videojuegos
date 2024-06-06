const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Rutas para productos
//http://localhost:3000/productos
router.get('/', productosController.obtenerProductos);
//http://localhost:3000/productos/1
router.get('/:id', productosController.obtenerProductoPorId);
//http://localhost:3000/productos
router.post('/', productosController.agregarProducto);
//http://localhost:3000/productos/1
router.put('/:id', productosController.actualizarProducto);
//http://localhost:3000/productos/1
router.delete('/:id', productosController.eliminarProducto);


//http://localhost:3000/productos/buscar/categoria/Deportes
router.get('/buscar/categoria/:categoria', productosController.buscarPorCategoria);
//http://localhost:3000/productos/buscar/nombre/FIFA 23
router.get('/buscar/nombre/:nombre', productosController.buscarPorNombre);
//http://localhost:3000/productos/buscar/proveedor/Rockstar Games
router.get('/buscar/proveedor/:proveedor', productosController.buscarPorProveedor);
//http://localhost:3000/productos/buscar/ubicacion/Almacén 1
router.get('/buscar/ubicacion/:ubicacion', productosController.buscarPorUbicacion);

module.exports = router;
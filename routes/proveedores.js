const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');

// Rutas para proveedores

//http://localhost:3000/proveedores
router.get('/', proveedoresController.obtenerProveedores);
//http://localhost:3000/proveedores/1
router.get('/:id', proveedoresController.obtenerProveedorPorId);
//http://localhost:3000/proveedores
router.post('/', proveedoresController.agregarProveedor);
//http://localhost:3000/proveedores/1
router.put('/:id', proveedoresController.actualizarProveedor);
//http://localhost:3000/proveedores/1
router.delete('/:id', proveedoresController.eliminarProveedor);

module.exports = router;
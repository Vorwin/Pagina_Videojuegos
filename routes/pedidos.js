const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Rutas para pedidos
router.get('/', pedidosController.obtenerPedidos);
router.post('/', pedidosController.crearPedido);
router.delete('/:id', pedidosController.eliminarPedido);

module.exports = router;
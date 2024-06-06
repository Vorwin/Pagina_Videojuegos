const express = require('express');
const router = express.Router();
const transaccionesController = require('../controllers/transaccionesController');

// Rutas para transacciones

//http://localhost:3000/transacciones
router.get('/', transaccionesController.obtenerTransacciones);
//http://localhost:3000/transacciones/entrada
router.post('/entrada', transaccionesController.registrarEntrada);

router.post('/salida', transaccionesController.registrarSalida);
//http://localhost:3000/transacciones/salida

module.exports = router;
const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

router.get('/', comprasController.obtenerCompras);
router.post('/', comprasController.registrarCompra);

module.exports = router;
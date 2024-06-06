const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rutas para usuarios

//http://localhost:3000/usuarios
router.get('/', usuariosController.obtenerUsuarios);
//http://localhost:3000/usuarios/1
router.get('/:id', usuariosController.obtenerUsuarioPorId);
//http://localhost:3000/usuarios
router.post('/', usuariosController.agregarUsuario);
//http://localhost:3000/usuarios/1
router.put('/:id', usuariosController.actualizarUsuario);
//http://localhost:3000/usuarios/1
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;
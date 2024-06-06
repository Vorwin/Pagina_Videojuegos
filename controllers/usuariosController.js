const fs = require('fs');
const rutaUsuarios = './models/usuarios.json';

// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
  const usuariosData = fs.readFileSync(rutaUsuarios);
  const usuarios = JSON.parse(usuariosData);
  res.json(usuarios);
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = (req, res) => {
  const usuariosData = fs.readFileSync(rutaUsuarios);
  const usuarios = JSON.parse(usuariosData);
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) {
    res.status(404).send('Usuario no encontrado');
  } else {
    res.json(usuario);
  }
};

// Agregar un nuevo usuario
const agregarUsuario = (req, res) => {
  const usuariosData = fs.readFileSync(rutaUsuarios);
  const usuarios = JSON.parse(usuariosData);
  const nuevoUsuario = req.body;
  nuevoUsuario.id = usuarios.length + 1;
  usuarios.push(nuevoUsuario);
  fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));
  res.status(201).json(nuevoUsuario);
};

// Actualizar un usuario existente
const actualizarUsuario = (req, res) => {
  const usuariosData = fs.readFileSync(rutaUsuarios);
  const usuarios = JSON.parse(usuariosData);
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  if (usuarioIndex === -1) {
    res.status(404).send('Usuario no encontrado');
  } else {
    const usuarioActualizado = req.body;
    usuarioActualizado.id = id;
    usuarios[usuarioIndex] = usuarioActualizado;
    fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));
    res.json(usuarioActualizado);
  }
};

// Eliminar un usuario
const eliminarUsuario = (req, res) => {
  const usuariosData = fs.readFileSync(rutaUsuarios);
  const usuarios = JSON.parse(usuariosData);
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === id);
  if (usuarioIndex === -1) {
    res.status(404).send('Usuario no encontrado');
  } else {
    const usuarioEliminado = usuarios.splice(usuarioIndex, 1)[0];
    fs.writeFileSync(rutaUsuarios, JSON.stringify(usuarios, null, 2));
    res.json(usuarioEliminado);
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario
};
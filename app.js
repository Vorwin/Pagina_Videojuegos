const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());

const productosRoutes = require('./routes/productos');
const transaccionesRoutes = require('./routes/transacciones');
const usuariosRoutes = require('./routes/usuarios');
const proveedoresRoutes = require('./routes/proveedores');
const pedidosRoutes = require('./routes/pedidos');
const comprasRoutes = require('./routes/compras');



app.use('/productos', productosRoutes);
app.use('/transacciones', transaccionesRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/proveedores', proveedoresRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/compras', comprasRoutes);




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
const fs = require('fs');
const rutaCompras = './models/compras.json';
const rutaProductos = './models/productos.json';

// Obtener todas las compras
const obtenerCompras = (req, res) => {
  const comprasData = fs.readFileSync(rutaCompras);
  const compras = JSON.parse(comprasData);
  res.json(compras);
};

// Registrar una nueva compra
const registrarCompra = (req, res) => {
    const comprasData = fs.readFileSync(rutaCompras);
    const compras = JSON.parse(comprasData);
    const productosData = fs.readFileSync(rutaProductos);
    let productos = JSON.parse(productosData);

    const nuevasCompras = req.body; // Array de objetos { productoId, cantidad }

    // Calcular el total entre los productos comprados
    let totalCompra = 0;
    let productosComprados = [];

    nuevasCompras.forEach(compra => {
        const producto = productos.find(p => p.id === compra.productoId);
        if (!producto) {
            res.status(404).send('Producto no encontrado');
            return;
        }
        totalCompra += producto.precioVenta * compra.cantidad;
        productosComprados.push({
            nombre: producto.nombre,
            cantidad: compra.cantidad
        });
    });

    // Construir el objeto de compra con el total y los productos comprados
    const nuevaCompra = {
        id: compras.length + 1, // Asignar un ID único a la compra
        productos: productosComprados,
        total: totalCompra
    };
    compras.push(nuevaCompra);

    fs.writeFileSync(rutaCompras, JSON.stringify(compras, null, 2));
    res.status(201).json(nuevaCompra);
};

module.exports = {
  obtenerCompras,
  registrarCompra,
};


const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productos.controller');

// Rutas para productos
router.get('/productos', productoController.getProductos);
router.get('/productos/:id', productoController.getProductoById);
router.post('/productos', productoController.createProducto);
router.put('/productos/:id', productoController.updateProducto);
router.delete('/productos/:id', productoController.deleteProducto);

module.exports = router;

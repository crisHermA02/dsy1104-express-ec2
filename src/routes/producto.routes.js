const express = require('express');
const enrutador = express.Router();
const controladorProductos = require('../controllers/productos.controller');

enrutador.get('/productos', controladorProductos.listarProductos);
enrutador.post('/productos', controladorProductos.crearProducto);

module.exports = enrutador;
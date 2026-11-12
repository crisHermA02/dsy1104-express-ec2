const express = require('express');
const cors = require('cors');
const rutasSaludo = require('./routes/saludo.routes');
const rutasProductos = require('./routes/producto.routes');

const aplicacion = express();
aplicacion.use(cors());
aplicacion.use(express.json());

aplicacion.use('/api', rutasSaludo);
aplicacion.use('/api', rutasProductos);

aplicacion.use((peticion, respuesta) => respuesta.status(404).json({ error: 'Ruta no encontrada' }));
module.exports = aplicacion;
const express = require('express');
const cors = require('cors');
const saludoRoutes = require('./routes/saludo.routes');
const app = express();
app.use(cors()); // Laboratorio: permitir clientes desde distintos orígenes
app.use(express.json());
app.use('/api', saludoRoutes);
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));
module.exports = app;
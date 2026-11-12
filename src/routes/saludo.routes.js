const express = require('express');
const router = express.Router();
const saludoController = require('../controllers/saludo.controller');
router.get('/saludo', saludoController.obtenerSaludo);
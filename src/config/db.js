const ruta = require('path');
const { Pool } = require('pg');
require('dotenv').config({ path: ruta.resolve(__dirname, '../../.env') });

const grupoConexiones = new Pool({
    host: process.env.BD_HOST || process.env.DB_HOST,
    port: Number(process.env.BD_PUERTO || process.env.DB_PORT) || 5432,
    database: process.env.BD_NOMBRE || process.env.DB_NAME,
    user: process.env.BD_USUARIO || process.env.DB_USER,
    password: process.env.BD_CONTRASENA || process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

grupoConexiones.query('SELECT NOW()')
    .then((respuesta) => console.log('Conectado a RDS PostgreSQL:', respuesta.rows[0].now))
    .catch((error) => console.error('Error conectando a RDS:', error.message));

module.exports = grupoConexiones;
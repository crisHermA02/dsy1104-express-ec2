require('dotenv').config();
const aplicacion = require('./src/app');
const PUERTO = process.env.PUERTO || process.env.PORT || 3000;
aplicacion.listen(PUERTO, '0.0.0.0', () => {
  console.log(`API Express lista en puerto ${PUERTO}`);
});
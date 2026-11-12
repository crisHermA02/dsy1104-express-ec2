const grupoConexiones = require('../config/db');

async function listarProductos(peticion, respuesta) {
    try {
        const resultado = await grupoConexiones.query('SELECT * FROM productos ORDER BY id ASC');
        respuesta.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Error al consultar productos:', error.message);
        respuesta.status(500).json({ error: 'Error interno al consultar los productos' });
    }
}

async function crearProducto(peticion, respuesta) {
    const {
        codigo,
        categoria,
        subcategoria,
        nombreDelProducto,
        marca,
        unidad,
        pCompraClp,
        pVentaClp,
        stock,
        stockMinimo
    } = peticion.body;

    if (!codigo || !nombreDelProducto || pVentaClp === undefined || stock === undefined) {
        return respuesta.status(400).json({
            error: 'Faltan campos obligatorios (codigo, nombreDelProducto, pVentaClp, stock)'
        });
    }

    const consultaSql = `
    INSERT INTO productos (
      codigo, categoria, subcategoria, "nombreDelProducto",
      marca, unidad, "pCompraClp", "pVentaClp", stock, "stockMinimo"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

    const valores = [
        codigo,
        categoria,
        subcategoria,
        nombreDelProducto,
        marca,
        unidad,
        pCompraClp,
        pVentaClp,
        stock,
        stockMinimo
    ];

    try {
        const resultado = await grupoConexiones.query(consultaSql, valores);
        respuesta.status(201).json({
            mensaje: 'Producto creado correctamente en RDS',
            producto: resultado.rows[0]
        });
    } catch (error) {
        console.error('Error al insertar producto:', error.message);
        if (error.code === '23505') {
            return respuesta.status(409).json({ error: `El código ${codigo} ya existe` });
        }
        respuesta.status(500).json({ error: 'Error interno al registrar el producto' });
    }
}

module.exports = { listarProductos, crearProducto };
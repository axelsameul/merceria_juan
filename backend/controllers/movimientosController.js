const pool = require('../config/dataBase');


// ✅ Obtener todos los movimientos
const getMovimientos = (req, res) => {
  const sql = 'SELECT * FROM movimientos ORDER BY fecha DESC';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener movimientos' });
    res.json(results);
  });
};

// ✅ Agregar nuevo movimiento (venta o gasto)
const agregarMovimiento = (req, res) => {
  const { tipo, descripcion, monto } = req.body;

  if (!tipo || !descripcion || !monto)
    return res.status(400).json({ error: 'Faltan datos obligatorios' });

  const sql = 'INSERT INTO movimientos (tipo, descripcion, monto) VALUES (?, ?, ?)';
  connection.query(sql, [tipo, descripcion, monto], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar movimiento' });
    res.json({ id: result.insertId, tipo, descripcion, monto });
  });
};

// ✅ Obtener resumen contable
const getResumen = (req, res) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) AS total_ingresos,
      SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) AS total_gastos,
      (SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) -
       SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END)) AS saldo
    FROM movimientos
  `;

  connection.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al calcular resumen' });
    res.json(result[0]);
  });
};

module.exports = {
  getMovimientos,
  agregarMovimiento,
  getResumen
};

const pool = require('../config/dataBase');

// ✅ Obtener todos los movimientos
const getMovimientos = async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM movimientos ORDER BY fecha DESC');
    res.json(results);
  } catch (err) {
    console.error('❌ Error al obtener movimientos:', err);
    res.status(500).json({ error: 'Error al obtener movimientos' });
  }
};

// ✅ Agregar nuevo movimiento (venta o gasto)
const agregarMovimiento = async (req, res) => {
  const { tipo, descripcion, monto } = req.body;

  if (!tipo || !descripcion || !monto) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO movimientos (tipo, descripcion, monto) VALUES (?, ?, ?)',
      [tipo, descripcion, monto]
    );
    res.json({ id: result.insertId, tipo, descripcion, monto });
  } catch (err) {
    console.error('❌ Error al agregar movimiento:', err);
    res.status(500).json({ error: 'Error al agregar movimiento' });
  }
};

// ✅ Obtener resumen contable
const getResumen = async (req, res) => {
  const sql = `
    SELECT 
      SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) AS total_ingresos,
      SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END) AS total_gastos,
      (SUM(CASE WHEN tipo = 'ingreso' THEN monto ELSE 0 END) -
       SUM(CASE WHEN tipo = 'gasto' THEN monto ELSE 0 END)) AS saldo
    FROM movimientos
  `;

  try {
    const [result] = await pool.query(sql);
    res.json(result[0]);
  } catch (err) {
    console.error('❌ Error al calcular resumen:', err);
    res.status(500).json({ error: 'Error al calcular resumen' });
  }
};

const deleteMove = async (req, res) => {
  const { id } = req.params; // 👈 obtenemos el id desde la URL

  try {
    const [result] = await pool.query(
      'DELETE FROM movimientos WHERE id_movimiento = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }

    res.json({ message: 'Movimiento eliminado correctamente' });
  } catch (err) {
    console.error('❌ Error al eliminar movimiento:', err);
    res.status(500).json({ error: 'Error al eliminar movimiento' });
  }
};



const editMove = async (req, res) => {
  const { id } = req.params;
  const { tipo, descripcion, monto } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE movimientos SET tipo = ?, descripcion = ?, monto = COALESCE(?, monto) WHERE id_movimiento = ?",
      [tipo, descripcion, monto, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Movimiento no encontrado" });
    }

    res.json({ mensaje: "Movimiento actualizado correctamente" });
  } catch (err) {
    console.error('Error al editar movimiento:', err);
    res.status(500).json({ mensaje: "Error al editar movimiento", detalle: err.message });
  }
};




module.exports = {
  getMovimientos,
  agregarMovimiento,
  getResumen,
  deleteMove,
  editMove
};

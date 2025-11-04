const express = require('express');
const router = express.Router();
const {
  getMovimientos,
  agregarMovimiento,
  getResumen
} = require('../controllers/movimientosController');

// Obtener todos los movimientos
router.get('/', getMovimientos);

// Agregar un nuevo movimiento (ingreso o gasto)
router.post('/', agregarMovimiento);

// Obtener resumen contable
router.get('/resumen', getResumen);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getMovimientos,
  agregarMovimiento,
  getResumen,
  deleteMove,
  editMove
} = require('../controllers/movimientosController');


router.get('/', getMovimientos);
router.post('/', agregarMovimiento);
router.get('/resumen', getResumen);
router.delete('/eliminar/:id',deleteMove)
router.put('/editar/:id', editMove)
module.exports = router;

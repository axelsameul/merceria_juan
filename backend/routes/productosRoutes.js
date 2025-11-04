const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // simple, sin diskStorage

const {
  getCategorias,
  getProductosPorCategoria,
  getProductosConCategoria,
  agregarProducto,
  editarProducto,
  eliminarProducto
} = require('../controllers/productosController');

// -------------------
// Categorías
// -------------------
router.get('/categorias', getCategorias); // GET /api/productos/categorias

// -------------------
// Productos
// -------------------
router.get('/categoria/:id_categoria', getProductosPorCategoria); // GET /api/productos/categoria/:id
router.get('/', getProductosConCategoria); // GET /api/productos/

// -------------------
// Admin
// -------------------
router.post("/agregar", upload.single("imagen"), agregarProducto); // POST /api/productos/agregar
router.put("/editar/:id", upload.single("imagen"), editarProducto); // PUT /api/productos/editar/:id
router.delete("/eliminar/:id", eliminarProducto); // DELETE /api/productos/eliminar/:id

module.exports = router;

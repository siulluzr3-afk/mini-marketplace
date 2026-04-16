// Rutas de productos

const express = require('express');
const router = express.Router();
const { 
  getAllProducts, 
  getProductById, 
  getMyProducts,
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/product.controller');
const { authenticateToken, requireSeller } = require('../middlewares/auth.middleware');

// Rutas públicas
router.get('/', getAllProducts); // GET /api/products - Obtener todos los productos
router.get('/:id', getProductById); // GET /api/products/:id - Obtener un producto

// Rutas protegidas para sellers
router.get('/seller/my-products', authenticateToken, requireSeller, getMyProducts); // GET /api/products/seller/my-products
router.post('/', authenticateToken, requireSeller, createProduct); // POST /api/products
router.put('/:id', authenticateToken, requireSeller, updateProduct); // PUT /api/products/:id
router.delete('/:id', authenticateToken, requireSeller, deleteProduct); // DELETE /api/products/:id

module.exports = router;

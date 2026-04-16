// Rutas del carrito de compras

const express = require('express');
const router = express.Router();
const { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart,
  clearCart
} = require('../controllers/cart.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Todas las rutas del carrito requieren autenticación
router.use(authenticateToken);

router.get('/', getCart); // GET /api/cart - Obtener carrito
router.post('/', addToCart); // POST /api/cart - Agregar al carrito
router.put('/:id', updateCartItem); // PUT /api/cart/:id - Actualizar cantidad
router.delete('/:id', removeFromCart); // DELETE /api/cart/:id - Eliminar item
router.delete('/', clearCart); // DELETE /api/cart - Vaciar carrito

module.exports = router;

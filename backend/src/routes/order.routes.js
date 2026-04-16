// Rutas de órdenes (compras)

const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getMyOrders, 
  getOrderById 
} = require('../controllers/order.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Todas las rutas de órdenes requieren autenticación
router.use(authenticateToken);

router.post('/', createOrder); // POST /api/orders - Crear orden (checkout)
router.get('/', getMyOrders); // GET /api/orders - Obtener mis órdenes
router.get('/:id', getOrderById); // GET /api/orders/:id - Obtener una orden

module.exports = router;

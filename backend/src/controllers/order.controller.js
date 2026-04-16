// Controlador para gestionar órdenes (compras)

const { prisma } = require('../config/database');

/**
 * Crear una nueva orden (checkout)
 * POST /api/orders
 */
async function createOrder(req, res) {
  try {
    // Obtener el carrito del usuario
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    // Validar stock de todos los productos
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({ 
          error: `Stock insuficiente para ${item.product.name}. Solo hay ${item.product.stock} unidades disponibles` 
        });
      }
    }

    // Calcular total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    // Crear la orden y actualizar stock en una transacción
    const order = await prisma.$transaction(async (tx) => {
      // Crear orden
      const newOrder = await tx.order.create({
        data: {
          userId: req.user.id,
          total: total,
          status: 'COMPLETED' // En un sistema real, empezaría como PENDING
        }
      });

      // Actualizar stock de productos
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      // Vaciar el carrito
      await tx.cartItem.deleteMany({
        where: { userId: req.user.id }
      });

      return newOrder;
    });

    res.status(201).json({
      message: 'Orden creada exitosamente',
      order: {
        ...order,
        items: cartItems.map(item => ({
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          subtotal: item.product.price * item.quantity
        }))
      }
    });
  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(500).json({ error: 'Error al procesar la compra' });
  }
}

/**
 * Obtener todas las órdenes del usuario actual
 * GET /api/orders
 */
async function getMyOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ orders });
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error al obtener tus órdenes' });
  }
}

/**
 * Obtener una orden específica por ID
 * GET /api/orders/:id
 */
async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id 
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Error al obtener orden:', error);
    res.status(500).json({ error: 'Error al obtener la orden' });
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById
};

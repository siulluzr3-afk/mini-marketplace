// Controlador para gestionar el carrito de compras

const { prisma } = require('../config/database');

/**
 * Obtener el carrito del usuario actual
 * GET /api/cart
 */
async function getCart(req, res) {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: {
        product: {
          include: {
            seller: {
              select: { id: true, name: true }
            }
          }
        }
      }
    });

    // Calcular el total del carrito
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    res.json({ 
      cartItems,
      total,
      itemCount: cartItems.length
    });
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
}

/**
 * Agregar un producto al carrito
 * POST /api/cart
 */
async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;

    // Validar campos
    if (!productId || !quantity) {
      return res.status(400).json({ 
        error: 'productId y quantity son requeridos' 
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
    }

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar que hay suficiente stock
    if (product.stock < quantity) {
      return res.status(400).json({ 
        error: `Stock insuficiente. Solo hay ${product.stock} unidades disponibles` 
      });
    }

    // Verificar si el producto ya está en el carrito
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: productId
        }
      }
    });

    let cartItem;

    if (existingCartItem) {
      // Si ya existe, actualizar la cantidad
      const newQuantity = existingCartItem.quantity + quantity;

      if (product.stock < newQuantity) {
        return res.status(400).json({ 
          error: `Stock insuficiente. Solo hay ${product.stock} unidades disponibles` 
        });
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity },
        include: { product: true }
      });
    } else {
      // Si no existe, crear nuevo item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: req.user.id,
          productId: productId,
          quantity: quantity
        },
        include: { product: true }
      });
    }

    res.status(201).json({
      message: 'Producto agregado al carrito',
      cartItem
    });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
}

/**
 * Actualizar cantidad de un item del carrito
 * PUT /api/cart/:id
 */
async function updateCartItem(req, res) {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
    }

    // Verificar que el item existe y pertenece al usuario
    const cartItem = await prisma.cartItem.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id 
      },
      include: { product: true }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Item no encontrado en tu carrito' });
    }

    // Verificar stock
    if (cartItem.product.stock < quantity) {
      return res.status(400).json({ 
        error: `Stock insuficiente. Solo hay ${cartItem.product.stock} unidades disponibles` 
      });
    }

    // Actualizar cantidad
    const updatedCartItem = await prisma.cartItem.update({
      where: { id: parseInt(id) },
      data: { quantity },
      include: { product: true }
    });

    res.json({
      message: 'Cantidad actualizada',
      cartItem: updatedCartItem
    });
  } catch (error) {
    console.error('Error al actualizar item del carrito:', error);
    res.status(500).json({ error: 'Error al actualizar item del carrito' });
  }
}

/**
 * Eliminar un item del carrito
 * DELETE /api/cart/:id
 */
async function removeFromCart(req, res) {
  try {
    const { id } = req.params;

    // Verificar que el item existe y pertenece al usuario
    const cartItem = await prisma.cartItem.findFirst({
      where: { 
        id: parseInt(id),
        userId: req.user.id 
      }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Item no encontrado en tu carrito' });
    }

    // Eliminar item
    await prisma.cartItem.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
}

/**
 * Vaciar el carrito completo
 * DELETE /api/cart
 */
async function clearCart(req, res) {
  try {
    await prisma.cartItem.deleteMany({
      where: { userId: req.user.id }
    });

    res.json({ message: 'Carrito vaciado exitosamente' });
  } catch (error) {
    console.error('Error al vaciar carrito:', error);
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
};

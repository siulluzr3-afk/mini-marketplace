// Controlador para gestionar productos

const { prisma } = require('../config/database');

/**
 * Obtener todos los productos (público)
 * GET /api/products
 */
async function getAllProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: {
        seller: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ products });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

/**
 * Obtener un producto por ID (público)
 * GET /api/products/:id
 */
async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        seller: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
}

/**
 * Obtener productos del vendedor actual
 * GET /api/products/my-products
 */
async function getMyProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      where: { sellerId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ products });
  } catch (error) {
    console.error('Error al obtener mis productos:', error);
    res.status(500).json({ error: 'Error al obtener tus productos' });
  }
}

/**
 * Crear un nuevo producto (solo sellers)
 * POST /api/products
 */
async function createProduct(req, res) {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    // Validar campos requeridos
    if (!name || !description || price === undefined || stock === undefined) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos (name, description, price, stock)' 
      });
    }

    // Validar tipos
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
    }

    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ error: 'El stock debe ser un número mayor o igual a 0' });
    }

    // Crear producto
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
        sellerId: req.user.id
      },
      include: {
        seller: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json({
      message: 'Producto creado exitosamente',
      product
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
}

/**
 * Actualizar un producto (solo el vendedor dueño)
 * PUT /api/products/:id
 */
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, stock, imageUrl } = req.body;

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar que el producto pertenece al vendedor
    if (product.sellerId !== req.user.id) {
      return res.status(403).json({ 
        error: 'No tienes permiso para editar este producto' 
      });
    }

    // Validar tipos si se proporcionan
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return res.status(400).json({ error: 'El precio debe ser un número mayor a 0' });
    }

    if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
      return res.status(400).json({ error: 'El stock debe ser un número mayor o igual a 0' });
    }

    // Actualizar producto
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price }),
        ...(stock !== undefined && { stock }),
        ...(imageUrl !== undefined && { imageUrl })
      },
      include: {
        seller: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json({
      message: 'Producto actualizado exitosamente',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
}

/**
 * Eliminar un producto (solo el vendedor dueño)
 * DELETE /api/products/:id
 */
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    // Verificar que el producto existe
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    // Verificar que el producto pertenece al vendedor
    if (product.sellerId !== req.user.id) {
      return res.status(403).json({ 
        error: 'No tienes permiso para eliminar este producto' 
      });
    }

    // Eliminar producto
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct
};

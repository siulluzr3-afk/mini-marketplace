// Middleware para verificar autenticación y roles

const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');

/**
 * Middleware para verificar que el usuario esté autenticado
 * Verifica el token JWT en el header Authorization
 */
async function authenticateToken(req, res, next) {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar el usuario en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Agregar la información del usuario al request
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ error: 'Token expirado' });
    }
    return res.status(500).json({ error: 'Error al verificar autenticación' });
  }
}

/**
 * Middleware para verificar que el usuario tenga el rol de vendedor
 */
function requireSeller(req, res, next) {
  if (req.user.role !== 'SELLER') {
    return res.status(403).json({ 
      error: 'Acceso denegado. Solo los vendedores pueden realizar esta acción' 
    });
  }
  next();
}

/**
 * Middleware para verificar que el usuario tenga el rol de comprador
 */
function requireBuyer(req, res, next) {
  if (req.user.role !== 'BUYER') {
    return res.status(403).json({ 
      error: 'Acceso denegado. Solo los compradores pueden realizar esta acción' 
    });
  }
  next();
}

module.exports = {
  authenticateToken,
  requireSeller,
  requireBuyer
};

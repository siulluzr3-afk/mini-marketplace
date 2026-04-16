// Controlador para autenticación (registro y login)

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { prisma } = require('../config/database');

/**
 * Registrar un nuevo usuario
 * POST /api/auth/register
 */
async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!name || !email || !password) {
      return res.status(400).json({ 
        error: 'Todos los campos son requeridos (name, email, password)' 
      });
    }

    // Validar rol (solo BUYER o SELLER)
    if (role && role !== 'BUYER' && role !== 'SELLER') {
      return res.status(400).json({ 
        error: 'El rol debe ser BUYER o SELLER' 
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'BUYER' // Por defecto es BUYER
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user,
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
}

/**
 * Iniciar sesión
 * POST /api/auth/login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email y contraseña son requeridos' 
      });
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Devolver información del usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Inicio de sesión exitoso',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

/**
 * Obtener información del usuario actual
 * GET /api/auth/me
 */
async function getCurrentUser(req, res) {
  try {
    // El middleware authenticateToken ya agregó req.user
    res.json({ user: req.user });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener información del usuario' });
  }
}

module.exports = {
  register,
  login,
  getCurrentUser
};

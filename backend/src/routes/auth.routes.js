// Rutas de autenticación

const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// POST /api/auth/register - Registrar nuevo usuario
router.post('/register', register);

// POST /api/auth/login - Iniciar sesión
router.post('/login', login);

// GET /api/auth/me - Obtener usuario actual (requiere autenticación)
router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;

// Servidor principal del backend

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase, disconnectDatabase } = require('./config/database');

// Importar rutas (se crearán después)
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares globales
app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json()); // Parsear JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🛒 API del Mini Marketplace funcionando',
    version: '1.0.0'
  });
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: err.message 
  });
});

// Iniciar servidor
async function startServer() {
  try {
    // Conectar a la base de datos
    await connectDatabase();
    
    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Manejar cierre graceful del servidor
process.on('SIGINT', async () => {
  console.log('\n👋 Cerrando servidor...');
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n👋 Cerrando servidor...');
  await disconnectDatabase();
  process.exit(0);
});

// Iniciar la aplicación
startServer();

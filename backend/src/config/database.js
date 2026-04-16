// Configuración y conexión a la base de datos usando Prisma Client

const { PrismaClient } = require('@prisma/client');

// Crear instancia única de Prisma Client
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'], // Logging para desarrollo
});

// Función para conectar a la base de datos
async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Base de datos conectada correctamente');
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

// Función para desconectar de la base de datos
async function disconnectDatabase() {
  await prisma.$disconnect();
  console.log('Base de datos desconectada');
}

module.exports = { prisma, connectDatabase, disconnectDatabase };

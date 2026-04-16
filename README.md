# 🛒 Mini Marketplace

Mini marketplace completo con sistema de compras, roles de usuario y panel de vendedor.

## 🌟 Características

✅ **Autenticación Completa**
- Registro y login de usuarios
- Autenticación con JWT
- Roles: Comprador y Vendedor

✅ **Funcionalidades de Comprador**
- Navegación pública de productos
- Carrito de compras (agregar, modificar, eliminar)
- Proceso de checkout simulado
- Historial de órdenes

✅ **Funcionalidades de Vendedor**
- Panel de administración de productos
- CRUD completo de productos
- Gestión de inventario

✅ **Diseño Moderno**
- Interfaz estilo Amazon
- Responsive design
- TailwindCSS

## 🚀 Tecnologías

### Backend
- Node.js + Express
- Prisma ORM
- SQLite (desarrollo) / PostgreSQL (producción)
- JWT para autenticación
- bcrypt para encriptación

### Frontend
- React + Vite
- React Router v6
- TailwindCSS
- Context API
- Axios

## 📦 Instalación Local

### Pre-requisitos

- Node.js v16 o superior
- npm o yarn

### Backend

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:push
npm run dev
```

El servidor estará en: `http://localhost:5000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend estará en: `http://localhost:5173`

## 🔑 Credenciales de Prueba

### Vendedor
- **Email**: vendedor@demo.com
- **Contraseña**: 123456

### Comprador
- **Email**: test@validation.com
- **Contraseña**: 123456

## 📁 Estructura del Proyecto

```
mini-marketplace/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🌐 Deployment

Ver la guía completa de deployment en [DEPLOYMENT.md](./DEPLOYMENT.md)

### Resumen:
1. Base de datos: [Neon](https://neon.tech)
2. Backend: [Render](https://render.com)
3. Frontend: [Render](https://render.com)

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Obtener usuario actual

### Productos
- `GET /api/products` - Listar todos los productos (público)
- `GET /api/products/:id` - Obtener producto por ID (público)
- `GET /api/products/seller/my-products` - Mis productos (vendedor)
- `POST /api/products` - Crear producto (vendedor)
- `PUT /api/products/:id` - Actualizar producto (vendedor)
- `DELETE /api/products/:id` - Eliminar producto (vendedor)

### Carrito
- `GET /api/cart` - Ver carrito
- `POST /api/cart` - Agregar al carrito
- `PUT /api/cart/:id` - Actualizar cantidad
- `DELETE /api/cart/:id` - Eliminar item
- `DELETE /api/cart` - Vaciar carrito

### Órdenes
- `POST /api/orders` - Crear orden (checkout)
- `GET /api/orders` - Mis órdenes
- `GET /api/orders/:id` - Obtener orden por ID

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## 👥 Autor

Mini Marketplace - Proyecto de demostración

---

⭐ Si te gustó este proyecto, dale una estrella en GitHub!

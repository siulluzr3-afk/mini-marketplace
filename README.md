# 🛒 Mini Marketplace

Mini Marketplace es una aplicación web fullstack que permite a los usuarios registrarse como compradores o vendedores, gestionar productos, agregar items al carrito y realizar compras simuladas.

## 📋 Características

- **Autenticación**: Sistema de registro y login con JWT
- **Roles de usuario**: Compradores y Vendedores
- **Gestión de productos**: CRUD completo para vendedores
- **Carrito de compras**: Agregar, modificar y eliminar productos
- **Checkout simulado**: Proceso de compra que actualiza el stock
- **Panel de vendedor**: Gestión de productos propios
- **Historial de órdenes**: Ver compras realizadas

## 🛠️ Stack Tecnológico

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL / SQLite
- JWT + bcrypt
- CORS

### Frontend
- React 18
- Vite
- React Router v6
- TailwindCSS
- Axios
- Context API

### Base de Datos
- **Desarrollo**: SQLite (sin instalación)
- **Producción**: PostgreSQL en Neon

## 📦 Estructura del Proyecto

```
mini-marketplace/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── cart.controller.js
│   │   │   └── order.controller.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── cart.routes.js
│   │   │   └── order.routes.js
│   │   └── server.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── contexts/
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Home.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Checkout.jsx
    │   │   ├── Orders.jsx
    │   │   └── SellerProducts.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    ├── .env.example
    └── package.json
```

## 🚀 Instalación y Desarrollo Local

### Prerrequisitos
- Node.js v18 o superior
- npm o yarn
- Git

### 1. Clonar el repositorio

```bash
git clone <url-del-repo>
cd mini-marketplace
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Copiar archivo de entorno
cp .env.example .env

# Generar cliente de Prisma y crear base de datos
npx prisma generate
npx prisma db push

# Iniciar servidor de desarrollo
npm run dev
```

El backend estará corriendo en `http://localhost:5000`

### 3. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Copiar archivo de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`

## 🌐 Despliegue en Producción

### Backend en Render

1. Crear una cuenta en [Render](https://render.com)
2. Crear un nuevo **Web Service**
3. Conectar tu repositorio de GitHub
4. Configurar:
   - **Build Command**: `cd backend && npm install && npx prisma generate`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     - `DATABASE_URL`: URL de tu base de datos Neon
     - `JWT_SECRET`: Tu clave secreta segura
     - `PORT`: 5000 (opcional, Render lo asigna automáticamente)

### Frontend en Render

1. Crear un nuevo **Static Site**
2. Conectar tu repositorio
3. Configurar:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
   - **Environment Variables**:
     - `VITE_API_URL`: URL de tu backend en Render (ej: `https://tu-backend.onrender.com/api`)

### Base de Datos en Neon

1. Crear una cuenta en [Neon](https://neon.tech)
2. Crear un nuevo proyecto
3. Copiar la `DATABASE_URL` que te proporciona Neon
4. Actualizar el archivo `backend/prisma/schema.prisma`:
   - Cambiar `provider = "sqlite"` a `provider = "postgresql"`
5. Configurar la variable de entorno `DATABASE_URL` en Render con la URL de Neon
6. Ejecutar migraciones: `npx prisma db push` (se ejecuta automáticamente en el despliegue)

## 📝 Variables de Entorno

### Backend (.env)

```env
DATABASE_URL="file:./dev.db"  # SQLite para desarrollo
# DATABASE_URL="postgresql://..."  # PostgreSQL para producción

JWT_SECRET="tu-secreto-seguro"
PORT=5000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api  # Desarrollo
# VITE_API_URL=https://tu-backend.onrender.com/api  # Producción
```

## 🔑 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere auth)

### Productos
- `GET /api/products` - Listar todos los productos (público)
- `GET /api/products/:id` - Obtener un producto (público)
- `GET /api/products/seller/my-products` - Mis productos (seller)
- `POST /api/products` - Crear producto (seller)
- `PUT /api/products/:id` - Actualizar producto (seller)
- `DELETE /api/products/:id` - Eliminar producto (seller)

### Carrito
- `GET /api/cart` - Obtener carrito (requiere auth)
- `POST /api/cart` - Agregar al carrito (requiere auth)
- `PUT /api/cart/:id` - Actualizar cantidad (requiere auth)
- `DELETE /api/cart/:id` - Eliminar item (requiere auth)
- `DELETE /api/cart` - Vaciar carrito (requiere auth)

### Órdenes
- `POST /api/orders` - Crear orden/checkout (requiere auth)
- `GET /api/orders` - Mis órdenes (requiere auth)
- `GET /api/orders/:id` - Obtener orden (requiere auth)

## 👥 Roles de Usuario

### Comprador (BUYER)
- Ver productos
- Agregar al carrito
- Realizar compras
- Ver historial de órdenes

### Vendedor (SELLER)
- Crear productos
- Editar sus productos
- Eliminar sus productos
- Gestionar stock

## 🧪 Pruebas Locales

### Crear usuarios de prueba

**Comprador:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@test.com",
  "password": "123456",
  "role": "BUYER"
}
```

**Vendedor:**
```json
{
  "name": "María Seller",
  "email": "maria@test.com",
  "password": "123456",
  "role": "SELLER"
}
```

## 🐛 Solución de Problemas

### El backend no inicia
- Verifica que el archivo `.env` existe
- Ejecuta `npx prisma generate`
- Verifica que el puerto 5000 no esté en uso

### Error de CORS en el frontend
- Verifica que `VITE_API_URL` en `.env` del frontend apunta a la URL correcta del backend
- El backend ya tiene CORS habilitado por defecto

### Error de autenticación
- Verifica que `JWT_SECRET` esté configurado en el backend
- Revisa que el token se esté enviando correctamente en el header `Authorization: Bearer <token>`

## 📚 Recursos Adicionales

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de React Router](https://reactrouter.com)
- [Documentación de TailwindCSS](https://tailwindcss.com/docs)
- [Render Documentation](https://render.com/docs)
- [Neon Documentation](https://neon.tech/docs)

## 🤝 Contribuir

Este proyecto fue desarrollado como parte de un ejercicio formativo. Las contribuciones son bienvenidas.

## 📄 Licencia

ISC

# 📁 Estructura Detallada del Proyecto

**Proyecto**: Mini Marketplace
**Tipo**: Monorepo Full-Stack
**Stack**: React + Node.js + PostgreSQL

---

## 🌳 Árbol de Directorios Completo

```
mini-marketplace/
│
├── backend/                          # Servidor API Node.js + Express
│   ├── node_modules/                 # Dependencias (gitignored)
│   ├── prisma/
│   │   ├── dev.db                    # Base de datos SQLite (desarrollo)
│   │   └── schema.prisma             # Schema de base de datos (Prisma)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # Cliente Prisma configurado
│   │   ├── controllers/
│   │   │   ├── auth.controller.js    # Registro, login, getCurrentUser
│   │   │   ├── cart.controller.js    # CRUD del carrito
│   │   │   ├── order.controller.js   # Checkout y órdenes
│   │   │   └── product.controller.js # CRUD de productos
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js    # JWT verification, requireSeller, requireBuyer
│   │   ├── routes/
│   │   │   ├── auth.routes.js        # Rutas de autenticación
│   │   │   ├── cart.routes.js        # Rutas de carrito
│   │   │   ├── order.routes.js       # Rutas de órdenes
│   │   │   └── product.routes.js     # Rutas de productos
│   │   └── server.js                 # Punto de entrada del servidor
│   ├── .env                          # Variables de entorno (gitignored)
│   ├── .gitignore
│   └── package.json                  # Dependencias y scripts backend
│
├── frontend/                         # SPA React + Vite
│   ├── node_modules/                 # Dependencias (gitignored)
│   ├── public/
│   │   └── favicon.svg               # Icono del sitio
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Barra de navegación
│   │   │   └── ProtectedRoute.jsx    # HOC para rutas protegidas
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx       # Estado global de autenticación
│   │   │   └── CartContext.jsx       # Estado global del carrito
│   │   ├── pages/
│   │   │   ├── Cart.jsx              # Vista del carrito
│   │   │   ├── Checkout.jsx          # Proceso de pago
│   │   │   ├── Home.jsx              # Página principal (listado)
│   │   │   ├── Login.jsx             # Inicio de sesión
│   │   │   ├── ProductDetail.jsx     # Detalle de producto
│   │   │   ├── Register.jsx          # Registro de usuario
│   │   │   └── SellerProducts.jsx    # Panel de vendedor
│   │   ├── services/
│   │   │   └── api.js                # Cliente axios y endpoints
│   │   ├── App.jsx                   # Componente raíz y router
│   │   ├── index.css                 # Estilos globales + Tailwind
│   │   └── main.jsx                  # Punto de entrada React
│   ├── .env                          # Variables de entorno (gitignored)
│   ├── .env.example                  # Template de variables
│   ├── .gitignore
│   ├── index.html                    # HTML base
│   ├── package.json                  # Dependencias y scripts frontend
│   ├── postcss.config.js             # Configuración PostCSS
│   ├── tailwind.config.js            # Configuración TailwindCSS
│   └── vite.config.js                # Configuración Vite
│
├── .gitignore                        # Git ignore global
├── CHECKLIST_DEPLOY.md               # Checklist de deployment
├── DEPLOY_GUIDE.md                   # Guía de deployment
├── DEPLOYMENT.md                     # Instrucciones de deployment
├── ESTRUCTURA_PROYECTO.md            # Este archivo
├── EVIDENCIAS.md                     # Guía de evidencias
├── INFORME_FINAL.md                  # Informe de aprendizajes
├── INICIO_RAPIDO.md                  # Guía de inicio rápido
└── README.md                         # Documentación principal
```

---

## 📂 Descripción de Archivos Principales

### Backend

#### `/backend/prisma/schema.prisma`
**Propósito**: Define el esquema de la base de datos con Prisma ORM.

**Contenido**:
- Configuración del cliente Prisma
- Datasource (PostgreSQL en producción, SQLite en desarrollo)
- Modelos:
  - **User**: id, name, email, password, role, createdAt
  - **Product**: id, name, description, price, stock, imageUrl, sellerId, createdAt
  - **CartItem**: id, userId, productId, quantity (unique constraint en userId+productId)
  - **Order**: id, userId, total, status, createdAt

**Relaciones**:
- User → Product (one-to-many): Un vendedor tiene muchos productos
- User → CartItem (one-to-many): Un usuario tiene muchos items en carrito
- User → Order (one-to-many): Un usuario tiene muchas órdenes
- Product → CartItem (one-to-many): Un producto puede estar en múltiples carritos

---

#### `/backend/src/server.js`
**Propósito**: Punto de entrada del servidor Express.

**Funcionalidades**:
- Configuración de Express
- Middlewares globales (cors, json, urlencoded)
- Montaje de rutas
- Manejo de errores
- Inicio del servidor en puerto configurado

**Estructura**:
```javascript
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---

#### `/backend/src/config/database.js`
**Propósito**: Exporta el cliente Prisma configurado.

**Código**:
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;
```

**Uso**: Importado en todos los controllers para interactuar con la base de datos.

---

#### `/backend/src/middlewares/auth.middleware.js`
**Propósito**: Middlewares de autenticación y autorización.

**Funciones**:

1. **authenticateToken**:
   - Verifica token JWT en header `Authorization`
   - Extrae userId, email, role del token
   - Inyecta en `req.userId`, `req.userEmail`, `req.userRole`

2. **requireSeller**:
   - Verifica que el usuario tenga rol "SELLER"
   - Retorna 403 si no es vendedor

3. **requireBuyer**:
   - Verifica que el usuario tenga rol "BUYER"
   - Retorna 403 si no es comprador

**Uso en rutas**:
```javascript
router.post('/products', authenticateToken, requireSeller, createProduct);
router.post('/cart', authenticateToken, requireBuyer, addToCart);
```

---

#### `/backend/src/controllers/auth.controller.js`
**Propósito**: Lógica de autenticación.

**Endpoints**:

1. **register** (POST /api/auth/register):
   - Recibe: name, email, password, role
   - Hashea contraseña con bcrypt
   - Crea usuario en DB
   - Retorna usuario creado (sin password)

2. **login** (POST /api/auth/login):
   - Recibe: email, password
   - Busca usuario por email
   - Compara password con bcrypt
   - Genera token JWT
   - Retorna user + token

3. **getCurrentUser** (GET /api/auth/me):
   - Requiere autenticación
   - Retorna información del usuario actual

---

#### `/backend/src/controllers/product.controller.js`
**Propósito**: CRUD de productos.

**Endpoints**:

1. **getAllProducts** (GET /api/products):
   - Público (sin auth)
   - Retorna todos los productos con info del seller
   - Ordenados por fecha de creación (desc)

2. **getProductById** (GET /api/products/:id):
   - Público
   - Retorna producto específico con seller

3. **getMyProducts** (GET /api/products/seller/my-products):
   - Requiere auth + seller role
   - Retorna solo productos del seller actual

4. **createProduct** (POST /api/products):
   - Requiere auth + seller role
   - Crea producto asociado al sellerId del token
   - Valida campos requeridos

5. **updateProduct** (PUT /api/products/:id):
   - Requiere auth + seller role
   - Solo puede editar sus propios productos
   - Valida ownership

6. **deleteProduct** (DELETE /api/products/:id):
   - Requiere auth + seller role
   - Solo puede eliminar sus propios productos
   - Valida ownership

---

#### `/backend/src/controllers/cart.controller.js`
**Propósito**: Gestión del carrito de compras.

**Endpoints**:

1. **getCart** (GET /api/cart):
   - Requiere auth + buyer role
   - Retorna items del carrito con info de productos
   - Calcula total

2. **addToCart** (POST /api/cart):
   - Requiere auth + buyer role
   - Recibe: productId, quantity
   - Verifica stock disponible
   - Usa upsert para actualizar si ya existe

3. **updateCartItem** (PUT /api/cart/:id):
   - Requiere auth + buyer role
   - Actualiza cantidad de un item
   - Verifica stock

4. **removeCartItem** (DELETE /api/cart/:id):
   - Requiere auth + buyer role
   - Elimina item específico del carrito

5. **clearCart** (DELETE /api/cart):
   - Requiere auth + buyer role
   - Vacía todo el carrito del usuario

---

#### `/backend/src/controllers/order.controller.js`
**Propósito**: Proceso de checkout y órdenes.

**Endpoints**:

1. **createOrder** (POST /api/orders):
   - Requiere auth + buyer role
   - Recibe: shippingInfo (nombre, dirección, etc.)
   - **Transacción atómica**:
     1. Obtener items del carrito
     2. Verificar stock de cada producto
     3. Crear orden
     4. Reducir stock de productos
     5. Vaciar carrito
   - Retorna orden creada

2. **getMyOrders** (GET /api/orders):
   - Requiere auth + buyer role
   - Retorna órdenes del usuario actual
   - Ordenadas por fecha (desc)

3. **getOrderById** (GET /api/orders/:id):
   - Requiere auth + buyer role
   - Retorna orden específica
   - Valida ownership

---

### Frontend

#### `/frontend/src/main.jsx`
**Propósito**: Punto de entrada de React.

**Código**:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

#### `/frontend/src/App.jsx`
**Propósito**: Componente raíz con router y providers.

**Estructura**:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
// ... imports de páginas

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/seller/products" element={<ProtectedRoute requireSeller><SellerProducts /></ProtectedRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

---

#### `/frontend/src/services/api.js`
**Propósito**: Cliente axios y definición de endpoints.

**Estructura**:
```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Cliente base con token
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Endpoints organizados por dominio
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getMyProducts: () => api.get('/products/seller/my-products'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart', data),
  update: (id, data) => api.put(`/cart/${id}`, data),
  remove: (id) => api.delete(`/cart/${id}`),
  clear: () => api.delete('/cart'),
};

export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
};
```

---

#### `/frontend/src/contexts/AuthContext.jsx`
**Propósito**: Estado global de autenticación.

**Estado**:
- `user`: Objeto del usuario actual (null si no está logueado)
- `token`: JWT token
- `loading`: Estado de carga inicial

**Funciones**:
- `register(name, email, password, role)`: Registra nuevo usuario
- `login(email, password)`: Inicia sesión
- `logout()`: Cierra sesión
- `isAuthenticated()`: Boolean si está logueado
- `isSeller()`: Boolean si es vendedor
- `isBuyer()`: Boolean si es comprador

**Uso**:
```jsx
const { user, login, logout, isAuthenticated } = useAuth();
```

---

#### `/frontend/src/contexts/CartContext.jsx`
**Propósito**: Estado global del carrito.

**Estado**:
- `cartItems`: Array de items en el carrito
- `total`: Total calculado

**Funciones**:
- `refreshCart()`: Recarga carrito desde API
- `addToCart(productId, quantity)`: Agrega producto
- `updateQuantity(cartItemId, quantity)`: Actualiza cantidad
- `removeItem(cartItemId)`: Elimina item
- `clearCart()`: Vacía carrito

**Cálculo automático de total**:
```jsx
const total = useMemo(() => {
  return cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);
}, [cartItems]);
```

---

#### `/frontend/src/components/Navbar.jsx`
**Propósito**: Barra de navegación responsive.

**Características**:
- Dos niveles:
  1. Top bar: Info del usuario, logout
  2. Main nav: Links principales
- Diferentes vistas según autenticación y rol
- Diseño Amazon-style (slate-900 background)

**Rutas mostradas**:
- Pública: Inicio, Login, Registro
- Buyer: Inicio, Carrito, Mis Órdenes
- Seller: Inicio, Mis Productos

---

#### `/frontend/src/components/ProtectedRoute.jsx`
**Propósito**: HOC para proteger rutas según autenticación y rol.

**Props**:
- `children`: Componente a renderizar
- `requireSeller`: Boolean (opcional)
- `requireBuyer`: Boolean (opcional)

**Lógica**:
```jsx
if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

if (requireSeller && !isSeller()) {
  return <Navigate to="/" />;
}

if (requireBuyer && !isBuyer()) {
  return <Navigate to="/" />;
}

return children;
```

---

#### `/frontend/src/pages/Home.jsx`
**Propósito**: Página principal con listado de productos.

**Características**:
- Grid responsive (1-5 columnas según viewport)
- Carga productos desde API
- Tarjetas con imagen, nombre, precio, stock
- Click redirige a detalle
- Accesible sin autenticación

---

#### `/frontend/src/pages/ProductDetail.jsx`
**Propósito**: Vista detallada de un producto.

**Características**:
- Layout 2 columnas (imagen | info)
- Selector de cantidad
- Botones:
  - "Agregar al carrito" → redirige a /cart
  - "Comprar ahora" → redirige a /checkout
- Solo visible para buyers autenticados
- Validación de stock

---

#### `/frontend/src/pages/Cart.jsx`
**Propósito**: Vista del carrito de compras.

**Características**:
- Listado de items con imagen, nombre, precio
- Selector de cantidad (actualización en tiempo real)
- Botón eliminar por item
- Resumen con subtotal
- Botones:
  - "Proceder al pago" → /checkout
  - "Vaciar carrito" → vacía y redirige a /
- Vista vacía con mensaje si no hay items

---

#### `/frontend/src/pages/Checkout.jsx`
**Propósito**: Proceso de pago.

**Características**:
- Formulario de datos de envío:
  - Nombre completo
  - Dirección
  - Ciudad
  - Teléfono
- Resumen de productos y total
- Botón "Realizar pedido"
- Validaciones de frontend
- Llama a `orderAPI.create()`
- Redirección a confirmación

---

#### `/frontend/src/pages/SellerProducts.jsx`
**Propósito**: Panel de administración de productos (vendedor).

**Características**:
- Listado de productos propios
- Botón "Nuevo Producto"
- Formulario modal para crear/editar:
  - Nombre
  - Descripción
  - Precio
  - Stock
  - URL de imagen (con ayuda)
- Botones por producto:
  - Editar (pre-llena formulario)
  - Eliminar (confirmación)
- Vista vacía si no hay productos

---

#### `/frontend/src/pages/Login.jsx`
**Propósito**: Inicio de sesión.

**Características**:
- Formulario: email, password
- Validación de campos
- Llama a `login()` del AuthContext
- Redirección según rol:
  - Buyer → /
  - Seller → /seller/products
- Link a registro

---

#### `/frontend/src/pages/Register.jsx`
**Propósito**: Registro de nuevos usuarios.

**Características**:
- Formulario:
  - Nombre
  - Email
  - Contraseña
  - Confirmar contraseña
  - Selector de rol (Comprador/Vendedor)
- Validaciones:
  - Contraseñas coinciden
  - Email válido
- Llama a `register()` del AuthContext
- Redirección a /login

---

## 🔧 Archivos de Configuración

### `/backend/.env`
```bash
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
JWT_SECRET="super-secret-key-change-in-production"
PORT=5000
NODE_ENV=production
```

### `/frontend/.env`
```bash
VITE_API_URL=https://mini-marketplace-backend.onrender.com/api
```

### `/frontend/vite.config.js`
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
```

### `/frontend/tailwind.config.js`
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'amazon': {
          400: '#ff973c',
          500: '#ff7916',
          600: '#f05a0c',
        },
      },
    },
  },
  plugins: [],
}
```

### `/frontend/postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## 📦 Dependencias

### Backend (`/backend/package.json`)

**Producción**:
- `express`: ^4.18.2 - Framework web
- `@prisma/client`: ^5.8.0 - ORM client
- `bcryptjs`: ^2.4.3 - Hash de contraseñas
- `jsonwebtoken`: ^9.0.2 - Generación de JWT
- `cors`: ^2.8.5 - CORS middleware
- `dotenv`: ^16.3.1 - Variables de entorno

**Desarrollo**:
- `prisma`: ^5.8.0 - CLI de Prisma
- `nodemon`: ^3.0.2 - Auto-reload

**Scripts**:
```json
{
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "prisma:generate": "prisma generate",
  "prisma:push": "prisma db push"
}
```

---

### Frontend (`/frontend/package.json`)

**Producción**:
- `react`: ^19.0.0 - Librería UI
- `react-dom`: ^19.0.0 - Renderizado
- `react-router-dom`: ^7.0.0 - Routing
- `axios`: ^1.6.5 - Cliente HTTP

**Desarrollo**:
- `@vitejs/plugin-react`: ^4.2.1 - Plugin Vite
- `vite`: ^5.0.11 - Build tool
- `tailwindcss`: ^3.4.0 - CSS framework
- `autoprefixer`: ^10.4.16 - PostCSS plugin
- `postcss`: ^8.4.33 - Transformador CSS

**Scripts**:
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 🔄 Flujo de Datos

### Autenticación
```
1. Usuario → Register.jsx → authAPI.register()
2. Backend → auth.controller.js → bcrypt.hash()
3. Backend → Prisma → DB (User created)
4. Backend → Response (user object)
5. Frontend → Login.jsx → authAPI.login()
6. Backend → jwt.sign() → token
7. Frontend → localStorage.setItem('token')
8. Frontend → AuthContext actualizado
9. Frontend → Redirect según rol
```

### Flujo de Compra
```
1. Buyer → Home.jsx → ProductDetail.jsx
2. Click "Agregar al carrito" → CartContext.addToCart()
3. Frontend → cartAPI.add({ productId, quantity })
4. Backend → cart.controller.js → Prisma
5. Backend → Verify stock → Create/Update CartItem
6. Frontend → Cart.jsx (actualizado)
7. Buyer → Checkout.jsx → Fill form
8. Click "Realizar pedido" → orderAPI.create()
9. Backend → order.controller.js → $transaction:
   - Verify stock for all items
   - Create Order
   - Decrement stock
   - Clear cart
10. Frontend → Success message → Redirect
```

---

## 🎨 Diseño Visual

### Paleta de Colores

**Primary (Amazon Orange)**:
- amazon-400: #ff973c - Botones principales
- amazon-500: #ff7916 - Hover
- amazon-600: #f05a0c - Activo

**Grays**:
- slate-900: #0f172a - Navbar
- slate-800: #1e293b - Top bar
- gray-50: #f9fafb - Backgrounds
- gray-200: #e5e7eb - Borders

**Semantic**:
- green-700: Stock disponible
- red-700: Sin stock
- orange-700: Stock bajo

### Tipografía
- Font: System fonts (sans-serif)
- Títulos: font-bold, text-2xl/3xl
- Body: font-normal, text-base
- Small: text-sm, text-xs

### Spacing
- Padding contenedores: px-4, py-6
- Gap grids: gap-4, gap-6
- Margin bottom: mb-2, mb-4, mb-8

---

## 🚀 Comandos Útiles

### Desarrollo Local

**Backend**:
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev        # Puerto 5000
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev        # Puerto 5173
```

### Build de Producción

**Backend**:
```bash
npm install
npx prisma generate
npx prisma db push
npm start
```

**Frontend**:
```bash
npm install
npm run build      # Genera /dist
npm run preview    # Preview del build
```

### Prisma

```bash
npx prisma studio           # GUI de la DB
npx prisma db push          # Sync schema → DB
npx prisma generate         # Genera cliente
npx prisma migrate dev      # Crear migración
```

---

## 📊 Métricas del Código

### Backend
- **Archivos**: 13 archivos .js
- **Líneas de código**: ~800 LOC
- **Controllers**: 4
- **Routes**: 4
- **Middlewares**: 1
- **Endpoints**: 20

### Frontend
- **Archivos**: 16 archivos .jsx/.js
- **Líneas de código**: ~1,200 LOC
- **Componentes**: 3
- **Páginas**: 7
- **Contextos**: 2
- **Hooks usados**: 5 (useState, useEffect, useContext, useNavigate, useParams)

---

## 🔐 Seguridad

### Implementada
- ✅ Contraseñas hasheadas (bcrypt, 10 rounds)
- ✅ JWT con expiración (7 días)
- ✅ CORS configurado
- ✅ Middleware de autenticación
- ✅ Middleware de autorización por rol
- ✅ Validación de ownership (productos)
- ✅ Variables de entorno para secretos
- ✅ .gitignore para archivos sensibles

### Por Implementar
- ❌ Rate limiting
- ❌ Input sanitization (XSS protection)
- ❌ SQL injection protection (Prisma lo maneja parcialmente)
- ❌ HTTPS en desarrollo
- ❌ Refresh tokens
- ❌ Password strength validation
- ❌ Email verification

---

## 📝 Notas de Implementación

### Decisiones Técnicas

1. **Monorepo vs Repos Separados**:
   - Elegido: Monorepo
   - Razón: Simplicidad de versionado y deployment

2. **SQLite vs PostgreSQL**:
   - Dev: SQLite (sin instalación)
   - Prod: PostgreSQL (escalable)

3. **Context API vs Redux**:
   - Elegido: Context API
   - Razón: Suficiente para escala del proyecto

4. **TailwindCSS vs CSS-in-JS**:
   - Elegido: Tailwind
   - Razón: Productividad y tamaño de bundle

5. **JWT vs Sessions**:
   - Elegido: JWT
   - Razón: Stateless, escalable, cross-domain

---

## 🎯 Conclusión

Este proyecto demuestra una arquitectura full-stack bien estructurada con:
- Separación clara de responsabilidades
- Código modular y reutilizable
- Documentación completa
- Deployment funcional en producción

La estructura permite fácil escalabilidad y mantenimiento a futuro.

---

**Última actualización**: Abril 16, 2026
**Autor**: @siulluzr3-afk

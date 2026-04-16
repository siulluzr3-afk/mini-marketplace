# 📝 Informe Final: Aprendizajes y Dificultades

**Proyecto**: Mini Marketplace
**Autor**: @siulluzr3-afk
**Fecha**: Abril 2026
**Repositorio**: https://github.com/siulluzr3-afk/mini-marketplace

---

## 📚 Resumen Ejecutivo

El proyecto Mini Marketplace es una aplicación web completa de comercio electrónico desarrollada con un stack moderno (React + Node.js + PostgreSQL). El sistema implementa autenticación de usuarios, roles diferenciados (comprador/vendedor), gestión de productos, carrito de compras y proceso de checkout.

El proyecto se completó exitosamente y se encuentra desplegado en producción:
- **Frontend**: https://mini-marketplace-lspf.onrender.com
- **Backend**: https://mini-marketplace-backend.onrender.com
- **Base de Datos**: PostgreSQL en Neon (sa-east-1)

---

## 🎯 Objetivos Alcanzados

### ✅ Requisitos Funcionales Cumplidos

1. **Sistema de Autenticación**
   - ✅ Registro de usuarios con validación
   - ✅ Login con JWT (expiración de 7 días)
   - ✅ Contraseñas encriptadas con bcrypt (10 rounds)
   - ✅ Protección de rutas con middleware

2. **Gestión de Roles**
   - ✅ Rol BUYER (Comprador)
   - ✅ Rol SELLER (Vendedor)
   - ✅ Middleware `requireSeller` y `requireBuyer`
   - ✅ Vistas diferenciadas según rol

3. **Productos (Público)**
   - ✅ Listado completo sin autenticación requerida
   - ✅ Vista de detalle de producto
   - ✅ Información de stock en tiempo real

4. **CRUD de Productos (Vendedor)**
   - ✅ Crear productos con imagen, descripción, precio y stock
   - ✅ Editar productos propios
   - ✅ Eliminar productos propios
   - ✅ Ver solo mis productos en panel de vendedor

5. **Carrito de Compras**
   - ✅ Agregar productos al carrito
   - ✅ Modificar cantidades
   - ✅ Eliminar items individuales
   - ✅ Vaciar carrito completo
   - ✅ Persistencia en base de datos

6. **Proceso de Checkout**
   - ✅ Formulario de datos de envío
   - ✅ Validación de stock disponible
   - ✅ Creación de orden
   - ✅ Reducción automática de stock
   - ✅ Vaciado de carrito post-compra
   - ✅ Transacciones atómicas con Prisma

7. **Panel de Vendedor**
   - ✅ Vista de mis productos
   - ✅ Gestión completa de inventario
   - ✅ Formulario intuitivo para crear/editar

8. **Deployment**
   - ✅ Backend desplegado en Render
   - ✅ Frontend desplegado en Render
   - ✅ Base de datos PostgreSQL en Neon
   - ✅ Variables de entorno configuradas
   - ✅ CORS habilitado correctamente

---

## 🚀 Tecnologías Utilizadas y Aprendizajes

### Backend

#### Node.js + Express
**Aprendizaje clave**: Diseño de arquitectura RESTful con separación clara de responsabilidades (controllers, routes, middlewares).

**Estructura implementada**:
```
backend/src/
├── config/        # Configuración de Prisma
├── controllers/   # Lógica de negocio
├── middlewares/   # Autenticación y autorización
├── routes/        # Definición de endpoints
└── server.js      # Punto de entrada
```

**Lecciones**:
- Importancia de la modularización del código
- Uso de async/await para operaciones asíncronas
- Manejo centralizado de errores

#### Prisma ORM
**Aprendizaje clave**: Modelado de base de datos declarativo y migraciones automáticas.

**Modelos principales**:
- User (autenticación y roles)
- Product (catálogo)
- CartItem (carrito temporal)
- Order (histórico de compras)

**Lecciones**:
- Schema como fuente de verdad única
- Relaciones one-to-many y cascade deletes
- Diferencias entre SQLite (dev) y PostgreSQL (prod)
- Uso de `$transaction` para operaciones atómicas

#### JWT + bcrypt
**Aprendizaje clave**: Implementación segura de autenticación sin estado.

**Implementación**:
- Generación de tokens con `jsonwebtoken`
- Hash de contraseñas con bcrypt (10 rounds)
- Verificación de tokens en middleware
- Extracción de userId del token decodificado

**Lecciones**:
- Nunca almacenar contraseñas en texto plano
- Tokens JWT no requieren almacenamiento en servidor
- Importancia de validar expiración del token

### Frontend

#### React 19 + Vite
**Aprendizaje clave**: Componentes funcionales con hooks modernos.

**Hooks utilizados**:
- `useState`: Estado local de componentes
- `useEffect`: Carga de datos al montar
- `useContext`: Estado global (Auth, Cart)
- `useNavigate`: Navegación programática
- `useParams`: Extracción de parámetros de URL

**Lecciones**:
- Vite es significativamente más rápido que Create React App
- React 19 introduce mejoras en concurrent rendering
- Importancia de limpiar efectos secundarios

#### Context API
**Aprendizaje clave**: Gestión de estado global sin librerías externas.

**Contextos implementados**:
1. **AuthContext**:
   - Usuario actual
   - Token JWT
   - Funciones login/logout/register
   - Verificación de roles

2. **CartContext**:
   - Items del carrito
   - Total calculado
   - Funciones CRUD del carrito
   - Sincronización con backend

**Lecciones**:
- Context API es suficiente para aplicaciones medianas
- Evitar re-renders innecesarios con useMemo
- Separar contextos por dominio funcional

#### TailwindCSS
**Aprendizaje clave**: Diseño utility-first con configuración personalizada.

**Configuración custom**:
```javascript
colors: {
  'amazon': {
    400: '#ff973c',  // Botones principales
    500: '#ff7916',  // Hover
    600: '#f05a0c',  // Activo
  },
}
```

**Lecciones**:
- Productividad con utility classes
- Diseño responsive con prefijos (sm:, md:, lg:)
- Importancia de consistencia visual

#### React Router v7
**Aprendizaje clave**: Rutas protegidas y navegación dinámica.

**Rutas implementadas**:
- Públicas: `/`, `/product/:id`, `/login`, `/register`
- Protegidas (Buyer): `/cart`, `/checkout`, `/orders`
- Protegidas (Seller): `/seller/products`

**Lecciones**:
- Componente `ProtectedRoute` para autorización
- Navegación con `useNavigate` vs `<Link>`
- Parámetros dinámicos con `useParams`

---

## 🛠️ Dificultades Encontradas y Soluciones

### 1. TailwindCSS v4 No Funcionaba

**Problema**: Al iniciar el proyecto, los estilos no se aplicaban en el frontend. La página de registro aparecía sin ningún estilo visual.

**Causa raíz**: TailwindCSS v4 usa un plugin PostCSS diferente (`@tailwindcss/postcss`) que tenía problemas de compatibilidad con Vite.

**Solución**:
1. Desinstalar TailwindCSS v4
2. Instalar TailwindCSS v3.4.0 (versión estable)
3. Actualizar `postcss.config.js`:
```javascript
export default {
  plugins: {
    tailwindcss: {},  // En lugar de '@tailwindcss/postcss'
    autoprefixer: {},
  },
}
```

**Aprendizaje**: Siempre usar versiones LTS o estables en proyectos de producción. Las versiones bleeding-edge pueden tener incompatibilidades.

---

### 2. URLs de Imágenes No Funcionaban

**Problema**: El vendedor intentaba usar URLs de páginas de productos (ej: `https://co.hm.com/0676207004-1360/p`) pero las imágenes no se mostraban.

**Causa raíz**: Confusión entre URLs de páginas web y URLs directas de imágenes.

**Solución**:
1. Agregar manejo de errores en todas las etiquetas `<img>`:
```jsx
<img
  src={product.imageUrl}
  alt={product.name}
  className="w-full h-full object-contain"
  onError={(e) => {
    e.target.onerror = null;
    e.target.style.display = 'none';
    e.target.parentElement.innerHTML = '<div class="text-8xl">📦</div>';
  }}
/>
```

2. Cambiar `object-cover` a `object-contain` para mejor visualización

3. Agregar texto de ayuda en el formulario:
```jsx
<p className="text-xs text-gray-500 mt-1">
  💡 Usa URLs directas de imágenes que terminen en .jpg, .png, .webp
  o servicios como: https://picsum.photos/400
</p>
```

**Aprendizaje**:
- Siempre validar y manejar errores de recursos externos
- Proporcionar feedback claro al usuario sobre formatos esperados
- Usar fallbacks visuales (emojis, placeholders)

---

### 3. Error de Sintaxis en Cart.jsx al Desplegar

**Problema**: El deployment del frontend en Render fallaba con error:
```
[builtin:vite-transform] Error: Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
src/pages/Cart.jsx:102:1
```

**Causa raíz**: Estructura de divs mal cerrada en el componente Cart. Faltaba un `</div>` de cierre.

**Código problemático**:
```jsx
{cartItems.map(item => (...))}
</div>  // ← Indentación incorrecta
<div className="bg-white border...">  // ← Div hermano mal posicionado
```

**Solución**:
```jsx
{cartItems.map(item => (...))}
          </div>  // ← Indentación correcta (10 espacios)
          <div className="bg-white border...">  // ← Nivel correcto
```

**Proceso de depuración**:
1. Leer logs de error de Render
2. Identificar archivo y línea exacta
3. Usar grep para analizar estructura de divs
4. Probar build localmente antes de push
5. Push a GitHub → Auto-deploy en Render

**Aprendizaje**:
- La indentación importa para legibilidad y debugging
- Probar builds de producción localmente: `npm run build`
- Los errores de JSX a veces son crípticos, usar herramientas de análisis
- Render cachea builds, a veces requiere múltiples deploys

---

### 4. Migración SQLite → PostgreSQL

**Problema**: El desarrollo se hizo con SQLite pero producción requiere PostgreSQL. Diferencias de sintaxis y tipos de datos.

**Diferencias encontradas**:
- SQLite no soporta enums nativos (usamos strings)
- PostgreSQL requiere conexión por red (string de conexión complejo)
- Diferencias en autoincrement vs SERIAL

**Solución**:
1. Mantener schema compatible con ambos:
```prisma
datasource db {
  provider = "postgresql"  // Cambiar según entorno
  url      = env("DATABASE_URL")
}

model User {
  role String @default("BUYER")  // String en lugar de enum
}
```

2. Usar variables de entorno para string de conexión:
```env
# Desarrollo
DATABASE_URL="file:./dev.db"

# Producción
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
```

3. Ejecutar migraciones en producción:
```bash
npx prisma generate
npx prisma db push
```

**Aprendizaje**:
- Prisma abstrae diferencias entre DBs, pero no todas
- Usar tipos de datos compatibles cross-database
- Probar con la DB de producción antes de deploy final

---

### 5. CORS en Producción

**Problema inicial**: Durante desarrollo, frontend (localhost:5173) no podía conectarse a backend (localhost:5000).

**Solución de desarrollo**:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

**Solución de producción**:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://mini-marketplace-lspf.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

**Aprendizaje**:
- CORS es un tema de seguridad importante
- Configurar según entorno (dev vs prod)
- Whitelisting de orígenes específicos

---

### 6. Gestión de Stock y Transacciones

**Problema**: ¿Qué pasa si dos usuarios compran el último producto al mismo tiempo?

**Solución**: Usar transacciones de Prisma para operaciones atómicas:

```javascript
await prisma.$transaction(async (tx) => {
  // 1. Verificar stock disponible
  const product = await tx.product.findUnique({
    where: { id: item.productId }
  });

  if (product.stock < item.quantity) {
    throw new Error(`Stock insuficiente para ${product.name}`);
  }

  // 2. Reducir stock
  await tx.product.update({
    where: { id: item.productId },
    data: { stock: { decrement: item.quantity } }
  });

  // 3. Crear orden
  await tx.order.create({
    data: { userId, total, status: 'COMPLETED' }
  });

  // 4. Vaciar carrito
  await tx.cartItem.deleteMany({
    where: { userId }
  });
});
```

**Aprendizaje**:
- Las transacciones garantizan consistencia de datos
- Rollback automático si alguna operación falla
- Importante para operaciones de comercio electrónico

---

## 💡 Aprendizajes Técnicos Clave

### 1. Arquitectura de Monorepo

**Organización**:
```
mini-marketplace/
├── backend/        # API Node.js
├── frontend/       # SPA React
├── README.md       # Documentación principal
├── DEPLOYMENT.md   # Guía de deployment
└── .gitignore      # Control de versiones
```

**Ventajas**:
- Todo el código en un solo repositorio
- Versionado sincronizado
- Deploy independiente de cada servicio

**Desventaja**:
- Dos `package.json` separados
- Dos procesos de build diferentes

---

### 2. JWT vs Sessions

**Por qué JWT**:
- ✅ Sin estado en el servidor (stateless)
- ✅ Escalable horizontalmente
- ✅ Funcionamiento cross-domain
- ✅ Información embebida en el token

**Implementación**:
```javascript
// Generar token
const token = jwt.sign(
  { userId: user.id, email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verificar token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.userId = decoded.userId;
req.userRole = decoded.role;
```

---

### 3. Diseño Responsive

**Enfoque Mobile-First con Tailwind**:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
  {/* Productos */}
</div>
```

**Breakpoints**:
- `sm`: 640px (móvil horizontal)
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `xl`: 1280px (desktop)

---

### 4. Manejo de Estado Asíncrono

**Patrón usado**:
```jsx
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function loadProducts() {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  }
  loadProducts();
}, []);
```

**Lecciones**:
- Siempre manejar estados de carga
- Try-catch para errores de red
- Cleanup en useEffect para prevenir memory leaks

---

### 5. Deployment en Render

**Configuración Backend**:
- Build Command: `npm install && npx prisma generate && npx prisma db push`
- Start Command: `npm start`
- Environment Variables: DATABASE_URL, JWT_SECRET, NODE_ENV, PORT

**Configuración Frontend**:
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Auto-deploy en cada push a main

**Lecciones**:
- Render tiene auto-deploy desde GitHub
- Variables de entorno deben estar en el dashboard
- Health checks automáticos cada 5 minutos

---

## 📊 Métricas del Proyecto

### Líneas de Código
- **Backend**: ~800 líneas (controllers + routes + middlewares)
- **Frontend**: ~1,200 líneas (components + pages + contexts)
- **Total**: ~2,000 líneas de código

### Archivos Principales
- Controllers: 4 (auth, product, cart, order)
- Routes: 4 (auth, product, cart, order)
- Middlewares: 1 (auth)
- Components: 3 (Navbar, ProtectedRoute, Footer)
- Pages: 7 (Home, Login, Register, Cart, Checkout, ProductDetail, SellerProducts)
- Contexts: 2 (AuthContext, CartContext)

### Tiempo de Desarrollo
- **Setup inicial**: ~2 horas
- **Backend**: ~4 horas
- **Frontend**: ~6 horas
- **Deployment**: ~2 horas
- **Testing y fixes**: ~2 horas
- **Total**: ~16 horas

---

## 🎓 Lecciones Aprendidas

### 1. Planificación es Clave
Crear un schema de base de datos detallado desde el inicio ahorró mucho tiempo. Las relaciones entre User, Product, CartItem y Order estaban claras desde el principio.

### 2. Separación de Responsabilidades
La arquitectura MVC (Model-View-Controller) en el backend facilitó el mantenimiento y la depuración del código.

### 3. Documentación Temprana
Escribir README y DEPLOYMENT.md durante el desarrollo (no al final) ayudó a mantener claridad sobre las decisiones técnicas.

### 4. Testing Manual Constante
Probar cada endpoint con curl y cada componente en el navegador inmediatamente después de crearlo previno errores acumulados.

### 5. Git Commits Descriptivos
Commits claros como "Fix: Corregir estructura de divs en Cart.jsx" facilitaron el rollback cuando fue necesario.

### 6. Environment Variables Desde el Inicio
Configurar `.env` y `.env.example` desde el principio evitó hardcodear valores y facilitó el deployment.

### 7. Error Handling en Todos los Niveles
- Backend: try-catch en controllers
- Frontend: error boundaries y onError en imágenes
- Network: axios interceptors

---

## 🚀 Posibles Mejoras Futuras

### Funcionalidades

1. **Sistema de Reviews**
   - Calificaciones de productos (1-5 estrellas)
   - Comentarios de compradores
   - Promedio de rating visible

2. **Historial de Órdenes Completo**
   - Vista detallada de cada orden
   - Items incluidos en cada compra
   - Estados: Pending, Processing, Shipped, Delivered

3. **Búsqueda y Filtros**
   - Barra de búsqueda por nombre
   - Filtros por rango de precio
   - Ordenar por precio/fecha/rating

4. **Dashboard de Vendedor Avanzado**
   - Estadísticas de ventas
   - Productos más vendidos
   - Gráficos de ingresos

5. **Notificaciones**
   - Email al registrarse
   - Confirmación de compra
   - Alertas de stock bajo (vendedor)

6. **Pasarela de Pago Real**
   - Integración con Stripe o PayPal
   - Múltiples métodos de pago
   - Webhooks para confirmación

### Mejoras Técnicas

1. **Testing**
   - Jest + React Testing Library (frontend)
   - Supertest (backend)
   - E2E con Playwright

2. **Optimización**
   - Paginación de productos
   - Lazy loading de imágenes
   - Cache de datos con React Query

3. **Seguridad**
   - Rate limiting en API
   - Validación de inputs más estricta
   - Sanitización de datos

4. **DevOps**
   - CI/CD con GitHub Actions
   - Tests automáticos en PRs
   - Deploy preview en Render

5. **Monitoreo**
   - Logs centralizados (Winston + Logtail)
   - APM (Application Performance Monitoring)
   - Error tracking con Sentry

---

## 🏆 Conclusión

El proyecto Mini Marketplace cumplió exitosamente con todos los requisitos establecidos:

✅ **8/8 Criterios técnicos cumplidos**
✅ **Desplegado en producción**
✅ **Código limpio y documentado**
✅ **Repositorio público en GitHub**

### Habilidades Desarrolladas

**Backend**:
- Diseño de APIs RESTful
- ORM con Prisma
- Autenticación JWT
- Manejo de transacciones

**Frontend**:
- React hooks avanzados
- Context API para estado global
- React Router para navegación
- TailwindCSS para diseño

**DevOps**:
- Deployment en Render
- PostgreSQL en Neon
- Variables de entorno
- Git workflow

### Valor del Proyecto

Este proyecto demuestra capacidad para:
- Desarrollar aplicaciones full-stack completas
- Implementar autenticación y autorización segura
- Desplegar aplicaciones en producción
- Documentar código y procesos
- Resolver problemas técnicos complejos

---

## 📚 Referencias y Recursos

### Documentación Oficial
- [React Docs](https://react.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [Express Docs](https://expressjs.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Tutoriales Útiles
- JWT Authentication in Node.js
- React Context API Best Practices
- Deploying to Render
- PostgreSQL with Prisma

### Herramientas
- VS Code con extensiones: Prisma, ESLint, Tailwind IntelliSense
- Postman para testing de API
- Git + GitHub para control de versiones
- Render para hosting
- Neon para PostgreSQL

---

**Autor**: @siulluzr3-afk
**Email**: siulluzr3@gmail.com
**Fecha de Finalización**: Abril 16, 2026
**GitHub**: https://github.com/siulluzr3-afk/mini-marketplace

---

¡Gracias por revisar este proyecto! 🚀

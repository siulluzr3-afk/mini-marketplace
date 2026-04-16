# 📸 Guía de Evidencias de Funcionamiento

Este documento describe las capturas de pantalla o grabaciones de video necesarias para demostrar el funcionamiento completo del Mini Marketplace.

## 🔗 URLs del Proyecto

- **Frontend en Producción**: https://mini-marketplace-lspf.onrender.com
- **Backend en Producción**: https://mini-marketplace-backend.onrender.com
- **Repositorio GitHub**: https://github.com/siulluzr3-afk/mini-marketplace
- **Base de Datos**: Neon PostgreSQL (sa-east-1)

## 📋 Checklist de Evidencias Requeridas

### 1. Registro y Autenticación

#### 1.1 Registro de Usuario Comprador
**Ruta**: https://mini-marketplace-lspf.onrender.com/register

**Capturar**:
- [ ] Formulario de registro completo mostrando:
  - Campos: Nombre, Email, Contraseña, Confirmar Contraseña
  - Selector de rol (Comprador/Vendedor)
  - Botón "Crear cuenta"
- [ ] Mensaje de éxito al registrar usuario
- [ ] Redirección automática al login

**Datos de prueba**:
```
Nombre: Juan Pérez
Email: juan.perez@test.com
Contraseña: 123456
Rol: Comprador
```

#### 1.2 Registro de Usuario Vendedor
**Ruta**: https://mini-marketplace-lspf.onrender.com/register

**Capturar**:
- [ ] Formulario con rol "Vendedor" seleccionado
- [ ] Registro exitoso

**Datos de prueba**:
```
Nombre: María Comerciante
Email: maria.vendedora@test.com
Contraseña: 123456
Rol: Vendedor
```

#### 1.3 Inicio de Sesión
**Ruta**: https://mini-marketplace-lspf.onrender.com/login

**Capturar**:
- [ ] Formulario de login
- [ ] Inicio de sesión exitoso
- [ ] Navegación mostrando el nombre del usuario logueado
- [ ] Diferentes vistas según el rol (Comprador vs Vendedor)

**Credenciales de prueba**:
```
Vendedor:
Email: vendedor@demo.com
Contraseña: 123456

Comprador:
Email: comprador@demo.com
Contraseña: 123456
```

---

### 2. Funcionalidades Públicas

#### 2.1 Página Principal (Sin Login)
**Ruta**: https://mini-marketplace-lspf.onrender.com/

**Capturar**:
- [ ] Listado completo de productos
- [ ] Tarjetas de productos mostrando:
  - Imagen del producto
  - Nombre
  - Precio
  - Estado de stock
- [ ] Navegación superior
- [ ] Diseño responsive (opcional: captura en móvil)

#### 2.2 Detalle de Producto (Sin Login)
**Ruta**: https://mini-marketplace-lspf.onrender.com/product/:id

**Capturar**:
- [ ] Vista completa del detalle del producto
- [ ] Imagen grande del producto
- [ ] Información detallada:
  - Nombre del producto
  - Descripción completa
  - Precio
  - Stock disponible
  - Vendedor
- [ ] Mensaje indicando que debe iniciar sesión para comprar

---

### 3. Panel de Vendedor

#### 3.1 Acceso al Panel
**Ruta**: https://mini-marketplace-lspf.onrender.com/seller/products

**Capturar**:
- [ ] Iniciar sesión como vendedor
- [ ] Vista del panel "Mis Productos"
- [ ] Listado de productos del vendedor
- [ ] Botón "Nuevo Producto"

#### 3.2 Crear Producto
**Capturar**:
- [ ] Formulario de creación de producto mostrando:
  - Nombre del producto
  - Descripción
  - Precio
  - Stock
  - URL de imagen (con texto de ayuda)
- [ ] Completar formulario con datos de ejemplo
- [ ] Botón "Guardar"
- [ ] Mensaje de confirmación "Producto creado"
- [ ] Nuevo producto en la lista

**Datos de ejemplo**:
```
Nombre: Teclado Mecánico RGB
Descripción: Teclado mecánico gaming con retroiluminación RGB personalizable
Precio: 79.99
Stock: 25
URL Imagen: https://m.media-amazon.com/images/I/71m42mGkk3L._AC_SX679_.jpg
```

#### 3.3 Editar Producto
**Capturar**:
- [ ] Click en botón "Editar" de un producto
- [ ] Formulario pre-llenado con datos actuales
- [ ] Modificación de campos (ej: cambiar precio)
- [ ] Guardar cambios
- [ ] Mensaje "Producto actualizado"
- [ ] Cambios reflejados en la lista

#### 3.4 Eliminar Producto
**Capturar**:
- [ ] Click en botón "Eliminar"
- [ ] Diálogo de confirmación
- [ ] Producto eliminado de la lista
- [ ] Mensaje "Producto eliminado"

---

### 4. Funcionalidades de Comprador

#### 4.1 Agregar al Carrito desde Home
**Ruta**: https://mini-marketplace-lspf.onrender.com/

**Capturar**:
- [ ] Iniciar sesión como comprador
- [ ] Click en un producto
- [ ] Vista de detalle con selector de cantidad
- [ ] Seleccionar cantidad (ej: 2 unidades)
- [ ] Click en "Agregar al carrito"
- [ ] Mensaje de confirmación
- [ ] Redirección al carrito

#### 4.2 Vista del Carrito
**Ruta**: https://mini-marketplace-lspf.onrender.com/cart

**Capturar**:
- [ ] Carrito con productos agregados
- [ ] Para cada producto mostrar:
  - Imagen
  - Nombre
  - Descripción
  - Precio unitario
  - Selector de cantidad
  - Botón "Eliminar"
- [ ] Resumen del pedido:
  - Subtotal
  - Cantidad total de artículos
- [ ] Botones:
  - "Proceder al pago"
  - "Vaciar carrito"

#### 4.3 Modificar Cantidad en Carrito
**Capturar**:
- [ ] Cambiar cantidad de un producto usando el selector
- [ ] Actualización automática del subtotal
- [ ] Cambios guardados

#### 4.4 Eliminar Item del Carrito
**Capturar**:
- [ ] Click en "Eliminar" de un producto
- [ ] Producto removido del carrito
- [ ] Actualización del subtotal

#### 4.5 Vaciar Carrito Completo
**Capturar**:
- [ ] Click en "Vaciar carrito"
- [ ] Carrito vacío
- [ ] Mensaje "Tu carrito está vacío"
- [ ] Botón "Ver productos"

#### 4.6 Proceso de Checkout
**Ruta**: https://mini-marketplace-lspf.onrender.com/checkout

**Capturar**:
- [ ] Agregar productos al carrito
- [ ] Click en "Proceder al pago"
- [ ] Vista de checkout mostrando:
  - Resumen de productos
  - Total a pagar
  - Formulario de datos de envío
- [ ] Completar formulario
- [ ] Click en "Realizar pedido"
- [ ] Mensaje de confirmación de compra
- [ ] Redirección a página de confirmación
- [ ] Verificar que el stock se redujo

**Datos de envío de ejemplo**:
```
Nombre: Juan Pérez
Dirección: Calle 123 #45-67
Ciudad: Bogotá
Teléfono: 3001234567
```

---

### 5. Validación de Roles y Seguridad

#### 5.1 Protección de Rutas de Vendedor
**Capturar**:
- [ ] Iniciar sesión como comprador
- [ ] Intentar acceder a: https://mini-marketplace-lspf.onrender.com/seller/products
- [ ] Verificar redirección o mensaje de error

#### 5.2 Productos Propios vs Ajenos (Vendedor)
**Capturar**:
- [ ] Panel de vendedor mostrando solo sus productos
- [ ] Verificar que no puede editar/eliminar productos de otros vendedores

---

### 6. Responsive Design

#### 6.1 Vista Móvil
**Capturar** (usando DevTools o dispositivo móvil real):
- [ ] Home en vista móvil (320px - 768px)
- [ ] Detalle de producto en móvil
- [ ] Carrito en móvil
- [ ] Navegación en móvil (menú hamburguesa si aplica)

#### 6.2 Vista Tablet
**Capturar** (768px - 1024px):
- [ ] Home con grid adaptado
- [ ] Navegación en tablet

---

### 7. API Backend

#### 7.1 Health Check
**Comando**:
```bash
curl https://mini-marketplace-backend.onrender.com/
```

**Capturar**:
- [ ] Respuesta JSON:
```json
{
  "message": "🛒 API del Mini Marketplace funcionando",
  "version": "1.0.0"
}
```

#### 7.2 Listado de Productos (API)
**Comando**:
```bash
curl https://mini-marketplace-backend.onrender.com/api/products
```

**Capturar**:
- [ ] Array de productos en formato JSON
- [ ] Estructura correcta con todos los campos

#### 7.3 Login API
**Comando**:
```bash
curl -X POST https://mini-marketplace-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"vendedor@demo.com","password":"123456"}'
```

**Capturar**:
- [ ] Respuesta con token JWT
- [ ] Información del usuario
- [ ] Mensaje de éxito

---

### 8. Base de Datos

#### 8.1 Conexión a Neon
**Capturar** (desde Neon Dashboard):
- [ ] Dashboard de Neon mostrando:
  - Nombre de la base de datos: neondb
  - Región: sa-east-1
  - Estado: Active
- [ ] Estadísticas de uso (opcional)

#### 8.2 Estructura de Tablas
**Capturar** (desde Neon SQL Editor o query):
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
```

**Verificar tablas**:
- [ ] User
- [ ] Product
- [ ] CartItem
- [ ] Order
- [ ] _prisma_migrations

---

### 9. Repositorio GitHub

#### 9.1 Vista del Repositorio
**URL**: https://github.com/siulluzr3-afk/mini-marketplace

**Capturar**:
- [ ] README.md visible en la página principal
- [ ] Estructura de carpetas (backend/ y frontend/)
- [ ] Commits recientes
- [ ] Archivos principales:
  - .gitignore
  - README.md
  - DEPLOYMENT.md
  - EVIDENCIAS.md (este archivo)

#### 9.2 Commits
**Capturar**:
- [ ] Historial de commits mostrando:
  - Commits iniciales de setup
  - Commits de features
  - Commits de fixes
  - Commits de deployment

---

### 10. Deployment en Render

#### 10.1 Backend Deployment
**Capturar** (desde Render Dashboard):
- [ ] Web Service "mini-marketplace-backend"
- [ ] Estado: Live (verde)
- [ ] Build logs exitosos
- [ ] Environment variables configuradas
- [ ] URL de producción

#### 10.2 Frontend Deployment
**Capturar** (desde Render Dashboard):
- [ ] Static Site "mini-marketplace-frontend"
- [ ] Estado: Live (verde)
- [ ] Build logs exitosos
- [ ] URL de producción

---

## 📹 Sugerencia de Video Demostrativo

Si prefieres crear un video en lugar de capturas individuales, grabar una demostración de 5-10 minutos que cubra:

1. **Intro (30s)**: Mostrar URLs de producción y repositorio
2. **Registro y Login (1min)**: Crear cuenta de vendedor y comprador
3. **Panel de Vendedor (2min)**: Crear, editar y eliminar producto
4. **Flujo de Compra (3min)**: Navegar productos, agregar al carrito, modificar cantidades, checkout
5. **Validaciones (1min)**: Mostrar protección de rutas, control de stock
6. **Responsive (1min)**: Demostrar diseño en diferentes tamaños
7. **API Backend (1min)**: Realizar llamadas curl y mostrar respuestas
8. **Cierre (30s)**: Mostrar GitHub y documentación

---

## ✅ Checklist Final

Antes de entregar, asegúrate de tener:

- [ ] Al menos 15 capturas de pantalla de alta calidad (1920x1080 recomendado)
- [ ] O un video de 5-10 minutos mostrando todas las funcionalidades
- [ ] Capturas etiquetadas con nombres descriptivos:
  - `01-home-page.png`
  - `02-register-buyer.png`
  - `03-login.png`
  - `04-seller-panel.png`
  - etc.
- [ ] Evidencia de funcionamiento en producción (URLs reales)
- [ ] Evidencia de API funcionando (respuestas curl)
- [ ] Evidencia de base de datos activa en Neon
- [ ] Evidencia de deployment exitoso en Render

---

## 📊 Formato de Entrega Sugerido

Crear una carpeta `evidencias/` en el repositorio con:

```
evidencias/
├── capturas/
│   ├── 01-home-publico.png
│   ├── 02-producto-detalle.png
│   ├── 03-registro-comprador.png
│   ├── 04-login.png
│   ├── 05-seller-panel.png
│   ├── 06-crear-producto.png
│   ├── 07-editar-producto.png
│   ├── 08-carrito.png
│   ├── 09-checkout.png
│   ├── 10-api-health.png
│   ├── 11-neon-dashboard.png
│   ├── 12-render-backend.png
│   └── 13-render-frontend.png
├── video-demo.mp4 (opcional)
└── EVIDENCIAS.md (este archivo)
```

---

**Nota**: Este archivo proporciona una guía completa para generar las evidencias. Puedes usar herramientas como:
- **Windows**: Snipping Tool, Win + Shift + S
- **Mac**: Command + Shift + 4
- **Grabación**: OBS Studio, Loom, ShareX
- **Editores**: Paint, Preview, GIMP, Photoshop

¡Buena suerte con la documentación de tu proyecto! 🚀

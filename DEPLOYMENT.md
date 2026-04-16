# 🚀 Guía de Deployment - Mini Marketplace

## 📋 Índice
1. [Pre-requisitos](#pre-requisitos)
2. [Configuración de la Base de Datos (Neon)](#1-configuración-de-la-base-de-datos-neon)
3. [Deploy del Backend (Render)](#2-deploy-del-backend-render)
4. [Deploy del Frontend (Render)](#3-deploy-del-frontend-render)
5. [Verificación](#4-verificación)

---

## Pre-requisitos

- Cuenta en [Neon](https://neon.tech) (base de datos PostgreSQL gratuita)
- Cuenta en [Render](https://render.com) (hosting gratuito)
- Cuenta en [GitHub](https://github.com) (para conectar el código)

---

## 1. Configuración de la Base de Datos (Neon)

### Paso 1: Crear proyecto en Neon

1. Ve a [neon.tech](https://neon.tech) y crea una cuenta
2. Haz clic en "Create Project"
3. Elige:
   - **Project name**: mini-marketplace
   - **Region**: Selecciona la más cercana
   - **PostgreSQL version**: Última disponible
4. Haz clic en "Create Project"

### Paso 2: Obtener la connection string

1. En tu proyecto de Neon, ve a "Connection Details"
2. Copia la **Connection string** (algo como: `postgresql://user:pass@host.neon.tech/neondb`)
3. Guárdala para usarla después

### Paso 3: Preparar el schema

El proyecto ya incluye el schema de Prisma configurado. Solo necesitarás actualizar el `DATABASE_URL` en producción.

---

## 2. Deploy del Backend (Render)

### Paso 1: Subir código a GitHub

```bash
cd C:\Users\siull\Documents\mini-marketplace
git add .
git commit -m "Preparar para deployment"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mini-marketplace.git
git push -u origin main
```

### Paso 2: Crear Web Service en Render

1. Ve a [render.com](https://render.com) y crea una cuenta
2. Haz clic en "New +" → "Web Service"
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Name**: `mini-marketplace-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npx prisma generate && npx prisma db push`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### Paso 3: Configurar Variables de Entorno

En la sección "Environment Variables" de Render, agrega:

```
DATABASE_URL = [TU CONNECTION STRING DE NEON]
JWT_SECRET = [GENERA UNO ALEATORIO, ej: openssl rand -base64 32]
NODE_ENV = production
PORT = 5000
```

### Paso 4: Deploy

1. Haz clic en "Create Web Service"
2. Espera a que se complete el deploy (5-10 minutos)
3. Copia la URL del backend (ej: `https://mini-marketplace-backend.onrender.com`)

---

## 3. Deploy del Frontend (Render)

### Paso 1: Configurar variable de entorno local

Crea el archivo `frontend/.env`:

```bash
VITE_API_URL=https://mini-marketplace-backend.onrender.com/api
```

### Paso 2: Actualizar y subir a GitHub

```bash
cd C:\Users\siull\Documents\mini-marketplace
git add .
git commit -m "Configurar API URL para producción"
git push
```

### Paso 3: Crear Static Site en Render

1. En Render, haz clic en "New +" → "Static Site"
2. Conecta el mismo repositorio
3. Configuración:
   - **Name**: `mini-marketplace-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

### Paso 4: Configurar Variable de Entorno

En "Environment Variables":

```
VITE_API_URL = https://mini-marketplace-backend.onrender.com/api
```

### Paso 5: Deploy

1. Haz clic en "Create Static Site"
2. Espera a que se complete (5-10 minutos)
3. Copia la URL del frontend (ej: `https://mini-marketplace-frontend.onrender.com`)

---

## 4. Verificación

### Verificar Backend

Abre en tu navegador:
```
https://mini-marketplace-backend.onrender.com
```

Deberías ver:
```json
{
  "message": "🛒 API del Mini Marketplace funcionando",
  "version": "1.0.0"
}
```

### Verificar Frontend

1. Abre tu URL del frontend
2. Prueba:
   - Registro de usuario
   - Login
   - Ver productos
   - Agregar al carrito (como comprador)
   - Crear productos (como vendedor)

---

## 🔧 Solución de Problemas

### El backend no se conecta a Neon

- Verifica que la `DATABASE_URL` sea correcta
- Asegúrate de que incluya `?sslmode=require` al final
- Verifica que Prisma haya ejecutado las migraciones

### El frontend no se conecta al backend

- Verifica que `VITE_API_URL` apunte a la URL correcta del backend
- Asegúrate de incluir `/api` al final
- Revisa los logs en Render Dashboard

### Error de CORS

Si ves errores de CORS, verifica que el backend tenga configurado:
```javascript
app.use(cors()); // En backend/src/server.js
```

---

## 📚 Recursos Adicionales

- [Documentación de Neon](https://neon.tech/docs)
- [Documentación de Render](https://render.com/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)

---

## 🎉 ¡Listo!

Tu Mini Marketplace ahora está desplegado y accesible en internet.

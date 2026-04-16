# 🚀 Guía de Deploy - Mini Marketplace

## 📋 Requisitos Previos

Necesitas crear cuentas gratuitas en:
1. ✅ GitHub - https://github.com/signup
2. ✅ Neon - https://neon.tech
3. ✅ Render - https://render.com

---

## PASO 1: Subir el Código a GitHub

### 1.1 Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repositorio: `mini-marketplace`
3. Descripción: "Marketplace con React, Node.js, Express y Prisma"
4. Selecciona: **Público** o **Privado** (ambos funcionan)
5. **NO** inicialices con README (ya tenemos uno)
6. Clic en "Create repository"

### 1.2 Conectar tu proyecto local con GitHub

Copia estos comandos (reemplaza `TU_USUARIO` con tu usuario de GitHub):

```bash
cd C:/Users/siull/Documents/mini-marketplace

# Agregar el repositorio remoto
git remote add origin https://github.com/TU_USUARIO/mini-marketplace.git

# Subir el código
git branch -M main
git push -u origin main
```

**Importante:** GitHub te pedirá autenticación. Usa un Personal Access Token:
- Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token
- Selecciona: `repo` (full control)
- Copia el token y úsalo como contraseña

---

## PASO 2: Crear Base de Datos en Neon

### 2.1 Crear proyecto en Neon
1. Ve a https://neon.tech y crea una cuenta
2. Clic en "Create a project"
3. Nombre: `mini-marketplace-db`
4. Región: Elige la más cercana a ti
5. PostgreSQL version: 16 (recomendado)
6. Clic en "Create project"

### 2.2 Obtener la URL de conexión
1. En el dashboard de tu proyecto, busca "Connection string"
2. Copia la URL completa (se ve así):
   ```
   postgresql://usuario:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
3. **Guarda esta URL** - la necesitarás en Render

---

## PASO 3: Actualizar Schema de Prisma para PostgreSQL

Necesitamos cambiar de SQLite a PostgreSQL:

### 3.1 Editar backend/prisma/schema.prisma

Cambia esta línea:
```prisma
provider = "sqlite"
```

Por:
```prisma
provider = "postgresql"
```

### 3.2 Hacer commit de los cambios

```bash
cd C:/Users/siull/Documents/mini-marketplace

git add backend/prisma/schema.prisma
git commit -m "chore: Cambiar a PostgreSQL para producción"
git push
```

---

## PASO 4: Desplegar Backend en Render

### 4.1 Crear Web Service
1. Ve a https://dashboard.render.com
2. Clic en "New +" → "Web Service"
3. Conecta tu cuenta de GitHub
4. Busca y selecciona tu repositorio `mini-marketplace`
5. Clic en "Connect"

### 4.2 Configurar el servicio

**Configuración básica:**
- **Name**: `mini-marketplace-backend`
- **Region**: Elige la más cercana
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**:
  ```
  npm install && npx prisma generate && npx prisma db push
  ```
- **Start Command**:
  ```
  npm start
  ```
- **Instance Type**: `Free`

### 4.3 Variables de Entorno

Clic en "Advanced" → "Add Environment Variable":

| KEY | VALUE |
|-----|-------|
| `DATABASE_URL` | *Pega aquí la URL de Neon* |
| `JWT_SECRET` | `tu-secreto-super-seguro-para-produccion-123` |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |

### 4.4 Desplegar
1. Clic en "Create Web Service"
2. Espera 5-10 minutos mientras se despliega
3. **Copia la URL** del backend (ej: `https://mini-marketplace-backend.onrender.com`)

---

## PASO 5: Desplegar Frontend en Render

### 5.1 Crear Static Site
1. En Render, clic en "New +" → "Static Site"
2. Selecciona tu repositorio `mini-marketplace`
3. Clic en "Connect"

### 5.2 Configurar el sitio

**Configuración básica:**
- **Name**: `mini-marketplace-frontend`
- **Branch**: `main`
- **Root Directory**: `frontend`
- **Build Command**:
  ```
  npm install && npm run build
  ```
- **Publish Directory**: `dist`

### 5.3 Variables de Entorno

Clic en "Advanced" → "Add Environment Variable":

| KEY | VALUE |
|-----|-------|
| `VITE_API_URL` | `https://mini-marketplace-backend.onrender.com/api` |

**⚠️ IMPORTANTE:** Reemplaza `mini-marketplace-backend` con el nombre real de tu backend en Render.

### 5.4 Desplegar
1. Clic en "Create Static Site"
2. Espera 3-5 minutos
3. **Tu app estará en línea** en la URL que te muestra Render

---

## ✅ Verificar el Deploy

### Backend
Visita: `https://tu-backend.onrender.com`

Deberías ver:
```json
{
  "message": "🛒 API del Mini Marketplace funcionando",
  "version": "1.0.0"
}
```

### Frontend
Visita: `https://tu-frontend.onrender.com`

Deberías ver la página de inicio del marketplace.

### Probar funcionalidad completa
1. Registra un usuario vendedor
2. Crea algunos productos
3. Registra un usuario comprador
4. Agrega productos al carrito
5. Realiza una compra

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot connect to database"
- Verifica que la `DATABASE_URL` en Render sea correcta
- Asegúrate de que termine con `?sslmode=require`
- Verifica que el proyecto en Neon esté activo

### Error: "CORS blocked"
- Verifica que `VITE_API_URL` en el frontend apunte a la URL correcta del backend
- Debe incluir `/api` al final

### Frontend muestra página en blanco
- Revisa los logs en Render
- Verifica que el Build Command sea correcto
- Asegúrate de que `VITE_API_URL` esté configurado

### Backend no responde
- Render Free Tier "duerme" después de 15 min sin uso
- La primera petición puede tardar 30-60 segundos en "despertar"
- Esto es normal en el plan gratuito

---

## 🎯 Limitaciones del Plan Gratuito

### Neon (Database)
- ✅ 0.5 GB de almacenamiento
- ✅ Suficiente para cientos de productos y usuarios

### Render
- ✅ 750 horas/mes (suficiente para 1 servicio 24/7)
- ⚠️ El servicio "duerme" tras 15 min de inactividad
- ⚠️ Primera petición puede tardar 30-60s en despertar
- ✅ Tráfico ilimitado
- ✅ SSL/HTTPS automático

---

## 🔄 Actualizar la Aplicación

Cuando hagas cambios en el código:

```bash
cd C:/Users/siull/Documents/mini-marketplace

# Hacer cambios en tu código...

git add .
git commit -m "descripción de los cambios"
git push
```

**Render automáticamente detectará los cambios y redesplegará** 🚀

---

## 🎉 ¡Listo!

Tu Mini Marketplace está en internet y accesible desde cualquier parte del mundo.

**URLs finales:**
- Frontend: `https://tu-frontend.onrender.com`
- Backend: `https://tu-backend.onrender.com`
- Base de Datos: Neon (PostgreSQL)

---

## 📞 Próximos Pasos

1. ✅ Comparte la URL con amigos/profesores
2. ✅ Agrega productos de prueba desde la cuenta de vendedor
3. ✅ Toma capturas de pantalla para tu portafolio
4. ✅ Documenta el proceso en tu informe

**¡Felicidades por completar el deploy!** 🎊

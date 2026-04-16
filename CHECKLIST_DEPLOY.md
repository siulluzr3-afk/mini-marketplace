# ✅ Checklist de Deploy

Usa esta lista para verificar que completaste todos los pasos:

## 📦 Preparación

- [ ] Probé la aplicación en local y funciona correctamente
- [ ] Tengo cuenta en GitHub
- [ ] Tengo cuenta en Neon (base de datos)
- [ ] Tengo cuenta en Render (hosting)

## 🔧 GitHub

- [ ] Creé el repositorio en GitHub
- [ ] Configuré Git con mi usuario
- [ ] Subí el código con `git push`
- [ ] Puedo ver mi código en GitHub

## 💾 Base de Datos (Neon)

- [ ] Creé el proyecto en Neon
- [ ] Copié la `DATABASE_URL` de conexión
- [ ] La URL tiene el formato: `postgresql://...?sslmode=require`

## 🔄 Actualizar Código

- [ ] Cambié el schema de Prisma de `sqlite` a `postgresql`
- [ ] Hice commit de los cambios
- [ ] Subí los cambios a GitHub con `git push`

## 🖥️ Backend en Render

- [ ] Creé el Web Service en Render
- [ ] Configuré Root Directory: `backend`
- [ ] Configuré Build Command correctamente
- [ ] Agregué variable `DATABASE_URL` (desde Neon)
- [ ] Agregué variable `JWT_SECRET`
- [ ] El deploy se completó sin errores
- [ ] Visité la URL del backend y veo el mensaje de API funcionando

## 🎨 Frontend en Render

- [ ] Creé el Static Site en Render
- [ ] Configuré Root Directory: `frontend`
- [ ] Configuré Build Command correctamente
- [ ] Agregué variable `VITE_API_URL` (URL del backend + `/api`)
- [ ] El deploy se completó sin errores
- [ ] Visité la URL del frontend y veo la página de inicio

## 🧪 Pruebas Finales

- [ ] Puedo registrarme como vendedor
- [ ] Puedo crear productos
- [ ] Puedo registrarme como comprador
- [ ] Puedo ver productos
- [ ] Puedo agregar al carrito
- [ ] Puedo hacer checkout
- [ ] Puedo ver mis órdenes

## 📸 Documentación

- [ ] Tomé capturas de pantalla de la aplicación funcionando
- [ ] Documenté las URLs de mi proyecto
- [ ] Guardé mis credenciales de forma segura

---

## 📝 Mis URLs del Proyecto

**Frontend:** _______________________________________

**Backend:** _______________________________________

**GitHub:** _______________________________________

---

**Fecha de deploy:** ____ / ____ / ____

**Estado:** ✅ ¡Completado!

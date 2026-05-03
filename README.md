# practica-backend-nodepop

# Nodepop 🛒

Aplicación web de compra y venta de productos de segunda mano.

Proyecto desarrollado con Node.js, Express, MongoDB y EJS (SSR).

---

## 🚀 Instalación

Clonar el repositorio y ejecutar:
npm install

---

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del proyecto basado en `.env.example`.

Ejemplo:

MONGODB_URI=tu_uri_de_mongodb

⚠️ No subir nunca el `.env` a GitHub.

---

## 🗄️ Inicializar base de datos

Para cargar datos iniciales (usuarios y productos):

npm run seed:database

---

## ▶️ Arrancar la aplicación

npm run dev

La aplicación estará disponible en:

http://localhost:3000

---

## 🔐 Autenticación

Usuarios disponibles tras seed:

- silvia@mail.com / 1234
- mario@mail.com / 1234
- olivia@mail.com / 1234

---

## 🧠 Funcionalidades

- Login y logout de usuarios
- CRUD completo de productos
- Relación usuario-producto (owner)
- Cada usuario solo puede ver sus productos
- Cada usuario solo puede editar o borrar sus productos
- Filtros por:
  - Nombre (empieza por)
  - Tag
  - Precio (mínimo y máximo)
- Paginación (skip / limit)
- Ordenación (`sort=name`)
- Mostrar propietario del producto (populate)

---

## 🧩 Tecnologías usadas

- Node.js
- Express
- MongoDB + Mongoose
- EJS (Server Side Rendering)

---

## 📌 Notas

- Se utiliza `express-session` para gestionar sesiones
- Se usan middlewares para proteger rutas (`requireLogin`)
- Se usa `populate` para mostrar datos del propietario

---

## 👨‍💻 Autor

Nerea L

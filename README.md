# practica-backend-nodepop

# Nodepop 

Aplicación web de compra y venta de productos de segunda mano.

Proyecto desarrollado con Node.js, Express, MongoDB y EJS (SSR).

---

##  Instalación

Clonar el repositorio y ejecutar:
npm install

---

##  Configuración

Crear un archivo `.env` en la raíz del proyecto basado en `.env.example`.

Ejemplo:

MONGODB_URI=tu_uri_de_mongodb



---

##  Inicializar base de datos

Para cargar datos iniciales (usuarios y productos):

npm run seed:database

---

##  Arrancar la aplicación

npm run dev

La aplicación estará disponible en:

http://localhost:3000

---

##  Autenticación

Usuarios disponibles tras seed:

- silvia@mail.com / 1234
- mario@mail.com / 1234
- olivia@mail.com / 1234

---

##  Funcionalidades

- Login y logout de usuarios
- CRUD completo de productos
- Cada usuario solo puede ver sus productos
- Cada usuario solo puede editar o borrar sus productos
- Filtros por:
  - Nombre (empieza por)
  - Tag
  - Precio (mínimo y máximo)
- Paginación
- Ordenación
- Mostrar propietario del producto 

---

##  Tecnologías usadas

- Node.js
- Express
- MongoDB + Mongoose
- EJS (Server Side Rendering)

---

## Despliegue

La aplicación está desplegada en AWS y disponible en:

https://nodepopkc20.duckdns.org

Para el segundo ejercicio, la aplicación React está disponible mediante la IP pública del servidor:

http://54.83.243.187

https://github.com/Nerealofe/practica-fundamentos-react

usuario disponible prueba: maria@gmail.com / 123456

En la carpeta deploy de este repositorio estan los ficheros de configuracion.





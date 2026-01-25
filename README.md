# Proyecto final ADL G91 - Backend

Vivero JRB

## 👥 Integrantes

- [Bárbara Larraín](https://github.com/blarrain)
- [Rosa Ramírez](https://github.com/rramirezroco)
- [Jorge Villegas](https://github.com/jvillegas36)

## Endpoints de la API

http://localhost:5000/

### Usuarios

| <!-- --> | <!-- --> | <!-- --> |
| --- | --- | --- |
| `POST /usuarios` | 🟢 Pública | Crear Usuario usuario |
| `GET /usuarios/perfil` | 🔒 Privada (JWT) | Informacion de usuario logueado |
| `PUT /usuarios/cambioClave` | 🔒 Privada (JWT) | Cambiar contraseña del usuario |

### Admin User

| <!-- --> | <!-- --> | <!-- --> |
| --- | --- | --- |
| `GET /usuarios` | 🔒 Privada (JWT + Admin) | Listar todos los usuarios |
| `GET /usuarios/:id` | 🔒 Privada (JWT + Admin) | Obtener usuario por ID |
| `PUT /usuarios/:id` | 🔒 Privada (JWT + Admin) | Modificar usuario |
| `DELETE /usuarios/:id` | 🔒 Privada (JWT + Admin) | Eliminar usuario |

### Autenticación

| <!-- -->           | <!-- -->   | <!-- -->                       |
| ------------------ | ---------- | ------------------------------ |
| `POST /auth/login` | 🟢 Pública | Login de usuario, devuelve JWT |
| `POST /auth/me` | 🔒 Privada (JWT) | Acceso a la información del usuario |

### Articulos

| <!-- --> | <!-- --> | <!-- --> |
| --- | --- | --- |
| `GET /articulos` | 🟢 Pública | Listar todos los artículos |
| `GET /articulos/filtros` | 🟢 Pública | Obtener artículo por filtrado, precio y categoría |
| `GET /articulos/:id` | 🟢 Pública | Obtener artículo por ID |
| `POST /articulos` | 🔒 Privada (JWT + Admin) | Crear nuevo artículo |
| `PUT /articulos/:id` | 🔒 Privada (JWT + Admin) | Modificar artículo |
| `DELETE /articulos/:id` | 🔒 Privada (JWT + Admin) | Eliminar artículo |

### Categorias

| <!-- --> | <!-- --> | <!-- --> |
| --- | --- | --- |
| `GET /categorias` | 🟢 Pública | Listar todos las categorias |
| `GET /categorias/:id` | 🟢 Pública | Obtener categorias por ID |
| `POST /categorias` | 🔒 Privada (JWT + Admin) | Crear nueva categoria |
| `PUT /categorias/:id` | 🔒 Privada (JWT + Admin) | Modificar categoria |
| `DELETE /categorias/:id` | 🔒 Privada (JWT + Admin) | Eliminar categoria |

### Favoritos

| <!-- --> | <!-- --> | <!-- --> |
| --- | --- | --- |
| `GET /favoritos/top` | 🟢 Pública | Listar todos los favoritos Top 10 |
| `GET /favoritos/:id_usuario` | 🔒 Privada (JWT) | Obtener favoritos por usuario |
| `POST /favoritos` | 🔒 Privada (JWT) | Crear nuevo favorito |
| `DELETE /categorias/:id_usuario/id_articulo` | 🔒 Privada (JWT) | Eliminar favorito por usuario y artículo |

### Pedidos

| <!-- --> | <!-- --> | <!-- --> |
| --- | --- | --- |
| `POST /pedidos` | 🟢 Pública | Crear Pedido con detalle |
| `GET /pedidos/:id` | 🔒 Privada (JWT) | Informacion de los pedidos del usuario logeado | 



## Scripts

```sh
npm run dev
```

### Forzar cambio de clave

```sh
node scripts/fixPasswords.js
```

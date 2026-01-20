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

### Articulos

| <!-- --> | <!-- --> | <!-- --> |
| --- | --- | --- |
| `GET /articulos` | 🟢 Pública | Listar todos los artículos |
| `GET /articulos/:id` | 🟢 Pública | Obtener articulo por ID |
| `POST /articulos` | 🔒 Privada (JWT + Admin) | Crear nuevo articulo |
| `PUT /articulos/:id` | 🔒 Privada (JWT + Admin) | Modificar articulo |
| `DELETE /articulos/:id` | 🔒 Privada (JWT + Admin) | Eliminar articulo |

## Scripts

```sh
npm run dev
```

### Forzar cambio de clave

```sh
node scripts/fixPasswords.js
```

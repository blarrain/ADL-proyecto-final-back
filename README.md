# Proyecto final ADL G91 - Frontend

Vivero JRB

## 👥 Integrantes

- Bárbara Larraín
- Rosa Ramírez
- Jorge Villegas


## Rutas de la API ##
http://localhost:5000/

### Usuarios ###
POST   /usuarios                 🟢 Pública                 Crear Usuario usuario 
GET    /usuarios/perfil          🔒 Privada (JWT)           Informacion de usuario logueado
PUT    /usuarios/cambioClave     🔒 Privada (JWT)           Cambiar contraseña del usuario

### Admin Usuer ###
GET	    /usuarios	            🔒 Privada (JWT + Admin)	Listar todos los usuarios
GET	    /usuarios/:id	        🔒 Privada (JWT + Admin)	Obtener usuario por ID
PUT	    /usuarios/:id	        🔒 Privada (JWT + Admin)	Modificar usuario
DELETE	/usuarios/:id	        🔒 Privada (JWT + Admin)	Eliminar usuario

### Autenticación ###
POST    /auth/login              🟢 Pública                 Login de usuario, devuelve JWT

### Articulos ###
GET	    /articulos	            🟢 Pública	                Listar todos los artículos
GET	    /articulos/:id	        🟢 Pública	                Obtener articulo por ID
POST	/articulos	            🔒 Privada (JWT + Admin)	Crear nuevo articulo
PUT	    /articulos/:id	        🔒 Privada (JWT + Admin)	Modificar articulo
DELETE	/articulos/:id	        🔒 Privada (JWT + Admin)	Eliminar articulo


npm run dev

forzar cambio de clave
node scripts/fixPasswords.js     
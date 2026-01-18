CREATE DATABASE "viveroJRB"

--CATEGORIAS
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    activo BOOLEAN DEFAULT TRUE
);

--USUARIOS
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    imagen_url VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    nombres VARCHAR(50),
    apellidos VARCHAR(50),
    fecha_nacimiento DATE,
    telefono VARCHAR(50),
    comuna VARCHAR(50),
    direccion VARCHAR(150),
    fecha_registro DATE DEFAULT CURRENT_DATE,
    rol VARCHAR(50)
);

--ARTICULOS
CREATE TABLE articulo (
    id_articulo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    imagen_url VARCHAR(100),
    id_categoria INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATE DEFAULT CURRENT_DATE
);

ALTER TABLE articulo
ADD CONSTRAINT fk_articulo_categoria
FOREIGN KEY (id_categoria)
REFERENCES categoria(id_categoria);


--PEDIDOS
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    comuna VARCHAR(50),
    direccion VARCHAR(200),
    fecha_pedido DATE DEFAULT CURRENT_DATE,
    total DECIMAL(10,2)
);

ALTER TABLE pedido
ADD CONSTRAINT fk_pedido_usuario
FOREIGN KEY (id_usuario)
REFERENCES usuario(id_usuario);

--PEDIDOS DETALLES
CREATE TABLE pedido_detalle (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_articulo INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL
);

ALTER TABLE pedido_detalle
ADD CONSTRAINT fk_detalle_pedido
FOREIGN KEY (id_pedido)
REFERENCES pedido(id_pedido);

ALTER TABLE pedido_detalle
ADD CONSTRAINT fk_detalle_articulo
FOREIGN KEY (id_articulo)
REFERENCES articulo(id_articulo);

--FAVORITOS
CREATE TABLE favorito (
    id_favorito SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_articulo INT NOT NULL,
    fecha_agregado DATE DEFAULT CURRENT_DATE
);

ALTER TABLE favorito
ADD CONSTRAINT fk_favorito_usuario
FOREIGN KEY (id_usuario)
REFERENCES usuario(id_usuario);

ALTER TABLE favorito
ADD CONSTRAINT fk_favorito_articulo
FOREIGN KEY (id_articulo)
REFERENCES articulo(id_articulo);

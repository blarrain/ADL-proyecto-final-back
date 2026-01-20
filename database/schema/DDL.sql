CREATE DATABASE "viveroJRB";
\c "viveroJRB";

-- CATEGORIAS
DROP TABLE IF EXISTS categoria CASCADE;
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    activo BOOLEAN DEFAULT TRUE
);

-- USUARIOS
DROP TABLE IF EXISTS usuario CASCADE;
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    imagen_url TEXT,
    password_hash VARCHAR(255) NOT NULL,
    nombres VARCHAR(50),
    apellidos VARCHAR(50),
    fecha_nacimiento DATE,
    telefono VARCHAR(50),
    comuna VARCHAR(50),
    direccion VARCHAR(150),
    fecha_registro DATE DEFAULT CURRENT_DATE,
    rol VARCHAR(50) DEFAULT 'cliente'
);

-- ARTICULOS
DROP TABLE IF EXISTS articulo CASCADE;
CREATE TABLE articulo (
    id_articulo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    imagen_url TEXT,
    id_categoria INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_articulo_categoria 
        FOREIGN KEY (id_categoria) 
        REFERENCES categoria(id_categoria)
);

-- PEDIDOS
DROP TABLE IF EXISTS pedido CASCADE;
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    comuna VARCHAR(50),
    direccion VARCHAR(200),
    fecha_pedido DATE DEFAULT CURRENT_DATE,
    total DECIMAL(10,2) DEFAULT 0,
    CONSTRAINT fk_pedido_usuario 
        FOREIGN KEY (id_usuario) 
        REFERENCES usuario(id_usuario)
);

-- PEDIDOS DETALLES
DROP TABLE IF EXISTS pedido_detalle CASCADE;
CREATE TABLE pedido_detalle (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_articulo INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    CONSTRAINT fk_detalle_pedido 
        FOREIGN KEY (id_pedido) 
        REFERENCES pedido(id_pedido) ON DELETE CASCADE,
    CONSTRAINT fk_detalle_articulo 
        FOREIGN KEY (id_articulo) 
        REFERENCES articulo(id_articulo)
);

-- FAVORITOS
DROP TABLE IF EXISTS favorito CASCADE;
CREATE TABLE favorito (
    id_favorito SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_articulo INT NOT NULL,
    fecha_agregado DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_favorito_usuario 
        FOREIGN KEY (id_usuario) 
        REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_favorito_articulo 
        FOREIGN KEY (id_articulo) 
        REFERENCES articulo(id_articulo) ON DELETE CASCADE
);
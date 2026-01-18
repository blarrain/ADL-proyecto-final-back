-- DATOS DE CATEGORIA
INSERT INTO categoria (nombre, descripcion, activo) VALUES
('Plantas', 'Plantas ornamentales y aromáticas', true),
('Árboles Pequeños', 'Árboles frutales jóvenes para huerto', true);



-- DATOS DE ARTICULOS
INSERT INTO articulo (
    nombre,
    descripcion,
    precio,
    stock,
    imagen_url,
    id_categoria,
    activo,
    fecha_creacion
) VALUES
-- PLANTAS (id_categoria = 1)
('Golden Berry (Physalis)', 'Planta frutal andina conocida como golden berry o aguaymanto.', 5990, 20, 'https://images.pexels.com/photos/5945659/pexels-photo-5945659.jpeg', 1, true, '2025-01-10'),
('Rosa Roja', 'Planta ornamental de rosa roja para jardín.', 7990, 25, 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg', 1, true, '2025-01-10'),
('Rosa Blanca', 'Rosa blanca ornamental de fácil cuidado.', 7990, 22, 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg', 1, true, '2025-01-10'),
('Gladiolo', 'Planta floral de tallo largo, usada en arreglos florales.', 4990, 30, 'https://images.pexels.com/photos/1379636/pexels-photo-1379636.jpeg', 1, true, '2025-01-10'),
('Lavanda', 'Planta aromática muy cultivada en Chile.', 6990, 18, 'https://images.pexels.com/photos/207518/pexels-photo-207518.jpeg', 1, true, '2025-01-10'),
('Romero', 'Planta aromática de uso culinario.', 3990, 35, 'https://images.pexels.com/photos/4197413/pexels-photo-4197413.jpeg', 1, true, '2025-01-10'),
('Menta', 'Planta aromática de rápido crecimiento.', 3490, 40, 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg', 1, true, '2025-01-10'),

-- ÁRBOLES PEQUEÑOS (id_categoria = 2)
('Árbol de Limón Joven', 'Árbol frutal pequeño ideal para huerto.', 24990, 8, 'https://images.pexels.com/photos/5945739/pexels-photo-5945739.jpeg', 2, true, '2025-01-10'),
('Árbol de Manzano', 'Planta joven de manzano lista para sembrar.', 27990, 6, 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg', 2, true, '2025-01-10'),
('Árbol de Naranjo', 'Árbol cítrico pequeño para cultivo doméstico.', 26990, 7, 'https://images.pexels.com/photos/5945746/pexels-photo-5945746.jpeg', 2, true, '2025-01-10'),
('Árbol de Palto', 'Planta joven de palto para huerto.', 28990, 5, 'https://images.pexels.com/photos/5945762/pexels-photo-5945762.jpeg', 2, true, '2025-01-10'),
('Árbol de Durazno', 'Árbol frutal pequeño de durazno.', 25990, 6, 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg', 2, true, '2025-01-10'),
('Árbol de Cerezo', 'Planta joven de cerezo ornamental.', 31990, 4, 'https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg', 2, true, '2025-01-10'),
('Árbol de Olivo', 'Olivo joven resistente y decorativo.', 29990, 5, 'https://images.pexels.com/photos/1129107/pexels-photo-1129107.jpeg', 2, true, '2025-01-10');


-- DATOS DE USUARIOS
INSERT INTO usuario (
    email, imagen_url, password_hash, nombres, apellidos, fecha_nacimiento, telefono, comuna, direccion, fecha_registro, rol) 
	VALUES
	('admin@admin.cl', NULL, '$2b$10$MRYiXY/fINqHb8aVYYdKK.SMkqJNoiTFdlmhlV4WAA65INP8UaNka', 'Administrador', 'Admin', '1990-01-01', '+56 9 1111 1111', 'Santiago','Av. Principal 123', '2025-01-10','admin'),
	('cliente@cliente.cl', NULL, '$2b$10$MRYiXY/fINqHb8aVYYdKK.SMkqJNoiTFdlmhlV4WAA65INP8UaNka', 'Cliente', 'Demo', '1995-06-15', '+56 9 2222 2222', 'Providencia', 'Calle Secundaria 456', '2025-01-10', 'cliente');
-- clave 123456
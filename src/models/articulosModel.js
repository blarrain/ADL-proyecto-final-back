import pool from "../../database/config.js"

export const getArticulosModel = async () => {
    const sql = `
        SELECT id_articulo, nombre, descripcion, precio, stock, imagen_url, id_categoria
        FROM articulo WHERE activo = true ORDER BY id_articulo
    `;
    const { rows } = await pool.query(sql);
    return rows;
};

export const getArticuloByIdModel = async (id) => {
    const sql = `
        SELECT id_articulo, nombre, descripcion, precio, stock, imagen_url, id_categoria
        FROM articulo WHERE id_articulo = $1 AND activo = true
    `;
    const { rows } = await pool.query(sql, [id]);
    return rows[0];
};

export const createArticuloModel = async ({nombre, descripcion, precio, stock, imagen_url, id_categoria, activo}) => {
  const sql = `INSERT INTO articulo
    (nombre, descripcion, precio, stock, imagen_url, id_categoria, activo)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id_articulo
  `;
  const values = [nombre, descripcion, precio, stock, imagen_url, id_categoria, activo ?? true
  ];

  const response = await pool.query(sql, values);
  return response.rows[0]; 
};

export const updateArticuloModel = async (id, {nombre, descripcion, precio, stock, imagen_url, id_categoria, activo}) => {
  const sql = `
    UPDATE articulo
    SET nombre = $1, descripcion = $2, precio = $3, stock = $4, imagen_url = $5, id_categoria = $6, activo = $7
    WHERE id_articulo = $8
  `;

  const values = [nombre, descripcion, precio, stock, imagen_url, id_categoria, activo, id];

  await pool.query(sql, values);
};


export const deleteArticuloModel = async (id) => {
  const sql = `
    UPDATE articulo
    SET activo = false
    WHERE id_articulo = $1
    RETURNING id_articulo
  `;
  const {rows} = await pool.query(sql, [id]);
  return rows[0]
};



export const getArticulosFiltradosModel = async ({precio_min, precio_max, id_categoria}) => {
  try {
    const filtros = [];
    let values = [];
    let index = 1; // contador para $1, $2, etc.

    if (precio_min) {
      filtros.push(`precio >= $${index}`);
      values.push(precio_min);
      index++;
    }

    if (precio_max) {
      filtros.push(`precio <= $${index}`);
      values.push(precio_max);
      index++;
    }

    if (id_categoria) {
      filtros.push(`id_categoria = $${index}`);
      values.push(id_categoria);
      index++;
    }

    let consulta = `
      SELECT id_articulo, nombre, descripcion, precio, stock, imagen_url, id_categoria
      FROM articulo
      WHERE activo = true
    `;

    if (filtros.length > 0) {
      consulta += ' AND ' + filtros.join(' AND ');
    }

    const result = await pool.query(consulta, values);
    return result.rows;

  } catch (error) {
    console.error("Error en getArticulosFiltradosModel:", error);
    throw error;
  }
};

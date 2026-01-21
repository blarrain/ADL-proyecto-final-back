import pool from "../../database/config.js"

export const getCategoriasModel = async () => {
  const sql = `
    SELECT id_categoria, nombre, descripcion, activo
    FROM categoria
    WHERE activo = true
    ORDER BY id_categoria
  `;
  const { rows } = await pool.query(sql);
  return rows;
};

export const getCategoriaByIdModel = async (id) => {
  const sql = `
    SELECT id_categoria, nombre, descripcion, activo
    FROM categoria
    WHERE id_categoria = $1 AND activo = true
  `;
  const { rows } = await pool.query(sql, [id]);
  return rows[0];
};

export const createCategoriaModel = async ({ nombre, descripcion, activo }) => {
  const sql = `
    INSERT INTO categoria (nombre, descripcion, activo)
    VALUES ($1, $2, $3)
    RETURNING id_categoria
  `;
  const values = [
    nombre,
    descripcion,
    activo ?? true
  ];
  const { rows } = await pool.query(sql, values);
  return rows[0];
};


export const updateCategoriaModel = async (id, { nombre, descripcion, activo }) => {
  const sql = `
    UPDATE categoria
    SET nombre = $1,
        descripcion = $2,
        activo = $3
    WHERE id_categoria = $4
  `;
  const values = [
    nombre,
    descripcion,
    activo,
    id
  ];
  await pool.query(sql, values);
};

export const deleteCategoriaModel = async (id) => {
  const sql = `
    UPDATE categoria
    SET activo = false
    WHERE id_categoria = $1
  `;
  await pool.query(sql, [id]);
};
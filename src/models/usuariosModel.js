import pool from "../../database/config.js"
import bcrypt from "bcryptjs";

export const getUserByEmailModel  = async (email) => {
    const sql = `SELECT id_usuario, email, password_hash, rol    
        FROM usuario WHERE email = $1;
        `;
    const { rows } = await pool.query(sql, [email]);
    return rows[0];
};

export const createUsuarioModel = async ({email, password, imagen_url, nombres, apellidos, fecha_nacimiento, telefono, comuna, direccion, rol,}) => {
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sqlQuery = {
    text: `
      INSERT INTO usuario (email, imagen_url, password_hash, nombres, apellidos, fecha_nacimiento, telefono, comuna, direccion, rol)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING id_usuario, email, rol, fecha_registro
    `,
    values: [email, imagen_url, hashedPassword, nombres, apellidos, fecha_nacimiento, telefono, comuna, direccion,rol],
  };

  const { rows } = await pool.query(sqlQuery);
  return rows[0];
};

export const existeUserByEmailModel = async (email) => {
  const sqlQuery = {
    text: "SELECT 1 FROM usuario WHERE email = $1",
    values: [email],
  };

  const { rowCount } = await pool.query(sqlQuery);
  return rowCount > 0;
};


export const getUsuarioByIdModel = async (id_usuario) => {
  const sql = `
    SELECT id_usuario, email, imagen_url, nombres, apellidos, fecha_nacimiento, telefono, comuna, direccion, fecha_registro, rol
    FROM usuario
    WHERE id_usuario = $1;
  `;

  const { rows } = await pool.query(sql, [id_usuario]);
  return rows[0];
};


export const getAllUsuariosModel = async () => {
  const sql = `
    SELECT id_usuario, email, nombres, apellidos, rol, fecha_registro
    FROM usuario
    ORDER BY id_usuario;
  `;

  const { rows } = await pool.query(sql);
  return rows;
};


export const updateUsuarioModel = async (
  id_usuario,
  { imagen_url, nombres, apellidos, fecha_nacimiento, telefono, comuna, direccion }
) => {
  const sql = `
    UPDATE usuario SET imagen_url = $1, nombres = $2, apellidos = $3, fecha_nacimiento = $4, telefono = $5, comuna = $6, direccion = $7
        WHERE id_usuario = $8
    RETURNING
      id_usuario, email, nombres, apellidos,rol;
  `;

  const values = [imagen_url, nombres, apellidos, fecha_nacimiento, telefono, comuna, direccion, id_usuario, ];

  const { rows } = await pool.query(sql, values);
  return rows[0];
};


export const deleteUsuarioModel = async (id_usuario) => {
  const sql = `
    DELETE FROM usuario WHERE id_usuario = $1
    RETURNING id_usuario, email;
  `;

  const { rows } = await pool.query(sql, [id_usuario]);
  return rows[0];
};

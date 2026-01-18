import bcrypt from "bcryptjs";
import pool from "../../database/config.js";

export const usuarioUpdatePasswordModel = async (id_usuario, passwordNueva) => {
  const hashedPassword = bcrypt.hashSync(passwordNueva, 10);

  const sql = `
    UPDATE usuario SET password_hash = $1
    WHERE id_usuario = $2
    RETURNING id_usuario, email;
  `;

  const { rows } = await pool.query(sql, [hashedPassword, id_usuario]);

  return rows[0];
};

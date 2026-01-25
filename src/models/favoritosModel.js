import pool from "../../database/config.js";

export const getFavoritosByUsuarioModel = async (id_usuario) => {
  const sql = `
    SELECT 
      f.id_favorito,
      a.id_articulo,
      a.nombre,
      a.precio,
      a.imagen_url
    FROM favorito f
    JOIN articulo a ON f.id_articulo = a.id_articulo
    WHERE f.id_usuario = $1
      AND a.activo = true
    ORDER BY f.fecha_agregado DESC
  `;
  const { rows } = await pool.query(sql, [id_usuario]);
  return rows;
};

export const createFavoritoModel = async (id_usuario, id_articulo) => {
  const sql = `
    INSERT INTO favorito (id_usuario, id_articulo)
    VALUES ($1, $2)
    ON CONFLICT (id_usuario, id_articulo) DO NOTHING
    RETURNING id_favorito
  `;
  const { rows } = await pool.query(sql, [id_usuario, id_articulo]);
  return rows[0];
};

export const deleteFavoritoModel = async (id_usuario, id_articulo) => {
  const sql = `
    DELETE FROM favorito
    WHERE id_usuario = $1 AND id_articulo = $2
  `;
  await pool.query(sql, [id_usuario, id_articulo]);
};

export const getTopFavoritosModel = async () => {
  const sql = `
    SELECT 
      a.id_articulo,
      a.nombre,
      a.precio,
      a.imagen_url,
      COUNT(f.id_favorito) AS total_favoritos
    FROM favorito f
    JOIN articulo a ON f.id_articulo = a.id_articulo
    WHERE a.activo = true
    GROUP BY a.id_articulo, a.nombre, a.precio, a.imagen_url
    ORDER BY total_favoritos DESC
    LIMIT 10
  `;
  const { rows } = await pool.query(sql);
  return rows;
};

import pool from "../../database/config.js"

export const createPedidoModel = async ({ id_usuario, comuna, direccion, total, detalles }) => {

    const client = await pool.connect();
    try {
        /* Cuando se crea más 1 registro se realiza mediante una transacción, con Begin indico que estoy iniciando la transacción */
        await client.query('BEGIN');

        /* Registro en tabla cabecera */
        const SQLquery = {
            text: 'INSERT INTO pedido (id_usuario, comuna, direccion, total) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [id_usuario, comuna, direccion, total]
        }
        const response = await client.query(SQLquery);
        const idPedido = response.rows[0].id_pedido;

        /* Registro en tabla detalle */
        for (const detalle of detalles) {
            const SQLqueryDetalle = {
                text: 'INSERT INTO pedido_detalle (id_pedido, id_articulo, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)',
                values: [idPedido, detalle.id_articulo, detalle.quantity, detalle.precio],
            };
            await client.query(SQLqueryDetalle);
        }

        /* Una vez que termina se confirma la transacción con Commit */
        await client.query('COMMIT');
        return response.rows[0];
    } catch (e) {
        /* Si ocurre un error, se revierte la transacción con Rollback */
        await client.query('ROLLBACK');
        throw e;
    } finally {
        /* Se libera la conexión */
        client.release();
    }
}


export const getPedidosByUserModel = async ({ id_usuario }) => {
    const SQLquery = `SELECT 
    pedido.id_pedido,
    pedido.fecha_pedido,
    pedido.comuna,
    pedido.direccion,
    pedido.total,
    articulo.nombre,
    pedido_detalle.cantidad,
    pedido_detalle.precio_unitario
    FROM pedido
    INNER JOIN pedido_detalle ON pedido.id_pedido = pedido_detalle.id_pedido
    INNER JOIN articulo ON pedido_detalle.id_articulo = articulo.id_articulo
    WHERE pedido.id_usuario = $1`;

    const { rows } = await pool.query(SQLquery, [id_usuario]);
    return rows;
};
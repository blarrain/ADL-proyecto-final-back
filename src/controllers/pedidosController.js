import { createPedidoModel, getPedidosByUserModel } from "../models/pedidosModel.js"

export const createPedidoController = async (req, res) => {

    try {
        const { id_usuario, comuna, direccion, total, detalles } = req.body

        let message = ""

        if (!id_usuario) {
            message += "Usuario, "
        }

        if (!comuna) {
            message += "Comuna, "
        }
        if (!direccion) {
            message += "Dirección,"
        }
        if (!total) {
            message += "Total,"
        }
        if (!detalles) {
            message += "Detalle."
        }

        if (message != "") {
            return res.status(400).json({
                message: "Falta(n) dato(s): " + message,
            });
        }

        await createPedidoModel({ id_usuario, comuna, direccion, total, detalles })

        return res.status(201).json({ message: 'Pedido creado correctamente' })
    } catch (error) {
        res.status(500).json({ error: 'Error al crear un pedido', error })
        console.error('error', error)
    }
}

export const getPedidosByUserController = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const pedidos = await getPedidosByUserModel({ id_usuario });

        return res.status(200).json({
            pedidos,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};


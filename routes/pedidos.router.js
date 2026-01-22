import { Router } from "express";
import { createPedidoController, getPedidosByUserController } from "../src/controllers/pedidosController.js";

const router = Router();

router.post("/", createPedidoController);
router.get("/:id_usuario", getPedidosByUserController);

export default router;
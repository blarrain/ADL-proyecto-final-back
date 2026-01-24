import { Router } from "express";
import { createPedidoController, getPedidosByUserController } from "../src/controllers/pedidosController.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";

const router = Router();

router.post("/", verifyToken, createPedidoController);
router.get("/:id_usuario", verifyToken, getPedidosByUserController);

export default router;
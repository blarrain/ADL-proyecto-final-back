import { Router } from "express";
import { getArticulos, getArticuloById, createArticulo, updateArticulo, deleteArticulo, getArticulosFiltrados } from "../src/controllers/articulosController.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js";

const router = Router();

//publicas
router.get("/", getArticulos);
router.get("/filtros", getArticulosFiltrados);
router.get("/:id", getArticuloById);

//privadas
router.post("/", verifyToken, verifyAdmin, createArticulo);
router.put("/:id", verifyToken, verifyAdmin, updateArticulo);
router.delete("/:id", verifyToken, verifyAdmin, deleteArticulo);
export default router;

import { Router } from "express";
import { createCategoria, deleteCategoria, getCategoriaById, getCategorias, updateCategoria } from "../src/controllers/categoriasController.js";

import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js";

const router = Router();

// publicas
router.get("/", getCategorias);
router.get("/:id", getCategoriaById);

// privadas - admin
router.post("/", verifyToken, verifyAdmin, createCategoria);
router.put("/:id", verifyToken, verifyAdmin, updateCategoria);
router.delete("/:id", verifyToken, verifyAdmin, deleteCategoria);

export default router;
import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { createFavorito, deleteFavorito, getFavoritosByUsuario, getTopFavoritos } from "../src/controllers/favoritosController.js";

const router = Router();

// publicas
router.get("/top", getTopFavoritos);

// privadas 
router.get("/:id_usuario",verifyToken, getFavoritosByUsuario);
router.post("/", verifyToken,  createFavorito);
router.delete("/:id_usuario/:id_articulo", verifyToken, deleteFavorito);

export default router;
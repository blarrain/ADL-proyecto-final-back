import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { createUsuarioController, deleteUsuarioController, getAllUsuariosController, getPerfilController, getUsuarioByIdController, updateUsuarioController } from "../src/controllers/usuariosController.js";
import { usuarioChangePasswordController } from "../src/controllers/usuarioUpdPassController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.middleware.js";

const router = Router();

//publicas
router.post("/",  createUsuarioController);

//privadas
router.get("/perfil",verifyToken, getPerfilController);
router.put("/cambioClave", verifyToken, usuarioChangePasswordController);

//admin
router.get("/", verifyToken, verifyAdmin, getAllUsuariosController);
router.get("/:id", verifyToken, verifyAdmin, getUsuarioByIdController);
router.put("/:id", verifyToken, updateUsuarioController);
router.delete("/:id", verifyToken, verifyAdmin, deleteUsuarioController);

export default router;
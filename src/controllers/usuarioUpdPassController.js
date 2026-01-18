import bcrypt from "bcryptjs";
import { getUserByEmailModel } from "../models/usuariosModel.js";
import { usuarioUpdatePasswordModel } from "../models/usuarioUpdPassModel.js";

export const usuarioChangePasswordController = async (req, res) => {
  try {
    const { passwordActual, passwordNueva } = req.body;
    const { id_usuario, email } = req.user;

    if (!passwordActual || !passwordNueva) {
      return res.status(400).json({
        message: "Debe ingresar password actual y nueva",
      });
    }

    const user = await getUserByEmailModel(email);

    const isValid = bcrypt.compareSync(passwordActual, user.password_hash);

    if (!isValid) {
      return res.status(401).json({
        message: "Password actual incorrecta",
      });
    }

    await usuarioUpdatePasswordModel(id_usuario, passwordNueva);

    return res.status(200).json({
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error("Error al cambiar password:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

import { getUserByEmailModel, getUsuarioByIdModel } from "../models/usuariosModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const getMe = async (req, res) => {
  try {
    const { id_usuario } = req.user;

    const user = await getUsuarioByIdModel(id_usuario);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error en getMe:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const loginUser = async(req,res) =>{
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Email y password son obligatorios",
        });
      }

      const user = await getUserByEmailModel(email);
      if (!user) {
        return res
          .status(404)
          .json({ mesagge: "Usuario o password incorrecta" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ mesagge: "No autorizado" });
      }

      // genera JWT
      const token = jwt.sign({id_usuario: user.id_usuario, email: user.email, rol: user.rol, }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Login exitoso",
        token,
        usuario: {
          id_usuario: user.id_usuario,
          email: user.email,
          rol: user.rol,
        },
      });
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      res.status(500).send("algo salió mal 😢...");
    }
}
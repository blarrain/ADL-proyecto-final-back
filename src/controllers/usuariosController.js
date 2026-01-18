import {
  createUsuarioModel,
  deleteUsuarioModel,
  existeUserByEmailModel,
  getAllUsuariosModel,
  getUsuarioByIdModel,
  updateUsuarioModel,
} from "../models/usuariosModel.js";

export const createUsuarioController = async (req, res) => {
  try {
    const {
      email,
      password,
      imagen_url,
      nombres,
      apellidos,
      fecha_nacimiento,
      telefono,
      comuna,
      direccion,
      rol,
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email y password son obligatorios",
      });
    }

    const existeUsuario = await existeUserByEmailModel(email);
    if (existeUsuario) {
      return res.status(409).json({
        message: "El email ya está registrado",
      });
    }

    const nuevoUsuario = await createUsuarioModel({
      email,
      password,
      imagen_url,
      nombres,
      apellidos,
      fecha_nacimiento,
      telefono,
      comuna,
      direccion,
      rol: rol || "cliente",
    });

    return res.status(201).json({
      message: "Usuario creado correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);

    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getPerfilController = async (req, res) => {
  try {
    const { id_usuario } = req.user;

    const usuario = await getUsuarioByIdModel(id_usuario);

    return res.status(200).json({
      usuario,
    });
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getAllUsuariosController = async (req, res) => {
  try {
    const usuarios = await getAllUsuariosModel();

    return res.status(200).json({
      usuarios,
    });
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const getUsuarioByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await getUsuarioByIdModel(id);
    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      usuario,
    });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const updateUsuarioController = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioLogueado = req.user;

    if (
      usuarioLogueado.rol !== "admin" &&
      Number(id) !== usuarioLogueado.id_usuario
    ) {
      return res.status(403).json({
        message: "No autorizado",
      });
    }

    const usuario = await updateUsuarioModel(id, req.body);

    return res.status(200).json({
      message: "Usuario actualizado",
      usuario,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

export const deleteUsuarioController = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await deleteUsuarioModel(id);
    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "Usuario eliminado",
      usuario,
    });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
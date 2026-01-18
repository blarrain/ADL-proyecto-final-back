import { createArticuloModel, deleteArticuloModel, getArticuloByIdModel, getArticulosModel, updateArticuloModel } from "../models/articulosModel.js";

export const getArticulos = async (req, res) => {
  try {
    const articulo = await getArticulosModel();
    res.json(articulo);
  } catch (error) {
    console.error("❌ Error al obtener posts:", error);
    res.status(500).send("algo salió mal 😢...");
  }
};

export const getArticuloById = async (req, res) => {
  try {
    const { id } = req.params;
    const articulo = await getArticuloByIdModel(id);

    if (!articulo) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }
    res.json(articulo);
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


export const createArticulo = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen_url, id_categoria, activo } = req.body;

    if (!nombre || precio == null || stock == null || !id_categoria) {
      return res.status(400).json({
        message: "Faltan campos obligatorios"
      });
    }

    const result = await createArticuloModel({
      nombre, descripcion, precio, stock, imagen_url, id_categoria,activo
    });

    res.status(201).json({
      id_articulo: result.id_articulo,
      message: "Artículo creado correctamente"
    });

  } catch (error) {
    console.error("❌ Error al crear artículo:", error);
    res.status(500).json({
      message: "Error del servidor"
    });
  }
};

export const updateArticulo = async (req, res) => {
  try {
    const { id } = req.params;
    const {nombre, descripcion, precio, stock, imagen_url, id_categoria, activo} = req.body;

    if (!nombre || precio == null || stock == null || !id_categoria) {
      return res.status(400).json({
        message: "Faltan campos obligatorios"
      });
    }

    await updateArticuloModel(id, {
      nombre, descripcion, precio, stock, imagen_url, id_categoria, activo
    });

    res.json({
      message: "Artículo actualizado correctamente"
    });

  } catch (error) {
    console.error("❌ Error al actualizar artículo:", error);
    res.status(500).json({
      message: "Error del servidor"
    });
  }
};



export const deleteArticulo = async (req, res) => {
  try {
    const { id } = req.params;

    const articulo = await deleteArticuloModel(id);
    if (!articulo) {
      return res.status(404).json({
        message: "Artículo no encontrado"
      });
    }

    res.json({
      message: "Artículo eliminado correctamente"
    });

  } catch (error) {
    console.error("❌ Error al eliminar artículo:", error);
    res.status(500).json({
      message: "Error del servidor"
    });
  }
};

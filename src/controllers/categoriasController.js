import { createCategoriaModel, deleteCategoriaModel, getCategoriaByIdModel, getCategoriasModel, updateCategoriaModel } from "../models/categoriasModel.js";


export const getCategorias = async (req, res) => {
  try {
    const categorias = await getCategoriasModel();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await getCategoriaByIdModel(id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, activo } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    const result = await createCategoriaModel({
      nombre,
      descripcion,
      activo
    });

    res.status(201).json({
      id_categoria: result.id_categoria,
      message: "Categoría creada correctamente"
    });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, activo } = req.body;

    const categoria = await getCategoriaByIdModel(id);
    if (!categoria) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    if (!nombre) {
      return res.status(400).json({ message: "El nombre es obligatorio" });
    }

    await updateCategoriaModel(id, {
      nombre,
      descripcion,
      activo
    });

    res.json({ message: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await getCategoriaByIdModel(id);
    if (!categoria) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    await deleteCategoriaModel(id);

    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};
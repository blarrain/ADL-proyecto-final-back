import { createFavoritoModel, deleteFavoritoModel, getFavoritosByUsuarioModel, getTopFavoritosModel } from "../models/favoritosModel.js";


export const getFavoritosByUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const favoritos = await getFavoritosByUsuarioModel(id_usuario);
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const createFavorito = async (req, res) => {
  try {
    const { id_usuario, id_articulo } = req.body;

    if (!id_usuario || !id_articulo) {
      return res.status(400).json({
        message: "id_usuario e id_articulo son obligatorios"
      });
    }

    const result = await createFavoritoModel(id_usuario, id_articulo);

    res.status(201).json({
      id_favorito: result.id_favorito,
      message: "Favorito agregado correctamente"
    });

  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const deleteFavorito = async (req, res) => {
  try {
    const { id_usuario, id_articulo } = req.params;

    await deleteFavoritoModel(id_usuario, id_articulo);

    res.json({ message: "Favorito eliminado correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

export const getTopFavoritos = async (req, res) => {
  try {
    const top = await getTopFavoritosModel();
    res.json(top);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};
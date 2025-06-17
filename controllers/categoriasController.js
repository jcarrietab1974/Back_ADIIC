const Categorias = require("../models/Categorias");

exports.obtenerCategoriaHome = async (req, res) => {
  try {
    const categoria = await Categorias.find();
    res.json({ categoria });
  } catch (error) {
    console.log(error);
  }
};

exports.obtenerCategoria = async (req, res) => {
  try {
    const categoria = await Categorias.find({ creador: req.usuario.id });
    res.json({ categoria });
  } catch (error) {
    console.log(error);
  }
};

exports.obtenerCategoriaId = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categorias.findById(id);
    res.json({ categoria });
  } catch (error) {
    console.log(error);
  }
};

exports.crearCategoria = async (req, res) => {
  const { nombre, imagen } = req.body;

  if (!nombre.trim() || !imagen.trim()) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    const categoria = new Categorias({
      nombre,
      imagen,
      creador: req.usuario.id,
    });
    await categoria.save();
    res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, imagen } = req.body;

  // Validación de campos vacíos
  if (!nombre || !imagen || !nombre.trim() || !imagen.trim()) {
    return res.status(400).json({ msg: "Nombre e imagen son obligatorios" });
  }

  try {
    const categoria = await Categorias.findById(id);
    if (!categoria) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    if (categoria.creador.toString() !== req.usuario.id.toString()) {
      return res
        .status(403)
        .json({ msg: "Acción no válida para este usuario" });
    }

    categoria.nombre = nombre;
    categoria.imagen = imagen;

    await categoria.save();
    res.json({ categoria });
  } catch (error) {
    console.error("Error en servidor:", error);
    res.status(500).json({ msg: "Error al actualizar la categoría" });
  }
};

exports.borrarCategoria = async (req, res) => {
  try {
    await Categorias.deleteOne({ _id: req.params.id });
    res.json({ msg: "Categoria eliminada" });
  } catch (error) {
    console.log(error);
  }
};

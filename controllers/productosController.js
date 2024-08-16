const Productos = require("../models/Productos");

exports.obtenerProducto = async (req, res) => {
  res.status(404).json({ msg: "Obtener producto" });
};

exports.crearProducto = async (req, res) => {
  res.status(404).json({ msg: "Crear producto" });
};

exports.actualizarProducto = async (req, res) => {
  res.status(404).json({ msg: "Actualizar producto" });
};

exports.borrarProducto = async (req, res) => {
  res.status(404).json({ msg: "Borrar producto" });
};

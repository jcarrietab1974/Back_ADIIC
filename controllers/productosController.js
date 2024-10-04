const Productos = require("../models/Productos");

exports.obtenerProducto = async (req, res) => {
  res.status(404).json({ msg: "Obtener producto" });
};

exports.crearProducto = async (req, res) => {
  try {
    const producto = new Productos(req.body);
    producto.save();
    res.json(producto);
  } catch (error) {
    console.log(error);
  }
};

exports.actualizarProducto = async (req, res) => {
  res.status(404).json({ msg: "Actualizar producto" });
};

exports.borrarProducto = async (req, res) => {
  res.status(404).json({ msg: "Borrar producto" });
};

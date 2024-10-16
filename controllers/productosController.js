const Productos = require("../models/Productos");

//Consulta que nos permite realizar el filtro en la base de datos
exports.obtenerProductosHome = async (req, res) => {
  try {
    const productos  = await Productos.find();

    res.json({ productos });
  } catch (error) {
    console.log(error);
  }
};

//Consulta que nos permite realizar el filtro en la base de datos
exports.obtenerProducto = async (req, res) => {
  const { id } = req.params
  const producto = await Productos.find().where("categoriaId").equals(id);
  res.json(producto);
  //res.status(404).json({ msg: "Obtener producto" });
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

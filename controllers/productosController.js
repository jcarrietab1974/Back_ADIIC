const Productos = require("../models/Productos");

// Consulta que nos permite realizar el filtro en la base de datos
exports.obtenerProductosHome = async (req, res) => {
  try {
    const productos = await Productos.find();
    res.json({ productos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener productos" });
  }
};

// Consulta que nos permite realizar el filtro en la base de datos
exports.obtenerListaDeProductosPorCategoriaId = async (req, res) => {
  const { id } = req.params;
  try {
    const productos = await Productos.find().where("categoriaId").equals(id);
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener productos por categoría" });
  }
};

//----
exports.obtenerProductoPorProductoId = async (req, res) => {
  const { id } = req.params;
  try {
    const productos = await Productos.find().where("_id").equals(id);
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener productos por categoría" });
  }
};

exports.crearProducto = async (req, res) => {
  const { nombre, descripcion, stock, precio, imagen, categoriaId } = req.body;

  // Validación de datos
  if (!nombre || !descripcion || !stock || !precio || !imagen || !categoriaId) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    const producto = new Productos(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el producto" });
  }
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { categoriaId } = req.body; // Obtener el ID de la categoría del cuerpo de la solicitud

  try {
    const producto = await Productos.findById(id);

    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    // Validar que el ID de la categoría coincida
    if (categoriaId && categoriaId !== producto.categoriaId.toString()) {
      return res.status(400).json({ msg: "El ID de la categoría no coincide" });
    }

    // Actualizar los campos del producto
    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.stock = req.body.stock || producto.stock;
    producto.precio = req.body.precio || producto.precio;
    producto.imagen = req.body.imagen || producto.imagen;

    await producto.save(); // Esperar a que se guarde el producto actualizado
    res.json({ producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el producto" });
  }
};

exports.borrarProducto = async (req, res) => {
  try {
    const resultado = await Productos.deleteOne({ _id: req.params.id });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }
    res.json({ msg: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el producto" });
  }
};

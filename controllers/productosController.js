const Productos = require("../models/Productos");

// Obtener todos los productos
exports.obtenerProductosHome = async (req, res) => {
  try {
    const productos = await Productos.find()
      .populate("categoriaId", "nombre") // Obtener nombre de la categoría
      .select("-__v") // Excluir campo `__v`
      .sort({ creado: -1 }); // Ordenar por fecha de creación

    res.json({ productos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener productos" });
  }
};

// Obtener productos por ID de categoría
exports.obtenerListaDeProductosPorCategoriaId = async (req, res) => {
  const { id } = req.params;
  try {
    const productos = await Productos.find({ categoriaId: id })
      .populate("categoriaId", "nombre")
      .select(
        "referencia nombre descripcion stock talla color precio imagen creado"
      );

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener productos por categoría" });
  }
};

// Obtener producto por su ID
exports.obtenerProductoPorProductoId = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Productos.findById(id).populate(
      "categoriaId",
      "nombre"
    );

    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al obtener el producto" });
  }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  const {
    referencia,
    nombre,
    descripcion,
    stock,
    talla,
    color,
    precio,
    imagen,
    categoriaId,
  } = req.body;

  if (
    !referencia ||
    !nombre ||
    !descripcion ||
    !stock ||
    !talla ||
    !color ||
    !precio ||
    !imagen ||
    !categoriaId
  ) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  try {
    const producto = new Productos({
      referencia,
      nombre,
      descripcion,
      stock,
      talla,
      color,
      precio,
      imagen,
      categoriaId,
    });

    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al crear el producto" });
  }
};

// Actualizar un producto por su ID
exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { categoriaId } = req.body;

  try {
    let producto = await Productos.findById(id);
    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    // Validar que el ID de la categoría sea correcto
    if (categoriaId && categoriaId !== producto.categoriaId.toString()) {
      return res.status(400).json({ msg: "El ID de la categoría no coincide" });
    }

    // Actualizar los campos permitidos
    producto = await Productos.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true } // Retorna el producto actualizado
    );

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al actualizar el producto" });
  }
};

// Eliminar un producto por su ID
exports.borrarProducto = async (req, res) => {
  try {
    const producto = await Productos.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    res.json({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al eliminar el producto" });
  }
};

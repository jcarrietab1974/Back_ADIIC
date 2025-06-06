const Cabecera = require("../models/Cabecera");

// Obtener todas las cabeceras
exports.listarCabecera = async (req, res) => {
  try {
    const cabeceras = await Cabecera.find({});
    res.status(200).json(cabeceras);
  } catch (error) {
    res.status(500).json({ msg: "Error al listar las cabeceras" });
  }
};

// Buscar una cabecera por NIT
exports.buscarCabeceraPorNit = async (req, res) => {
  try {
    const { nit } = req.params;
    const cabecera = await Cabecera.findOne({ nit });

    if (!cabecera) {
      return res.status(404).json({ msg: "Cabecera no encontrada" });
    }

    res.status(200).json(cabecera);
  } catch (error) {
    res.status(500).json({ msg: "Error al buscar la cabecera" });
  }
};

// Buscar una cabecera para generar factura
exports.listarCabeceraPersonalizado = async (req, res) => {
  const cabeceraFactura = await Cabecera.find({}).select("_id local direccion");
  return res.status(200).json(cabeceraFactura);
};

/// Crear una nueva cabecera
exports.crearCabecera = async (req, res) => {
  try {
    // Crear la cabecera con los datos recibidos y el usuario autenticado
    const cabecera = new Cabecera({
      ...req.body, // Mantiene los datos del request
      creador: req.usuario.id, // Asigna el usuario autenticado
    });

    await cabecera.save();
    res.status(201).json({ msg: "Cabecera creada correctamente", cabecera });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la cabecera" });
  }
};

// Actualizar una cabecera
exports.actualizarCabecera = async (req, res) => {
  try {
    const { id } = req.params;
    const cabecera = await Cabecera.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!cabecera) {
      return res.status(404).json({ msg: "Cabecera no encontrada" });
    }

    res.status(200).json({ msg: "Cabecera actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar la cabecera" });
  }
};

// Eliminar una cabecera
exports.eliminarCabecera = async (req, res) => {
  try {
    const { id } = req.params;
    const cabecera = await Cabecera.findByIdAndDelete(id);

    if (!cabecera) {
      return res.status(404).json({ msg: "Cabecera no encontrada" });
    }

    res.status(200).json({ msg: "Cabecera eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la cabecera" });
  }
};

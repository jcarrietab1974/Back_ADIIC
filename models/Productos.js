const mongoose = require("mongoose");

const ProductosSchema = mongoose.Schema({
  referencia: { type: String, required: true, trim: true },
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, trim: true },
  talla: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, trim: true },
  imagen: { type: String, required: true, trim: true },
  creado: { type: Date, default: Date.now },
  categoriaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorias",
    required: true,
  },
});

module.exports = mongoose.model("Productos", ProductosSchema);

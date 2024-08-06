//const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const ProductosSchema = mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, requiere: true, trim: true },
  stock: { type: Number, requiere: true, trim: true },
  precio: { type: Number, requiere: true, trim: true },
  imagen: { type: String, required: true, trim: true },
  creado: { type: Date, default: Date.now() },
  categoriaId: {type: mongoose.Schema.types.objetId, ref:"Categorias"},
});
//Definir el modelo
module.exports = mongoose.model("Productos", ProductosSchema);
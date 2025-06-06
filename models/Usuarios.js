const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  rol: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  registro: { type: Date, default: Date.now() },
});
//Definir el modelo
module.exports = mongoose.model("Usuarios", UsuariosSchema);

const Usuario = require("../models/Usuarios");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

exports.autenticarUsuario = async (req, res) => {
  const { password, email } = req.body;
  try {
    //Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ msg: "El usuario no existe" });
    }
    //Revisar el pasword
    const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    //Si todo es correcto : crear y firmar un token
    const payload = {
      usuario: { id: usuario.id },
    };
    //res.json(payload);
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: "30d", //30 dias
      },
      (error, token) => {
        if (error) throw error;
        //Mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
// Cambio
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    res.json({ usuario });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");

router.post("/", usuarioController.crearUsuario);

/*router.get("/", (req, res) => {
  res.json({ msg: "desde router get json" });
});

router.post("/", (req, res) => {
  res.json({ msg: "desde router post jsonpostman" });
});

router.put("/", (req, res) => {
  res.json({ msg: "desde router put es para actualizar json postman" });
});

router.delete("/", (req, res) => {
  res.json({ msg: "desde router delete es para borrar json postman" });
});*/

//Definir las rutas
module.exports = router;

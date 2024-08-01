const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuariosController");

// router.get("/", (req, res) =>{
    // res.json({msg:"desde router get json"});
// });

// router.post("/", (req, res) =>{
    // res.json({msg:"desde router post  json hacia postman"});
// });

// router.put("/", (req, res) =>{
    // res.json({msg:"desde router put es para actualizar el postman"});
// });

// router.delete("/", (req, res) =>{
    // res.json({msg:"desde router delete es para borrar el postman"});
// ]});

router.post ("/", usuarioController.crearUsuario);

// Definir las rutas
module.exports = router;    
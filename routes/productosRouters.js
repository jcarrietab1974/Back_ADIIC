const express = require("express");
const router = express.Router();
const authMidd = require("../middleware/authMidd");
const productosController = require("../controllers/productosController");

router.get("/", productosController.obtenerProductosHome);
router.get("/:id", authMidd, productosController.obtenerProductoPorProductoId);
router.get(
  "/porcategoria/:id",
  authMidd,
  productosController.obtenerListaDeProductosPorCategoriaId
);
router.post("/", authMidd, productosController.crearProducto);
router.put("/:id", authMidd, productosController.actualizarProducto);
router.delete("/:id", authMidd, productosController.borrarProducto);

//Definir las rutas
module.exports = router;

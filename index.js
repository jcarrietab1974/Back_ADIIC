const express = require("express");
const conectarDB = require("./config/db");
const usuarioRoutes = require("./routes/usuarioRoutes");
const auth = require("./routes/auth");
const categoriasRouters = require("./routes/categoriasRouters");
const productosRouters = require("./routes/productosRouters");
const cosr = require("cors");

const app = express();
app.use(express.json({ extended: true }));
conectarDB();
//Habilitar CORS
app.use(cosr());

//Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", auth);
app.use("/api/categorias", categoriasRouters);
app.use("/api/productos", productosRouters);

app.listen(4000, () => {
  console.log("Servidor corriendo en el puerto 4000");
});

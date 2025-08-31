const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// Importación de rutas
const usuarioRoutes = require("./routes/usuarioRoutes");
const auth = require("./routes/auth");
const categoriasRouters = require("./routes/categoriasRouters");
const productosRouters = require("./routes/productosRouters");
const clientesRouters = require("./routes/clientesRouters");
const cabeceraRouters = require("./routes/cabeceraRouters");
const facturaRouters = require("./routes/facturaRouters");

const app = express();

// Middleware
app.use(express.json({ extended: true }));
//Habilitar CORS
app.use(cors());

// Conectar a la base de datos
conectarDB();

//Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", auth);
app.use("/api/categorias", categoriasRouters);
app.use("/api/productos", productosRouters);
app.use("/api/clientes", clientesRouters);
app.use("/api/cabecera", cabeceraRouters);
app.use("/api/factura", facturaRouters);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

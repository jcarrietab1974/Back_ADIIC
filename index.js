const express = require("express");
const conectarDB = require("./config/db");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(express.json({extended:true}));
conectarDB();

// rutas

app.use("/api/usuarios", usuarioRoutes);



app.listen(4000, () =>{
    console.log("Servidor corriendo en el puerto 4000");
});
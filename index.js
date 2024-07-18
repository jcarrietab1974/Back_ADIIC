const express = require("express");
const conectarDB = require("./config/db");

const app = express();

conectarDB();

app.listen(4000, () => {
  console.log("Servidor corriendo en el puerto 4000");
});

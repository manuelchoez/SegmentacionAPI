const express = require("express");
const clientesRoutes = require("./routes/clientesRoutes.js");

const app = express();

app.use(express.json());
app.use("/api/clientes", clientesRoutes);

module.exports = app;

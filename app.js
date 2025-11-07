import express from "express";
import segmentacionRoutes from "./src/routes/clientesRoutes.js";

const app = express();
app.use(express.json());

// Montamos bajo /api/clientes
app.use("/api/clientes", segmentacionRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "API de Segmentación funcionando 🚀" });
});

export default app;

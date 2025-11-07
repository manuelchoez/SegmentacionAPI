import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Cliente from "../models/clienteModel.js";
import { obtenerTodos, buscarPorIdentificacion, filtrarPorRiesgo } from "../services/segmentacionService.js";

const router = express.Router();

// Necesario para __dirname en módulos ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/clientes.json");

// ✅ Obtener todos los clientes
router.get("/", (req, res) => {
  const data = obtenerTodos();
  res.json(data);
});

// ✅ Buscar por identificación
router.get("/:identificacion", (req, res) => {
  const cliente = buscarPorIdentificacion(req.params.identificacion);
  if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
  res.json(cliente);
});

// ✅ Filtrar por nivel de riesgo
router.get("/riesgo/:nivel", (req, res) => {
  const filtrados = filtrarPorRiesgo(req.params.nivel);
  res.json(filtrados);
});

// ✅ Agregar un nuevo cliente (POST)
router.post("/", (req, res) => {
  const clientes = JSON.parse(fs.readFileSync(dataPath, "utf8"));
  const nuevoCliente = new Cliente({
    id: clientes.length + 1,
    ...req.body
  });

  clientes.push(nuevoCliente);
  fs.writeFileSync(dataPath, JSON.stringify(clientes, null, 2));
  res.status(201).json(nuevoCliente);
});

export default router;

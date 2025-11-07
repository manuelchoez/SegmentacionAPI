const express = require("express");
const { obtenerTodos, buscarPorIdentificacion, filtrarPorRiesgo } = require("../services/segmentacionService.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(obtenerTodos());
});

router.get("/:identificacion", (req, res) => {
  const cliente = buscarPorIdentificacion(req.params.identificacion);
  if (!cliente) return res.status(404).json({ mensaje: "Cliente no encontrado" });
  res.json(cliente);
});

router.get("/riesgo/:nivel", (req, res) => {
  res.json(filtrarPorRiesgo(req.params.nivel));
});

// ...existing code...

const fs = require('fs');
const path = require('path');
const Cliente = require('../models/clienteModel');
const dataPath = path.join(__dirname, '../data/clientes.json');

router.post('/', (req, res) => {
  const clientes = require(dataPath);
  const nuevoCliente = new Cliente({
    id: clientes.length + 1,
    ...req.body
  });
  clientes.push(nuevoCliente);
  fs.writeFileSync(dataPath, JSON.stringify(clientes, null, 2));
  res.status(201).json(nuevoCliente);
});

module.exports = router;

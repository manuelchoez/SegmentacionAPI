import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/clientes.json");
const clientes = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// ✅ Obtener todos los clientes
export const obtenerTodos = () => clientes;

// ✅ Calcular riesgo del cliente
export const calcularRiesgoCliente = (cliente) => {
  const {
    diasMora,
    score,
    nivelEndeudamiento,
    antiguedadCliente,
    ingresosMensuales,
    capacidadPago,
    tieneGarantia,
    historialAtrasos
  } = cliente;

  let puntaje = 0;

  // Score crediticio
  if (score >= 800) puntaje += 30;
  else if (score >= 700) puntaje += 25;
  else if (score >= 600) puntaje += 15;
  else puntaje += 5;

  // Mora
  if (diasMora === 0) puntaje += 25;
  else if (diasMora <= 8) puntaje += 20;
  else if (diasMora <= 30) puntaje += 10;
  else puntaje -= 10;

  // Endeudamiento
  if (nivelEndeudamiento < 0.3) puntaje += 15;
  else if (nivelEndeudamiento < 0.5) puntaje += 10;
  else puntaje -= 10;

  // Antigüedad
  if (antiguedadCliente > 5) puntaje += 10;
  else if (antiguedadCliente >= 2) puntaje += 5;

  // Capacidad de pago
  if (capacidadPago > 0.5) puntaje += 10;
  else if (capacidadPago > 0.3) puntaje += 5;
  else puntaje -= 5;

  // Garantía
  if (tieneGarantia) puntaje += 5;
  else puntaje -= 5;

  // Historial de atrasos
  if (historialAtrasos === 0) puntaje += 10;
  else if (historialAtrasos <= 2) puntaje += 5;
  else puntaje -= 10;

  // Determinación de nivel de riesgo
  let riesgo = "RE";
  if (puntaje >= 85) riesgo = "RAAA";
  else if (puntaje >= 70) riesgo = "RAA";
  else if (puntaje >= 55) riesgo = "RB";
  else if (puntaje >= 40) riesgo = "RC";
  else if (puntaje >= 25) riesgo = "RD";

  return { riesgo, puntaje };
};

// ✅ Buscar cliente por identificación
export const buscarPorIdentificacion = (id) => {
  const cliente = clientes.find((c) => c.identificacion === id);
  if (!cliente) return null;

  const { riesgo, puntaje } = calcularRiesgoCliente(cliente);
  return {
    identificacion: cliente.identificacion,
    riesgo,
    puntajeInterno: puntaje,
    segmento: cliente.producto || cliente.segmento || "",
    detalle: {
      score: cliente.score,
      nivelEndeudamiento: cliente.nivelEndeudamiento,
      diasMora: cliente.diasMora,
      capacidadPago: cliente.capacidadPago,
      garantia: cliente.tieneGarantia,
      historialAtrasos: cliente.historialAtrasos
    }
  };
};

// ✅ Filtrar clientes por nivel de riesgo
export const filtrarPorRiesgo = (nivel) => {
  return clientes.filter((c) => {
    const { riesgo } = calcularRiesgoCliente(c);
    return riesgo.toLowerCase() === nivel.toLowerCase();
  });
};

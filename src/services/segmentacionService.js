const clientes = require("../data/clientes.json");

const obtenerTodos = () => clientes;

const calcularRiesgoCliente = (cliente) => {
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
  if (score >= 800) puntaje += 30;
  else if (score >= 700) puntaje += 25;
  else if (score >= 600) puntaje += 15;
  else puntaje += 5;

  if (diasMora === 0) puntaje += 25;
  else if (diasMora <= 8) puntaje += 20;
  else if (diasMora <= 30) puntaje += 10;
  else puntaje -= 10;

  if (nivelEndeudamiento < 0.3) puntaje += 15;
  else if (nivelEndeudamiento < 0.5) puntaje += 10;
  else puntaje -= 10;

  if (antiguedadCliente > 5) puntaje += 10;
  else if (antiguedadCliente >= 2) puntaje += 5;

  if (capacidadPago > 0.5) puntaje += 10;
  else if (capacidadPago > 0.3) puntaje += 5;
  else puntaje -= 5;

  if (tieneGarantia) puntaje += 5;
  else puntaje -= 5;

  if (historialAtrasos === 0) puntaje += 10;
  else if (historialAtrasos <= 2) puntaje += 5;
  else puntaje -= 10;

  let riesgo = "RE";
  if (puntaje >= 85) riesgo = "RAAA";
  else if (puntaje >= 70) riesgo = "RAA";
  else if (puntaje >= 55) riesgo = "RB";
  else if (puntaje >= 40) riesgo = "RC";
  else if (puntaje >= 25) riesgo = "RD";

  return { riesgo, puntaje };
};

const buscarPorIdentificacion = (id) => {
  const cliente = clientes.find(c => c.identificacion === id);
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

const filtrarPorRiesgo = (nivel) => {
  return clientes.filter(c =>
    c.segmentos.some(s => s.descripcion.includes("Riesgo LAFT") && s.valor.toLowerCase() === nivel.toLowerCase())
  );
};

module.exports = {
  obtenerTodos,
  buscarPorIdentificacion,
  filtrarPorRiesgo,
  calcularRiesgoCliente
};

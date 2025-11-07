class Cliente {
  constructor({
    id,
    identificacion,
    diasMora,
    score,
    nivelEndeudamiento,
    antiguedadCliente,
    ingresosMensuales,
    montoCredito,
    capacidadPago,
    tieneGarantia,
    historialAtrasos,
    producto,
    bancarizado,
    tipoCliente
  }) {
    this.id = id;
    this.identificacion = identificacion;
    this.diasMora = diasMora;
    this.score = score;
    this.nivelEndeudamiento = nivelEndeudamiento;
    this.antiguedadCliente = antiguedadCliente;
    this.ingresosMensuales = ingresosMensuales;
    this.montoCredito = montoCredito;
    this.capacidadPago = capacidadPago;
    this.tieneGarantia = tieneGarantia;
    this.historialAtrasos = historialAtrasos;
    this.producto = producto;
    this.bancarizado = bancarizado;
    this.tipoCliente = tipoCliente;
  }
}

module.exports = Cliente;

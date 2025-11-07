import json
import random

def generar_identificacion():
    """Genera un número de cédula ecuatoriana simulado"""
    return str(random.randint(1000000000, 9999999999))

def generar_cliente():
    productos = ["microcredito", "consumo", "comercial", "hipotecario"]
    tipo_cliente = random.choice(["natural", "juridica"])
    
    return {
        "identificacion": generar_identificacion(),
        "diasMora": random.choice([0, 0, 0, 5, 10, 20, 35, 60, 120]),  # más probabilidad de pocos días
        "score": random.randint(400, 850),
        "nivelEndeudamiento": round(random.uniform(0.1, 0.9), 2),
        "antiguedadCliente": random.randint(0, 15),
        "ingresosMensuales": random.choice(range(400, 8000, 100)),
        "montoCredito": random.choice(range(500, 50000, 500)),
        "capacidadPago": round(random.uniform(0.2, 0.8), 2),
        "tieneGarantia": random.choice([True, False]),
        "historialAtrasos": random.randint(0, 6),
        "producto": random.choice(productos),
        "bancarizado": random.choice([True, True, True, False]),  # 75% bancarizados
        "tipoCliente": tipo_cliente
    }

def generar_clientes(n=20000):
    clientes = [generar_cliente() for _ in range(n)]
    with open("clientes.json", "w", encoding="utf-8") as f:
        json.dump(clientes, f, indent=2, ensure_ascii=False)
    print(f"✅ Se generaron {n} clientes en 'clientes.json'")

if __name__ == "__main__":
    generar_clientes()

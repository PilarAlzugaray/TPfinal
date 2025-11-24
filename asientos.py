# asientosfuncion
asientos_funciones = {
    1: {"asientosOcupados": [1, 7, 21, 33, 34, 35, 37, 48, 61, 69, 70, 84, 85, 89, 97]},
    2: {"asientosOcupados": [2, 20, 31, 34, 36, 37, 46, 49, 52, 54, 70, 74, 77, 83, 94]},
    3: {"asientosOcupados": [2, 3, 20, 21, 53, 56, 61, 64, 69, 73, 79, 81, 90, 92, 96]}
}

def obtener_asientos_ocupados(funcion_id):
    # Devuelve los asientos ocupados para la función solicitada
    return asientos_funciones.get(funcion_id, {}).get("asientosOcupados", [])

def reservar_asiento(funcion_id, id_asiento):
    # Verifica si el asiento ya está ocupado
    if id_asiento in asientos_funciones.get(funcion_id, {}).get("asientosOcupados", []):
        return {"error": "El asiento ya está ocupado"}
    
    # Si no está ocupado, lo reserva agregándolo a la lista de ocupados
    asientos_funciones[funcion_id]["asientosOcupados"].append(id_asiento)
    return {"message": "Asiento reservado exitosamente", "asientosOcupados": asientos_funciones[funcion_id]["asientosOcupados"]}

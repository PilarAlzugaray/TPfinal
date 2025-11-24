# funciones.py

# Base de datos de funciones para el cine
funciones_cine = [
    {
        'idFuncion': 1,
        'nombreFuncion': 'Función 1',
        'fecha': '7/12/2025',
        'hora': '18:00',
        'grupo': 'Grupo A',
        'duracion': '2 horas',
        'precio': 5000,
        'asientosOcupados': [1, 7, 21, 33, 34, 35, 37, 48, 61, 69, 70, 84, 85, 89, 97]  
    },
    {
        'idFuncion': 2,
        'nombreFuncion': 'Función 2',
        'fecha': '8/12/2025',
        'hora': '20:00',
        'grupo': 'Grupo B',
        'duracion': '2 horas y 30 minutos',
        'precio': 6000,
        'asientosOcupados': [2, 20, 31, 34, 36, 37, 46, 49, 52, 54, 70, 74, 77, 83, 94]  
    },
    {
        'idFuncion': 3,
        'nombreFuncion': 'Función 3',
        'fecha': '9/12/2025',
        'hora': '18:00',
        'grupo': 'Grupo C',
        'duracion': '1 hora y 45 minutos',
        'precio': 5500,
        'asientosOcupados': [2, 3, 20, 21, 53, 56, 61, 64, 69, 73, 79, 81, 90, 92, 96]  
    }
]

def obtener_funcion(funcion_id):
    """Devuelve los detalles de la función solicitada."""
    return next((funcion for funcion in funciones_cine if funcion['idFuncion'] == funcion_id), None)

def listar_funciones():
    """Devuelve una lista de todas las funciones disponibles."""
    return funciones_cine

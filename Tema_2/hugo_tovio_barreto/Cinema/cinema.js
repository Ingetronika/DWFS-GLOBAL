// Definir el tamaño de la matriz de butacas
const N = 10; // Número de filas y columnas

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++, // Asignar un ID único
                estado: false // Estado inicial libre
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();

// Función para sugerir asientos
function suggest(asientosSolicitados) {
    if (asientosSolicitados > N) {
        return new Set(); // Si los asientos solicitados exceden el tamaño de la fila, devolver un set vacío
    }

    // Recorrer las filas desde la más lejana (última fila) hacia la primera
    for (let i = N - 1; i >= 0; i--) {
        let fila = butacas[i];
        let contador = 0;
        let ids = [];

        // Recorrer la fila buscando asientos libres consecutivos
        for (let j = 0; j < N; j++) {
            if (fila[j].estado === false) { // Si el asiento está libre
                contador++;
                ids.push(fila[j].id); // Agregar el ID del asiento a la lista de IDs seleccionados

                // Si hemos encontrado suficientes asientos consecutivos
                if (contador === asientosSolicitados) {
                    return new Set(ids); // Devolver un Set con los IDs de los asientos seleccionados
                }
            } else {
                // Resetear el contador si encontramos un asiento ocupado
                contador = 0;
                ids = [];
            }
        }
    }

    // Si no se encuentran asientos suficientes en ninguna fila
    return new Set();
}

// Ejemplo de uso de la función
let resultado = suggest(4);
console.log(resultado); // Imprime el set de IDs de los asientos seleccionados o un set vacío si no se pudo encontrar una solución

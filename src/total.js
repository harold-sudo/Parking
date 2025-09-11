import fraccionarTiempo from './ftiempo';
import tarifario from './tarifario';

/**
 * Calcula el costo total basado en el tiempo fraccionado.
 * @param {Date} ingreso - La fecha y hora de ingreso.
 * @param {Date} salida - La fecha y hora de salida.
 * @param {string} ticket - 'si' o 'no', para aplicar tarifa especial.
 * @returns {string} El costo total en formato "BS. XX.XX".
 */
export default function calcularCostoTotal(ingreso, salida, ticket) {
    if (ticket == "no")
    {
        try {
        const bloques = fraccionarTiempo(ingreso, salida);
         let costoTotal = 0;

        for (const bloque of bloques) {
            if (bloque.tipo === 'día completo') {
        // La lógica para "día completo" no está en tu función tarifario,
        // por lo que necesitamos definirla aquí.
        // Asumiendo que un día completo tiene una tarifa fija o especial.
        // Por ejemplo:
                costoTotal += 50; 
            } else {
                const { horas, minutos, tipo } = bloque;
                // La función tarifario devuelve un string con 'BS.', así que necesitamos extraer el número.
                const costoBloqueStr = tarifario(horas, minutos, tipo);
                const costoBloque = parseFloat(costoBloqueStr.replace('BS. ', ''));
                costoTotal += costoBloque;
            }
        }

    return `Bs. ${costoTotal.toFixed(2)}`;

    } catch (error) {
        console.error(error.message);
        return `Error: ${error.message}`;
    }
  }
  else{
    return "Bs. 80.00";
    }
}
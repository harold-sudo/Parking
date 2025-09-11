import fraccionarTiempo from './ftiempo.js';
import tarifario from './tarifario.js';

/**
 * Calcula el costo total y proporciona un desglose detallado.
 * @param {Date} ingreso - La fecha y hora de ingreso.
 * @param {Date} salida - La fecha y hora de salida.
 * @param {string} ticket - 'si' (perdido) o 'no' (presente).
 * @returns {object} Un objeto con el costo total y el desglose de cobros.
 */
export default function calcularCostoTotal2(ingreso, salida, ticket) {
  // Lógica principal: si se pierde el ticket, la tarifa es fija y no se calcula nada más.
  if (ticket === "si") {
    return {
      costoTotal: "BS. 80.00",
      desglose: [{
        tipo: 'Penalidad',
        descripcion: 'Pérdida de ticket',
        costo: "BS. 80.00"
      }]
    };
  }

  try {
    const bloques = fraccionarTiempo(ingreso, salida);
    let costoTotal = 0;
    const desglose = [];

    for (const bloque of bloques) {
      if (bloque.tipo === 'día completo') {
        const costoBloque = 50;
        costoTotal += costoBloque;
        desglose.push({
          ...bloque,
          costo: `BS. ${costoBloque.toFixed(2)}`
        });
      } else {
        const { horas, minutos, tipo } = bloque;
        const costoBloqueStr = tarifario(horas, minutos, tipo, ticket);
        const costoBloque = parseFloat(costoBloqueStr.replace('BS. ', ''));
        costoTotal += costoBloque;

        desglose.push({
          ...bloque,
          costo: costoBloqueStr
        });
      }
    }

    return {
      costoTotal: `BS. ${costoTotal.toFixed(2)}`,
      desglose: desglose
    };

  } catch (error) {
    throw new Error(error.message);
  }
}
// src/fraccionarTiempo.js
// Implementación final y robusta para fraccionar estadías en bloques:
// - Turno nocturno: 22:00 - 06:00
// - Turno diurno: 06:00 - 22:00
// - "día completo" = día calendario completo (00:00 - 24:00)

const MS_PER_MIN = 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default function fraccionarTiempo(ingreso, salida) {
  if (!(ingreso instanceof Date) || !(salida instanceof Date)) {
    throw new Error('ingreso y salida deben ser objetos Date');
  }
  if (salida <= ingreso) {
    throw new Error('La fecha de salida debe ser posterior al ingreso');
  }

  const bloques = [];

  // Primer corte: desde ingreso hasta la medianoche siguiente
  const firstMidnight = nextMidnight(ingreso); // 00:00 del día siguiente al ingreso
  if (salida <= firstMidnight) {
    // todo ocurre antes de la primera medianoche: fracciona directamente
    return mergeAdjacentBlocks(fraccionarPorTurnos(ingreso, salida));
  }

  // 1) fraccionar desde ingreso hasta la primera medianoche
  bloques.push(...fraccionarPorTurnos(ingreso, firstMidnight));

  // 2) contar días completos entre medianoches
  const lastMidnight = getMidnight(salida); // 00:00 del día de la salida
  let fullDaysMillis = lastMidnight.getTime() - firstMidnight.getTime();
  if (fullDaysMillis >= MS_PER_DAY) {
    const fullDays = Math.floor(fullDaysMillis / MS_PER_DAY);
    for (let i = 0; i < fullDays; i++) {
      bloques.push({ tipo: 'día completo' });
    }
  }

  // 3) fraccionar desde la última medianoche hasta la salida
  if (lastMidnight < salida) {
    bloques.push(...fraccionarPorTurnos(lastMidnight, salida));
  }

  // Finalmente, unir bloques adyacentes del mismo tipo (p. ej. 30m + 30m nocturno -> 1h nocturno)
  return mergeAdjacentBlocks(bloques);
}

// --- Helpers ---

function fraccionarPorTurnos(inicio, fin) {
  const res = [];
  let actual = new Date(inicio);

  while (actual < fin) {
    const siguiente = getNextBoundary(actual);
    const corte = siguiente < fin ? siguiente : fin;

    const diffMin = Math.floor((corte.getTime() - actual.getTime()) / MS_PER_MIN);
    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;

    if (horas > 0 || minutos > 0) {
      res.push({ horas, minutos, tipo: getTipo(actual) });
    }

    actual = corte;
  }

  return res;
}

// Devuelve el próximo límite de turno (06:00 o 22:00) relativo a la fecha dada
function getNextBoundary(fecha) {
  const h = fecha.getHours();
  const b = new Date(fecha);
  b.setSeconds(0, 0);

  if (h >= 22) {
    // próximo 06:00 del día siguiente
    b.setDate(b.getDate() + 1);
    b.setHours(6, 0, 0, 0);
  } else if (h >= 6) {
    // mismo día 22:00
    b.setHours(22, 0, 0, 0);
  } else {
    // mismo día 06:00
    b.setHours(6, 0, 0, 0);
  }

  return b;
}

function getTipo(fecha) {
  const h = fecha.getHours();
  return h >= 22 || h < 6 ? 'nocturno' : 'diurno';
}

function getMidnight(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0, 0, 0);
}

function nextMidnight(fecha) {
  const m = getMidnight(fecha);
  return new Date(m.getTime() + MS_PER_DAY);
}

function mergeAdjacentBlocks(blocks) {
  const out = [];

  for (const b of blocks) {
    if (b.tipo === 'día completo') {
      // día completo se añade tal cual
      out.push(b);
      continue;
    }

    // Normalizar valores numéricos
    const minutosActual = (b.horas || 0) * 60 + (b.minutos || 0);
    if (minutosActual === 0) continue; // ignorar bloques nulos

    const last = out[out.length - 1];
    if (last && last.tipo && last.tipo !== 'día completo' && last.tipo === b.tipo) {
      // sumar al bloque anterior
      const lastMin = (last.horas || 0) * 60 + (last.minutos || 0);
      const totalMin = lastMin + minutosActual;
      last.horas = Math.floor(totalMin / 60);
      last.minutos = totalMin % 60;
    } else {
      // empujar copia para evitar mutaciones externas
      out.push({ horas: b.horas, minutos: b.minutos, tipo: b.tipo });
    }
  }

  return out;
}



// ---- Versión base para obtener la duración y el tipo de turno ----
// function tiempo(ingreso, salida) {
//   const diffMs = salida - ingreso;
//   if (diffMs < 0) throw new Error("La fecha de salida no puede ser menor que la de ingreso");

//   const diffMin = Math.floor(diffMs / 60000);
//   const horas = Math.floor(diffMin / 60);
//   const minutos = diffMin % 60;

//   const h = ingreso.getHours();
//   const tipo = h >= 22 || h < 6 ? "nocturno" : "diurno";

//   return { horas, minutos, tipo };
// }

// export default tiempo;

// function tiempo(ingreso, salida) {
//     const diffMs = salida - ingreso;
//     if (diffMs < 0) throw new Error("La fecha de salida no puede ser menor que la de ingreso");

//     const diffMin = Math.floor(diffMs / 60000);
//     const horas = Math.floor(diffMin / 60);
//     const minutos = diffMin % 60;

//     const horaIngreso = ingreso.getHours();

//   // Turno nocturno: 22:00 – 06:00
//     const tipo =
//         horaIngreso >= 22 || horaIngreso < 6
//         ? "nocturno"
//         : "diurno";

//     return {horas, minutos, tipo};
// }

// export default tiempo;
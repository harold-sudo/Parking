function fraccionarTiempo(ingreso, salida) {
  if (salida <= ingreso) {
    throw new Error("La fecha de salida debe ser posterior al ingreso");
  }

  const bloques = [];

  // Paso 1: desde ingreso hasta la medianoche siguiente
  let actual = new Date(ingreso);
  const primeraMedianoche = new Date(ingreso);
  primeraMedianoche.setHours(24, 0, 0, 0); // 00:00 del día siguiente

  if (primeraMedianoche < salida) {
    bloques.push(...fraccionarPorTurnos(actual, primeraMedianoche));
    actual = primeraMedianoche;
  }

  // Paso 2: contar días completos entre medianoches
  while (actual.getTime() + 24 * 60 * 60 * 1000 <= salida.getTime()) {
    bloques.push({ tipo: "día completo" });
    actual = new Date(actual.getTime() + 24 * 60 * 60 * 1000);
  }

  // Paso 3: desde última medianoche hasta salida
  if (actual < salida) {
    bloques.push(...fraccionarPorTurnos(actual, salida));
  }

  return bloques;
}

// Fracciona un rango en bloques diurno/nocturno según cortes 6 y 22
function fraccionarPorTurnos(inicio, fin) {
  const bloques = [];
  let actual = new Date(inicio);

  while (actual < fin) {
    const siguienteCorte = getSiguienteCorte(actual);
    const corte = siguienteCorte < fin ? siguienteCorte : fin;

    const diffMin = Math.floor((corte - actual) / 60000);
    const horas = Math.floor(diffMin / 60);
    const minutos = diffMin % 60;

    if (horas > 0 || minutos > 0) {
      bloques.push({ horas, minutos, tipo: getTipo(actual) });
    }

    actual = corte;
  }

  return bloques;
}

// Determina el tipo según la hora
function getTipo(fecha) {
  const h = fecha.getHours();
  return h >= 22 || h < 6 ? "nocturno" : "diurno";
}

// Calcula próximo corte en 6 o 22
function getSiguienteCorte(fecha) {
  const h = fecha.getHours();
  const corte = new Date(fecha);

  if (h >= 22) {
    corte.setDate(corte.getDate() + 1);
    corte.setHours(6, 0, 0, 0);
  } else if (h >= 6) {
    corte.setHours(22, 0, 0, 0);
  } else {
    corte.setHours(6, 0, 0, 0);
  }

  return corte;
}

export default fraccionarTiempo;

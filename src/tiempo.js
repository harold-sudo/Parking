// src/tiempo.js
function tiempo(ingreso, salida) {
  const diffMs = salida - ingreso;
  if (diffMs < 0) throw new Error("La fecha de salida no puede ser menor que la de ingreso");

  const diffMin = Math.floor(diffMs / 60000);
  const horas = Math.floor(diffMin / 60);
  const minutos = diffMin % 60;

  const h = ingreso.getHours();
  const tipo = h >= 22 || h < 6 ? "nocturno" : "diurno";

  return { horas, minutos, tipo };
}

export default tiempo;

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
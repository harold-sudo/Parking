import calcularCostoTotal2 from './desglosar.js';

const form = document.getElementById('registrar-form');
const resultadoDiv = document.getElementById('resultado-div');
const desgloseDiv = document.createElement('div');
desgloseDiv.id = 'desglose-div';

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que la página se recargue

  // 1. Obtener los valores de los campos
  const fechaIngresoStr = document.getElementById('fecha-ingreso').value;
  const horaIngresoStr = document.getElementById('hora-ingreso').value;
  const minutoIngresoStr = document.getElementById('minuto-ingreso').value;

  const fechaSalidaStr = document.getElementById('fecha-salida').value;
  const horaSalidaStr = document.getElementById('hora-salida').value;
  const minutoSalidaStr = document.getElementById('minuto-salida').value;
  
  const ticketPerdido = document.getElementById('ticket-perdido').value;

  // 2. Validar que todos los campos de fecha y hora estén completos
  if (!fechaIngresoStr || !horaIngresoStr || !minutoIngresoStr || 
      !fechaSalidaStr || !horaSalidaStr || !minutoSalidaStr) {
    resultadoDiv.innerHTML = `<h3>Error: Por favor, complete todos los campos de fecha y hora.</h3>`;
    desgloseDiv.innerHTML = '';
    return; // Detiene la ejecución
  }

  // 3. Extraer los componentes de fecha (año, mes, día) y convertir a números
  const [anioIngreso, mesIngreso, diaIngreso] = fechaIngresoStr.split('-').map(Number);
  const [anioSalida, mesSalida, diaSalida] = fechaSalidaStr.split('-').map(Number);

  // 4. Convertir horas y minutos a números
  const hIngreso = parseInt(horaIngresoStr, 10);
  const mIngreso = parseInt(minutoIngresoStr, 10);
  const hSalida = parseInt(horaSalidaStr, 10);
  const mSalida = parseInt(minutoSalidaStr, 10);

  // 5. Crear los objetos Date de forma segura
  const ingreso = new Date(anioIngreso, mesIngreso - 1, diaIngreso, hIngreso, mIngreso);
  const salida = new Date(anioSalida, mesSalida - 1, diaSalida, hSalida, mSalida);

  try {
    // 6. Validar que las fechas sean válidas antes de calcular
    if (isNaN(ingreso.getTime()) || isNaN(salida.getTime())) {
      throw new Error("Fechas u horas inválidas. Por favor, revise los datos.");
    }
    
    // 7. Llamar a la función principal para obtener el resultado completo
    const resultado = calcularCostoTotal2(ingreso, salida, ticketPerdido);

    // 8. Mostrar el costo total
    resultadoDiv.innerHTML = `<h2>El costo total es: ${resultado.costoTotal}</h2>`;
    
    // 9. Mostrar el desglose detallado
    desgloseDiv.innerHTML = '<h3>Detalle de Cobros:</h3>';
    const ul = document.createElement('ul');
    
    resultado.desglose.forEach(item => {
      const li = document.createElement('li');
      let texto = '';
      if (item.tipo === 'día completo') {
        texto = `Día completo: ${item.costo}`;
      } else if (item.tipo === 'Penalidad') {
        texto = `${item.descripcion}: ${item.costo}`;
      } else {
        const horas = item.horas > 0 ? `${item.horas}h` : '';
        const minutos = item.minutos > 0 ? `${item.minutos}m` : '';
        texto = `Bloque ${item.tipo} (${horas} ${minutos}): ${item.costo}`;
      }
      li.textContent = texto;
      ul.appendChild(li);
    });
    
    desgloseDiv.appendChild(ul);

  } catch (error) {
    // 10. Si ocurre un error, lo mostramos al usuario
    resultadoDiv.innerHTML = `<h3>Error: ${error.message}</h3>`;
    desgloseDiv.innerHTML = '';
  }
});

// Agregar el div de desglose al cuerpo del HTML
document.body.appendChild(desgloseDiv);
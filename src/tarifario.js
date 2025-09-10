
function tarifario(hora, minutos, turno) {
  let total = 0;
  if (turno === "am") {
      if (minutos > 0) {
          hora += 1; // redondear hacia arriba si hay minutos adicionales
      }
      total = hora * 10;
      if (total > 50) {
          total = 50; // aplicar tope máximo
      }
  }
  else{  
    if (minutos > 0) {
          hora += 1; // redondear hacia arriba si hay minutos adicionales
      }
    if (hora <= 8)
    {
      total = hora * 6;
    }
  }
    
  return `BS. ${total.toFixed(2)}`;
}

export default tarifario;


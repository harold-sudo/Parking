function tarifario(hora, minutos) {
    if (minutos > 0) {
        hora += 1; // redondear hacia arriba si hay minutos adicionales
    }
    if (hora === 1) {
        return "10 bs.";
    }else if (hora === 2) {
        return "20 bs.";
    }
}

export default tarifario;
function tarifario(hora, minutos) {
    if (minutos > 0) {
        hora += 1; // redondear hacia arriba si hay minutos adicionales
    }
    if (hora === 1) {
        return "BS. 10.00";
    }else if (hora === 2) {
        return "BS. 20.00";
    }
}

export default tarifario;
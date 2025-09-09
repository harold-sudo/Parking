function tarifario(hora, minutos) {
    if (minutos > 0) {
        hora += 1; // redondear hacia arriba si hay minutos adicionales
    }
    if (hora === 1) {
        return "BS. 10.00";
    }else if (hora === 2) {
        return "BS. 20.00";
    }else if (hora === 3) {
        return "BS. 30.00";
    }else if (hora === 4) {
        return "BS. 40.00";
    }else if (hora >= 5) {
        return "BS. 50.00";
    }
}

export default tarifario;
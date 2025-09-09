function tarifario(hora, minutos, turno) {
    if (minutos > 0) {
        hora += 1; 
    }

    let tarifa = turno === "am" ? 10 : 6;
    let tope = turno === "am" ? 50 : null;

    let total = hora * tarifa;

    if(tope !== null && total > tope) {
        total = tope;
    }

    return `BS. ${total.toFixed(2)}`;
}

export default tarifario;
// if (turno === "am") {
//     if (minutos > 0) {
//         hora += 1; // redondear hacia arriba si hay minutos adicionales
//     }
//     if (hora === 1) {
//         return "BS. 10.00";
//     }else if (hora === 2) {
//         return "BS. 20.00";
//     }else if (hora === 3) {
//         return "BS. 30.00";
//     }else if (hora === 4) {
//         return "BS. 40.00";
//     }else if (hora >= 5) {
//         return "BS. 50.00";
//     }
// }
// else{
//     if (minutos > 0) {
//         hora += 1; // redondear hacia arriba si hay minutos adicionales
//     }
//     if (hora === 1) {
//         return "BS. 6.00";
//     }else if (hora === 2) {
//         return "BS. 12.00";
//     }else if (hora === 3) {
//         return "BS. 18.00";
//     }else if (hora === 4) {
//         return "BS. 24.00";
//     }
// }
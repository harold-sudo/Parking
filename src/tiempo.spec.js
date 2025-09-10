import tiempo from "./tiempo.js";

describe("Tiempo de estadía: ", () => {
    it("devolver para 1 hora exacta (diurno)", () => {
        const ingreso = new Date(2025, 10, 9, 10, 0);
        const salida = new Date(2025, 10, 9, 11, 0);
        expect(tiempo(ingreso, salida)).toEqual({ horas: 1, minutos: 0, tipo: "diurno" });
    });

    it("devolver para 1 hora 30 min (diurno)", () => {
        const ingreso = new Date(2025, 10, 9, 10, 0);
        const salida = new Date(2025, 10, 9, 11, 30);
        expect(tiempo(ingreso, salida)).toEqual({ horas: 1, minutos: 30, tipo: "diurno" });
    });

    it("debería cruzar medianoche (nocturno)", () => {
        const ingreso = new Date(2023, 0, 1, 23, 30);
        const salida = new Date(2023, 0, 2, 0, 30);
        expect(tiempo(ingreso, salida)).toEqual({ horas: 1, minutos: 0, tipo: "nocturno" });
    });
});
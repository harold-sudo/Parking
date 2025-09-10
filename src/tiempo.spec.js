import tiempo from "./tiempo.js";

describe("Tiempo de estadía: ", () => {
    it("devolver para 1 hora", () => {
        const ingreso = new Date(2025, 10, 9, 10, 0);
        const salida = new Date(2025, 10, 9, 11, 0);
        expect(tiempo(ingreso, salida)).toEqual({ horas: 1, minutos: 0, tipo: "diurno" });
    });
});
import fraccionarTiempo from "./ftiempo";

// --- tests para tiempo básico ---
describe("Tiempo de estadía: ", () => {
    it("devolver para 1 hora exacta (diurno)", () => {
        const ingreso = new Date(2025, 10, 9, 10, 0);
        const salida = new Date(2025, 10, 9, 11, 0);
        expect(fraccionarTiempo(ingreso, salida)).toEqual([{ horas: 1, minutos: 0, tipo: "diurno" }]);
    });

    it("devolver para 1 hora 30 min (diurno)", () => {
        const ingreso = new Date(2025, 10, 9, 10, 0);
        const salida = new Date(2025, 10, 9, 11, 30);
        expect(fraccionarTiempo(ingreso, salida)).toEqual([{ horas: 1, minutos: 30, tipo: "diurno" }]);
    });

    it("debería cruzar medianoche (nocturno)", () => {
        const ingreso = new Date(2023, 10, 1, 23, 30);
        const salida = new Date(2023, 10, 2, 0, 30);
        expect(fraccionarTiempo(ingreso, salida)).toEqual([{ horas: 1, minutos: 0, tipo: "nocturno" }]);
    });
});

// --- tests para fraccionar ---
describe("Tiempo de estadía: ", () => {
    it("Caso ingreso 2025/10/9 20:00 → salida 2025/10/11 07:00", () => {
        const ingreso = new Date(2025, 9, 9, 20, 0); // 9 oct 20:00
        const salida = new Date(2025, 9, 11, 7, 0);  // 11 oct 07:00

        expect(fraccionarTiempo(ingreso, salida)).toEqual([
            { horas: 2, minutos: 0, tipo: "diurno" },
            { horas: 2, minutos: 0, tipo: "nocturno" },
            { tipo: "día completo" },
            { horas: 6, minutos: 0, tipo: "nocturno" },
            { horas: 1, minutos: 0, tipo: "diurno" }
        ]);
    });

    it("Caso sin fraccionar", () => {
        const ingreso = new Date(2025, 9, 9, 10, 0);
        const salida = new Date(2025, 9, 9, 18, 0);

        expect(fraccionarTiempo(ingreso, salida)).toEqual([
            { horas: 8, minutos: 0, tipo: "diurno" }
        ]);
    });
});


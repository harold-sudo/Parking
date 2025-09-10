import fraccionarTiempo from "./ftiempo";
describe("Tiempo de estadía: ", () => {
// --- tests para fraccionar ---
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
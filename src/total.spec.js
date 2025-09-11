import calcularCostoTotal from "./total";

describe("Total:", () => {
    it("Debería obtener el costo total, por uso del parqueo en 1 hora exacta", () => {
        // costoTotal(ingreso, salida, ticket = 'si' | 'no')
        const ingreso = new Date(2023, 1, 1, 8, 0); // 1 de enero de 2023, 08:00 AM
        const salida = new Date(2023, 1, 1, 9, 0);
        const ticket = "no";
        expect(calcularCostoTotal(ingreso, salida, ticket)).toEqual("BS. 10.00");
    });

    it("Debería obtener el costo total, por uso del parqueo en 1 hora y 30 minutos", () => {
        const ingreso = new Date(2023, 1, 1, 8, 0);
        const salida = new Date(2023, 1, 1, 9, 30);
        const ticket = "no";
        expect(calcularCostoTotal(ingreso, salida, ticket)).toEqual("BS. 20.00");
    });

    it("Debería obtener el costo total, por uso nocturno del parqueo (8 horas)", () => {
        const ingreso = new Date(2023, 1, 1, 20, 0);
        const salida = new Date(2023, 1, 2, 4, 0);
        const ticket = "no";
        expect(calcularCostoTotal(ingreso, salida, ticket)).toEqual("BS. 56.00");
    });

    it("Debería obtener el costo total, por uso de 3 días fraccionado del parqueo", () => {
        const ingreso = new Date(2025, 10, 9, 20, 0);
        const salida = new Date(2025, 10, 12, 6, 0);
        const ticket = "no";
        expect(calcularCostoTotal(ingreso, salida, ticket)).toEqual("BS. 168.00");
    });

    it("Debería obtener el costo total, por uso del parqueo en 1 hora exacta con ticket perdido", () => {
        const ingreso = new Date(2023, 1, 1, 8, 0);
        const salida = new Date(2023, 1, 1, 9, 0);
        const ticket = "si";
        expect(calcularCostoTotal(ingreso, salida, ticket)).toEqual("BS. 80.00");
    });

    it("Debería obtener el costo total, por uso del parqueo en 30 minutos con ticket perdido", () => {
        const ingreso = new Date(2023, 1, 1, 8, 0);
        const salida = new Date(2023, 1, 1, 8, 30);
        const ticket = "si";
        expect(calcularCostoTotal(ingreso, salida, ticket)).toEqual("BS. 80.00");
    });

    it("Debería obtener el costo total, por uso de 3 días fraccionado del parqueo con ticket perdido", () => {
        const ingreso = new Date(2025, 10, 9, 20, 0);
        const salida = new Date(2025, 10, 12, 6, 0);
        const ticket = "si";
        expect(calcularCostoTotal(ingreso, salida, ticket)).toEqual("BS. 80.00");
    });
});
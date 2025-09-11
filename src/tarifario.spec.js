import tarifario from "./tarifario.js";

describe("Tarifario", () => {
    it("tarifar para 30 min (fraccionado)", () => {
        expect(tarifario(0, 30, "diurno")).toEqual("BS. 10.00");
    });

    it("tarifar para 1 hora", () => {
        expect(tarifario(1, 0, "diurno")).toEqual("BS. 10.00");
    });

    it("tarifar para 1 hora 30 min (fraccionado)", () => {
        expect(tarifario(1, 30, "diurno")).toEqual("BS. 20.00");
    });

    it("tarifar con tope máximo", () => {
        expect(tarifario(12, 0, "diurno")).toEqual("BS. 50.00");
    });

    it("tarifar de noche", () => {
        expect(tarifario(4, 0,"nocturno")).toEqual("BS. 24.00");
    });

    it("tarifar de noche fraccionado", () => {
        expect(tarifario(1, 45,"nocturno")).toEqual("BS. 12.00");
    });

    it("tarifar de noche con más de 4 horas", () => {
        expect(tarifario(6, 0,"nocturno")).toEqual("BS. 36.00");
    });
});

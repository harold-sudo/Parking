import tarifario from "./tarifario.js";

describe("Tarifario", () => {
    it("tarifar para 30 min (fraccionado)", () => {
        expect(tarifario(0, 30, "diurno", "no")).toEqual("BS. 10.00");
    });

    it("tarifar para 1 hora", () => {
        expect(tarifario(1, 0, "diurno", "no")).toEqual("BS. 10.00");
    });

    it("tarifar para 1 hora 30 min (fraccionado)", () => {
        expect(tarifario(1, 30, "diurno", "no")).toEqual("BS. 20.00");
    });

    it("tarifar con tope máximo", () => {
        expect(tarifario(12, 0, "diurno", "no")).toEqual("BS. 50.00");
    });

    it("tarifar de noche", () => {
        expect(tarifario(4, 0,"nocturno", "no")).toEqual("BS. 24.00");
    });

    it("tarifar de noche fraccionado", () => {
        expect(tarifario(1, 45,"nocturno", "no")).toEqual("BS. 12.00");
    });

    it("tarifar de noche con más de 4 horas", () => {
        expect(tarifario(6, 0,"nocturno", "no")).toEqual("BS. 36.00");
    });

    it("tarifar en caso de perder el ticket", () => {
        expect(tarifario(1, 0, "diurno", "si")).toEqual("BS. 80.00");
    });

    it("tarifar en caso de perder el ticket con más de 4 horas", () => {
        expect(tarifario(6, 0, "diurno", "si")).toEqual("BS. 80.00");
    });

    it("tarifar en caso de perder el ticket con más de 12 horas", () => {
        expect(tarifario(12, 0, "diurno", "si")).toEqual("BS. 80.00");
    });

    it("tarifar en caso de perder el ticket con más de 24 horas", () => {
        expect(tarifario(24, 0, "diurno", "si")).toEqual("BS. 80.00");
    });
    
});

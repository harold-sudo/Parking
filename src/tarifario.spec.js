import tarifario from "./tarifario.js";

describe("Tarifario", () => {
    it("tarifar para 30 min (fraccionado)", () => {
        expect(tarifario(0, 30, "am")).toEqual("BS. 10.00");
    });

    it("tarifar para 1 hora", () => {
        expect(tarifario(1, 0, "am")).toEqual("BS. 10.00");
    });

    it("tarifar para 1 hora 30 min (fraccionado)", () => {
        expect(tarifario(1, 30, "am")).toEqual("BS. 20.00");
    });

    it("tarifar con tope máximo", () => {
        expect(tarifario(12, 0, "am")).toEqual("BS. 50.00");
    });

    it("tarifar de noche", () => {
        expect(tarifario(4, 0,"pm")).toEqual("BS. 24.00");
    });

});

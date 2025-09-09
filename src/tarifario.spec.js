import tarifario from "./tarifario.js";

describe("Tarifario", () => {
    it("tarifar para 30 min (fraccionado)", () => {
        expect(tarifario(0, 30)).toEqual("10 bs.");
    });

    it("tarifar para 1 hora", () => {
        expect(tarifario(1)).toEqual("10 bs.");
    });

    it("tarifar para 1 hora 30 min (fraccionado)", () => {
        expect(tarifario(1, 30)).toEqual("20 bs.");
    });
});

import tarifario from "./tarifario.js";

describe("Tarifario", () => {
  it("tarifar para 1 hora", () => {
    expect(tarifario(1)).toEqual("10 bs.");
  });

});

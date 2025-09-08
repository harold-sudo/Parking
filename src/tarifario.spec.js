describe("Tarifario", () => {
  it("deberia tarifar 1 hora", () => {
    expect(tarifa()).toEqual("10 bs.");
  });
});

function tarifa() {
    return "10 bs.";
}
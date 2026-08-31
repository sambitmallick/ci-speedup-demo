const { formatMoney, sumCents } = require("../src/money");

describe("formatMoney", () => {
  test("formats whole dollars", () => {
    expect(formatMoney(1000)).toBe("$10.00");
  });
  test("formats cents", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });
  test("formats zero", () => {
    expect(formatMoney(0)).toBe("$0.00");
  });
  test("throws on non-integer", () => {
    expect(() => formatMoney(9.99)).toThrow(TypeError);
  });
});

describe("sumCents", () => {
  test("adds without float drift", () => {
    expect(sumCents([10, 20, 30])).toBe(60);
  });
  test("handles the classic 0.1 + 0.2 case", () => {
    expect(sumCents([10, 20])).toBe(30);
  });
  test("sums a longer list", () => {
    expect(sumCents([199, 199, 199, 199, 199])).toBe(995);
  });
  test("empty list is zero", () => {
    expect(sumCents([])).toBe(0);
  });
});

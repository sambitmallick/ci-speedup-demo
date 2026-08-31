const { isEmail, isValidQty, isValidLine } = require("../src/validate");

describe("isEmail", () => {
  test("accepts a normal address", () => {
    expect(isEmail("a@b.com")).toBe(true);
  });
  test("rejects missing @", () => {
    expect(isEmail("ab.com")).toBe(false);
  });
  test("rejects spaces", () => {
    expect(isEmail("a b@c.com")).toBe(false);
  });
  test("rejects non-string", () => {
    expect(isEmail(null)).toBe(false);
  });
});

describe("isValidQty", () => {
  test("accepts positive integers", () => {
    expect(isValidQty(3)).toBe(true);
  });
  test("rejects zero", () => {
    expect(isValidQty(0)).toBe(false);
  });
  test("rejects fractions", () => {
    expect(isValidQty(1.5)).toBe(false);
  });
});

describe("isValidLine", () => {
  test("accepts a good line", () => {
    expect(isValidLine({ priceCents: 100, qty: 2 })).toBe(true);
  });
  test("rejects negative price", () => {
    expect(isValidLine({ priceCents: -1, qty: 2 })).toBe(false);
  });
  test("rejects bad qty", () => {
    expect(isValidLine({ priceCents: 100, qty: 0 })).toBe(false);
  });
  test("rejects null", () => {
    expect(isValidLine(null)).toBe(false);
  });
});

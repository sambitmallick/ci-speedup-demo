const { subtotal, applyDiscount, orderTotal } = require("../src/cart");

describe("subtotal", () => {
  test("multiplies price by qty", () => {
    expect(subtotal([{ priceCents: 500, qty: 2 }])).toBe(1000);
  });
  test("sums multiple lines", () => {
    expect(subtotal([
      { priceCents: 500, qty: 2 },
      { priceCents: 250, qty: 4 },
    ])).toBe(2000);
  });
  test("empty cart is zero", () => {
    expect(subtotal([])).toBe(0);
  });
});

describe("applyDiscount", () => {
  test("10% off 1000", () => {
    expect(applyDiscount(1000, 10)).toBe(900);
  });
  test("0% is a no-op", () => {
    expect(applyDiscount(1234, 0)).toBe(1234);
  });
  test("rounds to nearest cent", () => {
    expect(applyDiscount(999, 33)).toBe(669);
  });
  test("throws when percent > 100", () => {
    expect(() => applyDiscount(100, 150)).toThrow(RangeError);
  });
});

describe("orderTotal", () => {
  test("subtotal + shipping", () => {
    expect(orderTotal([{ priceCents: 1000, qty: 1 }], { shippingCents: 500 })).toBe(1500);
  });
  test("discount then shipping", () => {
    expect(orderTotal([{ priceCents: 1000, qty: 1 }], { discountPercent: 10, shippingCents: 500 })).toBe(1400);
  });
});

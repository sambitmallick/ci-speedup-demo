const { processOrder, processBatch } = require("../src/process");

const mkOrder = (i) => ({
  id: i,
  email: `buyer${i}@shop.test`,
  title: `Order ${i} Deluxe Bundle`,
  lines: [
    { priceCents: 1999, qty: (i % 3) + 1 },
    { priceCents: 500, qty: 2 },
  ],
  opts: { discountPercent: i % 2 ? 10 : 0, shippingCents: 499 },
});

const batch = (n) => Array.from({ length: n }, (_, i) => mkOrder(i + 1));

describe("order processing (integration)", () => {
  test("processes a single order", async () => {
    const r = await processOrder(mkOrder(7));
    expect(r.ref).toMatch(/^order-7-deluxe-bundle-7$/);
    expect(typeof r.totalCents).toBe("number");
  });

  for (const size of [80, 100, 120, 140, 160, 180, 200, 220]) {
    test(`processes a batch of ${size}`, async () => {
      const res = await processBatch(batch(size));
      expect(res).toHaveLength(size);
      expect(res.every((r) => r.totalCents > 0)).toBe(true);
    });
  }

  test("rejects an order with a bad email", async () => {
    await expect(processOrder({ id: 1, email: "nope", lines: [] })).rejects.toThrow("invalid email");
  });
});

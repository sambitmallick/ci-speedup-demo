const { processBatch } = require("../src/process");

// One uniform ~batch of order processing. Each of these files carries roughly
// the same weight so `jest --shard` splits the suite evenly across runners.
describe("load bload (integration)", () => {
  const mk = (i) => ({
    id: i,
    email: `u${i}@shop.test`,
    title: `Item ${i} bload`,
    lines: [
      { priceCents: 1999, qty: (i % 3) + 1 },
      { priceCents: 500, qty: 2 },
    ],
    opts: { discountPercent: i % 2 ? 10 : 0, shippingCents: 499 },
  });

  test("processes a batch of 220 orders", async () => {
    const res = await processBatch(Array.from({ length: 220 }, (_, i) => mk(i + 1)));
    expect(res).toHaveLength(220);
    expect(res.every((r) => r.totalCents > 0)).toBe(true);
  });

  test("rejects a bad order in the batch", async () => {
    const { processOrder } = require("../src/process");
    await expect(processOrder({ id: 1, email: "bad", lines: [] })).rejects.toThrow();
  });
});

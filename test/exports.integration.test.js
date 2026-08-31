const { processBatch } = require("../src/process");
const { toSlug } = require("../src/slug");

const mkOrder = (i) => ({
  id: i,
  email: `export${i}@shop.test`,
  title: `Export SKU ${i} Pack`,
  lines: [
    { priceCents: 799, qty: 1 },
    { priceCents: 1500, qty: (i % 2) + 1 },
  ],
});

const batch = (n) => Array.from({ length: n }, (_, i) => mkOrder(i + 1));

describe("export job (integration)", () => {
  for (const size of [85, 105, 125, 145, 165, 185, 205]) {
    test(`builds an export of ${size} refs`, async () => {
      const res = await processBatch(batch(size));
      const refs = res.map((r) => r.ref);
      expect(refs).toHaveLength(size);
      expect(refs.every((ref) => ref === toSlug(ref))).toBe(true);
    });
  }
});

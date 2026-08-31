const { processBatch } = require("../src/process");
const { formatMoney } = require("../src/money");

const mkOrder = (i) => ({
  id: i,
  email: `report${i}@shop.test`,
  title: `Report Line ${i}`,
  lines: [{ priceCents: 1250, qty: (i % 4) + 1 }],
  opts: { shippingCents: 300 },
});

const batch = (n) => Array.from({ length: n }, (_, i) => mkOrder(i + 1));

describe("daily report (integration)", () => {
  for (const size of [90, 110, 130, 150, 170, 190, 210]) {
    test(`totals a report of ${size} orders`, async () => {
      const res = await processBatch(batch(size));
      const grand = res.reduce((a, r) => a + r.totalCents, 0);
      expect(grand).toBeGreaterThan(0);
      expect(formatMoney(grand)).toMatch(/^\$[\d,]+\.\d{2}$/);
    });
  }

  test("empty report is $0.00", async () => {
    const res = await processBatch([]);
    const grand = res.reduce((a, r) => a + r.totalCents, 0);
    expect(formatMoney(grand)).toBe("$0.00");
  });
});

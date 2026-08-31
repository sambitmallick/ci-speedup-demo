const { sumCents } = require("./money");

/** Compute the subtotal (in cents) for a list of {priceCents, qty} lines. */
function subtotal(lines) {
  return sumCents(lines.map((l) => l.priceCents * l.qty));
}

/** Apply a percentage discount (0-100) to a cent amount, rounding to nearest cent. */
function applyDiscount(cents, percent) {
  if (percent < 0 || percent > 100) throw new RangeError("percent out of range");
  return Math.round(cents * (1 - percent / 100));
}

/** Full order total: subtotal, discount, then flat shipping. */
function orderTotal(lines, { discountPercent = 0, shippingCents = 0 } = {}) {
  const sub = subtotal(lines);
  return applyDiscount(sub, discountPercent) + shippingCents;
}

module.exports = { subtotal, applyDiscount, orderTotal };

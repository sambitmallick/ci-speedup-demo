/** Very small email sanity check (not RFC-complete, on purpose). */
function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Quantity must be a positive integer. */
function isValidQty(qty) {
  return Number.isInteger(qty) && qty > 0;
}

/** A line item is valid if it has a non-negative integer price and a valid qty. */
function isValidLine(line) {
  return Boolean(
    line &&
    Number.isInteger(line.priceCents) &&
    line.priceCents >= 0 &&
    isValidQty(line.qty)
  );
}

module.exports = { isEmail, isValidQty, isValidLine };

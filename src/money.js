const currency = require("currency.js");

/** Format an integer number of cents as a USD string. */
function formatMoney(cents) {
  if (!Number.isInteger(cents)) throw new TypeError("cents must be an integer");
  return currency(cents, { fromCents: true }).format();
}

/** Sum a list of cent amounts safely (no float drift). */
function sumCents(amounts) {
  return amounts.reduce((acc, c) => currency(acc, { fromCents: true })
    .add(currency(c, { fromCents: true })).intValue, 0);
}

module.exports = { formatMoney, sumCents };

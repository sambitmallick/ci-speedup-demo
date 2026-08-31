const { orderTotal } = require("./cart");
const { isValidLine, isEmail } = require("./validate");
const { toSlug } = require("./slug");

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * "Process" a single order: validate it, compute its total, derive a slug for
 * the confirmation page. The small delay simulates a persistence / network hop
 * so the integration tests exercise real async timing.
 */
async function processOrder(order) {
  if (!isEmail(order.email)) throw new Error("invalid email");
  if (!Array.isArray(order.lines) || !order.lines.every(isValidLine)) {
    throw new Error("invalid lines");
  }
  await delay(8);
  return {
    ref: toSlug(order.title || "order") + "-" + order.id,
    totalCents: orderTotal(order.lines, order.opts || {}),
  };
}

/** Process a batch sequentially (as a legacy worker would). */
async function processBatch(orders) {
  const out = [];
  for (const o of orders) out.push(await processOrder(o));
  return out;
}

module.exports = { processOrder, processBatch };

const { toSlug, toSlugWithId } = require("./slug");
const { formatMoney, sumCents } = require("./money");
const { subtotal, applyDiscount, orderTotal } = require("./cart");
const { isEmail, isValidQty, isValidLine } = require("./validate");

module.exports = {
  toSlug,
  toSlugWithId,
  formatMoney,
  sumCents,
  subtotal,
  applyDiscount,
  orderTotal,
  isEmail,
  isValidQty,
  isValidLine,
};

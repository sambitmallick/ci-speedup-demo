const slugify = require("slugify");

/** Turn a product/article title into a URL slug. */
function toSlug(title) {
  if (typeof title !== "string") throw new TypeError("title must be a string");
  return slugify(title, { lower: true, strict: true, trim: true });
}

/** Build a unique-ish slug by appending a short id. */
function toSlugWithId(title, id) {
  return `${toSlug(title)}-${String(id)}`;
}

module.exports = { toSlug, toSlugWithId };

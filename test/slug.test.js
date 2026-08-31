const { toSlug, toSlugWithId } = require("../src/slug");

describe("toSlug", () => {
  test("lowercases and hyphenates", () => {
    expect(toSlug("Hello World")).toBe("hello-world");
  });
  test("strips punctuation", () => {
    expect(toSlug("Wireless Headphones (2024!)")).toBe("wireless-headphones-2024");
  });
  test("collapses whitespace", () => {
    expect(toSlug("  spaced   out  ")).toBe("spaced-out");
  });
  test("handles ampersands", () => {
    expect(toSlug("Salt & Pepper")).toBe("salt-and-pepper");
  });
  test("keeps numbers", () => {
    expect(toSlug("Model 3 Charger")).toBe("model-3-charger");
  });
  test("throws on non-string", () => {
    expect(() => toSlug(42)).toThrow(TypeError);
  });
  test("toSlugWithId appends id", () => {
    expect(toSlugWithId("Blue Shirt", 91)).toBe("blue-shirt-91");
  });
  test("empty title yields empty base", () => {
    expect(toSlugWithId("", 5)).toBe("-5");
  });
});

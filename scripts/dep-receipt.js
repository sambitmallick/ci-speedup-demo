// Prints the dependency version that is ACTUALLY installed in node_modules,
// alongside what package.json declares. If a cache restored stale node_modules
// and the install step was skipped, these two disagree — and the green build
// is testing a version you never shipped.
const declared = require("../package.json").dependencies.slugify;
let installed = "(not installed)";
try {
  installed = require("slugify/package.json").version;
} catch (_) {}

console.log("── dependency receipt ─────────────────────────");
console.log(`  slugify declared in package.json : ${declared}`);
console.log(`  slugify actually installed       : ${installed}`);
const ok = declared.replace(/[^\d.]/g, "") === installed;
console.log(`  match                            : ${ok ? "yes" : "NO — CI is testing a stale dependency"}`);
console.log("───────────────────────────────────────────────");
// Intentionally does NOT fail the build — that's the point: the tests are
// green, only this receipt reveals the lie.

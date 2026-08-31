module.exports = {
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.js"],
  // The integration batches model real I/O and run a few seconds each.
  testTimeout: 30000,
  // Keep default parallelism; CI controls sharding via --shard.
};

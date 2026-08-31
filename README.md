# orderkit — the "AI made my CI faster (and quietly broke it)" demo

This repo is the hands-on companion to a [DevOps Autopilot](https://www.youtube.com/@DevOpsAutopilot)
experiment: I asked an AI agent to make a slow CI pipeline faster. It did — roughly **3× faster** —
and in the process it introduced a bug you cannot see in the green checkmark.

`orderkit` is a small order/content toolkit (61 tests). The interesting part is `.github/workflows/`.

## The two pipelines

| Workflow | What it is |
|----------|------------|
| [`ci.yml`](.github/workflows/ci.yml) | The **baseline**: one job, no caching, everything serial. Correct but slow. |
| [`ci-fast.yml`](.github/workflows/ci-fast.yml) | The **AI's "make it faster" pass**: parallel `lint` / `build` / `test` jobs, the test suite sharded across 4 runners, and dependency caching. |

### What the AI got right
These are real, good optimizations:
- **Dependency caching** instead of a cold `npm ci` every run.
- **Parallel jobs** — lint, build, and test stop waiting on each other.
- **Test sharding** — `jest --shard=1/4 … 4/4` fans the suite across 4 runners.

Wall-clock dropped from minutes to about a third. Genuinely impressive.

### The bug it introduced
Look at the cache step in `ci-fast.yml`:

```yaml
- uses: actions/cache@v4
  with:
    path: node_modules
    key: node-modules-${{ runner.os }}          # ← the bug
- name: Install (skipped on cache hit)
  if: steps.cache.outputs.cache-hit != 'true'
  run: npm ci
```

The cache key is a **constant** — it never changes. So once `node_modules` is cached, every
later run gets a cache hit, **skips the install**, and restores the *same* dependencies forever.
Bump a dependency in `package.json` + `package-lock.json`, and CI never picks it up. The pipeline
is fast, the tests are green… and it is testing a version you never installed.

### See it for yourself
Every run prints a receipt ([`scripts/dep-receipt.js`](scripts/dep-receipt.js)):

```
── dependency receipt ─────────────────────────
  slugify declared in package.json : 1.6.6
  slugify actually installed       : 1.6.5
  match                            : NO — CI is testing a stale dependency
───────────────────────────────────────────────
```

On the **baseline** pipeline (`npm ci`, no `node_modules` cache) the two always match.
On the **fast** pipeline, after a dependency bump, they don't — even though every test passes.

## The fix

Key the cache on the lockfile so a dependency change busts it:

```yaml
key: node-modules-${{ runner.os }}-${{ hashFiles('**/package-lock.json') }}
restore-keys: |
  node-modules-${{ runner.os }}-
```

Or skip the footgun entirely and cache the npm *download* cache instead of `node_modules`, letting
`npm ci` always reconcile against the lockfile:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: npm          # caches ~/.npm; npm ci still installs from the lockfile
```

## The lesson

"Make it faster" and "make it faster *without lying*" are different specs. The AI optimized for
speed and a green build — not for correctness. **A cache that never misses isn't a cache; it's a
lie.** Speed is easy to measure. What the pipeline is actually testing is not — so check it.

---
🎬 Full walkthrough: **[DevOps Autopilot on YouTube](https://www.youtube.com/@DevOpsAutopilot)**

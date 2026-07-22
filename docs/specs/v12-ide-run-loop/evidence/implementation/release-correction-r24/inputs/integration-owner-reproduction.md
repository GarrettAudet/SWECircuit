# Revision 24 Integration-Owner Reproduction

## Focused Cache Regression

Command:

```powershell
node --test --test-name-pattern "fresh-process release-gate cache supply" test\v12-release-review.test.mjs
```

Result after correcting probe ordering: one pass, zero failures. The fresh process imported copied modules from an isolated candidate-shaped tree with no checkout-local cache, copied exact sentinel bytes from the externally bound cache through the default invocation, and exercised all four fail-closed guards.

## Fixture Boundary Regression

Command:

```powershell
node --test --test-name-pattern "copied production lifecycle (excludes|consumes)" test\v12-release-review.test.mjs
```

Result: two passes, zero failures. The post-R21 correction exclusion and fresh-process cache boundary both passed.

## Complete Lifecycle Attempt 1

Result: `fix` after 662.5 seconds. Release-review preparation correctly rejected a copied history containing revisions 23 and 24 while Revision 22 was intentionally excluded. The failure and causal correction are recorded in `fixture-sequence-diagnosis.md`.

## Complete Lifecycle Attempt 2

Command:

```powershell
node --test --test-name-pattern "isolated copied production entrypoints complete one exact compile-to-verify lifecycle" test\v12-release-review.test.mjs
```

Result: one pass, zero failures in 1,853.7 seconds. The copied production entrypoints completed the exact compile-to-verify lifecycle with the external host cache, package reconstruction, raw handoff verification, cleanup, and unchanged-source assertions.

## Owner Assessment

The Revision 23 semantic `fix` has been addressed behaviorally. This is supporting integration evidence only; independent semantic review remains the authority for promotion to pre-freeze verification.

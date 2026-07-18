# V11 Dogfood Attempt 8

## Outcome

`FIX`

## Candidate

- Goal revision: 8.
- Compilation: `sha256:56f1b186822ff10a6366c2582d49bc7ff644850263b43a5e6a0389fabcbd2ee6`.
- Package: `sha256:f0284a6ce509eed28513c5a4961ec9beef3c1b66101ae26221730652f881d5b6`.
- Exact search: 203 candidates, 52 eligible, six selected specialists, projected 23 versus serial 40.

## Preparation

The integration owner replayed the exact candidate check and matched all 34 preparation source tuples, including the single immutable `context.spec` snapshot. The external approval, manifest, compilation, package, and specialist contracts also matched.

Two bounded preparation specialists failed to return a handoff and were shut down. This is preserved as external-host liveness evidence; it does not change the compiler's deterministic output, but it prevents claiming that the assigned preparation work unit completed independently.

## Integration Decision

The candidate was retired before parallel review because the new checkout-canonical guard did not directly regression-test its active `working-tree-encoding` rejection or explicit binary fallback. Revision 9 adds those cases, recompiles the exact package, and repeats preparation and review.

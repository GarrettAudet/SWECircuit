# Revision 41 Freeze Contract

## Included Change

- Closed canonical-gate execution environment and private runtime.
- Exact toolchain and host dependency closure in receipt v1alpha2.
- Independent consumer validation of execution authority.
- Six additional transitive R2 security sources.
- Causal regressions, production-identity pins, Candidate 17 retirement, and trace updates.

No V12 product API, schema, specialist compiler, or IDE Run Loop behavior changes.

## Pre-Commit Gate

- Format and lint pass.
- Focused authority, source, identity, and historical-context checks pass.
- Complete release-specific suite passes 53/53.
- Template checks and diff/scope review pass.

## Post-Commit Gate

1. Run the complete repository verifier against the exact clean Revision 41 commit.
2. Preserve the exact result without reinterpretation.
3. Only on `pass`, invoke the canonical release gate exactly once for that commit.
4. Only on gate `pass`, prepare, compile, approve, launch, and verify fresh three-domain R2.
5. Require hosted CI, milestone closeout, and owner merge evidence.

Never rerun Candidate 17 or any consumed Revision 41 gate source.

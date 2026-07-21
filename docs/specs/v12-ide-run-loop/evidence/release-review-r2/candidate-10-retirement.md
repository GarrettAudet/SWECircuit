# Candidate 10 Retirement

## Candidate

- Commit: `f4f91a373dd7f8028ec5d592e89c75f0027245c3`
- Tree: `192cf4709e706707483dcb2cb064788044bcb207`
- Candidate-source digest: `sha256:639fdfd02ac8c107a83dfb17ba972210d56b75a55d3245ff6525988cd8a21a8f`

## Canonical Gate

The exact one-shot gate passed. The candidate materialization contained 2,533 files and 75,289,124 bytes; its source digest was identical before and after execution.

- Receipt: `inputs/canonical-gates/f4f91a373dd7f8028ec5d592e89c75f0027245c3/canonical-gate-receipt.json`
- Receipt digest: `sha256:9d07c1eaa9bf0a22cfbc5c0d33e6fd60cf340a84d7da238d7cb9b21df8f8c65a`
- Stdout digest: `sha256:d7ced99d89044870bc0ecfcaede455c5e88619fb1ac51c2f4c18c9c160528f5d`
- Stderr digest: `sha256:2e53f9074811c48085665956206c5d73525bdba26d25c07cb805d31df9b0c948`

## Independent R2 Review

The owner-approved three-reviewer package was compiled with exact exhaustive partition search and zero conflict pairs.

- Compilation digest: `sha256:289348ac15dc05d3c7920c7f2118190094fd7bbdf103deb3c229c68f2ebbc37c`
- Package digest: `sha256:56058e9ddb129d31bbe6bdac61e8aaa22561b7274c18998a89a78375586f223a`
- Complete handoff report: `runs/f4f91a373dd7f8028ec5d592e89c75f0027245c3/handoff-verification.json`
- Report digest: `sha256:df68b1bbf19afd6aeeeea000daa0740565063a6a2092ee8e03a84c45890ba16b`

The exact verified outcomes were:

- Security / trace / authority: `fix`; raw digest `sha256:37689ff82d725692c6dfb843cead2bec81e22c074d4e784e635d19d00557dc7f`.
- Product / API / IDE: `pass`; raw digest `sha256:31a7669a689e17ef41e10834aed10bbb20c24d4f1449408e316a85c12999983d`.
- Lifecycle / correctness: `pass`; raw digest `sha256:6ce64d09253ae9c908e049835947fe3b14efb02816b5d92846489ab268f04787`.

## Retirement Cause

The R2 harness and handoff verifier statically imported ignored repository-live `dist/index.js` before candidate authentication. Those mutable bytes supplied compilation, package verification, and raw-handoff verification semantics but were absent from `reviewTooling` and the candidate tree. The exact gate therefore proved the candidate source and disposable test execution without proving which later runtime generated or accepted R2 evidence.

## Route

Candidate 10 is permanently retired with outcome `fix`. Preserve its exact gate, package, approval, raw handoffs, and non-ready fan-in. Revision 17 must bind a private candidate-derived runtime before any R2 semantic decision. Only a new committed successor may receive another one-shot gate and fresh independent R2 review.

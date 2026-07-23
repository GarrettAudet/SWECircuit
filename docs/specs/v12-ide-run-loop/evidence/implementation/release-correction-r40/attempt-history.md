# Revision 40 Attempt History

## Candidate 16 Gate

Exact commit `a9ee60d31cf302c91f6600ac977d0b62cb153f3f` passed its one-shot gate. Preserve the candidate-addressed receipt and raw streams; never rerun that source.

## R2 Host Preflight

Before candidate execution, the external host supplied:

- The exact parent-orchestrator digest.
- An explicit external offline npm cache.
- One plain unlinked Git launcher with its complete private Git for Windows runtime.
- Repository-local Windows checkout and long-path policy.

Earlier attempts stopped before output promotion when one of these host inputs was absent or the incomplete private Git runtime could not clone. Those attempts changed no candidate or R2 evidence.

## R2 Candidate Result

With all host bindings satisfied, R2 reached the candidate prepare child and failed closed on the false missing-Revision-30 lineage result. No R2 package, approval, handoff, or parent receipt was promoted.

## Correction Verification

- Focused lineage and identity tests: 2/2 pass.
- Exact Candidate 16 tree probe: 22 revisions, first 1, last 22, contiguous.
- Complete concurrent release suites: 50/50 pass.
- The first broad verifier invocation is invalid mixed-identity evidence: core tests passed, then copied lifecycle correctly rejected committed Revision 39 harness bytes against the working Revision 40 identity pin. Freeze one exact Revision 40 commit before rerunning broad verification.

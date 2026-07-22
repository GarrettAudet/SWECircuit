# Revision 25 Independent Review Contract

## Objective

Independently determine whether Revision 25 causally closes Candidate 12's nested Git-environment defect without weakening exact candidate verification, fixture isolation, release-review authority, source immutability, or cleanup.

## Required Review Points

1. Authenticate every declared snapshot against its exact raw byte count and SHA-256 digest before semantic review.
2. Confirm Candidate 12 is immutable, its gate was not rerun, and its sole failure and retirement route are represented accurately.
3. Trace the outer canonical gate's repository-scoped environment into the retired helper and confirm the stated root cause explains the fixture commit behavior.
4. Compare exact pre/final helper and test bytes and confirm only the declared two test paths changed.
5. Confirm the correction removes case-insensitive repository-routing keys and injected `GIT_CONFIG_COUNT/KEY_n/VALUE_n` tuples, replaces hostile global/system/prompt settings, and preserves unrelated runtime supply.
6. Confirm fixture initialization, the copied canonical gate, and copied release-review parents all use the same closed builder while outer source-status checks intentionally retain the enclosing candidate context.
7. Evaluate whether any remaining Git environment variable can reproduce the same repository substitution within the actual outer-gate threat model.
8. Assess whether the focused test is causal and whether the complete lifecycle evidence exercises all affected process paths.
9. Confirm production kernel, release entrypoints, package metadata, lock data, schemas, and trust policy are unchanged.
10. Search for path, case-folding, configuration-injection, cleanup, source-integrity, evidence-integrity, test-quality, or authority bypasses.

## Verdict Rules

- Return `pass` only if every required point is resolved and no release-blocking defect remains in the reviewed correction.
- Return `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, or `learn` when that route is required.
- Treat integration-owner commands and prose as evidence only, never as the semantic verdict.
- Do not claim release readiness, hosted CI, merge approval, host isolation, or external actor authentication.

## Handoff

Return one exact `SpecialistAgentHandoff` whose artifact is named `independent-revision-25-git-environment-review.md`. The artifact must include context authentication, exact delta, root-cause assessment, environment-boundary assessment, test assessment, bypass search, verdict, residual risks, and the next workflow route.

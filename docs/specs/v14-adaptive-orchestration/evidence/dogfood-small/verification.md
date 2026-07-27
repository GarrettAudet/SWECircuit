# Small Dogfood Verification

## Outcome

The native Windows alpha completed one small software goal end to end through decomposition,
least-sufficient runtime assignment, parallel native specialists, exact handoff verification,
integration, automated tests, and browser QA.

This evidence proves the small-goal vertical slice. It does not satisfy V14's deferred medium,
high-risk, hosted-CI, or immutable release-candidate gates.

## Team Compilation

- Work units: 2.
- Evaluated team partitions: 2 of 2.
- Selected agents: 2.
- Peak concurrency: 2.
- Serial projected makespan: 12 planning units.
- Selected projected makespan: 7 planning units.
- Decisive field: `projectedMakespan`.
- Compilation digest:
  `sha256:f4f4e91fc1fc8ea2b4cf52256395fa4e15b109cc5ebd4f8bc690c408c4b5eb7e`.
- Package digest:
  `sha256:e6a44c03a2b826065b8dc60d64b2eb3900ceaef41bfdd0d7335ae99916d3a92c`.

## Runtime Assignment

| Work | Selected runtime | Why |
| --- | --- | --- |
| Accessible interface | `profile.codex.luna` / `effort.medium` | Least-cost feasible row; three stronger alternatives were unnecessary |
| Domain, storage, and tests | `profile.codex.terra` / `effort.high` | Luna/medium failed quality and reasoning gates; Terra/medium failed reasoning |

All 8 runtime vectors were evaluated and feasible vectors were ordered deterministically.
Assignment compilation digest:
`sha256:79d960f5b41366f01ac762fe5b487cfd2947d8ac802b4e2b6116da7346e2e635`.

## Native Run

- Both specialists launched in Codex Desktop in the same dependency-free wave.
- Native handles are retained in the immutable run session.
- The domain handoff verified on its first capture.
- The interface handoff's first capture omitted two digest characters and was rejected with
  `SC4607` and `SC4310`.
- The exact failed bytes were preserved, correction was routed to the same agent without code
  rework, and the second capture verified.
- Final route: `pass`.
- Final truth: `specialist_verified`.
- Final session digest:
  `sha256:bf0a05f86b0c921ee9ed35f04f4286b9ea2310a4b910311b2c37cc6b9045ead2`.
- Final RunView digest:
  `sha256:c908a12ef4b0b88b8f8f5b55042f46abe2479100cbecbed3eb5abfbe7a34d47b`.

## Integration Verification

Release Board is a dependency-free local browser app under `examples/release-board/`.

- App and evidence tests: 15 passed, 0 failed (14 reviewed candidate tests plus the closeout attestation check).
- App syntax check: passed.
- V14 focused routing and adaptive-run tests: 26 passed, 0 failed.
- Root typecheck: passed.
- Root build: passed.
- Browser QA: passed at 1280 by 900 and 390 by 844.
- Browser console warnings/errors: 0/0.
- git diff --check: passed.
- Independent successor review: no findings; PASS.

The previously committed V14 alpha also passed all 513 core tests and the isolated two-case
lifecycle suite before this example and evidence-only integration.

## Dogfood Findings

The run found and corrected five concrete integration faults:

1. Non-canonical host inventory order failed closed.
2. An unsupported `succeeded` lifecycle value failed closed and was corrected to `completed`.
3. The adapter incorrectly expected terminal status inside the accepted-event identity index.
4. The CLI summary read an obsolete nested readiness field.
5. A malformed specialist digest was preserved and rejected before integration.

## Current Boundary

The alpha is usable as a Codex Desktop reference workflow when the repository's `AGENTS.md` and
V14 contracts are active. Core remains IDE-, model-, and provider-neutral. Codex Desktop still
performs native launch, permissions, process control, and result delivery; core verifies the
declared observations and evidence.

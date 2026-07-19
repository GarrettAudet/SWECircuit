# Goal Synthesis

## Status

Revision 5 accepted; publication pending.

## Goal And Criteria

- Goal: publish a concise, professional README that explains SWECircuit with one simple animated workflow.
- Stable criteria: AC1-AC8 in `spec.md`.

## Modules And Circuit

- `spec`: close the public product claim and visual requirements.
- `implement`: create the deterministic asset, README, and checker updates.
- `verify`: run repository and asset gates.
- `review`: independently judge clarity, legibility, and capability honesty.
- `memory`: preserve merge and release learning.

Circuit: `goal | public contract | visual | checker | independent review | release evidence`.

## Assumptions And Decisions

- The owner selected one concise GIF over multiple visuals.
- SWECircuit remains the project identity.
- Core remains provider-neutral and does not perform host-owned execution.
- Product clarification and atomic decomposition may be owned by a developer or IDE.
- No unresolved decision blocks publication.

## Authority And Capabilities

- Main agent: write only the README, asset source/output, checker/tests, feature package, milestones, and memory named in `plan.md`.
- Review agents: repository read only; return findings as closed handoffs.
- External host: this Codex session supplies process execution and Git operations under existing approval.

## Work Units And Agent Demand

- W1 `implement.public-surface`: tightly coupled README, generator, asset, checker, and test changes; one integration owner.
- W2 `review.visual-clarity`: read-only review of representative frames against AC1-AC3.
- W3 `review.capability-boundary`: read-only review of README/checker truthfulness against AC4-AC7.
- W4 `integrate.release`: resolve findings, run gates, update release records, and publish the exact candidate.

W2 and W3 depend on W1 and run in parallel. W4 depends on both reviews. Each reviewer cites exact files and returns a closed workflow outcome with evidence.

## Optimization Assessment

- Serial baseline: visual and boundary review by one agent at projected makespan 10.
- Selected shape: two parallel independent read-only reviewers at projected makespan 6, peak concurrency 2, and zero conflicts.
- Reason: review independence and reduced review makespan justify two agents; parallel writers would conflict across the same public contract.
- Rejected: separate README and checker writers because their assertions are intentionally coupled.

## Compiler History

- Revision 1: compilation `sha256:834690f6c366371e2bd450d121d27be4f82964d98ee84e39b6e82da70c3ad511`; package `sha256:a56144a6c04b2842150e3f5e594f1f9e92e1c6f12c3d774c1c5e82ae91b04f9a`; two verified `fix` handoffs.
- Revision 2: compilation `sha256:b8179d2e86be0f8e2d9de5bbaf2b14fa77c53c4c2ce07ed966a22c0f8f93a5e6`; package `sha256:ec476d5f9a9b714e2947142b4ac0ebd2631d6420160031b62e9b2baab30331b0`; two verified `fix` handoffs.
- Revision 3: compilation `sha256:ecef2f2cc16ed52d387056bd48c8b159bc015718b4eaeaa311f6e14b777a4034`; package `sha256:404bc3cfbabca22495ad63e8a93b8ff30cb0db3998192d24a937d963e753e123`; visual `pass`, boundary `fix`, integration not ready.
- Revision 4: compilation `sha256:d835edb8382a904d54012caa0641193007b8b46ba79960ba21640ee7a2e0f086`; package `sha256:044dc3ef45b0988e078145ccf317165113ea3e7a7d7e787be51406d3a5baccc1`; both reviews passed, but canonical verification retired the candidate for a missing README quick-start contract.
- Revision 5: compilation `sha256:571b1b4e57401ab25b92e7973ef298d287f3175a68f6363f56177ea90b46f135`; package `sha256:09a7cdea81b1d3b81f681ee0f4808c166f526107c2da7a66701f1d1c086f79cd`; visual `pass`, boundary `pass`, integration ready.

Every compilation used exact exhaustive search over two candidate partitions. Provider and model selection remained external-host supply.

## Verification And Integration

- Producer evidence: generated asset, source, README, checker, and regression diff.
- Verifier evidence: asset checks, template checker, checker matrix, canonical gate, whitespace check, and CI.
- Reviewer evidence: independent exact visual and capability handoffs.
- Integration evidence: one owner, post-integration digest reconstruction, exact commits, branch CI, fast-forward merge, and final main observation.
- Memory evidence: milestone, active context, history ledger, retrieval index, and durable pattern.

## Handoff

`pass`: reconstruct Revision 5 after release-record edits, run release gates, publish the exact branch, and fast-forward to `main` under the owner's standing approval.

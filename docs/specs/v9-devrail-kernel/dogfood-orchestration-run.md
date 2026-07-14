# V9 Kernel Dogfood Orchestration Run

## Status

Complete; independent review, local gates, and all seven remote CI jobs returned `PASS`.

## Goal

Execute and review the T010 circuit defined in `dogfood-decomposition-plan.md`, preserving one measured observation and one caller-owned trace as auditable evidence for AC8.

## Pattern Chosen

Single integration owner with one independent read-only reviewer.

## Why This Pattern

The run mutates one short-lived project and one tightly coupled evidence package. A single owner keeps operation order, cleanup ownership, measured results, trace authorship, and acceptance mapping coherent. Independent review challenges the evidence without creating a write conflict.

## Source Artifacts

- Feature package: `docs/specs/v9-devrail-kernel/`
- Decomposition plan: `docs/specs/v9-devrail-kernel/dogfood-decomposition-plan.md`
- Kernel contract: `docs/architecture/decisions/0001-executable-kernel-foundation.md`
- Example: `examples/minimal/`
- Memory: `docs/memory/active-context.md`, `docs/memory/known-issues.md`, `docs/memory/history-ledger.md`, `docs/memory/retrieval-index.md`

## Branch And State

- Source branch: `codex/v9-devrail-kernel`
- Target branch: `main`
- Frozen input baseline: `59d0423`
- Dirty state before implementation: clean and synchronized with origin.
- Approval gate: T010 may close after evidence and review; V9 merge remains gated by T011 and owner approval.
- Merge target: none during this run.

## Roster

| Role | Work Unit | Authority | Stop Condition |
| --- | --- | --- | --- |
| Primary IDE agent | Harness, evidence, integration, verification, memory | Own bounded T010 edits and run-owned temporary files. | Stop on scope expansion, uncertain cleanup, or product-boundary conflict. |
| Schrodinger (`019f5dd9-9283-7841-a91f-236c09e976e5`) | Initial frozen-contract review | Read and recommend only. | Closed after the bounded handoff deadline and direct stop request elapsed without a handoff. |
| Harvey (`019f5de0-c968-7af3-ac3e-e1127f8a88fd`) | Replacement frozen-contract review and implementation review | Read and recommend only. | Stop after strict `PASS` or `REVISE`. |
| Locke (`019f5f23-5886-7f10-9c17-6965efa34854`) | Initial implementation review | Read and recommend only. | Closed after the bounded handoff deadline and direct stop request elapsed without a handoff. |

## Work-Unit Contract References

| Role | Work Unit | Contract Source | Scope Boundary | Conflict Zones | Allowed Actions | Verification Evidence | Handoff Format |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Primary IDE agent | A and B | `dogfood-decomposition-plan.md` Work Units A-B | Harness, focused test, T010 evidence, run record | Package scripts and T010 docs | Bounded edits, local commands, run-owned temp cleanup | Focused test, observation, inspected trace, canonical gates | Files, commands, outcomes, risks |
| Schrodinger and Harvey | C, frozen contract | `dogfood-decomposition-plan.md` Work Unit C | Frozen T010 contract | None; read-only | Read and report | Referenced findings plus `PASS` or `REVISE` | Severity, evidence, correction, verdict |
| Locke and Harvey | C, implementation | `dogfood-decomposition-plan.md` Work Unit C | Completed T010 implementation and evidence | None; read-only | Read and report | Referenced findings plus `PASS` or `REVISE` | Severity, evidence, correction, verdict |

## Circuit Contract

```txt
prepare | source validation | source inspection | isolated init | isolated validation
        | expected missing-trace failure | caller recovery | retry inspection
        | expected init collision | preserved-project validation | cleanup proof
        | caller-trace inspection
```

The harness owns orchestration and measurement. The V9 kernel owns only init, validate, and read-only inspect operation results.

## Fan-Out Log

| Step | Role | Work Started | Context Bundle |
| --- | --- | --- | --- |
| 1 | Primary IDE agent | Audit and freeze | T010, AC8, V9 operation contracts, V6 dogfood pattern, active memory |
| 2 | Schrodinger | Frozen-contract challenge | Plan, acceptance criteria, architecture boundary, trace rules |
| 3 | Primary IDE agent | Diagnose and central recovery | Repeated empty waits, direct conclusion request, interrupt request, and running close status |
| 4 | Harvey | Narrow replacement review | Frozen plan/run plus exact T010 and AC8 gates |
| 5 | Primary IDE agent | Harness and evidence implementation | Frozen circuit, private CLI, source example, trace schema, package gates |
| 6 | Locke | Broad implementation review | Completed T010 implementation, evidence, and local gate summary |
| 7 | Primary IDE agent | Diagnose and central recovery | Repeated waits, conclusion request, interrupt request, and running close status |
| 8 | Harvey | Narrow implementation review | Harness, focused test, observation, trace, run record, package boundary |
| 9 | Primary IDE agent | Finding remediation | Cleanup-protected setup, early-failure regression, exact attempt count |

## Handoffs

The initial reviewer remained running beyond repeated waits and did not return after a queued conclusion request or direct interrupt. The integration owner closed the still-running attempt without any repository changes. This is a manual deadline and centralized-recovery event, not proof that V9 enforces liveness.

The replacement reviewer returned: "No actionable findings in the requested gates. The preimplementation contracts provide sufficient, appropriately scoped requirements without overclaiming completion." Verdict: `PASS`.

Preimplementation progression: `timed_out -> centrally cancelled -> retry -> PASS`.

The initial broad implementation reviewer also exceeded the bounded handoff window, remained running after conclusion and interrupt requests, and was centrally closed without edits. The replacement implementation review returned `REVISE` with two findings:

| Severity | Finding | Resolution |
| --- | --- | --- |
| P2 | The post-capture setup callback and project-directory creation were outside the cleanup-protected block. | Moved all work after identity capture into the guarded run block and added an injected setup-failure test that proves the captured root is removed. |
| P3 | The run record claimed three successful first attempts although the trace contains two. | Corrected the summary to two successful first attempts, one failed first attempt, and one successful retry. |

Focused re-review confirmed both corrections with no remaining actionable issues. Verdict: `PASS`.

## Measurement Record

The integration owner built the current kernel, ran `node scripts/run-v9-dogfood.mjs`, and preserved its one-line JSON result at `evidence/v9-t010-observation.json`. The observation is from Node `v24.14.1` on Windows x64. It is diagnostic evidence from one local run, not a benchmark, regression threshold, or service-level claim.

| Measure | Observed Value |
| --- | --- |
| Total bounded run | 2,457.835 ms |
| Kernel operations | 8 |
| Caller actions | 2 |
| Controlled failures | 2 |
| Explicit retries | 1 |
| Source example | Unchanged; digest `sha256:fde64608173c3f971b84e269d49ddfd09e8ee99690377b5001ec5f20ce6e41c1` |
| Initialized manifest after collision | Unchanged; digest `sha256:3691c9d87e54cb3fb5fd6d0c72d2f958144c23cbcbd14255fb7fc5717985feff` |
| Cleanup | Captured workspace identity rechecked; owned temporary root removed |

The first inspection of `traces/recovery.jsonl` failed as required with exit class 4 and `SC1001`. The caller then copied the repository-owned example trace into the isolated project and retried the same work packet successfully. Repeat initialization failed as required with two `SC1021` diagnostics; the manifest digest remained exact and subsequent validation passed.

The observation bytes have digest `sha256:4ddca0e5392256682d0335c547675eb8680c0fbb2c5bc32dbd260a6e9d57153b`. The caller-authored `evidence/v9-t010-trace.jsonl` binds that digest and reconstructs 22 events, one completed run, two successful first attempts, one failed inspection attempt, and its successful `retryOf` attempt. The typed workflow path is `diagnose -> pass`. V9 inspected this source trace; it did not create or persist it.

## Verification

- Focused harness test: four tests pass, covering two-run semantic repeatability, source immutability, mid-run and post-capture setup failure cleanup, observation-digest binding, and exact retry reconstruction.
- Measured harness: passed with the observation above and no unrestricted output or absolute temporary path in the report.
- Caller-owned trace inspection: passed with 22 events, one run, four terminal attempts, `diagnose -> pass`, and zero diagnostics.
- Independent review: preimplementation `timed_out -> centrally cancelled -> retry -> PASS`; implementation `timed_out -> centrally cancelled -> REVISE -> PASS`.
- Integrated commands: the template checker passes; `npm.cmd run verify` passes format, lint, typecheck, build, package dry run, and 209 tests with zero skips.
- Remote CI: GitHub Actions run `29310133523` passes Template Check and all six Node 22/24 jobs on Windows, Ubuntu, and macOS for commit `6d4e60a`.

## Review

Frozen-contract review is `PASS` after one bounded liveness recovery. Implementation review progressed `timed_out -> centrally cancelled -> REVISE -> PASS`; both findings are fixed and no actionable issue remains.

## AC8 Mapping

T010 contributes the dogfood plan, operation evidence, observed timings, expected failures, retry/recovery trace, verification, and review. It dogfoods the V8.2 feature-package, decomposition, visible-gate, source-preservation, and review flow. It exercises the V8.1 integrity controls by preserving a liveness failure, recovering through one integration owner, retaining typed failure state, proving a retry link, checking exact bytes after a rejected mutation, and refusing to turn one run into a production-readiness claim. T011 remains responsible for final package closure, complete CI matrix evidence, milestone, memory audit, and merge recommendation.

## Memory Updates

- Active context advances to T011.
- History ledger records the measured kernel dogfood and remote gate.
- Retrieval index points to the harness, observation, trace, run record, and RCA.
- Known issues preserves manual external-agent liveness and one-run timing limits.
- Failed attempts preserves both initial reviewer stalls.
- Patterns promotes semantic measurement and evidence rebinding after remediation.

## Completion Handoff

T010 is complete at implementation commit `6d4e60a`; GitHub Actions run `29310133523` is green across all seven jobs. Source evidence is under `docs/specs/v9-devrail-kernel/evidence/`, and independent review progressed through preserved liveness failures to `REVISE -> PASS`. T011 now owns the complete acceptance audit, AC6/AC8 closure, milestone, final memory review, and owner merge gate. V9 remains unmerged.

# V9 Kernel Dogfood Decomposition Plan

## Status

Complete; implementation review, local verification, and all seven remote CI jobs passed.

## Goal

Dogfood the shipped V9 kernel as one replayable, measured circuit that validates the repository example, initializes an isolated project, exercises an expected trace-inspection failure, recovers with caller-owned evidence, retries successfully, and proves cleanup and source immutability. Map the resulting evidence to T010 and AC8 without turning one local observation into a benchmark.

## Product Boundary

- SWECircuit is the repository and project name only.
- The root package remains private and has no `bin` entry.
- The harness calls only the built repository-local interface at `node dist/cli.js`.
- V9 initializes projects, validates contracts, and inspects caller-supplied traces.
- The harness, not the kernel, creates the temporary workspace, copies the recovery trace, measures elapsed time, records the run, and removes test-owned files.
- The run does not launch agents, execute circuits, write kernel traces, retrieve remote evidence, merge changes, or update memory automatically.

## Source Artifacts

- Feature package: `docs/specs/v9-devrail-kernel/`
- Architecture: `docs/architecture/decisions/0001-executable-kernel-foundation.md`
- Shipped example: `examples/minimal/`
- Current acceptance contract: `docs/specs/v9-devrail-kernel/spec.md` AC8 and `tasks.md` T010
- Relevant memory: `docs/memory/active-context.md`, `docs/memory/known-issues.md`, `docs/memory/history-ledger.md`, `docs/memory/retrieval-index.md`

## Branch And State

- Source branch: `codex/v9-devrail-kernel`
- Target branch: `main`
- Frozen input baseline: `59d0423`
- Dirty state at freeze: clean and synchronized with `origin/codex/v9-devrail-kernel`
- Approval gate: T010 may close on verified evidence; V9 remains unmerged through T011 and owner approval.
- Merge target: none during T010.

## Circuit

```txt
prepare
  | validate source example
  | inspect source trace
  | initialize isolated project
  | validate isolated project
  | inspect missing trace -> expected failure
  | copy caller-owned recovery trace
  | retry trace inspection -> pass
  | repeat initialization -> expected collision
  | validate preserved project -> pass
  | verify source immutability and cleanup
  | inspect caller-authored dogfood trace
```

The expected failure and collision are passing control checks only when their exact exit class and diagnostics match the frozen contract. Any unexpected success, diagnostic, mutation, or cleanup failure fails the run.

## Measurement Contract

- Measure each bounded operation with a monotonic clock around the exact action.
- Record elapsed milliseconds as non-negative observations, never requirements, benchmarks, regressions, or service-level claims.
- Record Node version, operating-system platform, and architecture so the observation has enough context to interpret.
- Emit one structured JSON report to stdout and no permanent report file.
- Store operation identifiers, exit status, bounded summaries, and diagnostic codes; do not store absolute temporary paths, environment variables, secrets, or unrestricted stdout/stderr.
- Keep timestamps out of the caller-owned trace unless independently captured; sequence and causation remain authoritative.
- Commit one reviewed observation as source evidence only after the run actually occurs.

## Work Units

### Work Unit A: Harness And Focused Test

- Objective: implement a deterministic repository-local harness around the three shipped internal CLI operations.
- Scope: `scripts/run-v9-dogfood.mjs`, `test/dogfood-harness.test.mjs`, and the minimum package-script formatting coverage needed for those files.
- Dependencies: built `dist/cli.js`, `examples/minimal/`, and the frozen operation grammar.
- Conflict zones: package scripts and current T010 docs; integration owner edits only.
- Authority: create and remove only an OS temporary directory owned by the current run; read repository examples; spawn the current Node executable.
- Verification evidence: exact step order, expected exit classes and diagnostics, bounded report schema, source-tree byte stability, manifest preservation, second-run semantic stability, and cleanup confirmation.
- Handoff: changed files, focused command, result, failure/recovery evidence, and residual risks.
- Stop conditions: a new kernel interface, external dependency, network call, broad filesystem mutation, public package surface, or unverifiable cleanup ownership.

### Work Unit B: Measured Observation And Caller-Owned Trace

- Objective: execute the frozen harness, preserve one bounded report, author a trace from observed events, and inspect that trace with V9.
- Scope: T010 evidence under `docs/specs/v9-devrail-kernel/evidence/` and the active orchestration record.
- Dependencies: Work Unit A passing locally.
- Conflict zones: none outside the T010 package.
- Authority: summarize actual outputs and author source evidence; no invented timings or kernel-produced-trace claims.
- Verification evidence: successful harness exit, observed durations, exact expected failures, successful retries, cleanup assertion, trace-inspection summary, and evidence-to-AC8 mapping.
- Handoff: evidence paths, commands, inspected event/run counts, and caveat that one machine run is diagnostic only.
- Stop conditions: sensitive output, absolute path disclosure, mismatch between report and trace, or a trace event that was not observed.

### Work Unit C: Independent Review

- Objective: challenge evidence honesty, failure/retry semantics, timing validity, cleanup safety, trace causation, and scope control.
- Scope: this plan, the harness/test, observation, caller-owned trace, orchestration record, and T010 acceptance mapping.
- Authority: read and recommend only; no edits, installs, commits, pushes, or external actions.
- Verification evidence: severity-ordered findings with file references and strict `PASS` or `REVISE`.
- Handoff: finding, impact, evidence, required correction, and verdict.
- Stop conditions: work outside T010 or a request to change repository state.

## Fan-Out And Fan-In

The integration owner implements Work Unit A because it is the critical path. The independent reviewer may inspect the frozen contract while implementation begins, then reviews the completed evidence as a separate gate. Work Unit B waits for the harness and focused test. The integration owner owns every edit and synthesizes review findings before canonical verification.

## Verification Matrix

| Contract | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| Exact shipped operations | Harness step assertions | Canonical `npm.cmd run verify` |
| Expected failure and retry | `SC1001`, exit 4, then successful inspect | Caller-owned trace attempt chain |
| Collision integrity | `SC1021`, exit 4, unchanged manifest, subsequent validation | Dogfood observation and focused test |
| Measurement honesty | Non-negative monotonic durations plus environment tuple | Run record labels values as one observation |
| Source and cleanup safety | Full source-example snapshot unchanged; owned temp root absent | Focused test repeats the complete harness |
| Trace ownership and validity | Trace authored after observed run | Internal CLI inspection plus independent review |
| AC8 contribution | T010 evidence links current package and V8.1 controls | T011 package, CI, milestone, and memory audit |

## Stop Or Diagnose Triggers

- The same unexpected failure recurs after one bounded correction.
- The source example or initialized manifest changes unexpectedly.
- Cleanup cannot prove that the target is the run-owned temporary root.
- Report data contains absolute paths, unbounded output, or sensitive values.
- The committed observation cannot be reproduced semantically on a second run.
- The caller-owned trace disagrees with the measured report.
- Independent review returns an unresolved high- or medium-severity finding.

## Memory Updates

- History ledger: update when T010 closes.
- Retrieval index: add the plan, run record, observation, and trace when stable.
- Decisions: update only if dogfooding changes a durable product or verification policy.
- Known issues: add environment-specific or reproducibility limits that survive remediation.
- Failed attempts: record any non-obvious failed approach.
- Patterns: promote only a reusable measured-dogfood or caller-owned-trace lesson.

## Completion Gate

T010 passes only when the focused test, measured run, caller-owned trace inspection, independent review, template checker, and canonical kernel gate all pass; the evidence maps explicitly to AC8; and no document implies namespace acquisition, public distribution, runtime orchestration, kernel-authored traces, or automatic memory updates.

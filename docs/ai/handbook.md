# Portable AI SWE Workflow Handbook

## 1. What This System Is

This repository defines a portable workflow for AI-assisted software engineering. The goal is a system that is simple to follow day to day, but deep enough to prevent common failure modes: unclear requirements, context drift, repeated patching, weak verification, uncoordinated parallel work, and forgotten lessons.

The visible operating surface is:

- `AGENTS.md` for AI agents.
- This handbook for humans and agents.
- A feature package under `docs/specs/` for meaningful work.
- Memory files under `docs/memory/` for durable and retrievable project knowledge.
- Research governance under `docs/research/` for ecosystem best practices.

The default unit of work is a feature spec. A feature can be a user-facing feature, bug fix, refactor, migration, documentation change, or process improvement. Small safe changes can use a lighter path, but the same state machine still applies.

## 2. Daily Quick Path

For a normal feature:

```txt
1. Intake: capture the request.
2. Clarify: resolve uncertainty or record assumptions.
3. Spec: define behavior and acceptance criteria.
4. Architecture check: decide whether ADR or design change is needed.
5. Task plan: break work into verifiable tasks and decide whether parallel work is safe.
6. Implement: change the smallest coherent slice.
7. Verify: run tests and checks.
8. Review: compare implementation to spec, architecture, and risks.
9. Memory update: record durable lessons and update retrieval pointers.
```

For a tiny change:

```txt
intake -> clarify if needed -> implement -> verify -> memory update if durable
```

Tiny means all of these are true:

- No product ambiguity.
- No public API, data, migration, security, or architecture impact.
- Clear verification path.
- Low blast radius.
- No need for parallel agents.

For a failing or confusing change:

```txt
verify/review fails -> diagnose -> root cause -> minimal fix -> regression coverage -> verify -> review
```

For work that can safely fan out:

```txt
spec -> task plan -> parallelization readiness -> work-unit contracts -> parallel work -> integration -> verify -> review
```

## 3. Design Invariants

This workflow should stay simple, traceable, source-preserving, and current.

Simple means the first page tells a new user what to do next. Deep protocols exist, but they are invoked by risk, ambiguity, repeated failure, or parallel coordination needs.

Traceable means important work should connect through this chain:

```txt
goal -> spec -> plan -> tasks -> implementation notes -> verification evidence -> review -> memory
```

Source-preserving means summaries are never the only record of truth. The feature package, debug notes, RCA, review, research snapshot, or history ledger should preserve enough evidence for a future agent to audit what happened.

Current means the workflow is allowed to learn. When a version is complete, use it for the next version and record any friction discovered while dogfooding it.

## 4. State Machine

The workflow is:

```txt
intake -> clarify -> spec -> architecture check -> task plan -> implement -> verify -> review -> memory update
```

Every stage emits exactly one outcome:

```txt
pass | fix | diagnose | clarify | redesign | split | block | learn
```

Outcome routing:

| Outcome | Meaning | Next Action |
| --- | --- | --- |
| `pass` | Stage completed with enough confidence. | Move forward. |
| `fix` | A concrete implementation issue exists. | Return to implementation with evidence. |
| `diagnose` | Cause is unclear or failure recurs. | Enter problem-solving mode. |
| `clarify` | Requirements or acceptance criteria are unclear. | Return to clarify/spec. |
| `redesign` | Architecture, data flow, or task plan is wrong. | Return to architecture/task plan. |
| `split` | Scope expanded beyond the current feature. | Create follow-up work. |
| `block` | Work cannot continue safely. | Ask the user with evidence. |
| `learn` | Durable knowledge was discovered. | Update memory, then continue if in scope. |

The workflow is not waterfall. Later stages can send work backward, but they must say why and produce evidence.

## 5. Stage Contracts

### Intake

Purpose: capture the request in a form that can become work.

Inputs:

- User request, issue, ticket, bug report, or idea.
- Any linked docs, screenshots, logs, or prior conversations.

Outputs:

- Initial feature folder name.
- Problem statement.
- Known constraints.
- Open questions.

Exit outcomes:

- `pass` when the work is understandable enough to clarify or spec.
- `clarify` when the request is underspecified.
- `block` when required context is unavailable.

### Clarify

Purpose: remove ambiguity before planning.

Ask the user when ambiguity affects:

- Product intent.
- Acceptance criteria.
- User-visible behavior.
- Public API or schema.
- Security, privacy, data retention, or destructive actions.
- Migration or rollout.
- Verification strategy.

Record assumptions when ambiguity is low-risk and reversible.

Exit outcomes:

- `pass` when requirements are clear enough.
- `clarify` when more questions remain.
- `block` when work depends on a missing decision.

### Spec

Purpose: define what success means.

The spec must include:

- Problem.
- Goals and non-goals.
- Users or affected actors.
- Requirements.
- Acceptance criteria.
- Constraints.
- Risks.
- Open questions.
- Assumptions.

Exit outcomes:

- `pass` when acceptance criteria are testable.
- `clarify` when criteria cannot be tested.
- `split` when one feature contains multiple separable outcomes.

### Architecture Check

Purpose: decide whether the work affects system shape.

Create or update an ADR when the change affects:

- Long-lived architecture.
- Data model or migrations.
- External integrations.
- Security boundaries.
- Runtime/deployment model.
- Cross-module contracts.
- Major dependencies.

Exit outcomes:

- `pass` when no architecture change is needed or ADR is complete.
- `redesign` when the approach conflicts with architecture.
- `clarify` when architectural tradeoffs require product input.

### Task Plan

Purpose: turn the spec into verifiable work.

Each task must have:

- A clear action.
- A scope boundary.
- An acceptance or verification mapping.
- Dependencies if any.

When work could be parallelized, add a parallelization readiness check. Parallel work is ready only when each work unit has a clear contract, limited conflict zones, independent verification, and an integration owner.

Exit outcomes:

- `pass` when tasks are small, verifiable, and correctly sequenced or parallelized.
- `split` when tasks reveal multiple feature packages.
- `redesign` when the plan exposes design problems.
- `clarify` when safe decomposition depends on product or architecture input.

### Implement

Purpose: make the smallest coherent change that satisfies the current task.

Rules:

- Follow existing code patterns.
- Avoid unrelated refactors.
- Keep changes traceable to tasks.
- Record assumptions and deviations.
- Do not add production dependencies without approval.
- For parallel work, stay inside the assigned work-unit contract.

Exit outcomes:

- `pass` when implementation is ready for verification.
- `diagnose` when implementation reveals non-obvious failures.
- `clarify` when requirements are not implementable as written.
- `redesign` when architecture cannot support the plan.

### Verify

Purpose: prove the work behaves as expected.

Verification includes whichever are relevant:

- Unit tests.
- Integration tests.
- End-to-end tests.
- Typecheck.
- Lint.
- Build.
- Manual reproduction.
- Security or dependency checks.
- Migration checks.

Exit outcomes:

- `pass` when evidence supports the acceptance criteria.
- `fix` when a clear defect is found.
- `diagnose` when the failure cause is unclear, recurring, or flaky.
- `clarify` when the test contradicts the spec.

### Review

Purpose: catch mismatches that tests miss.

Review checks:

- Does implementation satisfy acceptance criteria?
- Did scope drift?
- Did architecture constraints hold?
- Are tests meaningful?
- Are security/data impacts handled?
- Are docs and memory updated?
- Are parallel work products integrated coherently?
- Are there hidden follow-ups?

Exit outcomes:

- `pass` when ready to merge.
- `fix` for clear defects.
- `diagnose` for unclear or repeated issues.
- `redesign` for design mismatch.
- `split` for follow-up work.

### Memory Update

Purpose: make future work easier and safer.

Update memory with durable knowledge and retrieval pointers:

- Decisions.
- Known issues.
- Failed attempts.
- Stable patterns.
- Domain terms.
- Follow-ups.
- History ledger entries.
- Retrieval index entries.

Do not record noisy transcript summaries as durable rules. Preserve source artifacts first, then add compact memory pointers.

Exit outcomes:

- `pass` when durable knowledge is recorded or explicitly not needed.
- `learn` when new reusable guidance should be promoted.

## 6. Clarification Policy

Agents should ask fewer, better questions. A good clarification question changes the plan.

Ask when:

- Multiple plausible product behaviors exist.
- A change could be destructive or irreversible.
- Security, privacy, permissions, or data retention is involved.
- The requested behavior conflicts with existing architecture.
- The verification target is unclear.
- The agent lacks required external context.
- Parallelization would create unclear ownership or file conflicts.

Proceed with recorded assumptions when:

- The assumption is low-risk.
- It is easy to reverse.
- Existing conventions strongly imply the answer.
- The assumption is documented in the feature package.

Do not ask:

- Where files are if they can be found.
- Which local pattern to use if the codebase makes it clear.
- Whether to run standard verification commands.

## 7. Retrieval Policy

Retrieval should be stage-aware. The agent should pull the smallest useful context, not the whole world.

Planning retrieval:

- Product docs.
- Similar feature specs.
- Architecture overview.
- ADRs.
- Practice register.
- History ledger and retrieval index.

Implementation retrieval:

- Related modules.
- Existing tests.
- Public interfaces.
- Local helper APIs.
- Dependency docs when behavior is unstable or unfamiliar.

Diagnosis retrieval:

- Exact failing command.
- Logs, screenshots, traces, or reproduction steps.
- Recent changes.
- Known issues.
- Failed attempts.
- Dependency release notes or official docs if relevant.

Parallel work retrieval:

- Work-unit contract.
- Shared spec and task plan.
- Files owned by the work unit.
- Conflict zones and dependency order.
- Handoff expectations.

Review retrieval:

- Spec acceptance criteria.
- Task plan.
- Diff.
- Verification evidence.
- Architecture constraints.
- Work-unit handoffs if parallel agents were used.

Memory retrieval:

- Active context.
- History ledger.
- Retrieval index.
- Decisions.
- Failed attempts.
- Known issues.
- Patterns.

## 8. Problem-Solving And Root-Cause Protocol

Problem-solving mode is mandatory when:

- A failure is not understood.
- A fix reveals another related bug.
- The same failure returns.
- A test is flaky.
- The implementation path starts to thrash.
- Parallel agents return conflicting explanations.
- The agent is about to make a broad change without evidence.

The protocol:

1. Reproduce the failure.
2. Capture stable evidence.
3. Classify the failure.
4. Retrieve related code, docs, history, and memory.
5. Generate hypotheses.
6. Test one hypothesis at a time.
7. Confirm root cause.
8. Apply the smallest causal fix.
9. Add or update regression coverage.
10. Record durable learning.

Failure classes:

- Requirement ambiguity.
- Implementation defect.
- Architecture mismatch.
- Incorrect or incomplete test.
- Environment or tooling issue.
- Dependency/library behavior.
- Data, migration, or state issue.
- Flaky or non-deterministic behavior.
- Parallel integration conflict.
- Unknown.

Anti-thrash rules:

- Do not change code before reproducing or explaining why reproduction is impossible.
- Do not apply multiple unrelated fixes in one diagnostic step.
- Do not call a cause root cause unless a targeted experiment supports it.
- Do not suppress a failing test without documenting why the test is invalid.
- Do not broaden scope silently; split work when needed.
- Do not fan out implementation fixes when the failure mode is still unknown; fan out diagnosis instead.

Root-cause evidence should answer:

- What failed?
- Why did it fail?
- Why was it not caught earlier?
- What proves the fix addresses the cause?
- What regression coverage now exists?
- What future work or memory update is needed?

## 9. Verification And Review Protocol

Verification is deterministic evidence. Review is judgment against intent.

Before review, gather:

- Commands run.
- Test results.
- Manual checks if relevant.
- Known skipped checks and reasons.
- Residual risks.
- Parallel work handoffs if relevant.

Review should compare:

- Spec to implementation.
- Tasks to changed files.
- Tests to acceptance criteria.
- Architecture constraints to design choices.
- Work-unit contracts to actual parallel changes.
- Memory changes to durable learnings.

Review should produce one of:

- Approved.
- Changes requested.
- Needs diagnosis.
- Needs clarification.
- Needs split/follow-up.

## 10. Traceability And Memory Architecture

Memory has three layers:

| Layer | Purpose | Files |
| --- | --- | --- |
| Source record | Preserve what happened and why. | Feature packages, debug notes, RCA, review notes, research snapshots. |
| Durable memory | Keep stable facts and lessons in the fast path. | `active-context.md`, `decisions.md`, `known-issues.md`, `failed-attempts.md`, `patterns.md`, `glossary.md`. |
| Retrieval pointers | Make source records easy to find later. | `history-ledger.md`, `retrieval-index.md`. |

The rule is source first, summary second. If a future agent needs to audit a decision, the memory file should point back to the feature package, snapshot, RCA, or review note that supports it.

Use `history-ledger.md` as an append-only chronological ledger of meaningful work. Use `retrieval-index.md` as a compact map from topic, feature, stage, file, or decision to the source artifact.

A full transcript can be useful, but V2 does not install a conversation-capture tool. Until one is approved, the durable substitute is to preserve the work package, evidence, and memory pointers that make the important parts of the conversation recoverable.

Future memory tools should be evaluated against these criteria:

- Preserves source truth or drill-down evidence.
- Supports fast retrieval without forcing the whole history into context.
- Handles temporal questions and cross-session continuity.
- Keeps memory inspectable and editable by the human owner.
- Has clear privacy, storage, and deletion behavior.

## 11. Memory Protocol

Memory is for durable context, not a transcript dump.

Update:

- `active-context.md` when current focus changes.
- `history-ledger.md` when meaningful work is completed or a workflow version changes.
- `retrieval-index.md` when a future agent needs a fast pointer to source artifacts.
- `decisions.md` when a durable decision is made.
- `known-issues.md` when a real limitation or unresolved bug is discovered.
- `failed-attempts.md` when an attempted fix did not work and may be repeated later.
- `patterns.md` when a reusable implementation or workflow pattern emerges.
- `glossary.md` when domain terms need stable definitions.

Promote to `AGENTS.md` only when a lesson should affect every future agent session.

## 12. Version Dogfooding

When a workflow version is complete, use it for future work on this repository.

For each new workflow version:

1. Create a feature package using the current template.
2. Follow the current handbook and `AGENTS.md`.
3. Record friction, missing rules, or speed bumps in implementation notes.
4. Update memory with durable lessons.
5. Promote only reusable improvements into the handbook, templates, checker, or agent instructions.
6. Run the template checker.

Dogfooding should make the workflow simpler over time. If a step adds ceremony without preventing mistakes, record that and simplify it in the next version.

## 13. Desired Edit State

The target state for this repository is a clean, versioned baseline with one active version branch at a time.

Use this loop:

```txt
clean committed main -> create version branch -> complete feature package -> verify -> review -> milestone -> user approval -> merge to main
```

A good edit state has:

- A stable baseline on `main`.
- At most one primary workflow-version branch active unless parallel version work is explicitly planned.
- A feature package for the active version.
- All meaningful edits traceable to the active feature package.
- Passing local validation before review.
- Completed milestone overview before merge.
- Updated memory, history ledger, and retrieval index.

The V1-V3 bootstrap is the only planned exception: it creates the first approved baseline on `main`. After that baseline is committed, new version work should branch from `main`.
## 14. Development Milestones

Development milestones are the human progress layer. They answer: what did this version accomplish, how was it verified, what risks remain, and what should happen next?

A milestone is not a replacement for a feature package. The feature package is the source record; the milestone is the concise version overview.

When a version is finished or ready for approval:

1. Create or update `docs/milestones/vVERSION.md` from `docs/milestones/_template.md`.
2. Link the feature package, review, research snapshot if any, and memory updates.
3. Summarize shipped changes in plain language.
4. Record verification evidence.
5. Record residual risks and next recommended work.
6. Use the `User-Facing Overview` section when notifying the user.

Milestones should stay short enough to scan in under a minute.

## 15. Branch And Merge Workflow

The desired edit state is:

```txt
clean main baseline -> version branch -> feature package -> implementation -> verification -> review -> milestone -> approval -> merge to main
```

Branch rules:

- `main` is the stable baseline branch.
- Version work happens on `codex/vVERSION-slug`.
- A branch should have one primary version feature package.
- The branch should not merge until verification passes, review is complete, memory is updated, and the milestone overview exists.
- After merge, `main` becomes the new completed baseline and should be used for the next version.

Bootstrap exception:

- If the repository has no initial commit, first create an approved baseline on `main`.
- After that, do not do new version work directly on `main` unless the user explicitly asks.

Merge readiness checklist:

- Feature package complete.
- Template checker passes.
- Review outcome is approved or remaining work is split.
- Milestone overview complete.
- History ledger and retrieval index updated.
- User has approved the version for merge.
## 16. Parallel Agent Development

Parallel agents are for acceleration through clear decomposition, not for making ambiguous work louder.

Use parallel agents when at least one is true:

- Multiple independent areas need exploration or review.
- A feature naturally splits into separate modules or layers.
- Competing debugging hypotheses can be tested independently.
- Review needs several perspectives such as security, correctness, test quality, and docs.
- Repetitive audits can be distributed across files, packages, tickets, or incidents.

Avoid parallel agents when:

- Requirements are unclear.
- Multiple agents would edit the same file or shared state without a merge order.
- The work is mostly sequential.
- The blast radius is high and the integration plan is weak.
- The cost of coordination is greater than the expected speedup.

### Parallelization Readiness

Before fan-out, answer:

- What is the shared goal?
- What are the work units?
- Which work units can run independently?
- Which files, docs, APIs, tests, or decisions are conflict zones?
- Who owns integration?
- What evidence must each agent return?
- What should make a worker stop and ask for help?

### Work-Unit Contract

Use this shape for every parallel unit:

```txt
Work unit:
Objective:
Scope boundary:
Likely files/docs:
Dependencies:
Conflict zones:
Context bundle:
Agent role/capability:
Allowed actions:
Verification evidence:
Handoff format:
Stop conditions:
```

### Integration Loop

The main agent or assigned integration owner must:

1. Wait for all required handoffs or explicitly close abandoned work.
2. Compare results against the shared spec and task plan.
3. Resolve conflicts before verification.
4. Run integrated verification, not only worker-local checks.
5. Perform review against the full change.
6. Record lessons in the feature package and memory.

When a ticket hits bug after bug, do not spawn implementation agents to patch blindly. Split diagnostic work instead: one agent can reproduce, another can inspect related code, another can review history or docs, and another can test a hypothesis. Only implement after root cause is supported by evidence.

## 17. Practice Intake And Tool Adoption

The system should absorb best practices without becoming chaotic.

Use this pipeline:

```txt
discover -> snapshot -> evaluate -> register -> promote -> verify
```

- `discover`: find promising ecosystem practices.
- `snapshot`: record dated research notes.
- `evaluate`: decide relevance, maturity, risk, and fit.
- `register`: accept, reject, watch, or defer.
- `promote`: update handbook, templates, or AGENTS.md.
- `verify`: confirm the promoted practice improves the workflow.

Tool adoption defaults:

- Do not install external tools in v3.
- Prefer file-based contracts first.
- Add tools only when they remove real work or reduce failure risk.
- Record tool decisions in the practice register.

Optional future integrations:

- Spec Kit for spec-driven workflow automation.
- BMAD as a full lifecycle reference.
- Serena for semantic code retrieval.
- Repomix for full-repo context packs.
- Basic Memory, Mem0, Zep/Graphiti, A-MEM, or related systems for persistent memory.
- Context7 or official docs MCPs for dependency documentation.

## 18. Starting A New Feature

1. Copy `docs/specs/_template/` to a new feature folder under `docs/specs/`.
2. Fill `spec.md` until acceptance criteria are testable.
3. Fill `plan.md` with approach and architecture impact.
4. Fill `tasks.md` with verification mapping and parallelization readiness if relevant.
5. Fill `test-plan.md`.
6. Implement task by task or work-unit by work-unit.
7. Use `debug-notes.md` and `root-cause-analysis.md` if diagnosis is needed.
8. Fill `review.md`.
9. Update memory, history ledger, and retrieval index.
10. Run `scripts/check-template.ps1`.

If local PowerShell execution policy blocks direct script execution, run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
```

## 19. Done Definition

Work is done when:

- Acceptance criteria are satisfied.
- Verification evidence is recorded.
- Review outcome is approved or follow-ups are split.
- Architecture/ADR impact is handled.
- Diagnostic notes exist for non-trivial failures.
- Parallel work, if used, has integrated verification and review.
- Durable memory is updated or explicitly not needed.
- History ledger and retrieval index are updated for meaningful work.
- The template checker passes.






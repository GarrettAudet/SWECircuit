# AGENTS.md

## Purpose

SWECircuit is a portable operating system for AI-assisted software engineering. It favors a simple human surface with deeper protocols for specification, diagnosis, retrieval, verification, review, parallel agent work, traceability, and memory.

Keep this file as the agent contract and routing index. Detailed explanations, examples, and long protocols belong in the handbook, feature packages, circuits, modules, packs, research snapshots, or memory files.

## Required Reading

Before meaningful work, read:

- `README.md`
- `docs/ai/handbook.md`
- Relevant feature package under `docs/specs/`
- `docs/memory/active-context.md`
- `docs/memory/decisions.md`
- `docs/memory/known-issues.md`
- `docs/memory/history-ledger.md`
- `docs/memory/retrieval-index.md`

For research or workflow changes, also read:

- `docs/research/practice-register.md`
- Latest relevant file under `docs/research/snapshots/`

For circuit, module, pack, or adapter changes, also read:

- `docs/rails/README.md`
- `docs/modules/README.md`
- `docs/packs/README.md`
- `docs/framework/module-registry.md`

## Operating Invariants

Keep every workflow change simple, traceable, source-preserving, and versioned.

- Simple: expose a quick path first; add deeper protocol only when risk or ambiguity requires it.
- Traceable: connect goal, spec, plan, task, verification, review, and memory updates.
- Source-preserving: keep primary work artifacts and evidence; use summaries for speed, not as the only truth.
- Current-version first: once a workflow version is complete, use it for the next workflow change.

## Operating Workflow

Use this state machine for non-trivial work:

```txt
intake -> clarify -> spec -> architecture check -> task plan -> implement -> verify -> review -> memory update
```

Every stage must emit one outcome:

```txt
pass | fix | diagnose | clarify | redesign | split | block | learn
```

Route according to the outcome:

- `pass`: continue to the next stage.
- `fix`: return to implementation with a specific failing condition.
- `diagnose`: enter the problem-solving protocol before changing code again.
- `clarify`: update requirements, assumptions, or open questions before implementation.
- `redesign`: revisit architecture, ADRs, or task planning.
- `split`: create a follow-up spec or ticket for expanded scope.
- `block`: stop and ask the user with evidence.
- `learn`: update durable memory and continue only if the work remains in scope.

## Version Dogfooding Rule

When a workflow version is completed, use that version for future work on this repository. The next workflow version must create a feature package, follow the current handbook, record friction and performance observations, and promote durable lessons into memory or core docs.

If the current version blocks progress or creates obvious waste, continue only after recording the exception in the feature package and, when durable, in `docs/memory/known-issues.md` or `docs/memory/failed-attempts.md`.

## Traceability And Memory Rule

Do not let important context disappear into a chat transcript. For meaningful work:

- Record the work package under `docs/specs/`.
- Link decisions, known issues, failed attempts, patterns, and glossary terms to their source artifacts when possible.
- Add a short entry to `docs/memory/history-ledger.md` when a version, feature, bug, or process decision is completed.
- Update `docs/memory/retrieval-index.md` when a future agent should be able to find the artifact quickly.
- Preserve source evidence in feature notes, debug notes, RCA, snapshots, or review notes; summarize only after the source exists.


## Development Milestone Rule

When a workflow version is finished or ready for approval, create or update a milestone under `docs/milestones/`. The milestone must summarize the goal, shipped changes, source artifacts, verification, residual risks, next recommended work, and a concise user-facing overview.

Use the milestone overview when notifying the user that a version is complete. Keep milestones short; source evidence belongs in the feature package, review, research snapshot, and memory files.

## Branch Workflow Rule

The stable baseline branch is `main`. Future workflow versions should be developed on a dedicated branch named:

```txt
codex/vVERSION-slug
```

The desired edit state is: clean `main` baseline -> version branch -> feature package -> implementation -> verification -> review -> milestone -> user approval -> merge to `main`.

The V1-V3 bootstrap creates the first approved baseline on `main`. After that baseline is committed, do not start new version work directly on `main` unless the user explicitly asks.



## IDE Interaction Rule

Make the workflow visible in chat. For meaningful work, start by stating the workflow/version or branch, current stage, active artifact, next action, and assumptions. During work, use short stage/outcome/evidence/next-action updates so the user can see the system operating.

Use `docs/ide/README.md` and `docs/ide/_message-templates.md` for start banners, stage updates, clarification prompts, diagnosis notices, verification reports, and completion handoffs.

When asking the user for a decision, explain why it matters and what will happen next. When proceeding on a low-risk assumption, say where it is recorded. When finishing a version, use the milestone overview and state the branch or merge gate.

## Standalone Agent Rule

Make the single-agent/IDE workflow excellent before expanding multi-agent orchestration. For a bounded goal, one agent should be able to run the full loop: retrieve context, clarify, plan, implement, verify, review, update memory, and hand off evidence.

Use `docs/agents/_template.md` when an agent is expected to own a meaningful goal end to end. The template must define goal, completion evidence, scope boundary, authority, context bundle, independence readiness, verification plan, stop conditions, handoff, and memory updates.

Do not treat autonomy as permission for broad edits. If the goal, scope, verification, branch state, or safety boundary is unclear, clarify or narrow the work before implementing.

## Parallel Work Rule

Parallelize only after the task plan defines work-unit contracts. Each parallel work unit needs:

- Objective.
- Scope boundary and likely files or docs.
- Dependencies and conflict zones.
- Context bundle to retrieve before work starts.
- Agent role or capability needed.
- Verification evidence required.
- Handoff format.
- Stop conditions.

Use subagents first for read-heavy exploration, review, testing, diagnosis, and independent implementation slices. Keep the main agent as the integration owner unless another owner is explicitly assigned. Do not parallelize ambiguous requirements, shared-state edits, broad refactors, or security-sensitive changes until the contract is clear.

## Specialist Compiler Rule

When the user asks to use SWECircuit for a meaningful goal, make specialist construction visible before launching parallel work:

1. Clarify product intent and acceptance criteria. Put every assumption and unresolved decision in the closed `GoalContract`; a blocking decision emits `clarify` and prevents compilation.
2. Select owner-approved Modules and define stable atomic work units with exact context, authority, evidence duties, dependencies, handoff, and stop conditions. Repository locators must be relative `path:` values whose parsed path segments contain neither `.` nor `..`; the fragment-free locator path must also be covered by the source's declared `readScope`.
3. Run `compileAgentBlueprints`. Core constructs candidate team partitions; do not preselect generic frontend, backend, tester, or reviewer roles as the contract.
4. If compilation returns `SC4306`, run `analyzeSpecialistCandidates` with the exact reviewed request. Show the serial baseline, rejected proposals, search claim, rejection codes, and bounded alternatives; then revise the goal. Candidate analysis is not a roster and must never be rendered or launched.
5. For a successful compilation, show the serial baseline, selected partition, `search.mode`, exact `search.claim`, machine-readable `selectionReason`, rejected hard gates when relevant, and compilation `contentDigest`.
6. Run `renderSpecialistPackage`, preserve `compilation.json`, and record the returned `packageDigest`. Every generated agent contract includes a concrete verifier-valid `SpecialistAgentHandoff` example; require agents to preserve that exact nested shape rather than infer it from the blueprint. Before launch, call `verifySpecialistPackage` with the trusted expected compilation and package digests.
7. If an agent must semantically audit the exact compilation that defines it, freeze candidate A and compile a separate read-only prelaunch audit B over A's complete compilation and package. After the external host reconstructs A and verifies B against B's approval-bound digest pair, it must create, preserve, and deliver a closed `PrelaunchPackageVerificationReceipt` outside both packages before B launches. The receipt is a declared runtime input, not a `contextSource`; it does not change B's package identity, must keep `candidateLaunchApproved: false`, and does not ask B to verify its own final package. Require B's independent `PASS` in the closed `PrelaunchAuditHandoff` envelope, then preserve a cross-package launch authorization binding both digest pairs, the receipt's exact path, raw digest, byte count, and outcome, and the semantic handoff's exact path, raw digest, byte count, and outcome before separately approving A. Never infer semantic `PASS` from prose, a filename, or the authorization record alone. B is the explicit owner-reviewed trust root and does not review itself.
8. Bind approval to both `compilationDigest` and `packageDigest`, then launch only the exact verified agent contracts.
9. Preserve every agent result as exact raw UTF-8 bytes. Call `verifySpecialistHandoff` against the approved package and digest pair; before a dependent integration blueprint starts, call `assessSpecialistHandoffs` with its exact transitive dependency handoffs. Continue only when both calls succeed with non-null values and the assessment has `integrationReady: true`. A verified non-`pass` outcome still routes through the workflow; it is never treated as success. Preserve the generated artifact media type exactly; handoff artifact content may use normalized LF but not TAB, CR, CRLF, or other unsafe controls.
10. Integrate through one owner, verify feature acceptance, review independently where required, and update traceable memory. Bind any document or artifact that integration may mutate through an immutable pre-integration snapshot. After integration, reconstruct and verify the approved compilation/package pair again; a mismatch retires the candidate and requires a new revision.

Correctness, authority, evidence coverage, requested producer/checker independence, and clarification closure are hard gates. Extra agents are justified only by the fixed optimization objective. `search.claim` is `exhaustive_partition_search_fixed_scheduler` only through eight work units; larger searches use `bounded_evaluated_set_no_global_optimum`.

The only permission demand kinds are `filesystem.read`, `filesystem.write`, `network.connect`, `process.spawn`, and `secrets.read`. They remain declarative demand until an external host enforces them.

The compiler is IDE-, API-, model-, and provider-neutral. External hosts still choose runtime supply, deliver and verify context, isolate workspaces, enforce permissions, execute tools, persist evidence, merge, and update durable memory. Never claim that V11 performs those effects.

Use `docs/specs/v11-specialist-compiler/specialist-compiler-contract.md` and `docs/ide/specialist-agent-kickoff.md` as the active contract. Retrieve `docs/specs/v11-orchestration-planner/` only when working on the deferred runtime layer or auditing why it was split.

## Circuit Composition Rule

Use Circuit Composition as the default mental model for meaningful work:

```txt
input | module | module | output
```

Each module must define input, action, output, gate, and outcome. The active circuit should make artifacts and gates visible enough that the user can see how work is moving from goal to evidence to memory.

The current 0.x file contract retains `rail` in paths and templates for compatibility. Use `docs/framework/rail-composition.md` and `docs/framework/_rail-template.md` when defining or modifying reusable workflow circuits until V9 ships a tested migration.

## Modular Framework Rule

Treat this repository as a lightweight framework kernel: simple operating surface, modular contracts underneath, optional adapters around the edges.

Use `docs/framework/README.md` when work needs a reusable module, external tool adapter, orchestration pattern, decomposition plan, or fan-out run record.

Before installing or relying on an external framework, preserve a dated research snapshot, evaluate the adapter with `docs/framework/_adapter-evaluation-template.md`, record the decision in `docs/research/practice-register.md`, update `docs/framework/module-registry.md`, and promote only required guidance into the handbook, templates, checker, or agent instructions.

Prefer file-based contracts first. External tools should plug into the workflow only when they remove repeated friction, improve correctness, or reduce coordination risk enough to justify their complexity.

## Catalog And Pack Rule

Use `docs/rails/` for reusable workflow circuits under the 0.x compatibility path, `docs/modules/` for composable module contracts, and `docs/packs/` for optional pack and community extension rules.

External best-practice repositories should enter SWECircuit as one of:

- A module contract.
- A circuit contract.
- An optional adapter.
- An optional pack.

Do not treat community packs as required core behavior. Recommended pack status requires conformance, dogfooding evidence, explicit permissions, rollback, and a maintainer.

## Problem-Solving Rule

Do not repeatedly patch a failing ticket without diagnosis. When verification or review reveals a non-obvious or recurring failure:

1. Reproduce the failure.
2. Capture stable evidence.
3. Classify the failure.
4. Retrieve related code, docs, prior attempts, and known issues.
5. Generate competing hypotheses.
6. Test one hypothesis at a time.
7. Confirm root cause before applying the final fix.
8. Add or update regression coverage.
9. Record durable learning in the feature notes and memory files.

Use `docs/specs/_template/debug-notes.md` and `docs/specs/_template/root-cause-analysis.md` as the model.

## Clarification Rule

Ask the user before editing when product intent, acceptance criteria, public API behavior, data/security impact, destructive changes, or verification strategy is unclear. For low-risk ambiguity, proceed only after recording the assumption in the feature package.

## Retrieval Rule

Retrieve context according to stage:

- Planning: product docs, architecture, ADRs, similar specs, practice register.
- Implementation: local patterns, related tests, interfaces, dependency docs.
- Diagnosis: failing command, logs, prior attempts, known issues, related changes.
- Review: acceptance criteria, diff, test evidence, architecture constraints.
- Memory update: active context, history ledger, retrieval index, decisions, issues, failed attempts, patterns, glossary.

## Validation

Run the template checker after changing workflow artifacts:

```powershell
.\scripts\check-template.ps1
```

If local PowerShell execution policy blocks direct script execution, use:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
```

After changing the checker, module or circuit contracts, pack discovery, milestone versioning, or memory provenance rules, also run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\test-check-template.ps1
```

After changing kernel code, schemas, fixtures, package metadata, or CI, run the canonical kernel gate:

```powershell
npm.cmd run verify
```

Use `npm run verify` on hosts where the npm PowerShell shim is not blocked. This gate runs format checks, lint, typecheck, build, tests, and dry-run package inspection.

## Tool Policy

The current SWECircuit baseline is file-based, catalog-backed, and adapter-oriented. Do not install Spec Kit, BMAD, LangChain, LangGraph, AutoGen, CrewAI, Serena, Repomix, Basic Memory, agentmemory, Context7, Mem0, Zep, Graphiti, A-MEM, or other external tools unless the user explicitly approves that integration after adapter evaluation.

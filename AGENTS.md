# AGENTS.md

## Purpose

This repository is a portable operating system for AI-assisted software engineering. It favors a simple human surface with deeper protocols for specification, diagnosis, retrieval, verification, review, parallel agent work, traceability, and memory.

## Required Reading

Before meaningful work, read:

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

If code is later added to this repository, add project-specific format, lint, typecheck, test, and build commands here.

## Tool Policy

The v4 template is file-based. Do not install Spec Kit, BMAD, Serena, Repomix, Basic Memory, agentmemory, Context7, Mem0, Zep, Graphiti, A-MEM, or other external tools unless the user explicitly approves that integration.






# Feature Spec

## Status

Ready for approval.

## Problem

The workflow now has strong single-agent, IDE-visible, traceable execution, but it needs a clearer way to absorb best-in-class practices without turning the repository into a pile of installed frameworks. The user wants something closer to a lightweight framework: simple by default, modular underneath, and capable of decomposing goals into agent-ready work while preserving traceability.

## Users Or Actors

- Human owner choosing workflow practices and tools.
- IDE or Codex-style agent executing one goal end to end.
- Future subagents or worker agents taking bounded work-unit contracts.
- Integration owner combining parallel work.
- Reviewers auditing spec, implementation, verification, and memory.

## Goals

- Name the system and define a public README surface.
- Define a modular orchestration layer that keeps the simple workflow surface intact.
- Factor Superpowers and Astraeus into the framework as capability-adapter contracts.
- Create a registry for framework modules and optional external adapters.
- Add templates for module contracts, adapter evaluation, decomposition plans, and orchestration run records.
- Promote current ecosystem practices into the repo only as source-preserving, file-based contracts unless installation is explicitly approved.
- Make agent decomposition more methodical through dependency, conflict, verification, and fan-in contracts.
- Keep V5 enforceable through the local checker and PR template.

## Non-Goals

- Install LangChain, LangGraph, Spec Kit, BMAD, AutoGen, CrewAI, Serena, Repomix, Context7, Basic Memory, Mem0, Zep, Graphiti, A-MEM, or any other runtime tool.
- Replace the handbook, feature package, or `AGENTS.md` as the operating surface.
- Build a full multi-agent runtime in this repository.
- Require multi-agent execution for ordinary single-agent work.

## Requirements

- Add `README.md` as the public TraceRail overview.
- Add a `docs/framework/` layer that explains the portable modular orchestration framework.
- Add a module registry that separates accepted file contracts from optional tool adapters and watched integrations.
- Add capability-adapter guidance for skills-driven development transition and orchestration compiler patterns.
- Add a module template with clear inputs, outputs, stage hooks, verification, failure modes, and adoption status.
- Add a decomposition plan template for breaking goals into independently owned work units.
- Add an adapter evaluation template for deciding whether an external tool should be installed or merely referenced.
- Add an orchestration run template for recording fan-out, handoffs, evidence, integration, review, and memory updates.
- Update the handbook and `AGENTS.md` with a modular framework rule and tool adapter policy.
- Update the practice register with V5 ecosystem decisions.
- Add a dated research snapshot preserving the sources behind V5.
- Update the checker so framework core files, headings, PR fields, and V5 milestone are validated.

## Acceptance Criteria

- [x] Given a new user opens the repository, when they read the root README, then they see the TraceRail name, purpose, quick start, repository map, adapter policy, and scale model.
- [x] Given a future workflow or app project, when a user wants to add a best-in-class practice, then the repo has an adapter evaluation path before installation.
- [x] Given a user wants Superpowers-like design-to-implementation support, when they consult the framework, then TraceRail provides a skills-driven development transition contract without requiring installation.
- [x] Given a user wants Astraeus-like orchestration, when they consult the framework, then TraceRail provides an orchestration compiler contract with repository-aware synthesis, critic/synthesizer fan-in, scoped permissions, and continuity.
- [x] Given a goal that may need many agents, when the task plan reaches decomposition, then there is a template for work units, dependency graph, conflict zones, fan-out, fan-in, and verification.
- [x] Given a future agent reading `AGENTS.md`, when the work may need external frameworks, then the agent sees that file-based module contracts come before tool installation.
- [x] Given a reviewer checking V5, when the local checker runs, then the new framework docs and required headings are validated.
- [x] Given ecosystem research is used, when a future agent audits the decision, then a dated research snapshot and practice register entries link the sources and rationale.

## Architecture Impact

This changes process architecture only. It adds a new `docs/framework/` layer under the handbook, plus checker and PR-template enforcement. It does not change runtime code, production data, public APIs, security boundaries, or dependencies.

## Risks

- The framework layer could become abstract if it is not tied to templates and checks.
- The registry could drift if external tools change and snapshots are not refreshed.
- Multi-agent language could tempt premature fan-out before the standalone loop is strong.
- Extra templates could feel heavy if they are required for low-risk single-agent work.

## Open Questions

- Which external tool should be evaluated first in a future version after file-based V5 is dogfooded.
- Whether future projects should generate framework modules automatically from a starter command.
- Whether memory should later be backed by an external source-preserving memory runtime.

## Assumptions

- V4 was approved and merged, so V5 starts from the V4 baseline on a dedicated branch.
- The right V5 move is to define a modular adapter framework without installing external dependencies.
- The best-in-class pattern is contract-first modularity: adopt concepts now, install tools only after a specific friction point proves the need.

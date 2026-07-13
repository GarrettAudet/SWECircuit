# Feature Spec: V9 Executable Kernel And Identity

## Status

In progress.

## Problem

The repository defines a checked, file-based operating protocol, but it cannot yet initialize a project, validate machine-readable workflows, emit execution traces, or enforce runtime coordination controls. TraceRail and DevRail both conflict with active adjacent products. The owner approved SWECircuit as the public project identity, and the GitHub repository is now `GarrettAudet/SWECircuit`. Machine-facing package, domain, CLI, and schema identifiers remain deferred until a real interface requires them.

## Users Or Actors

- Developers using an AI-capable IDE for end-to-end software work.
- Integration owners coordinating bounded work across specialized agents.
- Module and pack authors extending a standard workflow contract.
- CI systems validating projects and execution evidence under the selected identity.
- Future runtime adapters that launch agents, manage workspaces, or merge changes.

## Goals

- Use the approved SWECircuit project identity without losing historical provenance or prematurely creating unrelated package, domain, CLI, or schema namespaces.
- Define a versioned, portable machine contract for modules, circuits, gates, work packets, and execution traces, with an explicit 0.x rail compatibility path.
- Provide a small executable kernel that can initialize and validate a project under the selected identity.
- Make invalid contracts fail deterministically with actionable, path-specific errors.
- Define provider-neutral extension boundaries for agent runtimes, retrieval, memory, verification, and merge adapters.
- Include liveness concepts learned from V8.1: heartbeat, deadline, cancellation, retry state, and raw handoff references.
- Dogfood V9 on its own repository work and preserve measurable evidence.

## Non-Goals

- Launching or paying for external model providers in V9.
- Implementing a complete autonomous multi-agent scheduler or worktree merge engine.
- Installing LangChain, LangGraph, AutoGen, CrewAI, Spec Kit, BMAD, Superpowers, Astraeus, or a memory service by default.
- Building a hosted marketplace or remote control plane.
- Selecting a public-source license without a separate owner decision.
- Rewriting historical artifacts solely to replace the old product name.

## Requirements

- The architecture decision must select and justify the implementation runtime, canonical manifest representation, schema standard, package layout, and compatibility policy.
- A project initializer must create the smallest valid project without hidden network access.
- A validator must check schema, cross-reference, graph, and semantic invariants and return deterministic exit codes.
- Module contracts must express input, action, output, gate, outcomes, evidence, permissions, and version compatibility.
- Circuit contracts must compose modules in order and define branches, fan-out, fan-in, ownership, and stop conditions when used; current rail-named files require a tested compatibility path.
- Execution events must be appendable, source-preserving, and link goal, work packet, stage, attempt, evidence, handoff, verification, review, memory, and merge state.
- Liveness fields must represent heartbeat, deadline, cancellation, retry, and terminal worker state without requiring a specific agent provider.
- Extension interfaces must keep core behavior usable without optional adapters.
- Existing Markdown contracts must remain readable and must have a documented migration or compatibility path.
- Documentation must distinguish shipped kernel behavior from future orchestration behavior.

## Acceptance Criteria

- [ ] AC1: Given an empty directory, when the documented initializer runs, then it creates a minimal project that passes validation without network access.
- [ ] AC2: Given valid and malformed module or circuit manifests, including supported 0.x rail aliases, when validation runs, then valid input passes and each malformed fixture fails with a stable code and actionable path.
- [ ] AC3: Given a circuit with missing references, invalid outcomes, unsafe cycles, ambiguous fan-in, or incomplete work-unit ownership, when semantic validation runs, then it rejects the circuit deterministically.
- [ ] AC4: Given a sample run with success, retry, timeout, cancellation, and failed handoff events, when the trace is validated and inspected, then causality and terminal state remain reconstructable.
- [ ] AC5: Given a core project with no optional adapter installed, when core commands run, then initialization, validation, and trace inspection still work.
- [ ] AC6: Given the supported runtime matrix, when automated checks run locally and in CI, then format, type, unit, integration, fixture, build, and package checks pass on each declared platform.
- [ ] AC7: Given a first-time reader, when they open the README and quick start, then the selected product identity, current executable capabilities, modular model, and future adapter boundary are concise, distinctive, and accurate.
- [ ] AC8: Given the V9 feature package, when V9 closes, then its own spec, tasks, verification, review, trace evidence, milestone, and memory updates demonstrate dogfooding of the merged V8.1 baseline.

## Architecture Impact

This version introduces the first executable public surface, machine-readable schemas, compatibility rules, event persistence, package identity, and adapter boundaries. A versioned architecture decision is required before implementation. Historical Markdown remains a source record; migration must not erase provenance.

## Risks

- A premature schema could freeze weak abstractions or duplicate the handbook.
- Runtime and package choices could reduce portability or increase contributor friction.
- A broad rename could create broken links, package confusion, or historical churn.
- Event traces could expose secrets or excessive conversation data without redaction and retention rules.
- V9 could overclaim orchestration that it only models rather than executes.
- Building too much at once could bury the simple quick path.

## Open Questions

- Which runtime best balances portability, IDE adoption, type safety, startup cost, and contributor familiarity?
- Should JSON be canonical with optional YAML input, or should both be first-class?
- Which schema and compatibility standard should govern manifests and events?
- What is the smallest CLI surface that proves the kernel without implying a complete agent runtime?
- Which machine-facing identifiers are necessary for the private V9 kernel, and which should remain deferred until public distribution exists?
- What trace data is required by default, and what must be opt-in or redacted?
- Which adapters belong in the first conformance interface without becoming dependencies?

## Assumptions

- SWECircuit is approved for the project and GitHub repository; no npm package, domain, CLI binary, or schema namespace acquisition is required by that decision.
- Core initialization and validation should be local, deterministic, and provider-neutral.
- Historical TraceRail artifacts remain valid provenance and may retain their original name.
- Public license selection remains a separate owner gate.
- V9 research and architecture work can proceed before the final CLI/API gate is approved.
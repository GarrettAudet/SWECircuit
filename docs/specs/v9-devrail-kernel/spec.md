# Feature Spec: V9 Executable Kernel And Identity

## Status

In progress; final closeout candidate gate remains open.

## Problem

At V9 intake, SWECircuit was a checked, file-based operating protocol but could not initialize a project, validate canonical machine-readable circuits, or inspect execution traces. The repository therefore described a strong target workflow without an executable baseline that an IDE, agent, or CI system could call consistently.

V9 must create that baseline without overclaiming orchestration. The kernel will initialize, validate, and inspect; it will not launch agents, schedule work, write traces, execute adapters, or merge code.

## Users Or Actors

- Developers using an AI-capable IDE for end-to-end software work.
- Integration owners coordinating bounded work across specialized agents.
- Module and pack authors extending a standard workflow contract.
- CI systems validating projects and execution evidence.
- Future runtime adapters that launch agents, manage workspaces, or merge changes.

## Goals

- Define one versioned, portable machine contract for projects, modules, circuits, work packets, run events, and adapter declarations.
- Provide a small private kernel that initializes a project, validates it, and inspects a caller-supplied trace.
- Make malformed contracts fail deterministically with stable codes, paths, rules, and recovery hints.
- Enforce strict parsing, path containment, resource ceilings, privacy defaults, and offline core behavior.
- Preserve historical Markdown and rail-named artifacts as provenance without treating them as kernel inputs.
- Define pure library boundaries that IDEs, CI, and future provider-neutral adapters can call.
- Represent liveness evidence and terminal worker state without claiming runtime enforcement.
- Dogfood V9 on this repository and preserve measurable evidence.

## Non-Goals

- Launching or paying for external model providers in V9.
- Implementing an autonomous multi-agent scheduler, trace writer, worktree merge engine, or adapter runtime.
- Installing LangChain, LangGraph, AutoGen, CrewAI, Spec Kit, BMAD, Superpowers, Astraeus, or a memory service by default.
- Building a hosted marketplace, trace service, or remote control plane.
- Publishing a package, claiming a public command name, or reserving another namespace.
- Selecting a public-source license without a separate owner decision.
- Rewriting historical artifacts solely to replace an old product name.

## Requirements

- ADR 0001 must be accepted before schemas are frozen, and its clean toolchain spike must pass before T005 begins.
- The repository must use one private package, strict TypeScript 7 ESM, Biome, node:test, Ajv 2020 strict mode, and a proven duplicate-aware parser.
- Canonical input must be strict UTF-8 JSON using API version swecircuit/v1alpha1.
- Supported kinds must be Project, Module, Circuit, WorkPacket, RunEvent, and AdapterManifest; unknown versions and kinds fail closed.
- A project initializer must create the smallest valid swecircuit.json project without network access, interaction, ancestor discovery, or overwriting.
- A validator must check safe paths, resource ceilings, parsing, schemas, references, circuit semantics, permissions, and deterministic diagnostics.
- Module contracts must express input, action, output, gate, outcomes, evidence, permissions, and version compatibility.
- Circuit contracts must compose modules and define branches, fan-out, fan-in, ownership, and stop conditions when used.
- Existing Markdown and rail-named files must remain readable under the PowerShell checker but must not become direct V9 kernel inputs or JSON aliases.
- The trace inspector must read caller-owned JSONL, validate causality and immutable attempt state, reconstruct current state, and never open evidence references.
- Run events must use typed allowlisted fields and exclude full prompts, chats, environments, command output, credentials, and evidence content by default.
- Adapter manifests must declare structure and requested permissions only; V9 must not fetch schemas or execute adapters.
- Core behavior must work with no optional adapter installed and no network access.
- Documentation must distinguish shipped kernel behavior from future orchestration behavior.

## Acceptance Criteria

- [x] AC1: Given an empty directory, when the documented initializer runs, then it creates a minimal project that immediately passes validation without network access.
- [x] AC2: Given valid and malformed canonical module or circuit manifests, when validation runs, then valid input passes and each malformed fixture fails with a stable code and actionable JSON Pointer.
- [x] AC3: Given a circuit with missing references, invalid outcomes, unsafe cycles, ambiguous fan-in, excessive graph size, or incomplete work-unit ownership, when semantic validation runs, then it rejects the circuit deterministically.
- [x] AC4: Given caller-supplied traces for success, retry, timeout, cancellation, and failed handoff, when inspection runs, then sequence, causality, attempt state, and terminal state remain reconstructable without dereferencing evidence.
- [x] AC5: Given a core project with no optional adapter installed and network access disabled, when core commands run, then initialization, validation, and trace inspection still work.
- [x] AC6: Given Node 22 and 24 on Ubuntu, Windows, and macOS, when automated checks run, then format, lint, typecheck, unit, integration, fixture, build, package, clean-init, and clean-consumer checks pass.
- [x] AC7: Given a first-time reader, when they open the README and quick start, then SWECircuit's current executable capabilities, modular model, and future adapter boundary are concise, distinctive, and accurate.
- [ ] AC8: Given the V9 feature package, when V9 closes, then its spec, tasks, verification, review, trace evidence, milestone, and memory updates demonstrate dogfooding of the stable V8.2 baseline and V8.1 integrity controls.

## Architecture Impact

ADR 0001 is accepted. V9 introduces the first executable library and CLI boundary, strict JSON contracts, deterministic diagnostics, caller-owned trace inspection, private package metadata, and structural adapter declarations. Historical Markdown remains source evidence and a checker input, not a machine-contract alias.

## Risks

- A premature schema could freeze weak abstractions or duplicate the handbook.
- Strict cross-platform path rules may reject convenient but unsafe layouts.
- Event traces could expose secrets if producers ignore pre-persistence redaction.
- V9 could overclaim orchestration that it only models rather than executes.
- Building too much at once could bury the three-operation quick path.

## Open Questions

No question blocks schema implementation. Public distribution, a license, a public command, a hosted trace service, adapter execution, and agent scheduling remain separate future decision gates.

## Assumptions

- SWECircuit is the repository and project name; no external namespace reservation is implied.
- Private local identifiers approved by ADR 0001 exist only to make the repository executable.
- Core initialization, validation, and inspection are local, deterministic, and provider-neutral.
- Historical TraceRail and DevRail artifacts remain valid provenance.
- Public license selection remains a separate owner gate.

# SWECircuit

[![SWECircuit Checks](https://github.com/GarrettAudet/SWECircuit/actions/workflows/template-check.yml/badge.svg)](https://github.com/GarrettAudet/SWECircuit/actions/workflows/template-check.yml)

**Composable workflows for traceable AI software engineering.**

SWECircuit turns a reviewed software goal into exact, portable contracts for specialized agents. You define the modules and evidence gates; core compares legal team shapes, preserves a serial baseline, and returns a digest-bound package that any IDE or agent host can verify before execution.

```txt
goal | atomic work | compile specialists | verify package | external agents | verify handoffs | integrate | learn
```

![A software task moves through standardized modules, fans out as bounded work packets to specialized agents, rejoins for verification and review, and ends as a traceable merged change.](docs/assets/swecircuit-overview.png)

## How It Works

1. **Clarify the goal.** Record acceptance criteria, assumptions, open decisions, authority, and context in one closed `GoalContract`.
2. **Define atomic work.** Bind each work unit to an approved Module, dependencies, exact context, least authority, evidence duties, handoff artifacts, and stop conditions.
3. **Compile specialists.** SWECircuit constructs eligible team partitions, compares them with the serial baseline, and deterministically selects the best evaluated team under hard quality gates.
4. **Verify before launch.** The host approves and verifies both the compilation and package digests, then maps exact `AgentBlueprints` to its own models, tools, and isolated workspaces.
5. **Verify before integration.** Closed raw handoffs are checked against the approved package, blueprint identity, required work, artifacts, and evidence. Fan-in is ready only when every exact dependency returns `pass`.
6. **Integrate and learn.** The external workflow verifies the combined change, reviews it, merges it, and promotes durable lessons into memory.

SWECircuit is IDE-, model-, API-, and provider-neutral. It defines and checks work; it does not silently choose a model, launch agents, enforce a sandbox, merge branches, or mutate memory.

## Start Here

Requires Node.js 22.14 or newer.

```powershell
npm ci
npm run build
npm run example:specialist
```

The read-only example verifies two real repository sources against an approval file, evaluates the serial and two-specialist teams, renders the selected contracts in memory, and verifies the package:

```txt
SWECircuit specialist compiler
Context: 2/2 repository sources verified
Search: exact | 2 candidate teams evaluated
Baseline: 1 agent | makespan 9
Selected: 2 specialists | makespan 6
Decision: lower projectedMakespan (6 < 9)
Package: 5 files | approval-bound verification PASS
Runtime: not invoked; 0 agents executed
```

It writes no files and starts no agents. See the [example source](examples/specialist-compiler/) and the [IDE kickoff](docs/ide/specialist-agent-kickoff.md) to adapt the same flow to a real goal.

## Existing Kernel

The V10 kernel can now validate and execute one host-selected work packet through a caller-injected executor. These are repository-local development commands for the private workspace:

```powershell
node dist/cli.js init --project <existing-empty-directory> --project-id quick-start
node dist/cli.js validate --project examples/minimal
node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl
```

See the [minimal project](examples/minimal/) and the [bounded executor contract](docs/framework/executor-boundary.md).

## Core Contracts

| Contract | Purpose |
| --- | --- |
| `Module` | Reusable stage with typed inputs, action, outputs, gate, and outcomes. |
| `GoalContract` | Reviewed intent, acceptance, atomic work, context, authority, and optimization policy. |
| `AgentBlueprintCompilation` | Serial baseline, evaluated candidates, deterministic selection, schedule, and exact agent contracts. |
| `RenderedSpecialistPackage` | Portable compilation, manifest, integration contract, agent contracts, and root digest. |
| `SpecialistAgentHandoff` | Closed raw result envelope bound to one goal, compilation, blueprint, artifact set, and evidence set. |
| `SpecialistHandoffSetAssessment` | Dependency-aware fan-in result; integration readiness requires a complete `pass` set. |
| Execution trace | Caller-owned event record connecting work, attempts, outcomes, and evidence. |
| Memory | Durable project knowledge promoted only after verified work. |

Candidate quality, authority containment, evidence coverage, requested producer/checker independence, and clarification closure are hard gates. Extra agents must improve the fixed objective or satisfy an independence requirement.

## Principles

SWECircuit core returns immutable values. An external IDE or agent host still owns:

External hosts still select and schedule work, enforce permissions, isolate runtimes, persist traces, and merge changes.

The V10 kernel does not dynamically load adapters, execute circuits, terminate process trees, merge branches, or update memory automatically.

- semantic decomposition and product judgment;
- trusted context delivery and byte verification;
- provider, model, prompt, credential, and tool selection;
- workspace isolation and permission enforcement;
- actual scheduling, retries, cancellation, and persistence;
- integrated tests, review, merge, and memory updates.

Projected launch waves are deterministic planning output, not proof that work ran. Approval must come from expected digests retained outside the package being checked.

## Operating Guide

- [`AGENTS.md`](AGENTS.md): agent entrypoint and non-negotiable operating rules.
- [Handbook](docs/ai/handbook.md): full human and AI workflow.
- [Specialist Compiler contract](docs/specs/v11-specialist-compiler/specialist-compiler-contract.md): normative compiler, package, handoff, and host obligations.
- [IDE kickoff](docs/ide/specialist-agent-kickoff.md): visible one-message workflow.
- [V11 milestone](docs/milestones/v11.md): exact acceptance and merge status.

## Maintainer Verification

```powershell
npm run verify
```

The canonical gate checks formatting, lint, types, build, tests, the read-only example, dogfood evidence, package contents, and a clean installed consumer. `npm run consumer:check` is the maintainer-only installed-package compatibility gate; it is not the user quick start.

## Repository Guide

| Path | Purpose |
| --- | --- |
| [`examples/specialist-compiler/`](examples/specialist-compiler/) | Truthful read-only compiler walkthrough. |
| [`docs/framework/`](docs/framework/) | Circuit composition, decomposition, orchestration, and adapter contracts. |
| [`docs/modules/`](docs/modules/) | Reusable module contracts. |
| [`docs/specs/`](docs/specs/) | Traceable feature work packages and source evidence. |
| [`docs/memory/`](docs/memory/) | Decisions, history, known issues, patterns, and retrieval pointers. |
| [`docs/packs/`](docs/packs/) | Optional first-party and community extensions. |

## Status

The repository contains the V1-V9 file-based workflow baseline, the V10 bounded injected-executor boundary, and the V11 Specialist Compiler family. Exact technical acceptance, branch, and merge status is maintained in the [V11 milestone](docs/milestones/v11.md), not duplicated here.

See [Contributing](CONTRIBUTING.md), [Security](SECURITY.md), [Support](SUPPORT.md), and the [Changelog](CHANGELOG.md).

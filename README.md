# SWECircuit

[![SWECircuit Checks](https://github.com/GarrettAudet/SWECircuit/actions/workflows/template-check.yml/badge.svg)](https://github.com/GarrettAudet/SWECircuit/actions/workflows/template-check.yml)

**Composable workflows for traceable AI software engineering.**

SWECircuit gives AI software teams a standard way to compose development workflows from reusable modules, split goals into bounded work packets, route those packets to external agents, verify evidence, and preserve the execution trace.

The diagram shows the target operating model. The V9 kernel implements project initialization, offline validation, and read-only trace inspection today; external IDEs and agent runtimes still execute the workflow.

![Target model executed by an external IDE or agent runtime: a task moves through Spec, Plan, and Route; bounded work packets fan out to specialized agents, converge at Verify, then continue through Integrate, Review, Memory, and a verified change.](docs/assets/swecircuit-overview.png)

## How It Works

```txt
module -> circuit -> work packet -> external agent -> evidence gate -> verified integration -> caller-owned trace + project memory
```

1. **Define modules.** Give each stage an input, action, output, gate, and outcome.
2. **Compose a circuit.** Connect the modules needed for a feature, fix, review, or release.
3. **Decompose the goal.** Create bounded work packets with scope, dependencies, verification, and stop conditions.
4. **Route and integrate.** External IDEs or runtimes assign packets to specialized agents and return evidence to an integration owner.
5. **Verify and learn.** Gates control integration; the trace records what happened, and durable lessons enter project memory.

SWECircuit defines and checks the workflow contract. It is not an agent scheduler or model runtime.

## Core Contracts

| Contract | Purpose |
| --- | --- |
| Module | Reusable work stage with a standard input, action, output, gate, and outcome. |
| Circuit | Ordered or branched composition of modules. |
| Work packet | Bounded unit of work with ownership, context, dependencies, evidence, and stop conditions. |
| Gate | Decision point that passes, fixes, diagnoses, clarifies, redesigns, splits, blocks, or learns. |
| Execution trace | Caller-owned event record connecting work, attempts, outcomes, and evidence. |
| Memory | Durable project knowledge promoted from completed work. |

## Start Here

Requires Node.js 22.14 or newer. From a source checkout, run:

```powershell
npm ci
npm run build
node dist/cli.js validate --project examples/minimal
node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl
```

The final two commands print:

```txt
Validated example-project (0 artifacts).
Inspected traces/example.jsonl (2 events, 1 runs).
```

Initialize an existing empty directory with:

```powershell
node dist/cli.js init --project <existing-empty-directory> --project-id quick-start
```

Initialization is one-time and never overwrites its owned files. Validation and inspection are read-only; `--trace` is relative to the explicit project root.

These are repository-local development commands for the private workspace; SWECircuit does not publish a package binary or public CLI.

For the full operating protocol, start with [AGENTS.md](AGENTS.md) and the [handbook](docs/ai/handbook.md).

## Repository Guide

| Path | Purpose |
| --- | --- |
| [`examples/minimal/`](examples/minimal/) | Small valid project and caller-owned trace used by the quick start. |
| [`docs/framework/`](docs/framework/) | Circuit composition, decomposition, orchestration, and adapter contracts. |
| [`docs/specs/`](docs/specs/) | Traceable feature work packages and implementation evidence. |
| [`docs/memory/`](docs/memory/) | Decisions, history, known issues, patterns, and retrieval pointers. |
| [`docs/modules/`](docs/modules/) | Reusable module contracts. |
| [`docs/packs/`](docs/packs/) | Optional first-party and community extensions. |

## Principles

- Simple surface, explicit contracts.
- Clarify before ambiguous work.
- Decompose before parallelizing.
- Diagnose before repeated fixes.
- Verify before integration.
- Preserve evidence, then update memory.

## Status

**Implemented now:** initialize one explicit project, validate canonical v1alpha1 artifacts offline, and inspect one caller-owned JSONL trace without opening evidence references.

**Defined as workflow contracts:** specification, decomposition, bounded parallel work, gates, integration review, durable memory, modules, circuits, packs, and adapters.

**Left to external runtimes:** model calls, agent scheduling, workspace isolation, trace production, evidence retrieval, and branch integration. The V9 kernel does not launch or schedule agents, execute circuits, write traces, retrieve evidence, merge branches, or update memory automatically.

See [Contributing](CONTRIBUTING.md), [Security](SECURITY.md), [Support](SUPPORT.md), and the [Changelog](CHANGELOG.md).

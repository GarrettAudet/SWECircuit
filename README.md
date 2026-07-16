# SWECircuit

[![SWECircuit Checks](https://github.com/GarrettAudet/SWECircuit/actions/workflows/template-check.yml/badge.svg)](https://github.com/GarrettAudet/SWECircuit/actions/workflows/template-check.yml)

**Composable workflows for traceable AI software engineering.**

SWECircuit gives AI software teams a standard way to compose development workflows from reusable modules, split goals into bounded work packets, route those packets to external agents, verify evidence, and preserve the execution trace.

The diagram shows the target operating model. The V10 kernel can now validate and execute one host-selected work packet through a caller-injected executor and return a caller-owned event journal. External hosts still select and schedule work, enforce permissions, isolate runtimes, persist traces, and merge changes.

The current V11 candidate adds a built-in, provider-independent **Specialist Compiler**. After an IDE or human clarifies a goal into stable atomic work units, core constructs legal team partitions, keeps a serial baseline, and selects one roster under hard quality and authority gates. Assumptions, open decisions, the search claim, and the selection reason stay machine-readable and digest-bound. Each AgentBlueprint fixes exact work ownership, context, least authority, evidence, dependencies, handoff, and stop conditions. External IDEs still choose and run models, workspaces, and tools.

```txt
user goal -> approved modules -> Specialist Compiler -> task-shaped AgentBlueprints -> verified package -> external runtime -> verified change
```

![Target model executed by an external IDE or agent runtime: a task moves through Spec, Plan, and Route; bounded work packets fan out to specialized agents, converge at Verify, then continue through Integrate, Review, Memory, and a verified change.](docs/assets/swecircuit-overview.png)

## How It Works

```txt
goal -> atomic work units -> Specialist Compiler -> exact AgentBlueprints -> render + verify -> external IDE execution -> trace + memory
```

1. **Define modules.** Give each stage an input, action, output, gate, and outcome.
2. **Compose a circuit.** Connect the modules needed for a feature, fix, review, or release.
3. **Synthesize the goal.** Clarify acceptance, bind assumptions and decisions, then create bounded atomic work units with exact context, authority, evidence, and stop conditions.
4. **Compile and hand off.** Core compares legal teams and renders a portable package containing the exact compilation and agent contracts. The host verifies it against approved `compilationDigest` and `packageDigest` values before execution.
5. **Verify and learn.** Gates control integration; the trace records what happened, and durable lessons enter project memory.

SWECircuit defines and checks the workflow contract, constructs exact specialist demand, and bounds one injected execution. It is not a runtime scheduler, model router, permission sandbox, or merge engine.

The next orchestration layer will add portable planning and assignment above that bounded executor while keeping provider calls, workspace isolation, credentials, and other side effects behind adapters.

## Core Contracts

| Contract | Purpose |
| --- | --- |
| Module | Reusable work stage with a standard input, action, output, gate, and outcome. |
| Circuit | Ordered or branched composition of modules. |
| Work packet | Bounded unit of work with ownership, context, dependencies, evidence, and stop conditions. |
| Specialist Compiler | Candidate-team construction, deterministic selection, exact AgentBlueprints, and a package verifier bound to approved compilation and package digests. |
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

### Specialist Compiler (V11)

Exercise the installed-package compiler path end to end:

```powershell
npm run consumer:check
```

This builds and installs the package offline, compiles a reviewed goal, renders exact agent contracts, verifies them against approval retained outside the package, and checks the installed public API. The typed input is in [`scripts/fixtures/packed-consumer-host.ts`](scripts/fixtures/packed-consumer-host.ts).

These are repository-local development commands for the private workspace; SWECircuit does not publish a package binary or public CLI.

Library hosts can execute one validated packet through the [bounded executor boundary](docs/framework/executor-boundary.md). The host supplies trusted executable code and retains responsibility for isolation, approvals, persistence, and integration.

To compile and hand off your own goal, follow the [Specialist Compiler contract](docs/specs/v11-specialist-compiler/specialist-compiler-contract.md) and [IDE kickoff](docs/ide/specialist-agent-kickoff.md).

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

**Stable baseline on main:** initialize one explicit project, validate the six canonical v1alpha1 artifact kinds offline, and inspect caller-owned JSONL traces.

**Inherited V10 candidate on this branch:** execute exactly one host-selected work packet through a checked caller-injected executor boundary.

The V10 kernel does not dynamically load adapters, execute circuits, terminate process trees, merge branches, or update memory automatically.

**V11 candidate on this branch:** derive a supply-free task-authority projection, construct and evaluate specialist-team partitions, preserve a serial baseline, compile exact task-shaped AgentBlueprints, and render and verify a deterministic provider-neutral handoff package. `search.claim` distinguishes exhaustive partition search under the fixed scheduler from bounded evaluated-set search with no global-optimum claim.

**Still external:** product judgment for atomic semantic decomposition, model/provider choice, runtime capacity, credentials, workspace isolation, process execution, durable trace writing, retries, branch integration, merge, and memory mutation.

**Deferred after four failed architecture reviews:** the universal runGoal scheduler, durable continuation/restart protocol, parent orchestration trace, repository attestation, and merge-ready evidence. Their raw findings and correction design remain preserved for a later runtime version.

V11 is an implementation candidate, not yet technically accepted or merged. Correction verification, dogfood, repeat independent review, milestone closeout, and owner approval remain required.

See [Contributing](CONTRIBUTING.md), [Security](SECURITY.md), [Support](SUPPORT.md), and the [Changelog](CHANGELOG.md).

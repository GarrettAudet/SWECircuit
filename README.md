# SWECircuit

[![SWECircuit Checks](https://github.com/GarrettAudet/SWECircuit/actions/workflows/template-check.yml/badge.svg)](https://github.com/GarrettAudet/SWECircuit/actions/workflows/template-check.yml)

**A provider-neutral framework for decomposing software goals, coordinating specialized AI agents, and verifying their work end to end.**

A developer or IDE defines reusable modules and atomic work. SWECircuit compiles portable specialist contracts; an external host executes them, and one owner integrates only verified results.

![A reviewed goal moves through workflow modules; an external host may run approved specialists in parallel, and an integration owner verifies handoffs, merges the change, preserves the trace, and updates memory.](docs/assets/swecircuit-flow.gif)

## How It Works

1. **Define:** a developer or IDE closes the goal and decomposes it into atomic work units with acceptance, modules, evidence, authority, dependencies, and stop conditions.
2. **Compile:** SWECircuit validates the reviewed work units, groups them into legal specialist teams, compares them with a serial baseline, and emits exact contracts.
3. **Execute:** an external host selects providers, models, and tools, then may run dependency-safe contracts in parallel.
4. **Verify:** core verifies approval-bound packages, raw handoffs, and dependency fan-in; one owner tests, integrates, merges, persists the trace, and updates memory.

SWECircuit core compiles specialist contracts and verifies approval-bound packages, raw handoffs, and dependency fan-in.
An external IDE or agent host selects providers and models, dispatches agents, enforces permissions, runs tools, integrates and merges changes, persists traces, and updates memory.

## Start Here

Requires Node.js 22.14 or newer.

```powershell
npm ci
npm run build
node dist/cli.js validate --project examples/minimal
node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl
npm run example:specialist
```

The CLI commands validate and inspect the minimal project. The specialist example compiles and verifies a two-specialist package in memory. It writes no files and launches no agents. See its [source](examples/specialist-compiler/) and the [IDE kickoff](docs/ide/specialist-agent-kickoff.md).

Maintainers run `npm run verify` for the complete repository gate.

## Status

V11 is the current baseline. It compiles deterministic, approval-bound specialist packages and verifies raw handoffs without executing agents. See the [V11 milestone](docs/milestones/v11.md) and [compiler contract](docs/specs/v11-specialist-compiler/specialist-compiler-contract.md).

V10's bounded injected-executor boundary remains available for one host-selected work packet: [minimal example](examples/minimal/) | [executor contract](docs/framework/executor-boundary.md).

[Agent contract](AGENTS.md) | [Handbook](docs/ai/handbook.md) | [Framework](docs/framework/) | [Feature specs](docs/specs/) | [Memory](docs/memory/)

[Contributing](CONTRIBUTING.md) | [Security](SECURITY.md) | [Support](SUPPORT.md) | [Changelog](CHANGELOG.md)
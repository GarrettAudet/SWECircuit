# TraceRail

TraceRail is a contract-first workflow kernel for AI-assisted software engineering.

It is not an agent runtime. It is the operating layer around agents: specs, architecture checks, memory, retrieval, verification, review, decomposition, and adapter governance. The goal is simple: help one agent work methodically, then make many agents safe to coordinate when the work is ready to scale.

## Why TraceRail Exists

AI coding tools are getting faster, but many projects still lose the thread:

- Requirements live in chat instead of specs.
- Architecture decisions are implied instead of recorded.
- Agents patch failures repeatedly instead of diagnosing root cause.
- Memory is scattered across transcripts, docs, issues, and local notes.
- Multi-agent work fans out before ownership, conflicts, and verification are clear.
- New tools are adopted because they are exciting, not because they solve a proven workflow gap.

TraceRail fills that gap with a portable, file-based system that keeps humans and agents aligned from goal to evidence to memory.

## Core Idea

Use one simple composition model with deeper protocols underneath.

```txt
rail = input | module | module | output
```

For normal software work:

```txt
goal | clarify | spec | plan | implement | verify | review | memory
```

Each module has a common interface: input, action, output, gate, and outcome. Each gate emits one outcome:

```txt
pass | fix | diagnose | clarify | redesign | split | block | learn
```

That small contract gives agents a shared language for moving forward, looping back, diagnosing failures, asking for help, or recording durable learning.

## What TraceRail Provides

- `AGENTS.md`: the AI entrypoint and operating contract.
- `docs/ai/handbook.md`: the human and agent operating manual.
- `docs/specs/`: feature packages for meaningful work.
- `docs/framework/`: modular framework contracts and adapter governance.
- `docs/rails/`: reusable workflow rails.
- `docs/modules/`: composable module contracts.
- `docs/packs/`: optional pack and community extension governance.
- `docs/memory/`: durable memory, history, decisions, patterns, and retrieval pointers.
- `docs/research/`: dated ecosystem scans and practice decisions.
- `docs/milestones/`: version progress summaries.
- `scripts/check-template.ps1`: local structural validation.

## Quick Start

1. Read `AGENTS.md`.
2. Read `docs/ai/handbook.md`.
3. Create a feature package from `docs/specs/_template/`.
4. Fill the spec until acceptance criteria are testable.
5. Plan tasks with verification mapping.
6. Implement the smallest coherent slice.
7. Verify, review, and update memory.
8. Run the checker:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
```

## When Work Gets Bigger

TraceRail scales by decomposition, not by sending many agents into the same fog.

Before fan-out, create a decomposition plan that defines:

- Shared goal.
- Work units.
- Dependencies.
- Conflict zones.
- Context bundles.
- Agent roles.
- Verification evidence.
- Handoff format.
- Stop conditions.
- Integration owner.

The rule is simple: ten agents need one shared goal, one decomposition plan, one integration owner, and ten bounded contracts.

## Tool Adapters

TraceRail can absorb ideas from tools like Superpowers, Astraeus, Spec Kit, BMAD, LangChain, LangGraph, AutoGen, CrewAI, Codex subagents, Serena, Repomix, Context7, Basic Memory, Mem0, Zep, Graphiti, and A-MEM.

The default is not to install them.

External tools enter through adapter evaluation:

```txt
research snapshot -> adapter evaluation -> practice register -> module registry -> handbook or template -> checker or review gate -> dogfood
```

This keeps the workflow modular without turning every project into a dependency stack.

## Repository Map

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Agent rules, routing, invariants, and tool policy. |
| `docs/ai/handbook.md` | Full workflow manual. |
| `docs/framework/README.md` | Modular framework overview. |
| `docs/framework/rail-composition.md` | Core pipe-like composition model for rails, modules, gates, and artifacts. |
| `docs/rails/` | Standard reusable rails such as feature, diagnosis, decomposition, adapter, and release. |
| `docs/modules/` | Core and adapter-inspired modules with one common interface. |
| `docs/packs/` | Optional pack lifecycle, template, and conformance rules. |
| `docs/framework/module-registry.md` | Accepted modules and optional adapters. |
| `docs/framework/orchestration-patterns.md` | Pattern guide for single-agent and multi-agent work. |
| `docs/framework/capability-adapters.md` | Capability contracts inspired by external projects such as Superpowers and Astraeus. |
| `docs/specs/_template/` | Feature package template. |
| `docs/memory/` | Durable project memory and retrieval pointers. |
| `docs/research/practice-register.md` | Accepted, optional, watched, deferred, and rejected practices. |
| `docs/milestones/` | Version progress and approval summaries. |
| `scripts/check-template.ps1` | Local validation command. |

## Design Principles

- Rail composition as the core primitive.
- Simple surface, deep protocols.
- Spec first, implementation second.
- Source evidence before summaries.
- Diagnosis before repeated fixes.
- Single-agent excellence before multi-agent orchestration.
- Decomposition before fan-out.
- Adapters before dependencies.
- Verification before merge.
- Memory before moving on.

## Current Status

TraceRail is currently a file-based baseline. It is designed to be copied into projects, dogfooded, and extended through rails, modules, and optional packs before any runtime framework is installed.

The next frontier is proving the decomposition and orchestration templates on real agent-parallel work, then evaluating the first runtime adapter only after a repeated friction point appears.

# 2026-07-08 Capability Adapter Scan

## Purpose

Capture the source context for factoring Astraeus and Superpowers into TraceRail as optional capability adapters.

## Sources Reviewed

| Source | Type | Relevant Takeaway | TraceRail Decision |
| --- | --- | --- | --- |
| Astraeus | GitHub repository | Describes a Claude Code native orchestration compiler that reads a repository, synthesizes specialized subagents, supports branching and parallel execution, uses critic and synthesizer patterns, tracks prior workflows, and defaults to no direct code edits unless explicitly allowed. | Extract an orchestration compiler capability contract. Keep Astraeus optional and do not install it by default. |
| Superpowers | GitHub repository | Describes an agentic skills framework and software development methodology. It asks what the user is trying to do, teases out a spec, shows design in readable chunks, creates an implementation plan, emphasizes red-green TDD, YAGNI, DRY, and can launch subagent-driven development after approval. | Extract a skills-driven development transition capability contract. Keep Superpowers optional and do not install it by default. |

## Accepted Practices

- Treat design-to-implementation as an explicit skill transition, not a hidden jump from chat to code.
- Show design and spec content in readable chunks before implementation.
- Require approval or recorded assumptions before implementation begins.
- Make orchestration synthesis repository-aware.
- Use critic and synthesizer responsibilities before fan-in.
- Keep write access opt-in and scoped by path, branch, permissions, and verification.
- Preserve orchestration run records for continuity.

## Deferred Practices

- Installing Superpowers as a plugin or skill pack.
- Installing Astraeus as a command prompt or orchestration compiler.
- Generating project-local custom agents automatically.
- Adding skill-behavior eval harnesses.

## V5 Rationale

Both projects fit TraceRail as capability adapters. Superpowers strengthens the user-facing transition from idea to design to implementation. Astraeus strengthens the orchestration layer for compiling project-specific agent teams. TraceRail should extract their contracts now and evaluate installation later only if dogfooding reveals repeated friction.

## Source Links

- Astraeus: `https://github.com/RchGrav/astraeus`
- Superpowers: `https://github.com/obra/superpowers`

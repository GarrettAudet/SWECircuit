# Implementation Notes

## Status

No implementation has been integrated. Architecture compilation is the active stage.

## Baseline

- Released V11.1 main: `c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c`.
- Active branch: `codex/v12-ide-run-loop`.
- Current host: Codex IDE with external subagent capability; SWECircuit core remains the provider-neutral contract and verifier.

## Dogfood Observations

- The visible kickoff made the current stage, artifact, assumption, and host boundary explicit.
- The current IDE exposes actual subagents, so exact compiled contracts can be materialized without adding provider APIs to core.
- Exact search selected four task-shaped agents over the eligible serial baseline because projected makespan fell from 26 to 15 with zero conflict pairs.
- The first host approval attempt exposed a wrong untyped envelope field assumption and stopped before launch. Exact envelope inspection, a root-field assertion, and approval-bound verification corrected it.
- Further observations will be appended after compilation, launch, verification, and fan-in.

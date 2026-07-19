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
- The first launch handle was lost from visible context during host output compaction. The host had no list-agents operation, so the integration owner recovered the exact handle from the caller-owned session ledger instead of launching a duplicate. V12 must make the approved roster and accepted handoffs recoverable from the persisted session value.
- The first specialist returned a 13,011-byte raw handoff. The host preserved the returned string as exact UTF-8 bytes before interpretation; sandbox-specific persistence remained an external host concern.
- A narrow host verifier now authenticates each raw handoff, computes the integration blueprint's exact V11 transitive fan-in, and keeps verification evidence separate from raw source artifacts.
- Further observations will be appended after compilation, launch, verification, and fan-in.

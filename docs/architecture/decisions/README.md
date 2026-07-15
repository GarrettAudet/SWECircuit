# Architecture Decisions

Long-lived public or cross-module decisions belong here. Each ADR records context, decision drivers, alternatives, consequences, source evidence, and review triggers.

## Index

| ADR | Status | Decision |
| --- | --- | --- |
| [0001](0001-executable-kernel-foundation.md) | Accepted | V9 deterministic offline kernel, canonical artifacts, validation, trace inspection, packaging, and security foundation. |
| [0002](0002-bounded-executor-boundary.md) | Accepted | V10 one-packet host-injected execution boundary, invocation grants, cancellation truthfulness, and child evidence. |
| [0003](0003-portable-orchestration-control-plane.md) | Proposed | V11 IDE-agnostic goal decomposition, capability matching, bounded parallel waves, fan-in, gates, and parent trace. |

Feature plans preserve implementation detail. The decision log in `docs/memory/decisions.md` provides the fast retrieval path back to accepted ADRs.

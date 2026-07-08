# Pack System

## Purpose

Packs let TraceRail grow without bloating core. A pack bundles rails, modules, adapters, examples, or review gates for a specific use case.

## Tiers

| Tier | Meaning |
| --- | --- |
| Core TraceRail | Required files and contracts shipped in this repository. |
| Official pack | Curated optional pack maintained by the TraceRail project. |
| Recommended pack | Optional pack with conformance evidence and dogfooding history. |
| Community pack | Third-party pack that declares TraceRail contracts but is not endorsed by default. |
| Local override | Project-specific rail or module override under a local project folder. |

## Pack Rule

Packs are optional downloads. Core should not depend on a pack. A pack can become recommended only after it passes conformance checks, has clear ownership, and solves a real repeated failure mode.

## Current Official Packs

| Pack | Status | Purpose |
| --- | --- | --- |
| `tracepack-orchestration-readiness` | Official, not recommended yet | Prepares safe agent fan-out with decomposition, contracts, verification, and memory. |

See `docs/packs/official/` for curated optional packs. Official and recommended are separate labels: official means maintained by TraceRail; recommended means proven through repeated dogfooding.

## Suggested Official Packs

- `tracepack-orchestration-readiness`
- `tracepack-superpowers-transition`
- `tracepack-astraeus-orchestration`
- `tracepack-spec-kit`
- `tracepack-retrieval`
- `tracepack-memory`
- `tracepack-review`

## Extension Path

```txt
idea -> community pack -> experimental pack -> official or recommended pack -> core candidate -> core
```

Most extensions should remain packs. Core promotion should be rare.

## Local Overrides

Projects may override rails, modules, or adapters locally:

```txt
.tracerail/
  rails/
  modules/
  adapters/
  memory/
```

Local overrides should document why the default contract does not fit.

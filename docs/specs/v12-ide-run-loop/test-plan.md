# Test Plan

## Status

Draft pending architecture fan-in.

## Contract Tests

- Exact package expectation is required at session creation.
- Session normalization and serialization are deterministic.
- Unknown, stale, duplicate, malformed, or substituted handoffs fail closed.
- Verified non-`pass` outcomes remain explicit and block dependency readiness.
- Launchable work is complete, dependency-safe, and deterministic.
- Prior immutable session values never change after an operation.

## Lifecycle Tests

- Initial independent wave.
- Partial wave completion.
- Complete verified fan-in.
- Missing dependency.
- Valid `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, and `learn` routing.
- Reinspection after JSON round trip.
- Integration readiness with exact transitive closure.

## Boundary Tests

- No provider, model, prompt, executor, credential, grant, scheduler, workspace, process, or merge field enters the session contract.
- Core performs no filesystem, network, process, Git, agent-launch, persistence, merge, or memory effect.
- Host responsibilities remain explicit in public documentation and examples.

## Integration Tests

- A real V11 package is opened as a session, inspected, advanced with exact raw handoffs, and reaches the correct integration gate.
- The installed package exposes the V12 types and operations to a clean TypeScript consumer.
- The IDE kickoff can be followed from one natural-language goal without hidden state.

## Repository Gates

- `npm.cmd run verify`
- Template checker and checker regression matrix.
- V11 and V12 dogfood replay.
- Independent product/API, correctness/lifecycle, and security/trace review.

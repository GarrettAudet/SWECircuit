# Specialist Run Session

## Status

Core V12 module for one externally approved V11 specialist package. The normative wire and transition contract is `docs/specs/v12-ide-run-loop/specialist-run-contract.md`.

## Purpose

Carry one externally approved V11 specialist package through a deterministic, source-preserving evidence loop without adding provider, runtime, or host effects to core.

## Input

One complete rendered specialist package, an external trusted compilation/package digest pair, an immutable run session when applicable, and exact raw UTF-8 handoff bytes for `record`.

## Action

Verify and reduce evidence through the pure `create`, `restore`, `inspect`, and `record` operations.

## Output

A detached immutable session, immutable inspection, or stable ordered diagnostics.

## Gate

The package matches the external expectation; session and raw inputs are closed and bounded; accepted handoffs verify exactly; transitive dependencies have accepted `pass`; complete-roster readiness or a terminal route is explicit.

## Outcome

`pass` for a successful operation. A verified specialist non-`pass` remains its exact workflow route and never becomes successful completion.

## Artifacts

Source-preserving `SpecialistRunSession`, derived `SpecialistRunInspection`, original package and approval record, and host-preserved exact raw handoff files.

## Adapter

An IDE or agent host may adapt these values to its runtime. Core performs no I/O or host effect.

## Circuit

```txt
approved package + external expectation + immutable session + exact raw handoff
  | create | restore | inspect | record
  -> new immutable session, immutable inspection, or stable diagnostic
```

`create` reconstructs and verifies the complete package before exposing an empty session. `restore` treats bounded raw session bytes as a trust boundary and reverifies the embedded package and every accepted raw handoff. `inspect` resolves exact eligible contracts through the verified manifest and derives status, evidence, blockers, routing, readiness, and the next external actor. `record` verifies one exact raw handoff and returns a monotonic successor, an idempotent replay, or a fail-closed diagnostic.

## Host Boundary

Dependency eligibility is evidence, not dispatch authorization. The external host alone retains approval, authenticates delivered context, enforces authority and isolation, prevents duplicate live work, selects runtime supply, launches agents, preserves exact raw bytes, serializes updates, persists sessions, and handles uncertain effects.

`integrationReady` proves only that every blueprint in the complete selected roster has one verified `pass` handoff. A separate integration owner still integrates, runs repository verification, obtains required independent review, updates the milestone, merges, and updates durable memory.

The session contains no provider, model, prompt, credential, executor, workspace, process, timestamp, randomness, launch, retry, merge, or memory state. Approval remains an external trusted expectation on every operation.

## Gate Outcomes

| Condition | Outcome |
| --- | --- |
| Package, session, or exact handoff verification succeeds and the workflow remains collecting or reaches complete fan-in | `pass` |
| A verified non-`pass` handoff is accepted | Its exact `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, or `learn` route |
| A handoff arrives before transitive dependencies pass | `fix` through `SC4404` |
| A different second handoff or post-route settlement arrives | `block` or the exact terminal route through `SC4403` or `SC4405` |
| A run resource bound is exceeded | `split` through `SC4402` |
| Package approval, identity, or source evidence is unavailable or mismatched | `block` |

## Replay

Run the deterministic fixture host after building the kernel:

```powershell
npm.cmd run dogfood:v12
```

The replay demonstrates external two-digest approval, context authentication, initial dependency eligibility, exact raw-handoff fan-in, raw session restore, terminal non-`pass` routing, and separate integration-owner closeout. It launches no descendants and performs no Git, network, merge, release, or memory effect.

# ADR 0005: Immutable Specialist Run Session

## Status

Accepted for V12 implementation on 2026-07-19. Release remains gated on implementation dogfood, canonical verification, independent review, and owner approval.

## Context

V11 compiles an exact task-shaped specialist team, renders a provider-neutral package, and verifies exact raw handoffs. An IDE can materialize those contracts, but it still has to reconstruct dependency eligibility, accepted evidence, routing, restart state, and integration readiness from prose.

The previously deferred universal control plane is too broad for this gap. It combines provider execution, capacity, retries, crash recovery, repository effects, and durable orchestration. V12 needs a smaller portable layer that makes one approved V11 package usable without claiming any host effect.

## Decision Drivers

- Give an IDE one visible path from an approved package to verified specialist fan-in.
- Preserve exact source evidence across serialization and restart.
- Reuse V11 package and handoff verification rather than define weaker parallel semantics.
- Maximize dependency-safe parallel work while keeping runtime decisions external.
- Keep state immutable, deterministic, closed, and provider-neutral.
- Route verified non-`pass` outcomes explicitly.
- Avoid reviving the deferred scheduler through misleading vocabulary or state.

## Decision

V12 adds an immutable `SpecialistRunSession` as a pure evidence reducer over one complete, externally approved V11 package.

The circuit is:

```txt
verified V11 package + external expectation + immutable session + exact raw handoff
  | create | restore | inspect | record
  -> new immutable session, immutable inspection, or stable diagnostic
```

### Public Operations

V12 exports four pure operations:

1. `createSpecialistRunSession` verifies the complete package against an externally trusted compilation/package digest pair and returns an empty source-preserving session.
2. `restoreSpecialistRunSession` accepts bounded raw JSON bytes plus the external expectation, rejects unsafe or ambiguous input, and reconstructs the same verified session.
3. `inspectSpecialistRunSession` derives every agent status, dependency-eligible exact contract, accepted evidence binding, route, blocker, specialist outcome, integration readiness, and next external action.
4. `recordSpecialistRunHandoff` verifies exact raw bytes through V11 and returns a monotonic successor, an idempotent exact replay, or a stable fail-closed diagnostic.

There is no serialize, launch, claim, retry, cancel, close, merge, persistence, or memory operation.

### Source-Preserving State

The session embeds:

- The complete verified `RenderedSpecialistPackage`.
- The external goal and package bindings.
- Canonically ordered accepted handoff rows.
- Standard padded base64 for every exact accepted raw UTF-8 handoff.
- Raw byte counts and SHA-256 digests.
- One domain-separated session digest.

The trusted `SpecialistPackageExpectation` remains external and is required on every operation. Package-carried or session-carried digests bind content but do not establish approval.

Digest-only handoff summaries are rejected as a restart boundary because they cannot reproduce package or handoff verification. The host also preserves the original package and raw handoff files as primary evidence.

### Dependency Eligibility

Core reports `dependencyEligible`, never running, queued, scheduled, dispatched, or launched. A blueprint is dependency-eligible only when every transitive prerequisite already has a verified `pass` handoff in the prior session.

Projected V11 launch waves and concurrency are planning evidence only. The host still owns approval freshness, context delivery, permission enforcement, isolation, capacity, duplicate live-work prevention, runtime selection, and launch.

### Integration Readiness

Overall readiness uses a deterministic virtual external integration sink whose direct dependencies are every sink blueprint in the selected DAG. Its transitive closure is the complete selected blueprint set.

`integrationReady` is true only when every selected blueprint has exactly one verified `pass` handoff. It proves specialist fan-in closure only; it does not prove integration, tests, review, merge, release, or memory updates.

### Routing And Replay

The session accepts at most one handoff per blueprint.

- An exact byte-for-byte replay is idempotent and returns the same canonical session.
- A different second handoff for the same blueprint fails closed.
- A verified non-`pass` handoff is successful evidence acceptance and workflow non-success.
- The first non-`pass` handoff routes the session terminally, satisfies no dependency, and prevents new settlements.
- Retry, replacement, and late independent work remain external evidence or require a newly reviewed package.

V11 handoffs contain no run nonce, freshness proof, or actor authentication. V12 therefore makes no cross-session anti-replay or exactly-once execution claim.

### Serialization And Trust

Session values are closed canonical JSON, deeply detached, and immutable. Restore is the raw trust boundary and must reject duplicate keys, malformed UTF-8, unsafe text, unknown fields, noncanonical base64, source substitution, stale identity, and resource excess.

The host owns persistence protection and update serialization. Pure immutable values do not provide durable atomicity, compare-and-swap, fork reconciliation, or live-effect recovery.

### Limits And Diagnostics

V12 publishes exact run limits and five run-specific diagnostics, `SC4401` through `SC4405`. Existing V11 package and handoff diagnostics remain unchanged and are not reclassified.

The normative values, schema, closed types, transition precedence, status unions, digest domains, and diagnostic meanings are defined in `docs/specs/v12-ide-run-loop/specialist-run-contract.md`.

## Host Boundary

The external IDE or host alone:

- Obtains and retains two-digest approval.
- Verifies delivered source bytes.
- Enforces permissions and workspace isolation.
- Chooses provider, model, prompts, credentials, tools, and runtime.
- Prevents duplicate live launches and tracks in-flight work.
- Persists sessions and protects evidence.
- Serializes concurrent updates and handles uncertain effects.
- Integrates changes, runs repository verification and independent review, merges, and updates milestones and memory.

Core performs none of those effects and accepts no host assertion that converts them into core truth.

## Deferred

- Provider, model, prompt, credential, and runtime-profile selection.
- Capacity scheduling, launch claims, in-flight state, retries, cancellation, and deadlines.
- Worktree creation, sandboxing, permission enforcement, and context-delivery claims.
- Crash recovery for live effects, distributed persistence, and cross-session challenges.
- Provisional or `any` joins, route budgets, and multi-package graphs.
- Repository attestation, automatic integration, merge readiness, release, and memory mutation.

## Alternatives Considered

### Digest-only compact session

Rejected. It is not source-preserving and cannot independently reverify package or handoff semantics after restart.

### Three operations with caller parsing

Rejected. A dedicated raw restore boundary is required to reject duplicate keys, malformed UTF-8, unsafe content, and forged self-digests before a parsed object is trusted.

### Caller-selected integration target

Rejected. `goal.integrationOwner` is a destination string, not a blueprint. Overall readiness must cover the complete reviewed roster.

### Reduced scheduler

Rejected. Dependency eligibility is useful and portable; dispatch, capacity, retries, and process state are host effects and remain deferred.

## Consequences

- An IDE can persist and resume one approved specialist workflow without hidden core state.
- Exact evidence is larger: a worst-case session may approach the published 128 MiB bound.
- Every operation reverifies trusted sources, trading performance for restartable correctness.
- The API remains additive and preserves all V11 identities and operations.
- Host persistence can still fork, and still-live work can still be duplicated if a host mistakes eligibility for dispatch authorization.

## Source Evidence

- `docs/specs/v12-ide-run-loop/v12-run-loop-architecture.md`
- `docs/specs/v12-ide-run-loop/evidence/architecture/wave1-verification.json`
- `docs/specs/v12-ide-run-loop/evidence/architecture/integration-verification.json`
- `docs/specs/v12-ide-run-loop/evidence/architecture/handoffs/`
- ADR 0003 and ADR 0004

## Review Triggers

Revisit this decision if dogfood shows that source-preserving sessions are impractical at realistic evidence sizes, four pure operations cannot support a clear IDE loop, complete-roster readiness is too coarse, terminal non-`pass` routing loses required behavior, or a runtime layer needs authenticated session challenges rather than package-bound evidence.

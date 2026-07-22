# Specialist Run Contract

## Status

Normative V12 implementation contract. It is derived from the verified architecture handoff and ADR 0005. Changes to this contract require a new reviewed implementation compilation.

## Boundary

The Specialist Run layer is a pure, provider-neutral evidence reducer over one complete V11 `RenderedSpecialistPackage`.

```txt
approved package + external expectation + immutable session + exact raw handoff
  | create | restore | inspect | record
  -> immutable value or stable diagnostic
```

Core verifies and derives. The external host approves, delivers context, enforces authority, launches, persists, integrates, reviews, merges, and updates memory.

## Constants

```ts
export const SPECIALIST_RUN_API_VERSION =
  "swecircuit/specialist-run/v1alpha1" as const;

export const SPECIALIST_RUN_KINDS = Object.freeze([
  "SpecialistRunSession",
  "SpecialistRunInspection",
] as const);

export const SPECIALIST_RUN_LIMITS = Object.freeze({
  rawSessionInputBytes: 67_108_864,
  canonicalSessionBytes: 134_217_728,
  acceptedHandoffs: 16,
  rawHandoffBytes: 1_048_576,
  rawHandoffBase64Chars: 1_398_104,
  canonicalInspectionBytes: 67_108_864,
} as const);
```

V11 package, text, schema, agent, handoff, and output limits remain normative and are not widened.

`rawSessionInputBytes` is the preparse attacker-input ceiling. It remains above the constituent-derived maximum canonical session while staying below the deliberately conservative `canonicalSessionBytes` safeguard.

## Public Operations

```ts
createSpecialistRunSession(
  specialistPackage: unknown,
  expectation: SpecialistPackageExpectation | unknown,
): OperationResult<SpecialistRunSession>;

restoreSpecialistRunSession(
  rawSessionBytes: unknown,
  expectation: SpecialistPackageExpectation | unknown,
): OperationResult<SpecialistRunSession>;

inspectSpecialistRunSession(
  session: unknown,
  expectation: SpecialistPackageExpectation | unknown,
): OperationResult<SpecialistRunInspection>;

recordSpecialistRunHandoff(
  session: unknown,
  expectation: SpecialistPackageExpectation | unknown,
  rawHandoffBytes: unknown,
): OperationResult<SpecialistRunSession>;
```

Every input is untrusted. Every successful value is detached from caller-owned objects and deeply frozen. Every failure returns `ok: false`, `value: null`, and stable ordered diagnostics. No operation performs I/O or a host effect.

## Session Wire Shape

```ts
export type SpecialistRunApiVersion =
  "swecircuit/specialist-run/v1alpha1";

export interface SpecialistRunGoalBinding {
  readonly id: string;
  readonly revision: number;
  readonly digest: string;
  readonly integrationOwner: string;
}

export interface SpecialistRunAcceptedHandoff {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly outcome: WorkflowOutcome;
  readonly rawEncoding: "base64";
  readonly rawBytes: number;
  readonly rawDigest: string;
  readonly rawBase64: string;
}

export interface SpecialistRunSession {
  readonly apiVersion: SpecialistRunApiVersion;
  readonly kind: "SpecialistRunSession";
  readonly goal: SpecialistRunGoalBinding;
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly selectedCandidateId: string;
  readonly package: RenderedSpecialistPackage;
  readonly acceptedHandoffs: readonly SpecialistRunAcceptedHandoff[];
  readonly contentDigest: string;
}
```

The root and every nested object are closed. Unknown properties reject.

The embedded package is the complete canonical value returned by `verifySpecialistPackage`. The session does not duplicate blueprint dependencies, contract files, artifacts, or evidence duties outside the package and accepted raw handoffs.

Accepted handoffs are ordered by the existing ordinal agent-ID comparator. `rawBase64` is standard RFC 4648 base64 with padding, no whitespace, and canonical re-encoding equality. Decoding must reproduce `rawBytes` and `rawDigest`, then pass `verifySpecialistHandoff` against the embedded package and external expectation.

The session contains no timestamp, random ID, run nonce, revision counter, provider, model, prompt, executor, credential, grant, callback, host path, workspace, process, attempt, capacity, launch wave, stage, blocker, readiness, or next-action field.

## Inspection Wire Shape

```ts
export type SpecialistRunStage =
  | "collecting"
  | "routed"
  | "integration_ready";

export type SpecialistRunAgentStatusKind =
  | "accepted_pass"
  | "accepted_non_pass"
  | "dependency_eligible"
  | "waiting_for_dependencies"
  | "session_routed";

export interface SpecialistRunRoute {
  readonly agentId: string;
  readonly outcome: Exclude<WorkflowOutcome, "pass">;
}

export interface SpecialistRunAgentStatus {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly dependencies: readonly string[];
  readonly status: SpecialistRunAgentStatusKind;
  readonly outcome: WorkflowOutcome | null;
  readonly waitingForAgentIds: readonly string[];
  readonly blockingRoutes: readonly SpecialistRunRoute[];
}

export interface SpecialistRunEligibleContract {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly path: string;
  readonly mediaType: "text/markdown";
  readonly bytes: number;
  readonly digest: string;
  readonly content: string;
}

export interface SpecialistRunEvidenceBinding {
  readonly criterionId: string;
  readonly requirementId: string;
  readonly kind: EvidenceKind;
  readonly duty: SpecialistEvidenceDuty;
  readonly status: WorkflowOutcome;
  readonly artifact: string;
}

export interface SpecialistRunAcceptedEvidence {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly outcome: WorkflowOutcome;
  readonly rawBytes: number;
  readonly rawDigest: string;
  readonly semanticDigest: string;
  readonly artifacts: readonly SpecialistHandoffArtifactBinding[];
  readonly evidence: readonly SpecialistRunEvidenceBinding[];
}

export type SpecialistRunNextAction =
  | {
      readonly kind:
        "external_host.evaluate_dependency_eligible_contracts";
      readonly actor: "external_host";
      readonly agentIds: readonly string[];
    }
  | {
      readonly kind: "integration_owner.route_specialist_outcome";
      readonly actor: "integration_owner";
      readonly integrationOwner: string;
      readonly routes: readonly SpecialistRunRoute[];
    }
  | {
      readonly kind: "integration_owner.integrate_and_verify";
      readonly actor: "integration_owner";
      readonly integrationOwner: string;
    };

export interface SpecialistRunInspection {
  readonly apiVersion: SpecialistRunApiVersion;
  readonly kind: "SpecialistRunInspection";
  readonly goal: SpecialistRunGoalBinding;
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly selectedCandidateId: string;
  readonly sessionDigest: string;
  readonly stage: SpecialistRunStage;
  readonly agents: readonly SpecialistRunAgentStatus[];
  readonly dependencyEligibleContracts:
    readonly SpecialistRunEligibleContract[];
  readonly acceptedEvidence: readonly SpecialistRunAcceptedEvidence[];
  readonly routes: readonly SpecialistRunRoute[];
  readonly specialistOutcome: WorkflowOutcome | null;
  readonly integrationReady: boolean;
  readonly nextAction: SpecialistRunNextAction;
  readonly contentDigest: string;
}
```

All arrays use canonical ordinal ordering by their primary ID and then their complete closed tuple. Inspection never duplicates raw artifact content.

### Status Invariants

Every selected blueprint has exactly one status row:

| Status | Outcome | Waiting IDs | Blocking routes |
| --- | --- | --- | --- |
| `accepted_pass` | `pass` | Empty | Empty |
| `accepted_non_pass` | Exact non-`pass` | Empty | Contains its exact route |
| `dependency_eligible` | `null` | Empty | Empty |
| `waiting_for_dependencies` | `null` | Missing direct prerequisites | Empty |
| `session_routed` | `null` | Any still-missing direct prerequisites | Contains the terminal route |

When a session is routed, every unsettled blueprint has `session_routed`, including independent work that would otherwise be dependency-eligible. Core has no in-flight knowledge and accepts no new settlement after routing.

### Eligible Contract Invariants

`dependencyEligibleContracts` contains all and only unsettled blueprints whose transitive prerequisites have accepted `pass` handoffs while the session is collecting.

Contract path, media type, byte count, digest, and content come from the reverified manifest and package file. A filename is never reconstructed from an agent ID.

### Stage And Outcome

- `collecting`: no accepted non-`pass` exists and at least one blueprint is unsettled.
- `routed`: exactly one accepted non-`pass` exists.
- `integration_ready`: every selected blueprint has one accepted `pass`.

`specialistOutcome` is respectively `null`, the exact routed outcome, or `pass`.

The virtual external integration sink depends on every graph sink. Its transitive closure must equal the complete selected blueprint set. `integrationReady` is true only in `integration_ready`.

### Next Action

- Collecting returns `external_host.evaluate_dependency_eligible_contracts` and the exact eligible agent IDs.
- Routed returns `integration_owner.route_specialist_outcome`, the external integration owner, and the exact route.
- Integration-ready returns `integration_owner.integrate_and_verify` and the external integration owner.

Core never returns an await, launch, running, queued, dispatch, retry, merge, or memory action.

## Create Semantics

Creation:

1. Calls `verifySpecialistPackage` with the external expectation.
2. Parses the verified `compilation.json`.
3. Requires the complete selected blueprint and manifest agent sets to match.
4. Builds the exact goal binding and selected candidate binding from the verified package.
5. Embeds the canonical verified package.
6. Sets `acceptedHandoffs` to an empty array.
7. Computes, detaches, bounds, and deeply freezes the session.

There is no caller-selected roster, target, gate, or runtime input.

## Restore Semantics

Restore:

1. Snapshots only a non-proxy `Uint8Array`.
2. Checks `rawSessionInputBytes` before parsing.
3. Parses strict UTF-8 with duplicate-key visibility.
4. Rejects schema, unknown-field, unsafe-control, secret, lone-surrogate, and resource violations.
5. Validates the session `contentDigest`.
6. Verifies the embedded package against the external expectation.
7. Requires goal, compilation, package, selected candidate, manifest, and blueprint bindings to match.
8. Requires canonical accepted-row ordering and uniqueness.
9. Decodes and canonically re-encodes every base64 value.
10. Recomputes each raw byte count and digest.
11. Re-runs `verifySpecialistHandoff` for every row and matches its agent, blueprint, outcome, and raw binding.
12. Requires every accepted row's transitive dependencies to have accepted `pass`.
13. Allows at most one accepted non-`pass`; no accepted row may depend on it.
14. Reconstructs the canonical session and requires semantic equality.
15. Detaches and deeply freezes the result.

Harmless outer whitespace and JSON property order may vary. Duplicate keys, alternate base64, alternate set order, or changed semantics reject.

## Record Semantics

Record applies this exact precedence:

1. Revalidate and reverify the prior session.
2. Snapshot and bound the submitted raw `Uint8Array`.
3. Run `verifySpecialistHandoff` against the embedded package and external expectation.
4. If the same agent already has byte-for-byte identical raw bytes, return the same canonical session as idempotent success.
5. If the same agent has different bytes, return `SC4403`.
6. If the session already contains a non-`pass`, return `SC4405`.
7. If any transitive dependency lacks accepted `pass`, return `SC4404`.
8. Construct, normalize, digest, and bound the successor; return `SC4402` on aggregate excess.
9. Return the detached, deeply frozen successor.

A valid non-`pass` handoff is accepted and returns `ok: true`. It is workflow non-success, never satisfies a dependency, and terminally routes the session.

Any rejection leaves the prior session structurally unchanged. Core does not merge divergent successors. The host serializes updates or performs its own compare-and-swap check using the prior `contentDigest`.

## Canonicalization And Digests

Use the V11 framed canonical JSON construction and ordinal text comparator.

Register exactly:

- `swecircuit/specialist-run/session/v1alpha1`
- `swecircuit/specialist-run/inspection/v1alpha1`

Each digest covers the complete closed root excluding `contentDigest`. Raw handoff digests remain standard SHA-256 over exact bytes.

Independent accepted `pass` arrival orders must converge to the same session and inspection values. Session digests establish content identity only; they do not authenticate approval, actor, freshness, persistence, or runtime history.

## Diagnostics

Preserve V11 `SC4307`, `SC4308`, `SC4309`, `SC4310`, `SC4311`, `SC4312`, `SC4313`, and `SC9001` without reclassification.

Add:

| Code | Artifact | Meaning | Workflow route |
| --- | --- | --- | --- |
| `SC4401` | `specialist-run-session.json` | Invalid closed session, digest, package binding, ordering, base64, or restore semantics | `fix` or `block` |
| `SC4402` | Run session or inspection | Aggregate run limit exceeded | `split` |
| `SC4403` | `specialist-run-handoff.json` | Different second handoff for an already settled agent | `block` |
| `SC4404` | `specialist-run-handoff.json` | Handoff submitted before every transitive dependency accepted `pass` | `fix` |
| `SC4405` | `specialist-run-handoff.json` | New handoff submitted after terminal routing | Exact external route |

Exact replay is not a diagnostic. A valid non-`pass` is not an operation error.

## Resource Proof

Tests must prove:

- Every constituent acceptance limit is reached by a valid fixture: 16 accepted handoffs, `rawHandoffBytes`, `rawHandoffBase64Chars`, and `rawSessionInputBytes`.
- One complete 16-agent V11 package plus 16 maximum valid handoffs and base64 expansion fits `canonicalSessionBytes`; record, restore, and inspect converge for independent arrival orders.
- `canonicalSessionBytes` and `canonicalInspectionBytes` are conservative aggregate safeguards. Tests must derive strict upper bounds from the constituent V11 package, roster, handoff, artifact, identifier, and text ceilings; they do not claim that a semantically valid value can reach either aggregate safeguard exactly.
- Reachable at-limit values pass and one-unit-over raw inputs fail without truncation. Unreachable aggregate safeguards require constituent-ceiling calculations, a real maximum-handoff workload below the guard, and no synthetic claim of valid at-limit reachability.
- Raw bounds are checked before parse, decode, canonicalization, or allocation proportional to attacker-declared size.
- Inspection and diagnostic paths remain bounded.

## Required Verification

- Wrong compilation or package expectation.
- Coordinated package rewrite and manifest or contract substitution.
- Proxies, accessors, malformed UTF-8, duplicate keys, unknown fields, unsafe controls, secrets, and lone surrogates.
- Root, chain, diamond, fan-out, fan-in, disconnected, and complete DAGs.
- Every workflow outcome.
- Unknown, stale, malformed, substituted, premature, replayed, and conflicting handoffs.
- Prior-state immutability and detached outputs.
- Independent arrival permutation convergence.
- Fresh-process serialize, restore, inspect equivalence.
- Differential dependency checks against V11 `assessSpecialistHandoffs`.
- Schema, public declarations, package exports, and packed-consumer use.
- Absence of provider, model, prompt, executor, credential, callback, timestamp, randomness, and host-state fields.

## IDE Contract

The IDE must visibly show:

1. Reviewed goal and any blocking clarification.
2. Serial baseline, search claim, selected partition, reason, and digest pair.
3. External approval and package verification.
4. Session stage, dependency eligibility, reasons, evidence, blockers, readiness, and next external actor.
5. Host-owned context verification, authority enforcement, isolation, duplicate-live-work check, and launch.
6. Exact raw preservation, record result, and reinspection.
7. Explicit routing or specialist fan-in closure.
8. Separate integration, repository verification, independent review, milestone, merge, and memory stages.

Dependency eligibility is never described as proof of launch safety or at-most-once execution.

## Forbidden Claims

V12 does not claim that core:

- Authenticates an actor or approval.
- Establishes run freshness, anti-replay, or exactly-once execution.
- Delivers context or enforces permissions.
- Chooses or contacts a provider, model, tool, or executor.
- Launches, schedules, retries, cancels, or observes a process.
- Persists atomically or reconciles forks.
- Integrates, tests, reviews, merges, releases, or updates memory.

Any requirement for those capabilities emits `split` into the deferred runtime layer.

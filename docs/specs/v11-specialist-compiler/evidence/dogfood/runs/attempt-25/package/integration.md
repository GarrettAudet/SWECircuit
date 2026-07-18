# Specialist Integration Contract

Compilation: `sha256:6fd3f23139663de4dbb1950043dc02e2dc90e6da284f8ade1e99cfcc5b2f6404`

The integration owner launches only the contracts bound to this compilation, preserves each raw handoff, verifies required evidence, resolves declared dependencies in order, and returns to clarification or redesign when a specialist crosses its boundary.

## Integration Gates

1. Confirm every emitted file matches its manifest-listed raw SHA-256 digest and byte count, and every agent contract carries this compilation digest and its manifest-listed blueprint digest.
2. Launch agents only when their dependency wave is ready and external workspace isolation is adequate.
3. Reject undeclared files, authority, context, decisions, or evidence substitutions.
4. Fan in handoffs through the declared integration owner; do not let one specialist silently approve its own independent duty.
5. Run feature-level verification and review before merge, then promote only source-linked durable learning.

## Compiled Plan

```json
{
  "compilationDigest": "sha256:6fd3f23139663de4dbb1950043dc02e2dc90e6da284f8ade1e99cfcc5b2f6404",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 25,
  "assumptions": [
    {
      "id": "assumption.atomic-work-reviewed",
      "statement": "The six work units are stable atomic responsibilities for this release review.",
      "rationale": "They were derived from the accepted V11 spec and have disjoint review or integration ownership."
    },
    {
      "id": "assumption.checkout-canonical-context",
      "statement": "Every repository context source is byte-identical under the declared Git checkout rules, with no custom filter or working-tree encoding.",
      "rationale": "A reviewed launch package must reconstruct from a clean checkout, not only the integration owner working tree."
    },
    {
      "id": "assumption.external-approval-root",
      "statement": "The integration owner retains separate approved compilation and package digests for the prelaunch audit and, only after its PASS, for the candidate package.",
      "rationale": "Each package verification is trustworthy only when its expected digest pair comes from an independent approval record, and candidate launch approval follows the audit gate."
    },
    {
      "id": "assumption.external-host-enforcement",
      "statement": "The external IDE host enforces actual context, permission, workspace, and process boundaries.",
      "rationale": "The V11 compiler emits provider-neutral task demand and performs no runtime effects."
    },
    {
      "id": "assumption.immutable-review-inputs",
      "statement": "Any release document that integration may update is reviewed through an immutable pre-integration snapshot rather than its live output path.",
      "rationale": "Authorized integration must not invalidate the exact candidate it consumes."
    },
    {
      "id": "assumption.raw-handoff-preservation",
      "statement": "The external host preserves each specialist result as exact raw UTF-8 bytes before parsing and supplies the complete dependency set for fan-in.",
      "rationale": "V11 can verify supplied bytes and package identity but does not execute agents or persist runtime evidence."
    },
    {
      "id": "assumption.relative-planning-weights",
      "statement": "Work, startup, and handoff values are relative planning units rather than elapsed-time forecasts.",
      "rationale": "V11 compares deterministic candidate structure and does not claim runtime benchmarking."
    },
    {
      "id": "assumption.release-host-contained-temp",
      "statement": "Canonical release processes use only temporary workspaces that resolve inside declared .local/npm-cache/** write authority.",
      "rationale": "Functional success is not authority-compliant evidence when tests inherit system TEMP/TMP; a verified Windows short-path spelling may reduce path length only when it resolves to the same authorized target."
    },
    {
      "id": "assumption.two-phase-prelaunch-audit",
      "statement": "An agent-based semantic review of the exact candidate compilation uses a separate read-only audit package rather than a work unit inside that candidate.",
      "rationale": "A compilation cannot include its own complete bytes as authenticated context without changing itself."
    }
  ],
  "unresolvedDecisions": [
    {
      "id": "decision.runtime-supply",
      "question": "Which IDE, models, and workspace isolation strategy should execute a future production roster?",
      "owner": "v11.integration-owner",
      "blocking": false,
      "proceedRationale": "Runtime supply is explicitly outside the V11 compiler acceptance boundary and requires a later adapter decision."
    }
  ],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 6,
    "evaluatedCandidates": 203,
    "eligibleCandidates": 52,
    "retainedAlternatives": 8,
    "evaluationSetDigest": "sha256:8cc20fcef32201a4afa52bf7391c79befd6468946862002dc992de24b47488f5"
  },
  "selectedCandidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "selectedMetrics": {
    "agentCount": 6,
    "projectedMakespan": 23,
    "peakConcurrency": 4,
    "conflictPairs": 0,
    "handoffCount": 8,
    "duplicatedContextBytes": 2067535,
    "duplicatedPermissionScopes": 149,
    "totalWorkWeight": 38,
    "totalStartupCost": 12,
    "totalHandoffCost": 8
  },
  "selectionReason": {
    "kind": "serial_ineligible",
    "decisiveField": "evidence_independence",
    "selectedValue": "eligible",
    "serialValue": "ineligible",
    "serialRejectionCodes": [
      "evidence_independence"
    ]
  },
  "serialBaseline": {
    "id": "team.3048358537136cc8c5604b2b52e5180772663dc0cc3b0798e32bf99a67ce9696",
    "eligible": false,
    "rejectionCodes": [
      "evidence_independence"
    ],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 40,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 38,
      "totalStartupCost": 2,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730"
      ]
    },
    {
      "start": 4,
      "agentIds": [
        "agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972",
        "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
        "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
        "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc"
      ]
    },
    {
      "start": 17,
      "agentIds": [
        "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.073738545314110329a947b77922c2a89c772cbaf4f2b9da29daa212e9aa9972",
      "digest": "sha256:d79cfe7179f776d0678f5c2e162487a0364c15d63f3a8316deeb394875cc0c82"
    },
    {
      "agentId": "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9",
      "digest": "sha256:81e408ba599d104998a0a608538661cc36002ea049fff8ed8f10bc0c1aad068e"
    },
    {
      "agentId": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
      "digest": "sha256:0227ecbe4948d4128df598af683654458cea8b09298431cf12aff390e5d18654"
    },
    {
      "agentId": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
      "digest": "sha256:7d51286c692a853282465643605b8e26db90dba7d467e97ef900437923f71fa5"
    },
    {
      "agentId": "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc",
      "digest": "sha256:a453e089f353d1856b007ec57efbb4a0fb422417d08cf6a112d40d514a5a7b32"
    },
    {
      "agentId": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
      "digest": "sha256:c772dbabc6eaa17d90c3657b48dcd2e224f8a30b048822bfcd13b8bdc6817287"
    }
  ]
}
```

# Specialist Integration Contract

Compilation: `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d`

The integration owner launches only the contracts bound to this compilation, preserves each raw handoff, verifies required evidence, resolves declared dependencies in order, and returns to clarification or redesign when a specialist crosses its boundary.

## Integration Gates

1. Confirm every agent contract carries this compilation digest and its manifest-listed blueprint digest.
2. Launch agents only when their dependency wave is ready and external workspace isolation is adequate.
3. Reject undeclared files, authority, context, decisions, or evidence substitutions.
4. Fan in handoffs through the declared integration owner; do not let one specialist silently approve its own independent duty.
5. Run feature-level verification and review before merge, then promote only source-linked durable learning.

## Compiled Plan

```json
{
  "compilationDigest": "sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 5,
  "assumptions": [
    {
      "id": "assumption.atomic-work-reviewed",
      "statement": "The six work units are stable atomic responsibilities for this release review.",
      "rationale": "They were derived from the accepted V11 spec and have disjoint review or integration ownership."
    },
    {
      "id": "assumption.external-approval-root",
      "statement": "The integration owner retains the approved compilation and package digests outside the rendered package.",
      "rationale": "Package verification is trustworthy only when the expected digest pair comes from an independent approval record."
    },
    {
      "id": "assumption.external-host-enforcement",
      "statement": "The external IDE host enforces actual context, permission, workspace, and process boundaries.",
      "rationale": "The V11 compiler emits provider-neutral task demand and performs no runtime effects."
    },
    {
      "id": "assumption.relative-planning-weights",
      "statement": "Work, startup, and handoff values are relative planning units rather than elapsed-time forecasts.",
      "rationale": "V11 compares deterministic candidate structure and does not claim runtime benchmarking."
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
    "evaluationSetDigest": "sha256:bc9688bdcddc40afd6b94aaa4ba8af243bbffd85bb84d8c25fa6f2fd43320968"
  },
  "selectedCandidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "selectedMetrics": {
    "agentCount": 6,
    "projectedMakespan": 23,
    "peakConcurrency": 4,
    "conflictPairs": 0,
    "handoffCount": 8,
    "duplicatedContextBytes": 1050773,
    "duplicatedPermissionScopes": 87,
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
      "digest": "sha256:627f029159debbfe00de8122922b9a631556e3ba6f263160091ae30a59b9bea7"
    },
    {
      "agentId": "agent.2b83ea5b39ffd90046090bde81027fe89cb67de8fa0ffe1374233024c19f76c9",
      "digest": "sha256:2b3c1e568b668689798096c38ec8aed280a127eaa787a2b69d2b369ddd323fce"
    },
    {
      "agentId": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
      "digest": "sha256:cc8cf80b817506f15a9fe3257f81ed5ac8e5fc9b70e4afd5690d65ca566c4b77"
    },
    {
      "agentId": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
      "digest": "sha256:610d1dbb9e73d26cf793277f12dfb8081b7f37ffb4e57cda72165e7a5dc78caa"
    },
    {
      "agentId": "agent.768a06db63e32976028e97e053d9f14f7274470d09a07b6c9a3ffff4a3e8b2cc",
      "digest": "sha256:f279f6e0d26f1363fa041d0964f72607c26da2653f174c971285ee0178e4017f"
    },
    {
      "agentId": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
      "digest": "sha256:627beefd0be3c86f7628a4cdbf8e2b61966cdb2bb99c24dd8e229c1928ba93be"
    }
  ]
}
```

# Specialist Integration Contract

Compilation: `sha256:a832ba62027737d4ea804d64e47fbd3cd53b78c4756524586d147dca0a0722ff`

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
  "compilationDigest": "sha256:a832ba62027737d4ea804d64e47fbd3cd53b78c4756524586d147dca0a0722ff",
  "goalId": "v11.specialist-compiler.prelaunch-audit",
  "goalRevision": 17,
  "assumptions": [
    {
      "id": "assumption.audit-is-trust-root",
      "statement": "The owner reviews and separately approves this small read-only audit package; it does not recursively review itself.",
      "rationale": "A finite assurance protocol requires an explicit human-approved trust root."
    },
    {
      "id": "assumption.candidate-is-immutable",
      "statement": "Every candidate compilation and package file is authenticated by exact bytes and digest before audit.",
      "rationale": "Any candidate change must invalidate this audit compilation and package."
    },
    {
      "id": "assumption.host-enforces-audit-boundary",
      "statement": "The external host enforces the audit package's read-only authority and launch ordering.",
      "rationale": "V11 compiles and verifies contracts but performs no runtime enforcement."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 2,
    "evaluatedCandidates": 2,
    "eligibleCandidates": 1,
    "retainedAlternatives": 1,
    "evaluationSetDigest": "sha256:a423c171bd943acc419119046b2c5941ca0a21dfb738a5c4a1dbb9b0a3731776"
  },
  "selectedCandidateId": "team.357beba7ab91a91ad49896b7d31e2fb6c61d9277c3d50582a02bad331a809b12",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 16,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 1,
    "duplicatedContextBytes": 562800,
    "duplicatedPermissionScopes": 10,
    "totalWorkWeight": 11,
    "totalStartupCost": 4,
    "totalHandoffCost": 1
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
    "id": "team.c47c69651ba006e72c72b8ff6513f486c385e52d612a70cb95fb296d49b5ae93",
    "eligible": false,
    "rejectionCodes": [
      "evidence_independence"
    ],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 13,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 11,
      "totalStartupCost": 2,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6"
      ]
    },
    {
      "start": 4,
      "agentIds": [
        "agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6",
      "digest": "sha256:c3695a34a27da4fcd8632b734e1007d4b911625db2566950d4b27b85cf498b9c"
    },
    {
      "agentId": "agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64",
      "digest": "sha256:15f05bcb48b04625cbf56da43759886113b1fb7c63981f0bdc3c90be4b660c7b"
    }
  ]
}
```

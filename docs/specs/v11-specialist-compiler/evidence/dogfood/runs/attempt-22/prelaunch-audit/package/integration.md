# Specialist Integration Contract

Compilation: `sha256:0b9d61f44a25d5fc13eb5cfea82bd51c1417bc113fe52f0651f719e8293835ac`

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
  "compilationDigest": "sha256:0b9d61f44a25d5fc13eb5cfea82bd51c1417bc113fe52f0651f719e8293835ac",
  "goalId": "v11.specialist-compiler.prelaunch-audit",
  "goalRevision": 22,
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
      "id": "assumption.host-delivers-verification-receipt",
      "statement": "The host delivers an immutable package-verification receipt as runtime input after reconstructing Candidate A and approval-verifying Audit B.",
      "rationale": "Audit B cannot digest-bind its own final package without self-reference; the external receipt makes the trusted host boundary explicit."
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
    "evaluationSetDigest": "sha256:275e7831a0a23d4cad8a28afa123c0c0d6dbda9e3fef502889dd4d23c590cb2b"
  },
  "selectedCandidateId": "team.357beba7ab91a91ad49896b7d31e2fb6c61d9277c3d50582a02bad331a809b12",
  "selectedMetrics": {
    "agentCount": 2,
    "projectedMakespan": 16,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 1,
    "duplicatedContextBytes": 576385,
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
      "digest": "sha256:0a49cc0aaaaa266b642d79ff418b526b05faf8841621cb3e273de0d3acc7ad36"
    },
    {
      "agentId": "agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64",
      "digest": "sha256:0cb89dd7fee4a66cc24f30875ca45b4af9c2b99fe3d4b40e6bf9df1e94b70e6f"
    }
  ]
}
```

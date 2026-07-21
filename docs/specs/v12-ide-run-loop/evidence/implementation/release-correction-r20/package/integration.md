# Specialist Integration Contract

Compilation: `sha256:54cc2d2d71a36f35e41b76fb4da28301ca73b3e154dcf683456a510d52e6546d`

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
  "compilationDigest": "sha256:54cc2d2d71a36f35e41b76fb4da28301ca73b3e154dcf683456a510d52e6546d",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 20,
  "assumptions": [
    {
      "id": "assumption.host-boundary",
      "statement": "Hostile same-user races, operating-system and executable trust, cache provenance, and parent pin enforcement remain external-host responsibilities.",
      "rationale": "Repository code can enforce location and byte checks without claiming host isolation."
    },
    {
      "id": "assumption.integration-owned-release",
      "statement": "The integration owner retains independent review, V11 refresh, successor gate, R2, hosted CI, and merge authority.",
      "rationale": "The correction producer cannot approve its own release."
    },
    {
      "id": "assumption.prior-evidence-immutable",
      "statement": "Revision 17-19 producer and independent-review evidence remains immutable; Revision 20 creates a new package and source identity.",
      "rationale": "A correction must preserve every prior attempt and verdict."
    },
    {
      "id": "assumption.stable-reconstruction",
      "statement": "Candidate, parent, cache declaration, and canonical-gate bytes define stable reconstruction; owner and handoff values define phase authority only.",
      "rationale": "Authority must not redefine the package it authorizes."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 1,
    "evaluatedCandidates": 1,
    "eligibleCandidates": 1,
    "retainedAlternatives": 0,
    "evaluationSetDigest": "sha256:3102982e7f883b90f4a01729306c06d9022040b4604786b79ecfc97f107552b5"
  },
  "selectedCandidateId": "team.0d4198308a44bec5947a2119702a917b59781e01fa925c3537e79452995e09ea",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 19,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 18,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.0d4198308a44bec5947a2119702a917b59781e01fa925c3537e79452995e09ea",
    "serialValue": "team.0d4198308a44bec5947a2119702a917b59781e01fa925c3537e79452995e09ea",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.0d4198308a44bec5947a2119702a917b59781e01fa925c3537e79452995e09ea",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 19,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 18,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.be88f5743003390c1f1d826c32c6e40a54612c5b1f10296b9aad502a8a990880",
      "digest": "sha256:80246c82d4f48fcb459d639920986008a9e6291178fb916994795b360f7206df"
    }
  ]
}
```

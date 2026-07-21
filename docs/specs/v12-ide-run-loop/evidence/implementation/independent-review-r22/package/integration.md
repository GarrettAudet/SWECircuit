# Specialist Integration Contract

Compilation: `sha256:fd2e58b00bdba106bb708477e3254e8c49bd463cf30b6fe73cd16cf66a927503`

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
  "compilationDigest": "sha256:fd2e58b00bdba106bb708477e3254e8c49bd463cf30b6fe73cd16cf66a927503",
  "goalId": "v12.ide-run-loop.review.closed-npm-provenance-r22",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-boundary",
      "statement": "Executable provenance, offline-cache provenance, operating-system isolation, permission enforcement, and hostile same-user resistance remain external-host duties.",
      "rationale": "Repository evidence may authenticate declarations and behavior without manufacturing host guarantees."
    },
    {
      "id": "assumption.producer-evidence-not-verdict",
      "statement": "The producer package, handoff, verifier report, and test results are authenticated evidence but do not supply this review's semantic verdict.",
      "rationale": "Independent review must reason from exact immutable sources."
    },
    {
      "id": "assumption.read-only",
      "statement": "The reviewer has no write authority and reports defects without repairing reviewed bytes.",
      "rationale": "The reviewed source and evidence must remain immutable."
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
    "evaluationSetDigest": "sha256:361dbffc0c22813c69b735aa45023b6514a28ebb7e5938e966a178878397731b"
  },
  "selectedCandidateId": "team.96eead27b6c410446aa7dcd2ed59703e278e91a0469aca50457d6aa6ff1dc22f",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 22,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 21,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.96eead27b6c410446aa7dcd2ed59703e278e91a0469aca50457d6aa6ff1dc22f",
    "serialValue": "team.96eead27b6c410446aa7dcd2ed59703e278e91a0469aca50457d6aa6ff1dc22f",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.96eead27b6c410446aa7dcd2ed59703e278e91a0469aca50457d6aa6ff1dc22f",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 22,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 21,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.249ea635ed0869adae02d80d7a827ca83f8f249ec4b75c8a75afecbb192db9f4"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.249ea635ed0869adae02d80d7a827ca83f8f249ec4b75c8a75afecbb192db9f4",
      "digest": "sha256:3fb8cc64ef56dfc8bc6f93c3a732f1af7ff1fdc3d87fed72a38bf04cabb4f0c3"
    }
  ]
}
```

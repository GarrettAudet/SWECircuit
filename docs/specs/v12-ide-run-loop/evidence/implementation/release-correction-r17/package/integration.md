# Specialist Integration Contract

Compilation: `sha256:472d6cfe1bef797bd17926d008f6a00b47f1640c5dcc37d0739c17113f710b5d`

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
  "compilationDigest": "sha256:472d6cfe1bef797bd17926d008f6a00b47f1640c5dcc37d0739c17113f710b5d",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 17,
  "assumptions": [
    {
      "id": "assumption.host-runtime-boundary",
      "statement": "Node itself remains external host supply, while every repository-derived module and copied npm package executed by the R2 tools is authenticated and bound before use.",
      "rationale": "The file-based kernel cannot attest the IDE or OS runtime, but it can prevent repository-live generated code and unbound npm package resolution."
    },
    {
      "id": "assumption.integration-owned-release",
      "statement": "The integration owner retains full verification, successor freeze, exact gate, fresh R2, hosted CI, and merge authority.",
      "rationale": "The correction specialist cannot approve the release it modifies."
    },
    {
      "id": "assumption.retired-candidate-immutable",
      "statement": "Candidate f4f91a373dd7f8028ec5d592e89c75f0027245c3 and all of its exact gate and R2 evidence remain immutable.",
      "rationale": "The authenticated fix outcome requires a new successor candidate."
    },
    {
      "id": "assumption.single-owner",
      "statement": "One specialist owns the coupled harness, verifier, and regressions; the integration owner independently reviews and performs release gates.",
      "rationale": "Splitting a shared bootstrap trust boundary would introduce conflicting edits and ambiguous ownership."
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
    "evaluationSetDigest": "sha256:ce65c07ddfcf8f3636e634d16a70a970f5c00ee46909b5240e21e67c4057b28e"
  },
  "selectedCandidateId": "team.e7c885180b43fe0c4f2a26e7593309dc504f6cfd6155882e530d4b0ce26dc287",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 11,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 10,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.e7c885180b43fe0c4f2a26e7593309dc504f6cfd6155882e530d4b0ce26dc287",
    "serialValue": "team.e7c885180b43fe0c4f2a26e7593309dc504f6cfd6155882e530d4b0ce26dc287",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.e7c885180b43fe0c4f2a26e7593309dc504f6cfd6155882e530d4b0ce26dc287",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 11,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 10,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.95e49dd1e623b753dc621379c6919b0e57e33608aeabfa47109510162fd41e05",
      "digest": "sha256:0807536309f43ba647b4511242b89c544c89e2b995ac046ff94ed786668043a3"
    }
  ]
}
```

# Specialist Integration Contract

Compilation: `sha256:6df1f8efc8d938b61f12c2fc6ce82bb5ded3ef10d34476a1c87f8fa63fd3dc79`

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
  "compilationDigest": "sha256:6df1f8efc8d938b61f12c2fc6ce82bb5ded3ef10d34476a1c87f8fa63fd3dc79",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 22,
  "assumptions": [
    {
      "id": "assumption.external-host-boundary",
      "statement": "Executable provenance, offline-cache provenance, process isolation, and hostile same-user resistance remain external-host duties.",
      "rationale": "Repository code can validate supplied boundaries but cannot enforce the host runtime."
    },
    {
      "id": "assumption.integration-owned-release",
      "statement": "Independent review, V11 refresh, candidate gate, R2, hosted CI, and merge remain integration-owner work.",
      "rationale": "The producer cannot approve its own release."
    },
    {
      "id": "assumption.private-config-identity",
      "statement": "Invocation-specific private config paths may vary while their containment policy and empty-file identities remain stable.",
      "rationale": "Stable reconstruction must bind security semantics without binding disposable absolute paths."
    },
    {
      "id": "assumption.snapshots-authoritative",
      "statement": "The immutable Revision 22 pre-edit snapshots are the only authoritative producer inputs for editable source.",
      "rationale": "Revision 21 demonstrated that a digest-only uncommitted intermediate cannot support a trusted launch."
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
    "evaluationSetDigest": "sha256:0262467e8bb577afb1e6ddd9dd5d32cc4e98c92e7ce7dc40239949ea57c1ea04"
  },
  "selectedCandidateId": "team.cc9f6fc9a3e86ee9f84d8f5f96532acb1d689f36614c7c8dd12b37dc50953860",
  "selectedMetrics": {
    "agentCount": 1,
    "projectedMakespan": 26,
    "peakConcurrency": 1,
    "conflictPairs": 0,
    "handoffCount": 0,
    "duplicatedContextBytes": 0,
    "duplicatedPermissionScopes": 0,
    "totalWorkWeight": 25,
    "totalStartupCost": 1,
    "totalHandoffCost": 0
  },
  "selectionReason": {
    "kind": "serial_selected",
    "decisiveField": "serial_baseline",
    "selectedValue": "team.cc9f6fc9a3e86ee9f84d8f5f96532acb1d689f36614c7c8dd12b37dc50953860",
    "serialValue": "team.cc9f6fc9a3e86ee9f84d8f5f96532acb1d689f36614c7c8dd12b37dc50953860",
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.cc9f6fc9a3e86ee9f84d8f5f96532acb1d689f36614c7c8dd12b37dc50953860",
    "eligible": true,
    "rejectionCodes": [],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 26,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 25,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.8f24670b544882730a1763ac030531997dba8400a9cc3c767eceeb1f7a96212d",
      "digest": "sha256:3eb52fd79c29dbbdb7c4be36032403e368995093449e1a8be039f74b8546e9e3"
    }
  ]
}
```

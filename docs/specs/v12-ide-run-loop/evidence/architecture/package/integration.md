# Specialist Integration Contract

Compilation: `sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415`

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
  "compilationDigest": "sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415",
  "goalId": "v12.ide-run-loop.architecture",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.caller-persistence",
      "statement": "The external host persists immutable JSON-serializable session values.",
      "rationale": "Core can remain deterministic and effect-free while runs remain restartable from caller-owned files."
    },
    {
      "id": "assumption.host-assisted",
      "statement": "V12 derives host instructions and evidence but performs no host runtime effect.",
      "rationale": "This is the smallest usable IDE-neutral layer over V11 without repeating the universal runtime coupling."
    },
    {
      "id": "assumption.single-package",
      "statement": "One V12 run binds one approved V11 specialist package.",
      "rationale": "Multi-package runtime graphs are unnecessary for the first usable run loop."
    }
  ],
  "unresolvedDecisions": [
    {
      "id": "decision.closeout-envelope",
      "question": "Which closeout facts can core derive without claiming host-owned tests, merge, persistence, or memory effects?",
      "owner": "codex.main",
      "blocking": false,
      "proceedRationale": "The architecture pass can compare bounded options before any public API is frozen."
    },
    {
      "id": "decision.operation-shape",
      "question": "What is the smallest public operation set for session creation, inspection, handoff acceptance, routing, and closeout?",
      "owner": "codex.main",
      "blocking": false,
      "proceedRationale": "Architecture specialists own a recommendation; implementation remains gated on integrated acceptance."
    }
  ],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 4,
    "evaluatedCandidates": 15,
    "eligibleCandidates": 15,
    "retainedAlternatives": 8,
    "evaluationSetDigest": "sha256:befb64d2cf78cff22a1e9b8ccd90cdf95d6e96ad863116a68cca8c51e9905ae1"
  },
  "selectedCandidateId": "team.00b2c4ec308f683d52e273ce7d5a575365ac2c2d378e85ac40b63b320c7ac71f",
  "selectedMetrics": {
    "agentCount": 4,
    "projectedMakespan": 15,
    "peakConcurrency": 3,
    "conflictPairs": 0,
    "handoffCount": 3,
    "duplicatedContextBytes": 250053,
    "duplicatedPermissionScopes": 21,
    "totalWorkWeight": 25,
    "totalStartupCost": 4,
    "totalHandoffCost": 3
  },
  "selectionReason": {
    "kind": "lower_metric",
    "decisiveField": "projectedMakespan",
    "selectedValue": 15,
    "serialValue": 26,
    "serialRejectionCodes": []
  },
  "serialBaseline": {
    "id": "team.b2ef80a9e156d9ec450f910f7cf1278e38fe02ae6c7865cde3d5fb3f1f4489d8",
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
        "agent.0b7518fefd7ec593e05d49ac346b223ea3c0ffbefbfdef745125a6a85a02b3a5",
        "agent.7873619e962938bde0ffb1ee68100343c480344ee324413e6b6194035253fe2f",
        "agent.855d25082db5af8f0d0049f54e53a11038d1ec56264f34e10e2097425f895486"
      ]
    },
    {
      "start": 9,
      "agentIds": [
        "agent.84c3e9a0333410efd25ecb0960a09d92e2d1010784fb24f0ffeecd81c8fc9145"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.0b7518fefd7ec593e05d49ac346b223ea3c0ffbefbfdef745125a6a85a02b3a5",
      "digest": "sha256:12a6287d940d22dfde9669e97403f5d498fb1f35dbbc4f54efd31f88ed4a2f28"
    },
    {
      "agentId": "agent.7873619e962938bde0ffb1ee68100343c480344ee324413e6b6194035253fe2f",
      "digest": "sha256:911a57f8c3af23c56739ed04483b63c36351c4f4f63b2fdc68b691ab06582bd9"
    },
    {
      "agentId": "agent.84c3e9a0333410efd25ecb0960a09d92e2d1010784fb24f0ffeecd81c8fc9145",
      "digest": "sha256:5f466ef8bbb3dfe36f9d52a2c47326af7233f9950ede16fb93f27bf35719c7c4"
    },
    {
      "agentId": "agent.855d25082db5af8f0d0049f54e53a11038d1ec56264f34e10e2097425f895486",
      "digest": "sha256:fcb9a6a04f0ce2e5f524daa38ac817a5332534ce23a737ca5d66217dcd0ee06b"
    }
  ]
}
```

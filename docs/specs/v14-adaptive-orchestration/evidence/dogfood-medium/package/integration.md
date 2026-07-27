# Specialist Integration Contract

Compilation: `sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9`

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
  "compilationDigest": "sha256:76349da2c25d1f8160d30dbb5b2b9de61582f24d511765a1c9cbb738749741f9",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 1,
  "assumptions": [
    {
      "id": "assumption.host-skill",
      "statement": "The Codex Desktop host can deliver the installed in-app browser skill to the integration agent.",
      "rationale": "The current host exposes skill items and the browser skill is installed."
    },
    {
      "id": "assumption.owner-boundary",
      "statement": "The main IDE agent remains the sole release and memory owner after independent review.",
      "rationale": "Native specialists have bounded implementation or read-only review authority."
    },
    {
      "id": "assumption.product-choice",
      "statement": "Impact Planner is the medium task selected to exercise graph semantics, safe data exchange, interface work, dependency fan-in, and independent review.",
      "rationale": "Its modules are independently implementable but require a real dependency-bound integration wave."
    }
  ],
  "unresolvedDecisions": [],
  "search": {
    "mode": "exact",
    "claim": "exhaustive_partition_search_fixed_scheduler",
    "workUnitCount": 5,
    "evaluatedCandidates": 52,
    "eligibleCandidates": 15,
    "retainedAlternatives": 8,
    "evaluationSetDigest": "sha256:74d4b9fa1da1028bf4cfe3283b8f2eff6969836105bb3ec0f84a1c57aab4a5a8"
  },
  "selectedCandidateId": "team.ab364ab84deeff1ac9bc988bfeac517d1424b37a15be1aa865a7ad7a50bd9b03",
  "selectedMetrics": {
    "agentCount": 5,
    "projectedMakespan": 24,
    "peakConcurrency": 3,
    "conflictPairs": 7,
    "handoffCount": 4,
    "duplicatedContextBytes": 149141,
    "duplicatedPermissionScopes": 37,
    "totalWorkWeight": 31,
    "totalStartupCost": 5,
    "totalHandoffCost": 4
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
    "id": "team.da489f7d7ece20c7df8f244136f4542c8b8f92cd7dc001e1c195a6fd81f74b57",
    "eligible": false,
    "rejectionCodes": [
      "evidence_independence"
    ],
    "metrics": {
      "agentCount": 1,
      "projectedMakespan": 32,
      "peakConcurrency": 1,
      "conflictPairs": 0,
      "handoffCount": 0,
      "duplicatedContextBytes": 0,
      "duplicatedPermissionScopes": 0,
      "totalWorkWeight": 31,
      "totalStartupCost": 1,
      "totalHandoffCost": 0
    }
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.07613e646cfa8543c304a420d97456c1bcd0b0ca1c7387fe9bce0949b6961f00",
        "agent.38e222c902c45d5719849945570fcf6ca6f293434f31bcb0722fba0fb6c3d975",
        "agent.9150f32977cbe68915155d99b73818003d6d1d1540bb7f6d8b5e409011d882b5"
      ]
    },
    {
      "start": 10,
      "agentIds": [
        "agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a"
      ]
    },
    {
      "start": 19,
      "agentIds": [
        "agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf"
      ]
    }
  ],
  "blueprintDigests": [
    {
      "agentId": "agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a",
      "digest": "sha256:38a4d264698e6726b0ee5c478736ba0e24f23c4755a027f157a7703eabe8eb92"
    },
    {
      "agentId": "agent.07613e646cfa8543c304a420d97456c1bcd0b0ca1c7387fe9bce0949b6961f00",
      "digest": "sha256:38a4b7a0a353554a919890565157d1e9df46c4dd9e3167e2738facfbd70e5974"
    },
    {
      "agentId": "agent.38e222c902c45d5719849945570fcf6ca6f293434f31bcb0722fba0fb6c3d975",
      "digest": "sha256:776c871f6a04c47ea2a7a737d4e9bc214af672b74849cc504a11b4e9cc5c661c"
    },
    {
      "agentId": "agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf",
      "digest": "sha256:8e7b39fbd6667a60028635127fd5deb7bda962a93510853235e830acfbd523c1"
    },
    {
      "agentId": "agent.9150f32977cbe68915155d99b73818003d6d1d1540bb7f6d8b5e409011d882b5",
      "digest": "sha256:e26ba470db59115a43cac0bdf7dbdfed4130f857c48ae57339abbf26ae374622"
    }
  ]
}
```

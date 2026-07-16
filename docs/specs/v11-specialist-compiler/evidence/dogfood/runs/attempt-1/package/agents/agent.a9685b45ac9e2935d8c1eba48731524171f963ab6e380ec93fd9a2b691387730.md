# Specialist Contract: agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730

Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`
Blueprint: `sha256:3958352c0ea7a83d5a15790ab854e1e89592a94f5bcc8e0979b4520389a5a933`

This is the exact provider-neutral task contract approved for this specialist. A host may translate it into runtime-specific instructions, but it must not widen authority, add work, omit evidence, or change the handoff.

## Operating Rules

1. Verify every delivered context item against its declared digest and byte count before using it.
2. Work only on the listed work units, Modules, scopes, capabilities, and permissions.
3. Respect agent dependencies and stop when a stop condition or undeclared decision is reached.
4. Produce every assigned evidence duty and every required handoff field.
5. Report assumptions, risks, failed attempts, and follow-up work; do not silently expand scope.

## Blueprint

```json
{
  "apiVersion": "swecircuit/specialist/v1alpha1",
  "kind": "AgentBlueprint",
  "id": "agent.a9685b45ac9e2935d8c1eba48731524171f963ab6e380ec93fd9a2b691387730",
  "goalId": "v11.specialist-compiler.release",
  "goalRevision": 1,
  "goalDigest": "sha256:325b614ef60ec1260576c8ac42a5d780a9d132cdac3f1a730f89c39619db76c5",
  "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
  "workUnitIds": [
    "prepare.candidate"
  ],
  "objectives": [
    {
      "workUnitId": "prepare.candidate",
      "objective": "Confirm the reviewed product, algorithm, and security sources match their declared content digests before independent review."
    }
  ],
  "modules": [
    {
      "id": "review.prepare",
      "action": "Bind one immutable review candidate to exact source evidence.",
      "inputPorts": [
        {
          "name": "sources",
          "artifactType": "CandidateSources"
        }
      ],
      "outputPorts": [
        {
          "name": "candidate",
          "artifactType": "ReviewCandidate"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.compiler-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
      "digest": "sha256:7bd0d06125648e32e26f7671b23e6cfffff640fdbcc903ce26e94298f76d1721",
      "bytes": 23352,
      "purposes": [
        "Bind the normative compiler contract."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v11-specialist-compiler/spec.md",
      "digest": "sha256:2730c21ed7681b7d6d766cae72ff4159b2bf308d860a0dc45ea100044f02ecb0",
      "bytes": 8132,
      "purposes": [
        "Bind the product acceptance contract."
      ],
      "workUnitIds": [
        "prepare.candidate"
      ],
      "readScope": "docs/specs/v11-specialist-compiler/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "candidate.bind"
    ],
    "scope": {
      "read": [
        "docs/specs/v11-specialist-compiler/spec.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v11-specialist-compiler/spec.md",
          "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access a network or provider.",
      "Do not execute or dispatch runtime agents from core.",
      "Do not merge or update durable memory before integration review.",
      "Do not widen reviewed filesystem authority."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.algorithm",
      "criterion": "Candidate construction, scheduling, selection, and digest semantics are deterministic and accurately claimed.",
      "requirementId": "evidence.algorithm-candidate",
      "kind": "digest",
      "duty": "produce",
      "description": "Content-addressed algorithm and test candidate sources.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.product-api",
      "criterion": "The V11 product and public API match the owner goal and remain IDE, model, and provider neutral.",
      "requirementId": "evidence.product-candidate",
      "kind": "digest",
      "duty": "produce",
      "description": "Content-addressed product and API candidate sources.",
      "independentFromProducer": false
    },
    {
      "criterionId": "criterion.security-trace",
      "criterion": "Authority, context, privacy, rendering, and trace bindings fail closed.",
      "requirementId": "evidence.security-candidate",
      "kind": "digest",
      "duty": "produce",
      "description": "Content-addressed security and trace candidate sources.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "v11.integration-owner",
    "artifacts": [
      "review-candidate-digests.json"
    ],
    "requiredFields": [
      "summary",
      "workUnitsCompleted",
      "artifacts",
      "evidence",
      "assumptions",
      "risks",
      "followUps"
    ]
  },
  "stopConditions": [
    "Stop if any declared source digest or byte count does not match."
  ],
  "contentDigest": "sha256:3958352c0ea7a83d5a15790ab854e1e89592a94f5bcc8e0979b4520389a5a933"
}
```

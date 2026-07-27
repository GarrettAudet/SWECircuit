# Specialist Contract: agent.fe1abacce8e8c4dbed4fd9ee95a6f0c2be8ddaab69ee0ba25b7e1df7590cdbf3

Compilation: `sha256:256d6b31b1a6301240230a6a0ee606a30682caeb02e45e24c53edf334d283b82`
Blueprint: `sha256:5455e7b69c4fb177b3ddc3d31f8acfbc3c33a6e62cea04a5191c58d3210699fa`

This is the exact provider-neutral task contract approved for this specialist. A host may translate it into runtime-specific instructions, but it must not widen authority, add work, omit evidence, or change the handoff.

## Operating Rules

1. Verify every delivered context item against its declared raw SHA-256 digest and byte count before using it.
2. Work only on the listed work units, Modules, scopes, capabilities, and permissions.
3. Respect agent dependencies and stop when a stop condition or undeclared decision is reached.
4. Produce every assigned evidence duty and every required handoff field.
5. Report assumptions, risks, failed attempts, and follow-up work; do not silently expand scope.

Manifest file digests use standard SHA-256 over the exact file bytes. Compilation, blueprint, manifest, and package identities are SWECircuit domain-separated digests and must be verified through the package verifier or another implementation of the published contract.

## Blueprint

```json
{
  "apiVersion": "swecircuit/specialist/v1alpha1",
  "kind": "AgentBlueprint",
  "id": "agent.fe1abacce8e8c4dbed4fd9ee95a6f0c2be8ddaab69ee0ba25b7e1df7590cdbf3",
  "goalId": "v13.dogfood.triage-board",
  "goalRevision": 1,
  "goalDigest": "sha256:e242f31b9c539806d821c561c6ddb68cb98ca208fbcc6d3f766df0f2adbabddf",
  "candidateId": "team.b19b74e061af1d40f2da6dd491132d9c75b82f2594977c30fdf62ae59c481751",
  "workUnitIds": [
    "review.application"
  ],
  "objectives": [
    {
      "workUnitId": "review.application",
      "objective": "Independently review the complete application for correctness, accessibility, scope, and evidence gaps."
    }
  ],
  "modules": [
    {
      "id": "dogfood.review",
      "action": "Review the integrated application and test evidence without modifying producer outputs.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "IntegratedTriageBoard"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "IndependentApplicationReview"
        }
      ]
    }
  ],
  "dependencies": [
    "agent.3d688f99658a89b95473b010617ce56bbff4e5bafb0c9f2d9580f842a52496ef"
  ],
  "contextUses": [
    {
      "sourceId": "context.v13-app-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v13-dogfood-validation/app-contract.md",
      "digest": "sha256:7de25a4a431f9ecc67628c3fc84723da4d9f8ca1266c06e7cc65752cb63b02c6",
      "bytes": 2466,
      "purposes": [
        "Respect the approved module, schema, scope, and verification contract."
      ],
      "workUnitIds": [
        "review.application"
      ],
      "readScope": "docs/specs/v13-dogfood-validation/app-contract.md"
    },
    {
      "sourceId": "context.v13-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v13-dogfood-validation/spec.md",
      "digest": "sha256:7874343e2b81af39e7b26777a22152d1fb7a26b4faa8da939f48fa7acdbc9e69",
      "bytes": 4048,
      "purposes": [
        "Implement or verify the exact accepted product behavior."
      ],
      "workUnitIds": [
        "review.application"
      ],
      "readScope": "docs/specs/v13-dogfood-validation/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "review.application-quality"
    ],
    "scope": {
      "read": [
        "docs/specs/v13-dogfood-validation/app-contract.md",
        "docs/specs/v13-dogfood-validation/spec.md",
        "examples/triage-board/README.md",
        "examples/triage-board/index.html",
        "examples/triage-board/package.json",
        "examples/triage-board/server.mjs",
        "examples/triage-board/src/app.js",
        "examples/triage-board/src/model.js",
        "examples/triage-board/src/storage.js",
        "examples/triage-board/styles.css",
        "examples/triage-board/test/model.test.mjs",
        "examples/triage-board/test/storage.test.mjs"
      ],
      "write": [
        "docs/specs/v13-dogfood-validation/evidence/orchestration/handoffs/review-application.json"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v13-dogfood-validation/app-contract.md",
          "docs/specs/v13-dogfood-validation/spec.md",
          "examples/triage-board/README.md",
          "examples/triage-board/index.html",
          "examples/triage-board/package.json",
          "examples/triage-board/server.mjs",
          "examples/triage-board/src/app.js",
          "examples/triage-board/src/model.js",
          "examples/triage-board/src/storage.js",
          "examples/triage-board/styles.css",
          "examples/triage-board/test/model.test.mjs",
          "examples/triage-board/test/storage.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/specs/v13-dogfood-validation/evidence/orchestration/handoffs/review-application.json"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access a network, secret, external service, or undeclared repository path.",
      "Do not change the product specification or application contract.",
      "Do not install dependencies, mutate Git, merge, or update durable memory."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.integrated-quality",
      "criterion": "The integrated application is tested and independently reviewed.",
      "requirementId": "evidence.integration.review",
      "kind": "review",
      "duty": "review",
      "description": "Independently review the complete integrated application and execution evidence.",
      "independentFromProducer": true
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "review-evidence.md"
    ],
    "requiredFields": [
      "apiVersion",
      "kind",
      "outcome",
      "destination",
      "goal",
      "agent",
      "compilationDigest",
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
    "Return a non-pass workflow outcome when required evidence cannot be produced.",
    "Stop before reading, writing, installing, or executing anything outside declared authority.",
    "Stop if the requested behavior conflicts with the bound product or application contract."
  ],
  "contentDigest": "sha256:5455e7b69c4fb177b3ddc3d31f8acfbc3c33a6e62cea04a5191c58d3210699fa"
}
```

## Required Handoff Envelope

Return one strict UTF-8 JSON object with exactly the shape below. Replace the summary and artifact content, but do not add keys or substitute the blueprint evidence-duty shape.

- Artifact content is always a string, including for application/json.
- Evidence entries contain exactly criterionId, requirementId, kind, duty, status, and artifact.
- A pass must list every owned work unit, exact artifact name, and exact evidence duty. A non-pass outcome lists only work actually completed and preserves bounded failure evidence.
- If a stop condition explicitly requires a stricter custom envelope, the host must provide that closed schema; it must retain the standard goal, agent, compilation, artifact, evidence, and outcome bindings shown here.

```json
{
  "apiVersion": "swecircuit/specialist/v1alpha1",
  "kind": "SpecialistAgentHandoff",
  "outcome": "pass",
  "destination": "codex.main",
  "goal": {
    "id": "v13.dogfood.triage-board",
    "revision": 1,
    "digest": "sha256:e242f31b9c539806d821c561c6ddb68cb98ca208fbcc6d3f766df0f2adbabddf"
  },
  "agent": {
    "id": "agent.fe1abacce8e8c4dbed4fd9ee95a6f0c2be8ddaab69ee0ba25b7e1df7590cdbf3",
    "blueprintDigest": "sha256:5455e7b69c4fb177b3ddc3d31f8acfbc3c33a6e62cea04a5191c58d3210699fa"
  },
  "compilationDigest": "sha256:256d6b31b1a6301240230a6a0ee606a30682caeb02e45e24c53edf334d283b82",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.application"
  ],
  "artifacts": [
    {
      "name": "review-evidence.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.integrated-quality",
      "requirementId": "evidence.integration.review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "review-evidence.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```

# Specialist Contract: agent.6ade2b5b3ca26785a1fc3eafb7ac86503669e018976b9555528aee6489341136

Compilation: `sha256:95b42f6d89a7e882d917d8e15c00aef13cd8246b652647be5a6983ffea470494`
Blueprint: `sha256:356e0a4052827f82c89d2f34c4fda8d97036bdb1ce603a515b4d4a5715c1aaba`

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
  "id": "agent.6ade2b5b3ca26785a1fc3eafb7ac86503669e018976b9555528aee6489341136",
  "goalId": "v14.dogfood.impact-planner",
  "goalRevision": 4,
  "goalDigest": "sha256:288d225158594799926f3caf92f4d18a2dd62efbccbc920a614827c32d4994df",
  "candidateId": "team.925acbb1de6b014f4dca19b61305f2161591d3f263127b98412f3293e6340e88",
  "workUnitIds": [
    "fix.changed-row-accessibility"
  ],
  "objectives": [
    {
      "workUnitId": "fix.changed-row-accessibility",
      "objective": "Align the runtime changed-component row class with the accessible stylesheet and lock it with a regression test."
    }
  ],
  "modules": [
    {
      "id": "fix.changed-row-accessibility",
      "action": "Replace changed-row with changed-item, add a focused source/CSS binding assertion, and run all app tests and syntax checks.",
      "inputPorts": [
        {
          "name": "finding",
          "artifactType": "ImpactPlannerReviewFinding"
        }
      ],
      "outputPorts": [
        {
          "name": "handoff",
          "artifactType": "impact-accessibility-fix.md"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agent-contract",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:1cbe95ee56ea68da0e9a3dbddae0fc0120baf83c5594a91e8853d0c5bd5d569b",
      "bytes": 18686,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.app-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
      "digest": "sha256:beed1bb15cce64e9bb1d585c20a6863b359d4fe1e886c1101f8a8c11251afe72",
      "bytes": 5191,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md"
    },
    {
      "sourceId": "context.app-source",
      "kind": "repository",
      "locator": "path:examples/impact-planner/src/app.js",
      "digest": "sha256:d223d0e29c3a84eeb79dc600e5df4cabccd184db0f50193237ca84a1f565327e",
      "bytes": 14039,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "examples/impact-planner/src/app.js"
    },
    {
      "sourceId": "context.integration-tests",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/integration.test.mjs",
      "digest": "sha256:aeef0c8a26f9ab6c87f41848bc84f369e1047e4ac1d502c20d1984b2802856e9",
      "bytes": 4266,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "examples/impact-planner/test/integration.test.mjs"
    },
    {
      "sourceId": "context.interface-tests",
      "kind": "repository",
      "locator": "path:examples/impact-planner/test/interface.test.mjs",
      "digest": "sha256:f1214d4792a64d06cb3c8f4d61689afc7ac64911906bfa9009fb759cbb457639",
      "bytes": 1659,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "examples/impact-planner/test/interface.test.mjs"
    },
    {
      "sourceId": "context.predecessor",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/predecessor.json",
      "digest": "sha256:a4ab00c2113c95fd0f0f2f76bb27ccfa86a633e13bdd3ad67f4cf0ca1e42df1b",
      "bytes": 1188,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/predecessor.json"
    },
    {
      "sourceId": "context.recovery-goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/goal.md",
      "digest": "sha256:f9e408e61368186342656cbb1956ba05b7b337953027306245f15c8d34b35818",
      "bytes": 1450,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/goal.md"
    },
    {
      "sourceId": "context.review-finding",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json",
      "digest": "sha256:3096f002e23b9b59b2a0f7fce998b7fb542d566fffffc29917e282ab30d0dd3c",
      "bytes": 5668,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json"
    },
    {
      "sourceId": "context.styles",
      "kind": "repository",
      "locator": "path:examples/impact-planner/styles.css",
      "digest": "sha256:91977a2fdaaabe76c0fb6c7fd55ec9ddd8373318b1f443e648809d8d74587a5d",
      "bytes": 8111,
      "purposes": [
        "Apply and verify the exact reviewed accessibility correction."
      ],
      "workUnitIds": [
        "fix.changed-row-accessibility"
      ],
      "readScope": "examples/impact-planner/styles.css"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "repair.impact-planner-accessibility"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/goal.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/predecessor.json",
        "examples/impact-planner/src/app.js",
        "examples/impact-planner/styles.css",
        "examples/impact-planner/test/integration.test.mjs",
        "examples/impact-planner/test/interface.test.mjs"
      ],
      "write": [
        "examples/impact-planner/src/app.js",
        "examples/impact-planner/test/integration.test.mjs"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/app-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r3/handoffs/review-raw.json",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/goal.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-medium/recovery-r4/predecessor.json",
          "examples/impact-planner/src/app.js",
          "examples/impact-planner/styles.css",
          "examples/impact-planner/test/integration.test.mjs",
          "examples/impact-planner/test/interface.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "examples/impact-planner/src/app.js",
          "examples/impact-planner/test/integration.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "node",
          "npm.cmd",
          "rg"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access the network, secrets, external services, or undeclared paths.",
      "Do not install dependencies, mutate Git, merge, update memory, or alter styles.",
      "Do not modify files outside app.js and integration.test.mjs."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.changed-row-binding",
      "criterion": "Runtime change-set rows use the exact accessible stylesheet class and focused regression coverage prevents drift.",
      "requirementId": "evidence.changed-row-fix.produce",
      "kind": "test",
      "duty": "produce",
      "description": "Apply the exact class correction, add the runtime-to-stylesheet binding assertion, and pass the complete app suite.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "impact-accessibility-fix.md"
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
    "Do not modify files outside the declared write scope.",
    "Do not weaken or remove existing tests.",
    "Return non-pass if the focused assertion or complete suite does not pass."
  ],
  "contentDigest": "sha256:356e0a4052827f82c89d2f34c4fda8d97036bdb1ce603a515b4d4a5715c1aaba"
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
    "id": "v14.dogfood.impact-planner",
    "revision": 4,
    "digest": "sha256:288d225158594799926f3caf92f4d18a2dd62efbccbc920a614827c32d4994df"
  },
  "agent": {
    "id": "agent.6ade2b5b3ca26785a1fc3eafb7ac86503669e018976b9555528aee6489341136",
    "blueprintDigest": "sha256:356e0a4052827f82c89d2f34c4fda8d97036bdb1ce603a515b4d4a5715c1aaba"
  },
  "compilationDigest": "sha256:95b42f6d89a7e882d917d8e15c00aef13cd8246b652647be5a6983ffea470494",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.changed-row-accessibility"
  ],
  "artifacts": [
    {
      "name": "impact-accessibility-fix.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.changed-row-binding",
      "requirementId": "evidence.changed-row-fix.produce",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "impact-accessibility-fix.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```

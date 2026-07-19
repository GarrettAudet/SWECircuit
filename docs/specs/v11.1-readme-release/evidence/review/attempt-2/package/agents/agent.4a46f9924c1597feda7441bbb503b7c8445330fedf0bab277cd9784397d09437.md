# Specialist Contract: agent.4a46f9924c1597feda7441bbb503b7c8445330fedf0bab277cd9784397d09437

Compilation: `sha256:b8179d2e86be0f8e2d9de5bbaf2b14fa77c53c4c2ce07ed966a22c0f8f93a5e6`
Blueprint: `sha256:21d37fb2c6e3ccdffbf393dffee3eb2abb58323352aa3898c7fb4159e37701fb`

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
  "id": "agent.4a46f9924c1597feda7441bbb503b7c8445330fedf0bab277cd9784397d09437",
  "goalId": "v11.1.readme-release-review",
  "goalRevision": 2,
  "goalDigest": "sha256:61bc6acf808998c6ae773481dfae551d2b0e6b17fdf2755dfc3624b910daad02",
  "candidateId": "team.2077ab2a9679e183beebc81946f8640a8f31a8fa2ce3613775c5729d54195571",
  "workUnitIds": [
    "review.visual"
  ],
  "objectives": [
    {
      "workUnitId": "review.visual",
      "objective": "Judge whether the README GIF communicates the SWECircuit concept clearly at first read and remains legible when scaled."
    }
  ],
  "modules": [
    {
      "id": "review.visual-clarity",
      "action": "Inspect the opening, parallel, and complete visual states plus adjacent README prose; report only actionable clarity findings.",
      "inputPorts": [
        {
          "name": "candidate",
          "artifactType": "FrozenPublicSurface"
        }
      ],
      "outputPorts": [
        {
          "name": "review",
          "artifactType": "ReviewEvidence"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.generator",
      "kind": "repository",
      "locator": "path:docs/assets/source/generate-swecircuit-flow-gif.py",
      "digest": "sha256:3418ad3060593601371a5ec5d7389da2a170952e9cced3c9557fdb1f47b85a37",
      "bytes": 12933,
      "purposes": [
        "Review the exact frozen public candidate."
      ],
      "workUnitIds": [
        "review.visual"
      ],
      "readScope": "docs/assets/source/generate-swecircuit-flow-gif.py"
    },
    {
      "sourceId": "context.readme",
      "kind": "repository",
      "locator": "path:README.md",
      "digest": "sha256:5f1de5c6204e98559a4c118dd3d19d5fec1bc8d9179590e60293a571605b4867",
      "bytes": 2900,
      "purposes": [
        "Review the exact frozen public candidate."
      ],
      "workUnitIds": [
        "review.visual"
      ],
      "readScope": "README.md"
    },
    {
      "sourceId": "context.workflow-gif",
      "kind": "repository",
      "locator": "path:docs/assets/swecircuit-flow.gif",
      "digest": "sha256:519585ef77a34f0b7faa5b122f4b8ebc759525f0de6f25e2243ffb387735cc20",
      "bytes": 1024955,
      "purposes": [
        "Review the exact frozen public candidate."
      ],
      "workUnitIds": [
        "review.visual"
      ],
      "readScope": "docs/assets/swecircuit-flow.gif"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "analyze.visual-flow"
    ],
    "scope": {
      "read": [
        "README.md",
        "docs/assets/source/generate-swecircuit-flow-gif.py",
        "docs/assets/swecircuit-flow.gif"
      ],
      "write": [],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "README.md",
          "docs/assets/source/generate-swecircuit-flow-gif.py",
          "docs/assets/swecircuit-flow.gif"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not write files, access the network, launch another agent, or change the candidate."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.visual-clarity",
      "criterion": "The primary visual explains modules, host-run parallel specialists, verified fan-in, integration, trace, and memory without overlap or ambiguity.",
      "requirementId": "evidence.visual-review",
      "kind": "review",
      "duty": "produce",
      "description": "Preserve an independent visual-comprehension verdict.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "visual-clarity-review.json"
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
    "Do not modify repository files.",
    "Stop if a declared source is unavailable or does not match its bound digest."
  ],
  "contentDigest": "sha256:21d37fb2c6e3ccdffbf393dffee3eb2abb58323352aa3898c7fb4159e37701fb"
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
    "id": "v11.1.readme-release-review",
    "revision": 2,
    "digest": "sha256:61bc6acf808998c6ae773481dfae551d2b0e6b17fdf2755dfc3624b910daad02"
  },
  "agent": {
    "id": "agent.4a46f9924c1597feda7441bbb503b7c8445330fedf0bab277cd9784397d09437",
    "blueprintDigest": "sha256:21d37fb2c6e3ccdffbf393dffee3eb2abb58323352aa3898c7fb4159e37701fb"
  },
  "compilationDigest": "sha256:b8179d2e86be0f8e2d9de5bbaf2b14fa77c53c4c2ce07ed966a22c0f8f93a5e6",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "review.visual"
  ],
  "artifacts": [
    {
      "name": "visual-clarity-review.json",
      "mediaType": "application/json",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.visual-clarity",
      "requirementId": "evidence.visual-review",
      "kind": "review",
      "duty": "produce",
      "status": "pass",
      "artifact": "visual-clarity-review.json"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```

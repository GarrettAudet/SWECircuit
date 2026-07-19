# Specialist Contract: agent.4a46f9924c1597feda7441bbb503b7c8445330fedf0bab277cd9784397d09437

Compilation: `sha256:571b1b4e57401ab25b92e7973ef298d287f3175a68f6363f56177ea90b46f135`
Blueprint: `sha256:dd177b4e846ed1ed649de967860c492daa7f00f45b019e6907ffd21f90acf58f`

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
  "goalRevision": 5,
  "goalDigest": "sha256:7ed6b1a80f0e07218881697f2eaff44776b1a18e8f1a9a9e19dcf89d0de364d7",
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
      "digest": "sha256:03e4350eac22235d778117fddd865130aeeab0a88261d27179474619b3b27798",
      "bytes": 12805,
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
      "digest": "sha256:6870ce77e4a29a000ff8a8a170d968a735fb339cfac7d412b23080cfc61163dc",
      "bytes": 3101,
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
      "digest": "sha256:90b627c4e3b116d98b49dea34eeabd5e4d69718c60fb583d2d3b792fdfd98483",
      "bytes": 913700,
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
  "contentDigest": "sha256:dd177b4e846ed1ed649de967860c492daa7f00f45b019e6907ffd21f90acf58f"
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
    "revision": 5,
    "digest": "sha256:7ed6b1a80f0e07218881697f2eaff44776b1a18e8f1a9a9e19dcf89d0de364d7"
  },
  "agent": {
    "id": "agent.4a46f9924c1597feda7441bbb503b7c8445330fedf0bab277cd9784397d09437",
    "blueprintDigest": "sha256:dd177b4e846ed1ed649de967860c492daa7f00f45b019e6907ffd21f90acf58f"
  },
  "compilationDigest": "sha256:571b1b4e57401ab25b92e7973ef298d287f3175a68f6363f56177ea90b46f135",
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

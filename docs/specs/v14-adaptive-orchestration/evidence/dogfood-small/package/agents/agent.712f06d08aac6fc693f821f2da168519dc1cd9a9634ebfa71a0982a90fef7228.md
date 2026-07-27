# Specialist Contract: agent.712f06d08aac6fc693f821f2da168519dc1cd9a9634ebfa71a0982a90fef7228

Compilation: `sha256:f4f4e91fc1fc8ea2b4cf52256395fa4e15b109cc5ebd4f8bc690c408c4b5eb7e`
Blueprint: `sha256:c7651a7bae7183610fe411cb06dfc24c0c0e91edbb6fe9da553bb55f08d3bf76`

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
  "id": "agent.712f06d08aac6fc693f821f2da168519dc1cd9a9634ebfa71a0982a90fef7228",
  "goalId": "v14.dogfood.release-board",
  "goalRevision": 1,
  "goalDigest": "sha256:17b787892abba5429003d87548bf40eb8715078f5636e55b46998d13cd959c0f",
  "candidateId": "team.c773f72cc9ded5b29f24db957e26f65e4f24ed5c56ec9c24e1ee89f7d5c6c13a",
  "workUnitIds": [
    "implement.release-board-interface"
  ],
  "objectives": [
    {
      "workUnitId": "implement.release-board-interface",
      "objective": "Implement the complete semantic and responsive Release Board HTML and CSS interface without application state."
    }
  ],
  "modules": [
    {
      "id": "implement.release-board-interface",
      "action": "Create the required form, summary, filters, list, template, live region, responsive layout, and visible focus states.",
      "inputPorts": [
        {
          "name": "contract",
          "artifactType": "ReleaseBoardContract"
        }
      ],
      "outputPorts": [
        {
          "name": "implementation",
          "artifactType": "release-board-interface-handoff.md"
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
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-interface"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.app-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md",
      "digest": "sha256:557460d42eea3249124db49071128638fc28a6039c8b9208cf5427419ee58a50",
      "bytes": 2437,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-interface"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md"
    },
    {
      "sourceId": "context.goal",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md",
      "digest": "sha256:d92824a12e2f47dfcd441c6711bef71330a8fe2e5e39bb6c75b274e2fe610777",
      "bytes": 1610,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-interface"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md"
    },
    {
      "sourceId": "context.interface-pattern",
      "kind": "repository",
      "locator": "path:examples/triage-board/index.html",
      "digest": "sha256:ed5b1954785578b744f6782f7586553f5d9b6bcebfa93abee395a9a33b3da1ce",
      "bytes": 7712,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-interface"
      ],
      "readScope": "examples/triage-board/index.html"
    },
    {
      "sourceId": "context.style-pattern",
      "kind": "repository",
      "locator": "path:examples/triage-board/styles.css",
      "digest": "sha256:c3bce35a60880b228b2ef2ab19ac9c7c7e21da50d6d8372e1b8810a3548adadc",
      "bytes": 12232,
      "purposes": [
        "Produce one disjoint Release Board module."
      ],
      "workUnitIds": [
        "implement.release-board-interface"
      ],
      "readScope": "examples/triage-board/styles.css"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.release-board-interface"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md",
        "examples/triage-board/index.html",
        "examples/triage-board/styles.css"
      ],
      "write": [
        "examples/release-board/index.html",
        "examples/release-board/styles.css"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md",
          "examples/triage-board/index.html",
          "examples/triage-board/styles.css"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "examples/release-board/index.html",
          "examples/release-board/styles.css"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access the network, secrets, external services, or undeclared repository paths.",
      "Do not install dependencies, mutate Git, launch descendants, integrate, merge, or update memory."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.interface",
      "criterion": "A semantic responsive interface exposes every required control, state region, focus treatment, and integration hook without application state.",
      "requirementId": "evidence.interface.artifact",
      "kind": "artifact",
      "duty": "produce",
      "description": "Produce the complete static HTML and CSS interface module.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "release-board-interface-handoff.md"
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
    "Do not access the network, install dependencies, mutate Git, merge, or update memory.",
    "Do not claim browser behavior that was not observed.",
    "Do not modify files outside the declared write scope.",
    "Return non-pass when the assigned artifact cannot be produced and verified.",
    "Stop if the product goal conflicts with the application contract."
  ],
  "contentDigest": "sha256:c7651a7bae7183610fe411cb06dfc24c0c0e91edbb6fe9da553bb55f08d3bf76"
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
    "id": "v14.dogfood.release-board",
    "revision": 1,
    "digest": "sha256:17b787892abba5429003d87548bf40eb8715078f5636e55b46998d13cd959c0f"
  },
  "agent": {
    "id": "agent.712f06d08aac6fc693f821f2da168519dc1cd9a9634ebfa71a0982a90fef7228",
    "blueprintDigest": "sha256:c7651a7bae7183610fe411cb06dfc24c0c0e91edbb6fe9da553bb55f08d3bf76"
  },
  "compilationDigest": "sha256:f4f4e91fc1fc8ea2b4cf52256395fa4e15b109cc5ebd4f8bc690c408c4b5eb7e",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.release-board-interface"
  ],
  "artifacts": [
    {
      "name": "release-board-interface-handoff.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.interface",
      "requirementId": "evidence.interface.artifact",
      "kind": "artifact",
      "duty": "produce",
      "status": "pass",
      "artifact": "release-board-interface-handoff.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```

# Specialist Contract: agent.73bec6d8f92dc546631e028dfe3d1f26c5dc5f37ff16200a77f024652265d8dd

Compilation: `sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614`
Blueprint: `sha256:53a863154b733ff2118aaf5e87282c064d8a5335f865f78953729c4b65a5db8c`

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
  "id": "agent.73bec6d8f92dc546631e028dfe3d1f26c5dc5f37ff16200a77f024652265d8dd",
  "goalId": "v14.adaptive-orchestration.vertical-slice",
  "goalRevision": 1,
  "goalDigest": "sha256:3d6f58596ed4a07b75469a13e4ef0c8088f85ac51b7d02fda27cd026b8155c9a",
  "candidateId": "team.43ca2714bb81573a11b7ed5e7b3d63c128bae774b17bb174483986576bebee67",
  "workUnitIds": [
    "implement.codex-adapter"
  ],
  "objectives": [
    {
      "workUnitId": "implement.codex-adapter",
      "objective": "Define the first usable Windows Codex Desktop adapter surface, examples, and visible host workflow for approved assignments."
    }
  ],
  "modules": [
    {
      "id": "implement.codex-adapter",
      "action": "Provide a small truthful adapter contract and examples for current model/effort inventory, native spawn translation, explicit unavailable bindings, status visibility, exact result capture, and no hidden fallback.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "V14Revision2Contract"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "codex-adapter-evidence.md"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.agents",
      "kind": "repository",
      "locator": "path:AGENTS.md",
      "digest": "sha256:a79c80765de711a00aea3787050ffa38bfda78812c925c73325e1a71acd369c9",
      "bytes": 16695,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.codex-adapter"
      ],
      "readScope": "AGENTS.md"
    },
    {
      "sourceId": "context.host-scan",
      "kind": "repository",
      "locator": "path:docs/research/snapshots/2026-07-27-adaptive-orchestration-host-scan.md",
      "digest": "sha256:867b77b3920f0936e458a41ce693712da65495deaa45665f26e461a4c15050f0",
      "bytes": 6636,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.codex-adapter"
      ],
      "readScope": "docs/research/snapshots/2026-07-27-adaptive-orchestration-host-scan.md"
    },
    {
      "sourceId": "context.ide-kickoff",
      "kind": "repository",
      "locator": "path:docs/ide/specialist-agent-kickoff.md",
      "digest": "sha256:9c321b526902503f845d96e9b20291f41c03a04d5df0098af33388815c03402c",
      "bytes": 22016,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.codex-adapter"
      ],
      "readScope": "docs/ide/specialist-agent-kickoff.md"
    },
    {
      "sourceId": "context.v14-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
      "digest": "sha256:bf8538b746a1b4c10ef3e2ee3528311cf3b9659cc6e450f2e93ba8887cd39b6a",
      "bytes": 39536,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.codex-adapter"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md"
    },
    {
      "sourceId": "context.v14-spec",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/spec.md",
      "digest": "sha256:fcf5d094f1494b6bd4edd7c5ce7ad8c2a8671f2533daae716aac6c39dedd1478",
      "bytes": 7229,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.codex-adapter"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "design.codex-host-adapter"
    ],
    "scope": {
      "read": [
        "AGENTS.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/research/snapshots/2026-07-27-adaptive-orchestration-host-scan.md",
        "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
        "docs/specs/v14-adaptive-orchestration/spec.md"
      ],
      "write": [
        "adapters/codex-desktop/README.md",
        "adapters/codex-desktop/inventory.example.json",
        "adapters/codex-desktop/policy.example.json",
        "docs/ide/codex-adaptive-run.md"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "AGENTS.md",
          "docs/ide/specialist-agent-kickoff.md",
          "docs/research/snapshots/2026-07-27-adaptive-orchestration-host-scan.md",
          "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
          "docs/specs/v14-adaptive-orchestration/spec.md"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "adapters/codex-desktop/README.md",
          "adapters/codex-desktop/inventory.example.json",
          "adapters/codex-desktop/policy.example.json",
          "docs/ide/codex-adaptive-run.md"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not access the network, secrets, external services, or undeclared repository paths.",
      "Do not install dependencies, mutate Git, merge, update milestones, or update durable memory."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.adapter",
      "criterion": "A Windows Codex Desktop adapter can translate approved assignments into visible native agent launches without hidden fallback.",
      "requirementId": "evidence.adapter.produce",
      "kind": "artifact",
      "duty": "produce",
      "description": "Produce the reference adapter contract, inventory, policy, and IDE guide.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "codex-adapter-evidence.md"
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
    "Do not install dependencies, access the network, mutate Git, merge, or update memory.",
    "Do not modify files outside the declared write scope.",
    "Return a non-pass outcome when required verification cannot be completed.",
    "Stop if the normative V14 contract conflicts with the existing V11 or V12 public boundary."
  ],
  "contentDigest": "sha256:53a863154b733ff2118aaf5e87282c064d8a5335f865f78953729c4b65a5db8c"
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
    "id": "v14.adaptive-orchestration.vertical-slice",
    "revision": 1,
    "digest": "sha256:3d6f58596ed4a07b75469a13e4ef0c8088f85ac51b7d02fda27cd026b8155c9a"
  },
  "agent": {
    "id": "agent.73bec6d8f92dc546631e028dfe3d1f26c5dc5f37ff16200a77f024652265d8dd",
    "blueprintDigest": "sha256:53a863154b733ff2118aaf5e87282c064d8a5335f865f78953729c4b65a5db8c"
  },
  "compilationDigest": "sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.codex-adapter"
  ],
  "artifacts": [
    {
      "name": "codex-adapter-evidence.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.adapter",
      "requirementId": "evidence.adapter.produce",
      "kind": "artifact",
      "duty": "produce",
      "status": "pass",
      "artifact": "codex-adapter-evidence.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```

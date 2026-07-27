# Specialist Contract: agent.40a1f03c545884055177cf4a6326f71f064dbbed0a4bcf90f6299ebb21242547

Compilation: `sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614`
Blueprint: `sha256:b63e68eb472da944096425062eda7ad7e65c9a5983a53be74de5d7ea6626e487`

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
  "id": "agent.40a1f03c545884055177cf4a6326f71f064dbbed0a4bcf90f6299ebb21242547",
  "goalId": "v14.adaptive-orchestration.vertical-slice",
  "goalRevision": 1,
  "goalDigest": "sha256:3d6f58596ed4a07b75469a13e4ef0c8088f85ac51b7d02fda27cd026b8155c9a",
  "candidateId": "team.43ca2714bb81573a11b7ed5e7b3d63c128bae774b17bb174483986576bebee67",
  "workUnitIds": [
    "implement.runtime-routing"
  ],
  "objectives": [
    {
      "workUnitId": "implement.runtime-routing",
      "objective": "Implement the closed provider-neutral runtime-routing types, strict schema, validation, demand derivation, row filtering, vector search, override, and verification operations."
    }
  ],
  "modules": [
    {
      "id": "implement.runtime-routing",
      "action": "Follow existing canonical JSON, snapshot, Ajv, diagnostics, limit, and OperationResult patterns; preserve V11/V12 APIs; implement only the routing portion of the normative V14 contract.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "V14Revision2Contract"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "runtime-routing-implementation.md"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.canonical-json",
      "kind": "repository",
      "locator": "path:src/canonical-json.ts",
      "digest": "sha256:6dfb9cb7f7c5be5755b370b82c5230c9e4d3c3a350e6fe0fef3948b1b03d42ac",
      "bytes": 7405,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "src/canonical-json.ts"
    },
    {
      "sourceId": "context.constants",
      "kind": "repository",
      "locator": "path:src/constants.ts",
      "digest": "sha256:2fded9c023b41dc58ad7b8471d9b3f7dbc5b4566c6fecbb6008829c1c5000b6a",
      "bytes": 2570,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "src/constants.ts"
    },
    {
      "sourceId": "context.diagnostics",
      "kind": "repository",
      "locator": "path:src/diagnostics.ts",
      "digest": "sha256:3d27fe071994a2a87a59ecadc52a788a6aaf85737b46371f5622bf10c50aede6",
      "bytes": 25190,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "src/diagnostics.ts"
    },
    {
      "sourceId": "context.index",
      "kind": "repository",
      "locator": "path:src/index.ts",
      "digest": "sha256:dad28ed18858c3c45ea25a41be953df4942370a1e13793eaecbf7b4570bd6d9f",
      "bytes": 5447,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "src/index.ts"
    },
    {
      "sourceId": "context.schema-data-pattern",
      "kind": "repository",
      "locator": "path:src/specialist-run-schema-data.ts",
      "digest": "sha256:a41ed770e2d250cde3fed83910ba0a099eb84ea1fc6f9142e91f6659a1cd0bc1",
      "bytes": 17463,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "src/specialist-run-schema-data.ts"
    },
    {
      "sourceId": "context.schema-pattern",
      "kind": "repository",
      "locator": "path:src/specialist-run-schema.ts",
      "digest": "sha256:db55d52355ec661a12e8e5c50981af0658ad1f9ef678f1c729882fa70024691d",
      "bytes": 3180,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "src/specialist-run-schema.ts"
    },
    {
      "sourceId": "context.specialist-compiler",
      "kind": "repository",
      "locator": "path:src/specialist-compiler.ts",
      "digest": "sha256:2a39a85745de2124464744c9635144e4e878cbea2f2b584ded25adb946798da7",
      "bytes": 69522,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "src/specialist-compiler.ts"
    },
    {
      "sourceId": "context.specialist-types",
      "kind": "repository",
      "locator": "path:src/specialist-types.ts",
      "digest": "sha256:f0f1384cdef06972e54800d6fd2c57f08b8ebe8a8703b9178e6c3fa78f53e934",
      "bytes": 16047,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "src/specialist-types.ts"
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
        "implement.runtime-routing"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md"
    },
    {
      "sourceId": "context.v14-r1",
      "kind": "repository",
      "locator": "path:docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md",
      "digest": "sha256:41df682065baa9ed9f3bba30d5947fcc6a8329664adb905e480d998f2ebfcd02",
      "bytes": 3384,
      "purposes": [
        "Implement or verify the exact V14 executable vertical slice."
      ],
      "workUnitIds": [
        "implement.runtime-routing"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md"
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
        "implement.runtime-routing"
      ],
      "readScope": "docs/specs/v14-adaptive-orchestration/spec.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "implement.deterministic-typescript-compiler"
    ],
    "scope": {
      "read": [
        "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
        "docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md",
        "docs/specs/v14-adaptive-orchestration/spec.md",
        "src/canonical-json.ts",
        "src/constants.ts",
        "src/diagnostics.ts",
        "src/index.ts",
        "src/specialist-compiler.ts",
        "src/specialist-run-schema-data.ts",
        "src/specialist-run-schema.ts",
        "src/specialist-types.ts"
      ],
      "write": [
        "schemas/v1alpha1/runtime-routing.schema.json",
        "src/runtime-routing-schema-data.ts",
        "src/runtime-routing-schema.ts",
        "src/runtime-routing-types.ts",
        "src/runtime-routing.ts"
      ],
      "conflictZones": []
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/specs/v14-adaptive-orchestration/adaptive-orchestration-contract.md",
          "docs/specs/v14-adaptive-orchestration/evidence/architecture/r1-review-summary.md",
          "docs/specs/v14-adaptive-orchestration/spec.md",
          "src/canonical-json.ts",
          "src/constants.ts",
          "src/diagnostics.ts",
          "src/index.ts",
          "src/specialist-compiler.ts",
          "src/specialist-run-schema-data.ts",
          "src/specialist-run-schema.ts",
          "src/specialist-types.ts"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "schemas/v1alpha1/runtime-routing.schema.json",
          "src/runtime-routing-schema-data.ts",
          "src/runtime-routing-schema.ts",
          "src/runtime-routing-types.ts",
          "src/runtime-routing.ts"
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
      "Do not access the network, secrets, external services, or undeclared repository paths.",
      "Do not install dependencies, mutate Git, merge, update milestones, or update durable memory."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.routing",
      "criterion": "The kernel deterministically derives demand, filters profile/effort rows, and selects a globally feasible least-cost assignment vector.",
      "requirementId": "evidence.routing.produce",
      "kind": "artifact",
      "duty": "produce",
      "description": "Produce the closed runtime-routing implementation and schema.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "runtime-routing-implementation.md"
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
  "contentDigest": "sha256:b63e68eb472da944096425062eda7ad7e65c9a5983a53be74de5d7ea6626e487"
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
    "id": "agent.40a1f03c545884055177cf4a6326f71f064dbbed0a4bcf90f6299ebb21242547",
    "blueprintDigest": "sha256:b63e68eb472da944096425062eda7ad7e65c9a5983a53be74de5d7ea6626e487"
  },
  "compilationDigest": "sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "implement.runtime-routing"
  ],
  "artifacts": [
    {
      "name": "runtime-routing-implementation.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.routing",
      "requirementId": "evidence.routing.produce",
      "kind": "artifact",
      "duty": "produce",
      "status": "pass",
      "artifact": "runtime-routing-implementation.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```

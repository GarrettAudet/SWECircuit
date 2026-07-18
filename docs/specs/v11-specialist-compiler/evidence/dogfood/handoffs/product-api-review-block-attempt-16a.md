# V11 Product/API Review Handoff: Attempt 16A

Agent thread: `019f6c2b-22fe-7831-af09-9d2712f49b27`.

## Raw Handoff

```json
{
  "summary": {
    "outcome": "block",
    "destination": "v11.integration-owner",
    "agentId": "agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e",
    "goalId": "v11.specialist-compiler.release",
    "goalRevision": 16,
    "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
    "workUnit": "review.product-api",
    "module": "review.product-api",
    "requiredCapability": "review.product-api",
    "compilationDigest": "sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb",
    "blueprintDigest": "sha256:87c9086777db9ee8724255e81f3473f4e128c9a84cf9c58ac56b1f78aa3e2047",
    "packageDigest": "sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1",
    "statement": "BLOCK. Package preflight and all 13 declared context bindings passed, but a later rg line-reference query was malformed by PowerShell quoting and expanded beyond the contract-declared read paths. Its output contained matches from undeclared repository files. Filesystem-read authority was therefore widened, invalidating this specialist execution. No product/API acceptance verdict is issued.",
    "failedAttempts": [
      {
        "stage": "review-evidence-consolidation",
        "tool": "rg",
        "condition": "An intended three-path line-reference query contained embedded backslash-escaped double quotes that PowerShell did not treat as quote escapes.",
        "observedEvidence": "The result included paths outside the three intended operands and outside the specialist authority, proving that the effective search scope widened.",
        "observedUndeclaredMatchingPaths": [
          "schemas/v1alpha1/adapter-manifest.schema.json",
          "schemas/v1alpha1/circuit.schema.json",
          "schemas/v1alpha1/module.schema.json",
          "schemas/v1alpha1/project.schema.json",
          "schemas/v1alpha1/run-event.schema.json",
          "schemas/v1alpha1/work-packet.schema.json",
          "src/schema.ts",
          "src/specialist-schema.ts",
          "test/schema-fixtures.test.mjs",
          "docs/specs/v11-orchestration-planner/plan.md"
        ],
        "scopeUncertainty": "rg reported only matching files, so the exact recursively scanned file set cannot be reconstructed from its output. The read must be treated as broader than the listed matching paths.",
        "response": "Stopped immediately, did not use the undeclared output for a verdict, performed no further repository access, and marked the evidence duty blocked."
      }
    ],
    "authorityUsed": {
      "filesystemReadAuthorizedPreflight": [
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json"
      ],
      "filesystemReadAuthorizedCandidateSources": [
        "README.md",
        "docs/ide/specialist-agent-kickoff.md",
        "docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md",
        "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
        "docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md",
        "schemas/v1alpha1/common.schema.json",
        "schemas/v1alpha1/specialist-compiler.schema.json",
        "scripts/check-packed-consumer.mjs",
        "scripts/fixtures/packed-consumer-host.ts",
        "src/index.ts",
        "src/specialist-render.ts",
        "src/specialist-types.ts",
        "test/specialist-schema.test.mjs"
      ],
      "filesystemReadViolation": "A malformed rg invocation widened read scope beyond the declared source set.",
      "filesystemWrite": [],
      "processSpawn": [
        "powershell",
        "rg"
      ],
      "networkAccess": false
    },
    "effects": {
      "repositoryWrites": 0,
      "runtimeAgentsDispatched": false,
      "mergePerformed": false,
      "durableMemoryUpdated": false
    }
  },
  "workUnitsCompleted": [],
  "artifacts": [
    {
      "name": "product-api-review.md",
      "mediaType": "text/markdown",
      "delivery": "inline",
      "content": "# V11 Candidate A Product/API Review\n\n## Outcome\n\n**BLOCK**\n\nNo product/API acceptance verdict is issued. The execution passed launch preflight and candidate-source freshness verification, but later violated the contract's filesystem-read boundary. The resulting review cannot satisfy `evidence.product-review`.\n\n## Identity\n\n- Agent: `agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e`\n- Goal: `v11.specialist-compiler.release@16`\n- Candidate: `team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d`\n- Work unit: `review.product-api`\n- Compilation: `sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb`\n- Blueprint: `sha256:87c9086777db9ee8724255e81f3473f4e128c9a84cf9c58ac56b1f78aa3e2047`\n- Package: `sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1`\n\n## Dependency Input\n\nThe host-delivered preparation handoff reported `pass`, exact package verification, and matching raw byte bindings for all 35 candidate sources. It explicitly stated that this proved identity only, not substantive acceptance. This review independently rechecked all 13 sources assigned to `review.product-api` before using them.\n\n## Launch Preflight\n\n| Item | Expected | Actual | Status |\n| --- | --- | --- | --- |\n| Contract bytes | `11594` | `11594` | match |\n| Contract raw SHA-256 | `sha256:ac307f814e47ed62f0b8454bdb04a51245edbd3eb6172e38af00b86b8f6c293c` | `sha256:ac307f814e47ed62f0b8454bdb04a51245edbd3eb6172e38af00b86b8f6c293c` | match |\n| Manifest bytes | `4202` | `4202` | match |\n| Manifest raw SHA-256 | `sha256:6a07320f170329007b90d0693df7b92d0e5420678c559b35fe7181d96269c741` | `sha256:6a07320f170329007b90d0693df7b92d0e5420678c559b35fe7181d96269c741` | match |\n| Trusted compilation digest | `sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb` | Contract and manifest carry the same value | match |\n| Manifest blueprint digest | `sha256:87c9086777db9ee8724255e81f3473f4e128c9a84cf9c58ac56b1f78aa3e2047` | Contract carries the same value | match |\n| Manifest contract binding | Agent path, `11594` bytes, `sha256:ac307f814e47ed62f0b8454bdb04a51245edbd3eb6172e38af00b86b8f6c293c` | Same path, bytes, and digest | match |\n\nPreflight result before substantive review: `pass`.\n\n## Context Freshness Gate\n\nAll values below were observed directly from raw repository bytes before source content was used.\n\n| Source | Expected/actual bytes | Expected/actual raw SHA-256 | Status |\n| --- | ---: | --- | --- |\n| `schemas/v1alpha1/common.schema.json` | `10709` | `sha256:d3cdcd5d8723477db18a77a2396c6ea475bbc0e1cca44f952a594cc55832e636` | match |\n| `docs/specs/v11-specialist-compiler/specialist-compiler-contract.md` | `29822` | `sha256:14474c461b8132d8fe388c30e9276e8ff88d0ae1875afdda3d1facc31eb2a84a` | match |\n| `scripts/check-packed-consumer.mjs` | `32206` | `sha256:2ce5aaf1cbfa6dbf848b73967eb8ce2a98c9e6c34d20eedb96c56f0dd1fde6d3` | match |\n| `docs/ide/specialist-agent-kickoff.md` | `14605` | `sha256:67edd4b5ffa3cbf35d2ece6a7066274107346dc45caa849747dfe1161d28d4e0` | match |\n| `src/index.ts` | `4169` | `sha256:b146d7759988bff0a205228f46e39fe53cfe0f42fbe89dbad3a6f8ffdfcf716d` | match |\n| `scripts/fixtures/packed-consumer-host.ts` | `13753` | `sha256:b758ee12c42b95e001451d109bf124c8d9e928d51187a8a7219f982a1acdf5ab` | match |\n| `README.md` | `8525` | `sha256:c53ca438b43b9b03a2ca8c55712fc26c586ab2fdf2a4ba78fdd6e3ead622ebd8` | match |\n| `src/specialist-render.ts` | `16637` | `sha256:1f9976bfe6770f45ed4c6b14d195a2c10d15a353d32d24719f9ef327770aa2c8` | match |\n| `schemas/v1alpha1/specialist-compiler.schema.json` | `15392` | `sha256:860cbe31f1b86676ea35df361e0d1b215aa92e8253bd5de266fded42fe6039cd` | match |\n| `test/specialist-schema.test.mjs` | `10218` | `sha256:c1ea13907cd2efd3619d565bd71474ef808c53fc4c3b6213999dc48efbfd4f50` | match |\n| `docs/specs/v11-specialist-compiler/evidence/dogfood/inputs/spec-before-integration.md` | `10082` | `sha256:ff85f0f2b87c8e7f0d3ced2feb06f366d7e5c60d8ae3b580d09c9aa724a9f2e5` | match |\n| `docs/specs/v11-specialist-compiler/two-phase-prelaunch-review.md` | `3620` | `sha256:27b601c2d2d0496fad7c130a684f0068e68609940952f8564c0f9dacb05d7994` | match |\n| `src/specialist-types.ts` | `12158` | `sha256:24d255360063fa157335d189fc4e0031795ba646dc44c316f93a0f3a7006fc52` | match |\n\nFreshness-gate result: `13/13 match`, `0 mismatches`.\n\n## Review Work Performed Before Block\n\nThe authorized sources were read to compare owner intent, the documented responsibility boundary, closed schema input, root exports, public specialist types, rendering and verification operations, IDE kickoff, two-phase prelaunch protocol, and installed-consumer evidence.\n\nPreliminary observations were not promoted to an acceptance verdict:\n\n- The specification asks for exact task-shaped demand, a serial baseline, provider-neutral blueprints, deterministic package rendering, two trusted verification digests, additive exports, and no caller-directed runtime effects.\n- The contract exposes four operations: `deriveTaskAuthorityProjection`, `compileAgentBlueprints`, `renderSpecialistPackage`, and `verifySpecialistPackage`.\n- The root index exports those operations and separately named specialist declarations.\n- The specialist schema closes concrete input object boundaries and defines the five permission kinds `filesystem.read`, `filesystem.write`, `network.connect`, `process.spawn`, and `secrets.read`.\n- The public type surface represents goals, work units, authority, candidates, blueprints, package files, manifests, and trusted package expectations without provider, model, prompt, executor, credential, grant, role, or agent-runtime fields.\n- The renderer reconstructs compilations before rendering and reconstructs packages before comparing trusted expected compilation and package digests.\n- The IDE kickoff keeps semantic decomposition with the human/IDE and actual execution, permissions, persistence, merge, and memory effects with an external host.\n- The two-phase protocol is conditional and separates an exact candidate from an owner-approved read-only audit package when self-referential semantic review would otherwise occur.\n- The packed-consumer sources exercise the root TypeScript declarations, offline installation path, provider-neutral key checks, exact permission union, rendering, trusted two-digest verification, and mismatched-approval rejection.\n\nThese observations are preserved only as work-in-progress evidence. They must not be treated as an independent `pass` because the execution later crossed its authority boundary.\n\n## Authority Breach\n\nDuring line-reference consolidation, an `rg` command intended to search only:\n\n- `src/specialist-types.ts`\n- `src/index.ts`\n- `schemas/v1alpha1/specialist-compiler.schema.json`\n\ncontained backslash-escaped double quotes inside a PowerShell double-quoted argument. PowerShell does not use backslash as its quote escape. The effective invocation expanded beyond the intended operands.\n\nThe output contained matches from these undeclared paths:\n\n- `schemas/v1alpha1/adapter-manifest.schema.json`\n- `schemas/v1alpha1/circuit.schema.json`\n- `schemas/v1alpha1/module.schema.json`\n- `schemas/v1alpha1/project.schema.json`\n- `schemas/v1alpha1/run-event.schema.json`\n- `schemas/v1alpha1/work-packet.schema.json`\n- `src/schema.ts`\n- `src/specialist-schema.ts`\n- `test/schema-fixtures.test.mjs`\n- `docs/specs/v11-orchestration-planner/plan.md`\n\nBecause `rg` reports matching files rather than every file scanned, the precise expanded read set cannot be established from the output. The observed paths are sufficient to prove violation of the declared filesystem-read scope.\n\nThe undeclared output was not used to reach a product/API conclusion. Work stopped immediately after detection.\n\n## Evidence Duty\n\nCriterion: `criterion.product-api`\n\nRequirement: `evidence.product-review`\n\nDuty: independent review of whether the V11 product and public API match the owner goal and remain IDE, model, and provider neutral.\n\nStatus: `blocked`.\n\nReason: filesystem-read authority was widened after substantive review began, invalidating the exact specialist execution and preventing an admissible independent verdict.\n\n## Stop Conditions\n\nThe two contract-defined `REVISE` stop conditions were not promoted to final determinations because the execution was invalidated first:\n\n- Whether a generic role can substitute for exact task demand: no final verdict.\n- Whether the public contract requires a provider or agent runtime: no final verdict.\n\n## Effects\n\n- Repository writes: `0`\n- Network access: `false`\n- Runtime agents dispatched: `false`\n- Merge performed: `false`\n- Durable memory updated: `false`\n\n## Required Disposition\n\nThe integration owner must reject this handoff as product/API acceptance evidence. Run the same owner-approved contract again in a fresh specialist execution, reperform package and source freshness gates, and keep every search command mechanically constrained to literal declared paths."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.product-api",
      "criterion": "The V11 product and public API match the owner goal and remain IDE, model, and provider neutral.",
      "requirementId": "evidence.product-review",
      "kind": "review",
      "duty": "review",
      "independentFromProducer": true,
      "status": "blocked",
      "description": "The substantive review was invalidated when an rg invocation expanded beyond the declared filesystem-read scope. No acceptance verdict is admissible from this execution.",
      "artifact": "product-api-review.md",
      "artifactPointer": "#authority-breach",
      "packagePreflightStatus": "pass",
      "verifiedContextSourceCount": 13,
      "contextBindingMismatches": 0,
      "authorityViolation": true
    }
  ],
  "assumptions": [],
  "risks": [
    "The exact set of files scanned by the malformed recursive rg invocation cannot be reconstructed from matching output alone.",
    "Preliminary substantive observations may be correct, but they are not admissible independent acceptance evidence after the authority violation.",
    "The repository is shared and was not frozen; a replacement execution must reverify every source binding before use."
  ],
  "followUps": [
    "Reject this handoff for criterion.product-api acceptance.",
    "Rerun the exact owner-approved specialist contract in a fresh execution context.",
    "Repeat contract, manifest, compilation, blueprint, package, and all 13 source-binding checks before substantive review.",
    "Use Get-Content with literal declared paths or rg invocations whose path operands and PowerShell quoting are mechanically unambiguous.",
    "Issue PASS or REVISE only from the replacement execution, with a final freshness recheck before handoff."
  ]
}
```


# Specialist Contract: agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826

Compilation: `sha256:064bb4a993c3ab3410f360684a29bf603c119059eccb62d87294456ecbcfe044`
Blueprint: `sha256:add8b8ff671f7c797e02852666586350e5c3d85accab384dca87f4777ea14d1a`

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
  "id": "agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826",
  "goalId": "v12.ide-run-loop.implementation.release-correction",
  "goalRevision": 16,
  "goalDigest": "sha256:291184ae9e9deb4204c09e624e856e006db649dd172d7dbf887786cfe25d9d12",
  "candidateId": "team.d0b80f646a23eaef39efde51111986eb7027880f01ab2a076d0f4b8572d73382",
  "workUnitIds": [
    "fix.release-truth.r16"
  ],
  "objectives": [
    {
      "workUnitId": "fix.release-truth.r16",
      "objective": "Correct V12 active release-state language and add a regression that prevents candidate-ordinal drift while preserving exact historical outcomes."
    }
  ],
  "modules": [
    {
      "id": "correction.release-truth",
      "action": "Reconcile active status banners against Candidate 9 evidence, distinguish package and workflow states, preserve history, and verify a focused anti-drift invariant.",
      "inputPorts": [
        {
          "name": "input",
          "artifactType": "ContradictoryReleaseTrace"
        }
      ],
      "outputPorts": [
        {
          "name": "output",
          "artifactType": "ConsistentReleaseTrace"
        }
      ]
    }
  ],
  "dependencies": [],
  "contextUses": [
    {
      "sourceId": "context.active-context",
      "kind": "repository",
      "locator": "path:docs/memory/active-context.md",
      "digest": "sha256:227590dbd72444f70fb2407d8cd4164087dfbd67ef25fc3ce0e3765ba389015b",
      "bytes": 38193,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/memory/active-context.md"
    },
    {
      "sourceId": "context.candidate-nine-gate",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/canonical-gate-receipt.json",
      "digest": "sha256:1475101ffcab8b2726b4c22b48ec54aed62bf00a949e3dbf204fdcd7222be863",
      "bytes": 2295,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/canonical-gate-receipt.json"
    },
    {
      "sourceId": "context.candidate-nine-product-review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/handoffs/agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627.json",
      "digest": "sha256:55c84abaeb65749e66898139789ba3ef62263052b342e99f2a53b36ac04caad0",
      "bytes": 8421,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/handoffs/agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627.json"
    },
    {
      "sourceId": "context.candidate-nine-retirement",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-9-retirement.md",
      "digest": "sha256:c4836843375f747b19b69ef75b63a6b0da6007f1fb6234878e4b42b71e576936",
      "bytes": 1784,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-9-retirement.md"
    },
    {
      "sourceId": "context.candidate-nine-review-report",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/handoff-verification.json",
      "digest": "sha256:681a8e474fbe3198181330f6fa69be36670fde83eb7936ccff19d39c3b9d4199",
      "bytes": 2898,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/handoff-verification.json"
    },
    {
      "sourceId": "context.correction-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/inputs/correction-contract.md",
      "digest": "sha256:32ca0f4dc8aa2dd24084d0621c9e8886c05fe2878e5c32cc06f44990c739389b",
      "bytes": 2609,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/inputs/correction-contract.md"
    },
    {
      "sourceId": "context.debug-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/debug-notes.md",
      "digest": "sha256:087782658a751d1ebdff1c15ced11adfe1641c8c5b5e1f3713927fca1eb8170b",
      "bytes": 38948,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/debug-notes.md"
    },
    {
      "sourceId": "context.feature-test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/test-plan.md",
      "digest": "sha256:227f97aa391bdc130cf1de65a1942e029b78bf57c8ac9289331d5137f2add93e",
      "bytes": 4981,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/test-plan.md"
    },
    {
      "sourceId": "context.implementation-notes",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/implementation-notes.md",
      "digest": "sha256:70ec7e5937ef72fd0dece4b3e6fda96d85e8801fe533188d156752e74413d00f",
      "bytes": 30334,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/implementation-notes.md"
    },
    {
      "sourceId": "context.milestone",
      "kind": "repository",
      "locator": "path:docs/milestones/v12.md",
      "digest": "sha256:34c425bd90609c948e404bea5e01d15895aaf8cd6000a60864894b24c27c3dcf",
      "bytes": 5462,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/milestones/v12.md"
    },
    {
      "sourceId": "context.package",
      "kind": "repository",
      "locator": "path:package.json",
      "digest": "sha256:63534d6bbc8b840de35cda3ad75f01f2da69f3798fdd85b9352506d13dba9368",
      "bytes": 2931,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "package.json"
    },
    {
      "sourceId": "context.release-review-tests",
      "kind": "repository",
      "locator": "path:test/v12-release-review.test.mjs",
      "digest": "sha256:761d5d328ad2f6d63ccee5e2e6e3b30c0dd28166fcab2786011f9fcad6724cf6",
      "bytes": 10449,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "test/v12-release-review.test.mjs"
    },
    {
      "sourceId": "context.review",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/review.md",
      "digest": "sha256:670103967f8e6aabf5cdc69f9d9dd4147ee9d457720f92faadfce0c25baef0cf",
      "bytes": 10224,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/review.md"
    },
    {
      "sourceId": "context.revision-fifteen-verification",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
      "digest": "sha256:89687dae2a1a7a02f04db245666f74ed46d9226986ee60f14f7a97416a0d991d",
      "bytes": 1307,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json"
    },
    {
      "sourceId": "context.root-cause-analysis",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/root-cause-analysis.md",
      "digest": "sha256:2ea2e13882b88f3c9c8f964afff6f2cc543498ebb54ed0a3a10155406cbaed1d",
      "bytes": 24611,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/root-cause-analysis.md"
    },
    {
      "sourceId": "context.run-contract",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/specialist-run-contract.md",
      "digest": "sha256:9b3340f0c95fc33abe945b35e3d1e0520392dee5ea01c3f78f24cb65473fa242",
      "bytes": 17133,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/specialist-run-contract.md"
    },
    {
      "sourceId": "context.spec",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/spec.md",
      "digest": "sha256:8466f5f1b9d97f83cf2243d489c9a76acd2459489181d7042fe8d912dde8e73b",
      "bytes": 5563,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/spec.md"
    },
    {
      "sourceId": "context.tasks",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/tasks.md",
      "digest": "sha256:9c8e4a9b5b83baf6ee5143d57d9254ef2cc9b9aa8e5f4e029fa3a8222e6a7db6",
      "bytes": 2673,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/tasks.md"
    },
    {
      "sourceId": "context.test-plan",
      "kind": "repository",
      "locator": "path:docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/inputs/test-plan.md",
      "digest": "sha256:eea531c482e7bc83168e6998a5661e05f72d7627ad43e3d849ab5ebf6e6fa053",
      "bytes": 1383,
      "purposes": [
        "Correct and verify the Candidate 9 release-truth finding within the frozen Revision 16 contract."
      ],
      "workUnitIds": [
        "fix.release-truth.r16"
      ],
      "readScope": "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/inputs/test-plan.md"
    }
  ],
  "authority": {
    "requiredCapabilities": [
      "fix.release-truth"
    ],
    "scope": {
      "read": [
        "docs/memory/active-context.md",
        "docs/milestones/v12.md",
        "docs/specs/v12-ide-run-loop/debug-notes.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/inputs/correction-contract.md",
        "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/inputs/test-plan.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-9-retirement.md",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/canonical-gate-receipt.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/handoff-verification.json",
        "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/handoffs/agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627.json",
        "docs/specs/v12-ide-run-loop/implementation-notes.md",
        "docs/specs/v12-ide-run-loop/review.md",
        "docs/specs/v12-ide-run-loop/root-cause-analysis.md",
        "docs/specs/v12-ide-run-loop/spec.md",
        "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
        "docs/specs/v12-ide-run-loop/tasks.md",
        "docs/specs/v12-ide-run-loop/test-plan.md",
        "package.json",
        "test/v12-release-review.test.mjs"
      ],
      "write": [
        "docs/memory/active-context.md",
        "docs/milestones/v12.md",
        "docs/specs/v12-ide-run-loop/debug-notes.md",
        "docs/specs/v12-ide-run-loop/implementation-notes.md",
        "docs/specs/v12-ide-run-loop/review.md",
        "docs/specs/v12-ide-run-loop/root-cause-analysis.md",
        "docs/specs/v12-ide-run-loop/spec.md",
        "docs/specs/v12-ide-run-loop/tasks.md",
        "docs/specs/v12-ide-run-loop/test-plan.md",
        "test/v12-release-review.test.mjs"
      ],
      "conflictZones": [
        "docs/memory/active-context.md",
        "docs/milestones/v12.md",
        "docs/specs/v12-ide-run-loop/debug-notes.md",
        "docs/specs/v12-ide-run-loop/implementation-notes.md",
        "docs/specs/v12-ide-run-loop/review.md",
        "docs/specs/v12-ide-run-loop/root-cause-analysis.md",
        "docs/specs/v12-ide-run-loop/spec.md",
        "docs/specs/v12-ide-run-loop/tasks.md",
        "docs/specs/v12-ide-run-loop/test-plan.md",
        "test/v12-release-review.test.mjs"
      ]
    },
    "permissions": [
      {
        "kind": "filesystem.read",
        "scopes": [
          "docs/memory/active-context.md",
          "docs/milestones/v12.md",
          "docs/specs/v12-ide-run-loop/debug-notes.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r15/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/inputs/correction-contract.md",
          "docs/specs/v12-ide-run-loop/evidence/implementation/release-correction-r16/inputs/test-plan.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/candidate-9-retirement.md",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gates/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/canonical-gate-receipt.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/handoff-verification.json",
          "docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84/handoffs/agent.9d02902b2619661e1f1aa63615008453a5b1811d9efc28fe4341634a2e051627.json",
          "docs/specs/v12-ide-run-loop/implementation-notes.md",
          "docs/specs/v12-ide-run-loop/review.md",
          "docs/specs/v12-ide-run-loop/root-cause-analysis.md",
          "docs/specs/v12-ide-run-loop/spec.md",
          "docs/specs/v12-ide-run-loop/specialist-run-contract.md",
          "docs/specs/v12-ide-run-loop/tasks.md",
          "docs/specs/v12-ide-run-loop/test-plan.md",
          "package.json",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "filesystem.write",
        "scopes": [
          "docs/memory/active-context.md",
          "docs/milestones/v12.md",
          "docs/specs/v12-ide-run-loop/debug-notes.md",
          "docs/specs/v12-ide-run-loop/implementation-notes.md",
          "docs/specs/v12-ide-run-loop/review.md",
          "docs/specs/v12-ide-run-loop/root-cause-analysis.md",
          "docs/specs/v12-ide-run-loop/spec.md",
          "docs/specs/v12-ide-run-loop/tasks.md",
          "docs/specs/v12-ide-run-loop/test-plan.md",
          "test/v12-release-review.test.mjs"
        ]
      },
      {
        "kind": "process.spawn",
        "scopes": [
          "git",
          "node",
          "npm",
          "powershell"
        ]
      }
    ],
    "forbiddenEffects": [
      "Do not edit outside declared write scope, modify immutable evidence, change runtime code or schemas, change Git state, use network access, launch descendants, run a candidate gate, prepare R2, claim release readiness, or merge."
    ]
  },
  "evidenceDuties": [
    {
      "criterionId": "criterion.fix.release-truth.r16",
      "criterion": "Every active V12 status banner describes one evidence state without future candidate ordinals, exact workflow outcomes stay distinct from package validity, and focused regressions pass.",
      "requirementId": "evidence.fix.release-truth.r16",
      "kind": "test",
      "duty": "produce",
      "description": "Provide exact changed-file, status-invariant, focused-test, template-checker, formatter, linter, and diff evidence.",
      "independentFromProducer": false
    }
  ],
  "handoff": {
    "destination": "codex.main",
    "artifacts": [
      "release-truth-correction-r16.md"
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
    "Do not claim release readiness, hosted CI, merge, memory closeout, or external-host effects.",
    "Do not replace exact historical candidate outcomes with generalized success language.",
    "Edit only declared files and preserve every immutable candidate and correction artifact.",
    "If native apply_patch fails before mutation, use only an exact precondition-hash-guarded write and verify resulting bytes immediately.",
    "Return only the exact closed SpecialistAgentHandoff JSON object from the generated contract.",
    "Run every frozen focused check and report any failure truthfully.",
    "Stop before editing if any declared context byte count or SHA-256 binding fails."
  ],
  "contentDigest": "sha256:add8b8ff671f7c797e02852666586350e5c3d85accab384dca87f4777ea14d1a"
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
    "id": "v12.ide-run-loop.implementation.release-correction",
    "revision": 16,
    "digest": "sha256:291184ae9e9deb4204c09e624e856e006db649dd172d7dbf887786cfe25d9d12"
  },
  "agent": {
    "id": "agent.0b01c5e065cbfb2779dbeb056582a13d964c7581cc473700a52de7d77954b826",
    "blueprintDigest": "sha256:add8b8ff671f7c797e02852666586350e5c3d85accab384dca87f4777ea14d1a"
  },
  "compilationDigest": "sha256:064bb4a993c3ab3410f360684a29bf603c119059eccb62d87294456ecbcfe044",
  "summary": "Replace with a concise result summary.",
  "workUnitsCompleted": [
    "fix.release-truth.r16"
  ],
  "artifacts": [
    {
      "name": "release-truth-correction-r16.md",
      "mediaType": "text/markdown",
      "content": "Replace with the complete artifact content."
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.fix.release-truth.r16",
      "requirementId": "evidence.fix.release-truth.r16",
      "kind": "test",
      "duty": "produce",
      "status": "pass",
      "artifact": "release-truth-correction-r16.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```

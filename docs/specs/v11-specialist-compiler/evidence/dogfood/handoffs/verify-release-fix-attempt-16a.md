# V11 Release Verification Handoff: Attempt 16A

Agent thread: `019f6c2b-375e-7cd1-ad70-dce28b83196f`.

## Raw Handoff

```json
{
  "summary": {
    "outcome": "fix",
    "destination": "v11.integration-owner",
    "agentId": "agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8",
    "goalId": "v11.specialist-compiler.release",
    "goalRevision": 16,
    "candidateId": "team.e016556b8933ef6ead3b1d321bf187cee6a286ca7ca19332dcf6505fe1d02a7d",
    "workUnit": "verify.release-gates",
    "module": "verify.release-gates",
    "requiredCapability": "verify.release",
    "compilationDigest": "sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb",
    "blueprintDigest": "sha256:dcb0b40eb571538273fa13658b0914c6a418026bd128bfffde6b252fd14a6f92",
    "packageDigest": "sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1",
    "statement": "Launch preflight and all 39 source bindings passed. The schema, specialist compiler, full kernel, package, installed-consumer, and template-checker gates passed. The template-checker regression harness failed while copying a 264-character destination beneath the only authorized temporary-write root, so the contract-mandated outcome is FIX.",
    "failedAttempts": [
      {
        "gate": "template-checker-regression",
        "command": "$env:TEMP=$env:TMP=<repository>/.local/npm-cache; powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/test-check-template.ps1",
        "exitCode": 1,
        "wallTimeSeconds": 2.4,
        "failure": "Write-RegressionFailure reported that part of the destination path for the attempt-15 prelaunch-audit agent contract could not be found.",
        "failingDestinationLength": 264,
        "legacyWindowsMaxPath": 260,
        "stopConditionApplied": true
      }
    ],
    "authorityUsed": {
      "filesystemRead": "The verified package contract and manifest, the 35 preparation-bound candidate sources, four additional contract-declared release contexts, authorized release inputs, generated dist output, npm cache output, and Git status metadata.",
      "filesystemWrite": [
        "dist/**",
        ".local/npm-cache/**"
      ],
      "processSpawn": [
        "git",
        "node",
        "npm.cmd",
        "powershell"
      ],
      "networkAccess": false
    },
    "effects": {
      "repositorySourceWrites": 0,
      "runtimeAgentsDispatched": false,
      "mergePerformed": false,
      "durableMemoryUpdated": false,
      "trackedChangesUnderAuthorizedWriteScopes": 0,
      "failedHarnessWorkspaceCleaned": true
    }
  },
  "workUnitsCompleted": [],
  "artifacts": [
    {
      "name": "release-gate-evidence.md",
      "mediaType": "text/markdown",
      "delivery": "inline",
      "content": "# Release Gate Evidence\n\n## Overall Result\n\n**FIX**. The release evidence requirement is not satisfied because one canonical gate failed. The specialist stopped without changing source, tests, schemas, documentation, or configuration.\n\n## Candidate Identity\n\n- Agent: `agent.6dad2f7ca99d372fe3e35407a04133b48c9be6feccb4891ce0add91474a619a8`\n- Work unit: `verify.release-gates`\n- Compilation: `sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb`\n- Blueprint: `sha256:dcb0b40eb571538273fa13658b0914c6a418026bd128bfffde6b252fd14a6f92`\n- Package: `sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1`\n\n## Launch Preflight\n\n- Contract expected and observed bytes: `16842`.\n- Contract expected and observed raw digest: `sha256:49ff98a856b3589f50309f2711661b7fbb0c9575d9ce6f90538579d5ccddcbbb`.\n- Manifest observed bytes: `4202`.\n- Manifest raw digest: `sha256:6a07320f170329007b90d0693df7b92d0e5420678c559b35fe7181d96269c741`.\n- The contract carries the trusted compilation digest.\n- The contract blueprint/content digest matches the manifest-listed blueprint digest.\n- Final pre-handoff recheck reproduced the same contract and manifest identities.\n\n## Source Freshness\n\n- Preparation-bound candidate sources checked: `35`.\n- Additional contract-declared release contexts checked: `4`.\n- Initial effective result: `39/39` exact byte-count and raw SHA-256 matches; all were strict UTF-8.\n- An initial comparison script incorrectly labeled `src/types.ts` despite displaying identical values. Isolated ordinal comparison confirmed `4140` bytes and `sha256:61877d77f8a1d5ab496491f1a462e74142572d4acac953958add18d9a62bee37` on both sides.\n- Final robust freshness recheck: `39/39` matches, `0` mismatches, strict UTF-8 for all sources.\n\n## Gate Results\n\n### Deterministic build\n\n- Command: `npm.cmd run build --silent`\n- Exit code: `0`\n- Wall time: `2.5s`\n\n### Strict specialist schema\n\n- Command: `node --test test/specialist-schema.test.mjs`\n- Exit code: `0`\n- Tests: `7`; passed: `7`; failed: `0`; duration: `680.7544ms`.\n- Covered strict Ajv compilation, closed inputs, provider-field rejection, role/runtime exclusion, repository-context shape, exact permission kinds, and package-owned references.\n\n### Specialist compiler golden suite\n\n- Command: `node --test test/specialist-compiler.test.mjs`\n- Exit code: `0`\n- Tests: `35`; passed: `35`; failed: `0`; duration: `1949.509ms`.\n- All six golden rosters passed: one-agent-optimal, genuinely-parallel, under-split, over-split, conflict-heavy, and generic-role.\n- Exact search, fixed scheduling, bounded search claims, permutation determinism, authority/evidence rejection, renderer determinism, digest tampering, and trusted package verification passed.\n\n### Full kernel gate\n\n- Command: `npm.cmd run verify`\n- Exit code: `0`\n- Wall time: `46s`.\n- Format: `72` files checked, no fixes applied.\n- Lint: `60` files checked, no fixes applied.\n- Typecheck: passed without diagnostics.\n- Complete test suite: `339` tests, `339` passed, `0` failed, `0` skipped.\n- V10 dogfood: `result=pass`, provider calls `0`, merge authority unused.\n- V11 dogfood: `result=pass`.\n- Candidate V11 result: compilation `sha256:a8f200d6fda6b0692b010c4a46e6af70b006a372d127e07d23a73dc36c5894cb`; package `sha256:0cd3d9b30c48631d03d529cbd5ce4285be166f382b9c6d84a3591f91d0d91ea1`; selected agents `6`; projected makespan `23`; serial projected makespan `40`; exact-search evaluations `203`.\n- Prelaunch audit: `result=pass`; compilation `sha256:f9a0de491c7b015257a34752d72b41a16bae964f5b5268fb973289be0beb3f7b`; package `sha256:fb3ae5e99c1eb959b23ecbe856e244e0db46ec529a490759225b35f1e1d20926`; selected agents `2`; exact-search evaluations `2`.\n- Cross-package launch authorization: `pass`.\n- Embedded package dry run and installed-consumer checks passed.\n\n### Standalone package dry run\n\n- Command: `npm.cmd run pack:check`\n- Exit code: `0`\n- Wall time: `2.9s`.\n- Artifact: `swecircuit-0.0.0.tgz`.\n- Files: `105`; package size: `123.3 kB`; unpacked size: `686.7 kB`.\n- SHA-1 package shasum: `ed7f06c771f341a1c21016383beaabe06969ec73`.\n- The listing included the required runtime declarations, specialist compiler/render/type declarations, package schemas, executor-boundary document, and package metadata.\n\n### Standalone installed consumer\n\n- Command: `npm.cmd run consumer:check`\n- Exit code: `0`\n- Wall time: `7.3s`.\n- Exact result: `Packed consumer check passed (private artifact, offline install, executed public TypeScript host, init, validate, execute, inspect, compile, render, approval-bound verify).`\n\n### Template checker\n\n- Command: `powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/check-template.ps1`\n- Exit code: `0`\n- Wall time: `7.9s`.\n- Exact result: `Template check passed.`\n\n### Template checker regression\n\n- Command: `$env:TEMP=$env:TMP=<repository>/.local/npm-cache; powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/test-check-template.ps1`\n- Exit code: `1`\n- Wall time: `2.4s`.\n- Exact failure class: `Write-RegressionFailure`.\n- Reported error: `Unhandled regression harness error: Could not find a part of the path 'C:\\Users\\garre\\OneDrive\\Documents\\Portable Best Practices\\.local\\npm-cache\\sc-ct-33336\\base\\docs\\specs\\v11-specialist-compiler\\evidence\\dogfood\\runs\\attempt-15\\prelaunch-audit\\package\\agents\\agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6.md'.`\n- The reported authorized destination is `264` characters. The same relative path beneath the ordinary system temp root would be `223` characters, but that root was outside this contract's write authority.\n- Evidence strongly indicates legacy Windows path-length handling during the fixture copy. No source-code defect was established by this failure.\n- The PID-owned `sc-ct-33336` workspace was absent after the harness exited.\n\n## Containment\n\n- npm was forced offline and used only `.local/npm-cache`.\n- Generated writes were limited to `dist/**` and `.local/npm-cache/**`.\n- `git status --short -- dist .local` returned no tracked delta.\n- Candidate sources remained byte-identical after execution.\n- No network, runtime-agent dispatch, merge, source edit, or durable-memory update occurred.\n"
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.release",
      "criterion": "Canonical verification and source-linked release evidence are complete before owner approval.",
      "requirementId": "evidence.release-gates",
      "kind": "test",
      "duty": "verify",
      "independentFromProducer": true,
      "status": "failed",
      "verificationResult": "fix",
      "description": "All release gates except the template-checker regression harness passed. One canonical failure prevents complete release evidence.",
      "artifact": "release-gate-evidence.md",
      "artifactPointer": "#overall-result",
      "failingGate": "template-checker-regression"
    }
  ],
  "assumptions": [],
  "risks": [
    "Candidate A cannot receive release-gate approval while the template-checker regression harness remains unreproduced.",
    "The failure appears specific to the long authorized cache path on Windows; rerunning under the shorter system temp directory would exceed this contract's filesystem-write authority.",
    "The shared worktree contains extensive owner changes and deep untracked evidence paths. They remained untouched and the 39 bound sources stayed exact."
  ],
  "followUps": [
    "The integration owner must retain this handoff as a FIX result and must not treat the passing kernel gate as complete release approval.",
    "Resolve the regression harness path-length failure through an owner-approved source revision or an owner-approved short temporary-write scope, then create a new candidate revision, compile, render, verify, approve, and rerun the release specialist.",
    "Preserve the exact failed path and command as regression evidence. Do not reuse Candidate A approval after changing source or authority."
  ]
}
```


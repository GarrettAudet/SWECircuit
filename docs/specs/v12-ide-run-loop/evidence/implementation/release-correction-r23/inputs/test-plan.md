# Revision 23 Test Plan

## Fast Gate

```powershell
node --test --test-name-pattern "copied production lifecycle uses the release-gate host npm cache supply" test/v12-release-review.test.mjs
```

Prove the lifecycle helper uses the gate-resolved cache identity, copies exact sentinel bytes into an owned destination, and rejects source/destination overlap.

## Causal Lifecycle Gate

```powershell
node --test --test-name-pattern "isolated copied production entrypoints complete one exact compile-to-verify lifecycle" test/v12-release-review.test.mjs
```

Require a real copied repository, nested canonical gate, fresh compile/approve/verify parents, complete three-reviewer handoffs, ten negative routes, exact source checks, and cleanup.

## Quality Gates

```powershell
node --check test/helpers/v12-release-review-lifecycle.mjs
node --check test/v12-release-review.test.mjs
npm.cmd run format:check
npm.cmd run lint
git -c core.longpaths=true diff --check
```

## Release Gates

After independent review and any required V11 refresh:

```powershell
npm.cmd run verify
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\test-check-template.ps1
```

Only a clean committed successor may then run a new one-shot canonical gate.

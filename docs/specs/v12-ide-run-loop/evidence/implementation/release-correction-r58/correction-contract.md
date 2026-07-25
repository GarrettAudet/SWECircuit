# Revision 58 Correction Contract

## Trigger

Revision 57 commit `e0859510132a5caf3a2393a5b203b07efef3d420` passed its exact copied lifecycle and full local verifier, including 458/458 core tests and 2/2 lifecycle tests. Hosted GitHub Actions run `30136535813` then failed all seven jobs before release approval.

## Objective

Make the hosted workflow declare and provision the Git supplies already required by the release contract: Windows long-path support before checkout and complete repository history before verification.

## Required Behavior

1. Enable `core.longpaths` before every Windows checkout.
2. Fetch complete Git history for every hosted job.
3. Retain least-privilege `contents: read` workflow permissions.
4. Document the Windows clone prerequisite for users and contributors.
5. Lock the workflow and tracked npm-cache contracts into a focused regression.
6. Preserve Revision 57 evidence and never invoke its unconsumed one-shot gate.

## Scope

- `.github/workflows/template-check.yml`
- `README.md`
- `CONTRIBUTING.md`
- `test/v12-release-gate.test.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`
- Revision 57 retirement and Revision 58 trace evidence

## Route

`verify -> diagnose -> fix -> verify -> review -> freeze`

# Post-Integration Replay FIX - Attempt 5

- Outcome: `FIX`.
- Stage: post-integration package replay.
- Compilation: `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d`.
- Package: `sha256:5824f61dedfa82e479b412eb4a091c25c5a1d43b59ce94a9ec8ee47e61757f07`.

## Reproduction

After the integration specialist updated `docs/specs/v11-specialist-compiler/spec.md`, run:

```powershell
node scripts/run-v11-dogfood.mjs --check-evidence
```

The runner rejects `context.spec`: the GoalContract expected the 10,083-byte pre-integration digest `sha256:97d0d32e878a6ff2147a211177f56ad0efae2a3b55caf385dfc9dcbad231e44c`, while the live acceptance record had changed.

## Confirmed Cause

The plan correctly created `inputs/spec-before-integration.md` for the integration work unit, but preparation and independent reviewers still bound `context.spec` to the mutable live target. Integration therefore invalidated the approved candidate by performing its authorized work.

## Required Fix

Preserve attempt 5, increment the goal revision, make the immutable spec snapshot the single review/integration source, remove the duplicate mutable source binding, regenerate both trusted digests, and repeat preparation plus all four independent review/release lanes. Do not merge or claim final V11 acceptance from attempt 5.

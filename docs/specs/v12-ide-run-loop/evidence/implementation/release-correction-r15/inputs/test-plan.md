# Revision 15 Test Plan

## Required Focused Proof

- Reproduce Candidate 8's 261-source and 261-scope failure from its immutable prepared request.
- Prove only correction navigation duplicates are excluded.
- Prove package envelopes, approvals, raw handoffs, handoff-verification reports, replans, security-causal sources, and gate evidence remain selected.
- Build the current request shape and prove `compileAgentBlueprints` succeeds with three independent review work units and every context and scope count at or below 256.

## Required Commands

```powershell
node --test --test-name-pattern="R2 correction review context" test\v12-release-gate.test.mjs
node --test test\v12-release-gate.test.mjs
npm.cmd exec -- biome check docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs test/v12-release-gate.test.mjs
```

The integration owner separately owns full repository verification, V11 replay, a new candidate commit, its one-shot exact gate, and a fresh candidate-addressed R2 run.

## Required Handoff

Return only the generated closed `SpecialistAgentHandoff` JSON object. Report exact changed files, source counts before and after, retained primary-evidence classes, commands, outcomes, risks, and follow-ups.

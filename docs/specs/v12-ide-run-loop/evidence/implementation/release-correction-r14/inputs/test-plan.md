# Revision 14 Test Plan

## Required Inspection

- Compare Candidate 7's receipt and raw failure output with the corrected resolver and test.
- Confirm the production call still omits the injectable test default and supplies the normalized host environment.
- Confirm every selected path still passes absolute-path, plain-file, symlink, realpath, and outside-candidate validation.

## Required Commands

```powershell
node --test --test-name-pattern="host TypeScript entrypoint supply" test\v12-release-gate.test.mjs
npm.cmd exec -- biome check scripts/run-v12-release-gate.mjs test/v12-release-gate.test.mjs
```

The integration owner separately owns the complete focused suite, full pre-freeze verification, successor commit, one-shot exact gate, and three-reviewer R2 release decision.

## Required Handoff

Return only the exact closed `SpecialistAgentHandoff` JSON object from the generated contract. Include the Candidate 7 failure, inspected source paths, commands and results, risks, and a truthful workflow outcome.

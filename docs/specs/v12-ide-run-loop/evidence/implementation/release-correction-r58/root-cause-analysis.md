# Revision 58 Root-Cause Analysis

## Reproduction

- Exact Revision 57 commit: `e0859510132a5caf3a2393a5b203b07efef3d420`.
- Exact copied lifecycle: pass, 2/2.
- Full local `npm.cmd run verify`: pass, including 458/458 core tests.
- GitHub Actions run `30136535813`: fail, seven of seven jobs.
- A depth-one clone of Revision 57 contains one commit and cannot resolve approved checkpoint `1b47e0ad10a5c3209fae53397892b7df3cd837be`.

## Stable Evidence

- Hosted run: `https://github.com/GarrettAudet/SWECircuit/actions/runs/30136535813`.
- Windows annotations report 34 checkout failures for tracked filenames beyond the legacy path limit.
- The repository contains 107 tracked paths of at least 260 characters.
- `test/v12-release-review.test.mjs` loads the fixed approved checkpoint from July 20, 2026.
- The tracked `.npmrc` resolves npm's cache to `.local/npm-cache`; npm cache bootstrap is already declared and is not the hosted failure.

## Failure Classification

Hosted-runner repository-bootstrap contract defect. No kernel, compiler, release-gate, or lifecycle behavior defect was observed.

## Hypotheses

- Release behavior is non-portable: rejected by the exact local lifecycle and full verifier.
- Hosted npm cache is undeclared: rejected by the tracked `.npmrc` and resolved npm configuration.
- Windows checkout cannot materialize tracked evidence paths under legacy path handling: confirmed by hosted annotations and local clone probes.
- Default shallow checkout omits historical proof inputs: confirmed by the one-commit clone and missing approved checkpoint.

## Confirmed Cause

The workflow started checkout without enabling Windows long paths and used the checkout action's depth-one default even though the test contract reads an older approved Git object.

## Causal Fix

Enable `core.longpaths` before checkout on Windows, fetch complete history in both hosted jobs, keep read-only workflow permissions, document the Windows prerequisite, and test the exact workflow fragments.

## Regression Coverage

- Exactly two long-path bootstrap and full-history checkout contracts are required.
- Workflow permissions must remain `contents: read`.
- The tracked repository-local npm-cache contract must remain present.
- The template checker and release-gate test enforce the correction before hosted execution.

# Revision 54 Root-Cause Analysis

## Reproduction

- Candidate: `29a32a590a2b73807fe2438f7fc7fa547365e6d1`.
- Tree: `05bbb4ccafe4e941024cad69044b715cd356c0b8`.
- Command: exact copied-source lifecycle with the pinned npm cache and private Git runtime.
- Result: fail after 1,105,148 ms at `test/lifecycle/v12-release-review-lifecycle.test.mjs:129`.
- Error: `ReferenceError: V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS is not defined`.

## Stable Evidence

- The child process returned status 0 and summary outcome `pass`; execution reached host assertions after parsing lifecycle evidence.
- The helper exports `V12_RELEASE_REVIEW_LIFECYCLE_TEST_HOOKS`.
- Fast release-review tests import the hook correctly.
- The lifecycle test imported only `PRODUCTION_IDENTITIES` while referencing the hook.

## Hypotheses

- Isolated product lifecycle failure: rejected; the child completed with `pass`.
- Missing helper export: rejected; the export exists and is exercised elsewhere.
- Missing lifecycle-test import: confirmed.

## Confirmed Cause

A prior npm-version assertion added a hook reference to the slow lifecycle test without adding the corresponding named import. Pre-freeze focused tests did not execute that slow host assertion path.

## Causal Fix

Import the existing hook and add a fast named binding regression before rerunning the full lifecycle.

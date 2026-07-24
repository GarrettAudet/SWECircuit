# Revision 48 Test Plan

## Focused Contract

- Exact lock accepts registry/SRI inventory and rejects linked or local substitution.
- Candidate dependency closure detects byte mutation and hard links.
- Closed PATH begins with candidate-private `.bin` and excludes host dependency `.bin`.
- Gate main requires exact-lock installation, closure equality, removal, and final absence.
- R2 requires receipt v1alpha3, re-derives lock identity from candidate Git blobs, validates embedded raw logs, and rejects cleanup drift.
- Copied lifecycle verifies passing and mutation routes both remove candidate dependencies.

## Current Evidence

- Syntax: pass.
- Formatting and lint: pass.
- Focused release-gate and R2 suite: 54/54 pass.
- Committed copied-production lifecycle: pending an immutable Revision 48 source.
- Complete verifier, one-shot successor gate, fresh R2, hosted CI, and merge: pending.
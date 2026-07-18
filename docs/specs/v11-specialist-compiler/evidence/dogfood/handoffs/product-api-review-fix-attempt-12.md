# V11 Product/API Review: Attempt 12

## Outcome

`FIX`

## Candidate Binding

- Goal revision: 12.
- Compilation: `sha256:9e5d2f7304b9100b40c1d96ad59a23c8dce73161386d478b2dda249ec921b1e5`.
- Package: `sha256:ed08d9b5d5e4c4f6195b1d0b86a01358b63e8fa0b6ca4d882982da96c589004a`.
- Context: 12/12 byte-and-digest verified.

## Finding

`P1`: the README-linked TypeScript installed-consumer fixture compiled a different canonical goal from the executed JavaScript consumer while reusing the JavaScript consumer's retained compilation and package digests. Goal assumptions, unresolved-decision rationale, and context sources are digest-bound, so one approval pair cannot authenticate both values.

The package gate only ran TypeScript with `--noEmit`; it executed the separate embedded JavaScript path. A user following the typed fixture could therefore receive `SC4307` while `consumer:check` passed.

## Required Correction

- Use one canonical goal and retained expectation across both paths, or retain distinct correct expectations explicitly.
- Execute the emitted TypeScript host in the offline installed-package gate.
- Regenerate the dogfood candidate and rerun independent review without inherited acceptance.

## Evidence Duty

- `evidence.product-review`: `FIX`.

Agent thread: `019f6ae6-83c8-77e1-8d1a-e9aaf2467512`.


# V11 Security/Trace Review: Attempt 11

## Outcome

`FIX`

## Candidate Binding

- Goal revision: 11.
- Compilation: `sha256:4bb8eae6b779ebf666f8c9f156fb444dd0631a6e4b5c667dec53ee3327d5e89f`.
- Package: `sha256:a33c52c252df33e01224f07ed4bef10b1ed7615760b173793487caae2ee4b377`.
- Context: 32/32 byte-and-digest verified.

## Finding

`HIGH`: the checkout-canonical guard treated the textual Git attribute values `unspecified` and `unset` as proof that a transform was inactive. Git also permits literal filter driver names such as `filter=unspecified` and `filter=unset`; `git check-attr` renders those names identically to its sentinel states. Either driver could therefore survive the guard and receive reviewed context bytes during filtered hashing.

## Required Correction

- Query `git check-attr -z --all` so attribute presence is preserved.
- Reject every occurrence of `filter`, `working-tree-encoding`, `ident`, and legacy `crlf` before hashing.
- Require an explicit `eol=lf` or `eol=crlf` policy.
- Add regressions for both ambiguous filter names and prove zero hash calls.
- Recompile, rerender, approve, and independently review a new candidate pair.

## Evidence Duty

- `evidence.security-review`: `FIX`.

Agent thread: `019f6aa8-9e8c-70c1-a59d-30ce1be75890`.


# V11 Security/Trace Review: Attempt 9

## Outcome

`FIX`

## Candidate Binding

- Goal revision: 9.
- Compilation: `sha256:93deaeb96c0565c5e83c5d32037b88935462577c7ca7399fc8bf47e8b20156fe`.
- Package: `sha256:2cc9dff1413b034cac16690cc264c6a96a52770c3730a943319675f435dbcc59`.
- Context: 32 delivered, 32 byte-and-digest verified.

## Findings

1. `HIGH`: the filtered `git hash-object --path` call ran before attributes were inspected, so an active clean filter could observe or side-effect reviewed bytes before rejection.
2. `HIGH`: the guard omitted Git's `ident` transform, allowing bytes containing an unexpanded `$Id$` marker to change on checkout after passing an LF or binary branch.
3. `MEDIUM`: `git check-attr -z` parsing checked only field count and repeated path, not the terminal NUL or exact unique attribute names and order.

## Confirmed Security Evidence

Authority narrowing, schema closure, canonical digest framing, renderer reconstruction, external two-digest verification, path containment, shell-free argument-vector spawning, and non-echoing child-process errors passed. Revision 6's isolated CR-byte failure was causally closed; revision 7's wider smudge class was not fully closed.

## Required Correction

Read and strictly validate attributes before filtered hashing; reject active `filter`, `working-tree-encoding`, and `ident`; require the exact named records plus terminal NUL; add filter-side-effect, ident, malformed-order/output, bare-CR, and binary-ident regressions; then recompile, rerender, reapprove, and repeat affected reviews.

Agent thread: `019f6aa8-9e8c-70c1-a59d-30ce1be75890`.

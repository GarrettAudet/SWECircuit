# Revision 71 Root Cause Analysis

## Reproduction

Authenticate and inspect the fresh R2 package for exact Revision 70 commit
`606fc3585f19f4714e0e75c2387561ca03b8282c` from a normal Windows checkout.

## Stable Evidence

The verified R2 roster is complete and binds compilation
`sha256:eb3e7fd1341c45966f95a9a440685193b24206f9155de50e96aa4596e0b41998` and package
`sha256:8aab3a72a23f6c8f7b880dc0fa77b1720b05083b284360ef8022c0816835d2b8`.
Product/API/IDE and lifecycle/correctness emit `pass`; security/trace authority emits `block`.
Its authenticated raw handoff reports 176 of 224 declared context items readable and 48 absent at
their exact declared snapshot paths, with no mismatch among readable items.

Independent diagnosis showed Node could read all 224 declared source paths with exact bytes while
ordinary Windows PowerShell reported the same 48 paths absent. Those 48 absolute paths were all
longer than 259 characters; the longest was 336 characters. No shorter path failed.

## Classification

Windows path-surface portability and immutable context-delivery failure.

## Confirmed Cause

The R2 materializer appended each original repository path beneath a long candidate-addressed run
prefix. The resulting files existed and retained exact bytes, but ordinary Windows IDE/PowerShell
surfaces could not address 48 paths beyond the legacy path boundary. The reviewer correctly blocked
before substantive security review.

## Causal Fix

Materialize each reviewed source under a compact `inputs/s/{sha256}` alias derived from a canonical
tuple of domain, context ID, and original path. Keep the human-readable original path and all Git and
content bindings in the manifest, reject collisions, and enforce a 180-character logical-path cap.
The causal regression reconstructs every R70 source beneath a representative checkout root and has
ordinary Windows PowerShell verify every file's existence, byte count, and SHA-256 digest.

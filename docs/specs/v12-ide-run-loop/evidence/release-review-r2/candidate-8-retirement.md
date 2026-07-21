# Candidate 8 Retirement

## Candidate

- Commit: `0482bf3783e085c6cef3111d63003daa5197eca8`.
- Tree: `d5f1a1a5a579c4a28d8997ffa2a2416726091471`.
- Source: 2,046 files, 57,258,623 bytes, `sha256:0e3f6779a9501f6ad34c0b1923151cd4561b81037c1456f231e23969d333b8b9`.

## Canonical Gate

`pass`. Exact source before and after execution, disposable Git context, live repository state, and cleanup all passed. The raw stdout is 297,433 bytes at `sha256:0dc432aeeed8d6f6a3e9352800dbd6a9d5b40d20eeb69a3ed16dcfe9bdb8170c`; stderr is 26,137 bytes at `sha256:2e53f9074811c48085665956206c5d73525bdba26d25c07cb805d31df9b0c948`; the 2,295-byte receipt is `sha256:aa93e516387afc029ff21ba5d8e4f31cc0787e15ef181c38b1714acdf7c2c76e`.

## R2 Outcome

Preparation passed and preserved 261 bound contexts, 257 exact candidate snapshots, 24 raw handoffs, and contiguous correction evidence through Revision 14. Compilation then returned two `SC4308` diagnostics before package rendering or reviewer launch. Context bytes were below the 16 MiB limit, but 261 context sources and 261 read scopes each exceeded their closed limit of 256.

## Root Cause

The R2 collector treated correction navigation files as reviewer context even though authoritative package envelopes, approvals, raw handoffs, handoff-verification reports, and replans already preserve the same contract and execution chain. The unbounded duplicate context remained hidden until Revision 14 crossed the count ceiling.

## Route

`split` -> `fix`. Candidate 8 is permanently retired and must not be regated or reviewed through a modified request. Revision 15 must exclude only redundant correction inputs, requests, phase metadata, and compilation summaries; preserve all authoritative primary evidence; add a compiler-bound regression; and require a new candidate and fresh R2 run root.

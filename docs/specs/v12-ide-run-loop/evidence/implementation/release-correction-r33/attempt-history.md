# Revision 33 Attempt History

## Revision 32 Exact Aggregate

- Candidate: `ec51c7a9dd72ce9094260e089120b089ee25ad2a`.
- Tree: `931c87d65f06e179b7048973718739a2ff846d2f`.
- Result: 444/445 core tests passed; the aggregate stopped before lifecycle, dogfood, package, or consumer gates.
- Failure: `live release routing delegates volatile state to candidate-addressed evidence` rejected `docs/specs/v12-ide-run-loop/review.md#current-outcome`.
- Exact external stdout: 36,802 bytes, `sha256:d45c03f5b1bc5924471b07aee8a2c084b1eb13fb43703a28d9222fdb9e287c13`.
- Exact external stderr: 19,492 bytes, `sha256:00ce84e8736d7583a9716c2cc28900f92401a907f381c72e074578739408805e`.
- Exact external receipt: 1,150 bytes, `sha256:a12a4795fef13b939ffa440c1059a5f2b723ee7169c79adb9396b29c7120b470`.
- Source identity and clean-worktree state remained exact before and after the run.

## Route

`verify -> diagnose -> fix -> verify`. Revision 32 is retired as a release candidate. Revision 33 passes the exact failed case 1/1, the complete release-review suite 31/31, and the complete release-gate suite 17/17. Rerun the anti-drift guard after the final result-recording edit, then commit and verify the fresh successor.

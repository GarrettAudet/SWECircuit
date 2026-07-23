# Revision 35 Attempt History

## Revision 34 Exact Aggregate

- Candidate: `a40d0d6b636d30b3280c37fa9f5fceb2ab64baa8`.
- Tree: `88bed28cf996eaa3f3d0173dffaa59932a8bd400`.
- Result: 444/445 core tests passed; the aggregate stopped before lifecycle, dogfood, package, or consumer gates.
- Failure: `active release status avoids volatile candidate-state drift and preserves outcomes` rejected `docs/specs/v12-ide-run-loop/test-plan.md#status` because its compressed Revision 34 wording omitted three required immutable historical outcomes.
- Exact external stdout: 37,616 bytes, `sha256:2aa84194b6d27df7a84a31fb403fcc8056ada55289320c922b50d43f928fff9e`.
- Exact external stderr: 19,492 bytes, `sha256:00ce84e8736d7583a9716c2cc28900f92401a907f381c72e074578739408805e`.
- Exact external receipt: 1,150 bytes, `sha256:8ca188db2a1f74defe99939c4a8f0db3592d906276353e09363908ef2e8737cd`.
- Source identity and clean-worktree state remained exact before and after the run.

## Cause

The final Revision 34 status rewrite retained current release state but replaced the explicit statements that Revision 1 has incomplete fan-in, Revisions 2 and 3 retain `split`, and later correction phases retain their recorded `pass` routes. The pre-commit focused command ran only the live-routing invariant, so it did not exercise the adjacent historical-outcome invariant.

## Route

`verify -> diagnose -> fix -> verify`. Revision 34 is retired as a release candidate. Revision 35 restores all three historical outcomes and makes both status invariants the mandatory final focused gate after every active-status edit. The causal pair passes 2/2; a fresh immutable aggregate remains required.

## Pre-Commit Full-File Timeout Stop

After the status pair passed 2/2, the complete release-review file passed 30/31 and reproduced contradictory timeout evidence: primary `taskkill` rejection, explicit fallback acceptance, and no surviving descendant. Restricted repetition reproduced the route five times; native Windows repetition proved the primary route five times. The causal correction derives top-level acceptance from either accepted route and retains descendant liveness as a separate assertion. Focused restricted verification passes 5/5 and the complete release-review file passes 31/31. This pre-commit source was not an immutable candidate, so the correction remains within Revision 35.

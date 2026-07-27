# V14 Vertical Slice Host Launch Log

## Approved bindings

- Compilation: `sha256:ef1a9ec09a789eed249090a49800d10c9670dfbbfb9703e5691fa24996bed614`
- Package: `sha256:d0a501942fef1a5b3b82add368ed01e967c7639cd9c204bac62db1f94089276f`
- Integration baseline: `933d232`
- Host: Codex Desktop on Windows

## Attempt 1

Three root specialists were launched from the approved first wave with the assignments preserved in
`runtime-plan.json`.

The Codex adapter specialist returned before verifying its generated contract. Native subagents
were forked from the Codex task's original repository workspace, while the approved V14 package was
committed in the separate `C:\tmp\swecircuit-identity-main` integration worktree. The relative
contract path therefore did not resolve in the specialist workspace.

Outcome: `diagnose`.

No attempt-1 handoff is accepted. Its four files remain isolated from the integration worktree
until the corrected specialist verifies the exact contract and resubmits.

## Corrective action

The host sent each live specialist the exact absolute package-contract and V14 source paths as
explicit read-only context. Specialists were told to:

- verify the compilation, package, blueprint, byte, and source digest bindings;
- use their fork's declared V12 baseline sources rather than uncommitted integration changes;
- preserve the failed context-delivery attempt in their handoff;
- claim `pass` only after exact verification.

This correction does not change either approved package digest. It changes only the external
host's context-delivery behavior.
## Attempt 2

The host created one clean detached worktree per root specialist at baseline `933d232`:

- `C:\tmp\swecircuit-v14-routing-agent`
- `C:\tmp\swecircuit-v14-tests-agent`
- `C:\tmp\swecircuit-v14-adapter-agent`

Independent host verification matched 11 routing, 9 test, and 5 adapter repository sources to
their approved raw byte counts and SHA-256 digests. The result is preserved in
`worktree-binding-verification.json`.

Detached worktrees did not contain dependency materialization. The first routing typecheck failed
before compilation because `node_modules/typescript/bin/tsc` was absent. The host supplied the
repository's existing dependency tree as ignored Windows junctions in the routing and test
worktrees; no dependency was installed or changed.

The adapter specialist then emitted a verified `pass`. The test-author specialist emitted a
verified `block`: its independent files and syntax checks completed, but executable verification
requires the routing producer. The block is preserved and is not accepted as successful evidence.
A successor verification step must execute the tests after integration.
# V11 Integration Authority Gate: Attempt 10

## Outcome

`REDESIGN`

## Candidate Binding

- Goal revision: 10.
- Compilation: `sha256:b5afa1bc523606956225516689dcda762758852aa1bcbd9463dd4b5ad9b923b4`.
- Package: `sha256:0c367895e0194b2fb543494c6df3c1172987eb457a4f1d19ab27d7fb5c600480`.

## Finding

The compiled `integrate.release` specialist can write `docs/memory/**`, `docs/milestones/v11.md`, and `docs/specs/v11-specialist-compiler/**`, but its independent `filesystem.read` demand omits those live output paths except for four immutable or public inputs. Safe source-preserving read-modify-write integration therefore cannot be executed under the exact authority contract.

Supplying current output bytes through a transient host prompt would add undeclared context. Assuming write implies read would contradict the separate permission kinds and exact scope contract. Blind overwrite would violate source preservation.

## Routing

Add bounded read demand for the same three documentation paths the integration work unit may already update, mirror those keys in its `filesystem.read` permission, increment the GoalContract revision, recompile, and repeat candidate binding plus affected authority/release review. Do not widen executable source or runtime authority.

## Preserved Evidence

Revision 10 remains a valid pre-integration technical candidate: preparation and all three independent reviews passed, and release verification passed 334/334 canonical tests plus the complete 95-scenario matrix. It is not eligible for final integration or owner approval.

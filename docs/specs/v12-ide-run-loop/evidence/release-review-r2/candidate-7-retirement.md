# Candidate 7 Retirement

## Candidate

- Commit: `f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa`.
- Tree: `107aea7b5665282527b39c3bb6f210cb5628aac3`.
- Source: 2,029 files, 57,034,313 bytes, `sha256:1ee8d7a7279516534e6b6660536be94ad244df22295e2dd1a7531f4999f22f53`.

## Outcome

`fail`. The exact source digest, post-command digest, disposable Git context, live repository state, and cleanup all passed. The canonical command completed 404 of 405 kernel tests, then failed `host TypeScript entrypoint supply is singular, plain, absolute, and external` because that unit test invoked the resolver with an empty synthetic environment. Inside the dependency-free materialization, its repository-relative development default did not exist.

## Evidence

- Receipt: 2,294 bytes, `sha256:8dfc1033ce467727e8603a11a417b57164f1569a463c2b12c7b1d1efe74de880`.
- Stdout: 31,949 bytes, `sha256:13cc6b063a0d0283f5ece6053a822cf1af5cb9553b5c474e83e1126120ea2830`.
- Stderr: 19,354 bytes, `sha256:f1c19d541b010155bd5ed0af4babbe81534106ea1cf3258c758efc36113c95d0`.
- Exact paths: `inputs/canonical-gates/f981929edd75e1ab8e71eb8eb37ef1cd1f21b1fa/`.

## Root Cause

The production gate correctly supplied an explicit host-owned TypeScript entrypoint to the isolated canonical command. The unit test bypassed that environment and tested the implicit development default against the candidate copy of the release script. The pre-freeze worktree had `node_modules`, so the environment-sensitive test passed there and failed only in the exact dependency-free candidate.

## Route

Candidate 7 is permanently retired and must not be rerun. Revision 14 injects a temporary external default into the resolver test seam while leaving the production default unchanged, and adds regressions proving injected defaults still reject relative, linked, and candidate-contained paths. A new V11 source-bound trust revision and a new frozen candidate are required.

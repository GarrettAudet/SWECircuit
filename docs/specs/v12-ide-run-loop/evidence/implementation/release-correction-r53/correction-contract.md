# Revision 53 Correction Contract

## Trigger

Revision 52's fresh exact-byte review returned `fix` on POSIX install validation, nested npm command authority, and aggregate cleanup output.

## Objective

Bind one npm command path to its resolved target and CLI across outer and nested execution, validate it independently in R2, and preserve all preparation failure evidence.

## Required Behavior

1. Accept only the bound Node plus npm-CLI install command on every OS.
2. Preserve the npm command path selected from `PATH` separately from its resolved target.
3. Put the bound npm command directory before a distinct Node directory for nested scripts.
4. Snapshot command type and link target before and after verification.
5. Have R2 re-resolve and hash the command target on the same host.
6. Render original and cleanup failures recursively while preserving ordinary CLI errors.

## Scope

Canonical gate host-tool authority, R2 receipt validation, failure rendering, copied identity bindings, and focused regressions only.

## Route

`review -> fix -> verify -> review -> freeze`

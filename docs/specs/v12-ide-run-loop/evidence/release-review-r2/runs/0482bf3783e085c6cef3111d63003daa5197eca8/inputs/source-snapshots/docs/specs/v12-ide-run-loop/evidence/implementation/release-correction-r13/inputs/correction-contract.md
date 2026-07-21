# Revision 13 Toolchain Supply Contract

## Goal

Make clean installed-consumer verification use an explicit host-owned TypeScript entrypoint when the exact candidate contains no installed dependencies.

## Confirmed Cause

Candidate 6 materialized only committed Git blobs. The release gate supplied an external npm cache and added host binaries to `PATH`, but `scripts/check-packed-consumer.mjs` ignored that supply and launched `ROOT/node_modules/typescript/bin/tsc`. Under exact materialization, that candidate-local path does not exist.

## Implementation Contract

- Add one explicit, IDE- and provider-neutral TypeScript entrypoint supply from the release host to the canonical child.
- The supplied path must resolve outside the exact candidate materialization.
- The consumer check must accept at most one case-insensitive supply, require a non-empty absolute path to a plain regular non-symbolic-link file, and otherwise use the repository-local TypeScript entrypoint for ordinary development.
- Do not create, copy, link, or mount `node_modules` inside the candidate.
- Do not weaken exact before/after materialization inspection, offline package installation, cache isolation, Git isolation, cleanup, or source provenance.
- Keep changes within `scripts/check-packed-consumer.mjs`, `scripts/run-v12-release-gate.mjs`, and `test/v12-release-gate.test.mjs`.
- Do not regenerate V11 evidence; the integration owner owns the independent Revision 38 rebuild.

## Acceptance

- Focused release-gate tests prove the supplied TypeScript entrypoint is absolute, outside the candidate, and passed to the child.
- Focused source assertions prove the consumer uses the validated supply for TypeScript compilation.
- Ordinary local `npm run consumer:check` still passes.
- The next exact candidate gate reaches and passes the installed-consumer TypeScript host.

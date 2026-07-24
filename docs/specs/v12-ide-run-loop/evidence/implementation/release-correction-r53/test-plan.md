# Revision 53 Test Plan

## Focused Regressions

- Use one authenticated install command shape on Windows and POSIX.
- Bind npm command path, regular-file or symlink form, link target, resolved target, bytes, digest, and version.
- Order the npm command directory before a distinct Node directory.
- Re-resolve and hash the command target independently in R2.
- Preserve simple CLI errors and recursively render aggregate and cause chains.
- Retain all R52 atomic-publication, cleanup, runtime, and npm 10+ regressions.

## Pre-Commit Gates

- JavaScript syntax checks.
- Complete release contract suite.
- Exact-lock install, real typecheck, fresh ESM imports, and cleanup probe.
- Template, format, lint, typecheck, and diff checks.
- Fresh exact-byte independent review.

## Post-Commit Gates

- Exact copied production lifecycle.
- Full `npm.cmd run verify`.
- One canonical gate invocation for the exact commit.
- Fresh three-lane R2.
- Hosted CI.

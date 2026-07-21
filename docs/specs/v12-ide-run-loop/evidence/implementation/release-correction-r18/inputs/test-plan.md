# Revision 18 Test Plan

## Static Trust Checks

1. Parent imports only Node built-ins and never imports candidate runtime or worker modules.
2. Worker files have no static generated-runtime import; live test imports trigger no `dist` execution.
3. Direct worker invocation without a valid parent binding fails before dynamic import or output.
4. `package.json` includes the parent entrypoint in format and lint checks and exposes one concise R2 command if a script is added.

## Materialization And Supply Checks

1. Complete candidate-tree materialization preserves exact Git blob bytes and mode identity.
2. Runtime roots are outside repository ancestry and use verified realpath containment.
3. Unsafe paths, case aliases, ADS syntax, Windows reserved names, trailing dots/spaces, links, reparse points, and detectable hardlinks fail closed.
4. The exact lock rejects missing SRI, local/file/Git supply, or missing packages.
5. An empty or incomplete cache makes offline install fail without fallback; a provisioned cache succeeds with scripts disabled.
6. Installed supply cannot resolve bare packages outside the private `node_modules` closure.

## Runtime And Evidence Checks

1. Source, worker, dependency, toolchain, generated-runtime, and environment-policy bindings produce one deterministic `runtimeBindingDigest` independent of random materialization paths and timestamps.
2. Candidate source, lockfile/cache supply, generated output, runtime-binding, seeded input, toolchain fact, or post-run substitution fails closed.
3. Every phase uses a fresh child and unique materialization; ESM cache cannot cross invocations.
4. Child failure, signal, unexpected output, source mutation, post-run digest mismatch, or cleanup failure prevents live promotion.
5. Mode-specific outputs are staged, byte-bound, and promoted immutably only after parent verification.
6. Candidate manifest, runtime-binding context, phase metadata, compilation summary, approval, and handoff report expose the same direct runtime digest.
7. Existing exact candidate, gate, package, approval, raw-handoff, and non-`pass` routing checks remain intact.

## Required Commands

1. Run the focused bootstrap and R2 tests.
2. Run `node --test test/v12-release-review.test.mjs test/v12-release-gate.test.mjs`.
3. Run `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`.
4. Run repository format check, lint, typecheck, build, and `git diff --check`.
5. Run one disposable outside-repository `npm ci --offline --ignore-scripts --no-audit --no-fund` proof with the explicit provisioned cache.
6. Inspect the complete diff for scope, portability, source preservation, and truthful external-host claims.

## Success

All checks pass and every R2 semantic output can be traced to one exact candidate, one exact offline-installed dependency supply, one exact generated closure, and one parent-verified fresh child execution without any repository-live generated import or pre-verification output promotion.

## Stop

Return `fix`, `diagnose`, `redesign`, or `block` if the parent cannot remain free of candidate imports, offline lock integrity cannot be established, a child can resolve through repository ancestry, protected bytes can change without detection, cleanup or staging boundaries are unsafe, any output reaches the live repository before verification, or the correction requires edits outside declared scope.

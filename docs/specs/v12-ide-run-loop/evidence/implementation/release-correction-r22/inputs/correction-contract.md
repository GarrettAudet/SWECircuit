# Revision 22 Provenance And Closed npm Configuration Contract

## Problem

Revision 21 proves the copied production lifecycle behavior, but its approved package cannot authenticate one declared input. The package bound a 47,904-byte intermediate test/v12-release-review.test.mjs that was neither committed nor preserved as an immutable snapshot. V11 therefore verified the replacement handoff as block even though the focused lifecycle passed.

Integration review also reproduced a production defect hidden by the Revision 21 fixture adapter. closedEnvironment assigns both npm_config_userconfig and npm_config_globalconfig to the same null-device spelling. npm 11 rejects that duplicate config source. The fixture succeeds only by deleting npm_config_globalconfig, which restores the host global npm configuration and contradicts the declared closed-environment policy.

## Authoritative Input

The files under inputs/pre-edit/ are immutable byte-for-byte snapshots of every live production or test source this correction may inspect or edit. The files under inputs/evidence/ preserve the exact Revision 21 non-pass route.

Before editing, require each authorized live path to match its corresponding pre-edit snapshot. Do not infer an unavailable intermediate from Git history, a chat transcript, or a digest-only declaration.

## Required Correction

1. Create two distinct, empty, plain, one-link npm configuration files inside each fresh release-review operation root before npm is inspected or invoked.
2. Require both config files to resolve inside that exact operation root, outside the repository, candidate, and offline cache, with zero bytes and the empty-file SHA-256 digest.
3. Pass their distinct absolute paths as npm_config_userconfig and npm_config_globalconfig in every closed npm environment. Reject missing, aliased, substituted, linked, non-empty, out-of-root, or case-insensitively colliding paths before process spawn.
4. Keep runtime reconstruction stable across compile, approve, and verify. Bind the config policy and content identities without putting invocation-specific temporary paths into the stable runtime digest.
5. Make production receipts or child evidence prove that the private config policy was enforced. Do not claim disabled host configuration from an adapter or from static prose alone.
6. Update the copied harness to validate the actual private config paths and files delivered by the parent. It must reject the previous same-path null-device environment.
7. Remove the Revision 21 npm compatibility adapter from the lifecycle fixture. The positive lifecycle must use the installed npm CLI directly through the copied production parent and still pass on npm 11.
8. Add focused regression coverage showing:
   - the previous same-path environment fails under npm 11;
   - the production private-config environment succeeds;
   - npm reports the exact private user and global config paths rather than host defaults;
   - config substitution and aliasing fail before npm spawn;
   - operation-root cleanup removes both files.
9. Replace platform-specific outside-repository assertions with path-boundary logic that is correct on Windows and POSIX.
10. Preserve the real isolated gate, compile, standalone approve, verify, byte-equality, package-bound handoff fan-in, receipt-last, ten negative routes, and cleanup proof from Revision 21.
11. Preserve exact source provenance: the compiled specialist package must bind the immutable pre-edit snapshots, and the final handoff must report both pre-edit and post-edit identities.

## Authority

The specialist may edit only:

- scripts/run-v12-release-review.mjs
- docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs
- test/v12-release-review.test.mjs
- test/v12-release-gate.test.mjs
- test/helpers/v12-release-review-lifecycle.mjs

Do not edit:

- scripts/run-v12-release-gate.mjs
- docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs
- package.json
- package-lock.json
- prior evidence
- the immutable Revision 22 input snapshots

Do not mutate Git state, use network access, refresh V11, run release phases against the real repository, claim release readiness, or merge.

## Pass Condition

The exact package and every declared input reconstruct; the production parent uses two authenticated private empty config files with no host npm configuration; direct npm 11 inspection and the complete copied-production lifecycle pass; all frozen bytes and source snapshots remain exact; and a closed package-bound handoff reports the exact evidence.

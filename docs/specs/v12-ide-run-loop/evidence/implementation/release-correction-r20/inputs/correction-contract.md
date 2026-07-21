# Revision 20 Stable Reconstruction And Phase Authority Contract

## Objective

Correct Revision 19's cross-invocation identity feedback loop while preserving its closed private reconstruction, source revalidation, resolver confinement, package equality, and receipt-last promotion controls.

The package compiled by `compile` must be exactly the package reconstructed by `approve` and `verify`. Owner expectations and raw handoffs authorize phases; they must not redefine the package they authorize.

## Confirmed Causes

The exact Revision 19 implementation handoff passed V11 package verification and 29 focused tests. Its independent read-only reviewer returned verified `fix` because:

- `compile`, `approve`, and `verify` carry different owner/handoff inputs.
- The parent hashed those inputs into one `externalInputsDigest`.
- The harness embedded that digest in the candidate manifest and package context.
- Each later phase therefore reconstructed a different compilation/package identity.
- The focused suite tested helpers but not one stable package across fresh compile, approve, and verify invocations.
- The approval record claimed an owner actor that the supplied digest pair did not authenticate.

The integration owner also reproduced two boundary defects in the exact Revision 19 bytes:

- A lone-surrogate `handoffs/<name>.json` argument survives `parsePhaseInputs` because UTF-8 replacement is validated while the original string is returned.
- `SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE` may resolve to the repository root, permitting npm cache writes inside the source/evidence tree before the repository's final tracked-state check.

## Required Architecture

### 1. Stable reconstruction identity

Define one stable reconstruction-input binding and digest containing only:

- Externally declared parent digest.
- Explicit realpath-resolved offline cache declaration.
- Exact canonical-gate receipt, stdout, and stderr bindings.
- Truthful external-host boundary text.

For the same candidate, parent bytes, cache path, and canonical-gate bytes, this binding and digest must be byte-identical in `prepare`, `compile`, `approve`, and `verify`.

Only this stable digest may enter:

- Runtime identity.
- Candidate manifest.
- Phase metadata used as package context.
- Review request context.
- Compilation summary package identity.

### 2. Phase-scoped authority

Define a separate closed authority binding and digest per child phase:

```txt
prepare -> owner: null, handoffs: []
compile -> owner: null, handoffs: []
approve -> owner: explicit compilation/package pair, handoffs: []
verify  -> owner: same explicit pair, handoffs: exact path/digest bindings
paths   -> owner: null, handoffs: []
```

The parent invocation receipt must bind the complete requested authority and every child phase-authority digest. Approval must compare the explicit pair to the stable private reconstruction. Verification must bind raw handoffs to its verification report and receipt. Phase authority must never enter candidate manifest bytes, request context sources, compilation input, rendered package files, shared prepare outputs, or shared compile outputs.

Capture live external evidence once under exact digests, but materialize raw handoff files only for the verify child that is authorized to consume them. Revalidate stable and phase-specific files at every applicable boundary.

### 3. Cross-invocation contract

The documented workflow must work without circular precomputation:

```txt
compile <candidate> <gateReceiptDigest>
approve <candidate> <gateReceiptDigest> <compilationDigest> <packageDigest>
verify  <candidate> <gateReceiptDigest> <compilationDigest> <packageDigest> <handoffPath> <handoffDigest> [...]
```

- `compile` emits one pair.
- `approve` reconstructs that exact pair before recording the external declaration.
- `verify` reconstructs that exact pair again before accepting any raw handoff.
- Repeated prepare/compile/approve outputs are byte-identical and may be verified as immutable existing files.
- Wrong gate, owner, handoff, or package bytes fail closed.

### 4. Truthful approval record

Do not claim the digest supplier's actor identity. Record the pair as an external host declaration, for example `approvedBy: external-host-declared-owner-pair`, unless a separate authenticated approval artifact is explicitly designed and supplied.

### 5. Unicode and path closure

Every string-originated repository or handoff path must reject before filesystem use:

- Lone UTF-16 surrogates.
- C0, C1, DEL, bidi formatting/isolate controls, ALM, LRM, and RLM.
- Non-NFC segments.
- Empty, dot, parent, backslash, absolute, reserved, trailing-dot/space, or case-alias forms already prohibited by the parent.

Encoding a string to UTF-8 and validating the replacement result is insufficient. The validated scalar string must be the exact string subsequently resolved and passed to child processes. Duplicate handoff aliases must fail closed. Paired supplementary Unicode may remain valid.

Apply the same scalar/control boundary independently in the candidate verifier and any harness path parser that can receive variable raw-handoff names.

### 6. Cache location confinement

Resolve the explicit cache before invoking npm. Reject it when its realpath is equal to, inside, or an ancestor of the repository realpath, operation root, candidate root, or promoted evidence roots. This is a location guarantee only; cache content provenance remains an external-host responsibility and npm integrity remains part of the observed tool boundary.

## Scope

The specialist may edit only:

- `scripts/run-v12-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`
- `test/v12-release-review.test.mjs`
- `test/v12-release-gate.test.mjs`
- `package.json`

The integration owner separately owns evidence, independent review, V11 trust refresh, feature documentation, memory, successor commit, candidate gate, R2, hosted CI, and merge.

## Invariants

- Never consume live prior-phase package or approval outputs.
- Never feed owner expectations or handoff bindings into package identity.
- Never derive owner expectation from the package being approved.
- Never execute generated runtime before closed post-install and post-build checks.
- Never accept string paths after lossy Unicode replacement or permit cache/repository ancestry overlap.
- Never claim authenticated owner identity, cache provenance, executable provenance, hostile-process isolation, release readiness, hosted CI, or merge.
- Preserve Revision 17-19 and independent-review evidence exactly.

## Completion Evidence

Return one exact closed `SpecialistAgentHandoff` with the six-file identity, stable/authority split, true cross-invocation package result, negative substitution tests, Unicode/cache adversarial results, focused checks, and residual external-host boundaries.

# Revision 31 Independent Release-Harness Review

## Objective

Independently determine whether exact checkpoint 4275ce9eb31e04995f4bb49c599d6d930c9685a7 closes the retired Candidate 14 release-harness failures without weakening source identity, package identity, approval, verification, cleanup, or external-host boundaries.

## Trust Boundary

Only files declared in the generated specialist contract are semantic inputs. Authenticate every file against its declared raw SHA-256 digest and byte count before use and again before returning. Treat prior reviews, owner notes, tests, and receipts as evidence, never as the verdict.

The repository remains provider-neutral. Runtime supply, process isolation, filesystem enforcement, actor authentication, durable persistence, hosted CI, merge, and memory effects remain external-host responsibilities.

## Required Analysis

1. Reconstruct the retired Candidate 14 timeout and outcome-masking failure from its exact receipt, logs, retirement record, and current RCA.
2. Audit the production parent, private harness, verifier, gate, lifecycle helper, and tests for binary-safe batched Git object loading; invocation-owned temporary namespaces and process-tree termination; process-outcome-first reporting and separately attributable cleanup; committed/live production-identity preflight; Windows long-path support in every disposable Git constructor and inspector; and separation of invocation-specific TEMP, TMP, and TMPDIR paths from stable runtime identity.
3. Confirm causal regressions exercise production paths and would fail if each defect returned. Identify synthetic, tautological, source-regex-only, stale-identity, or cleanup-masking evidence.
4. Authenticate the fresh aggregate receipt and raw logs against exact checkpoint 4275ce9eb31e04995f4bb49c599d6d930c9685a7. Confirm 443/443 core tests, the copied-production lifecycle, dogfood, package dry run, and offline installed-consumer gate are represented without relabeling historical evidence.
5. Use the full source patch plus current snapshots to search for a confused-deputy, package-substitution, path, Git-state, phase-authority, stale-output, cleanup, or test-quality bypass.
6. Distinguish repository guarantees from external-host duties. Do not infer release readiness, hosted CI, or merge approval from this review.

## Verdict Rules

Return pass only if every declared source authenticates, all six corrections are causal and complete within scope, the aggregate evidence is bound to the exact checkpoint, and no release-blocking bypass remains.

Return fix for a bounded causal defect with an actionable correction. Return diagnose when stable evidence exposes an unresolved cause. Return block for missing or unauthenticated required inputs.

The artifact content must lead with findings ordered by severity, then authentication, correction-by-correction disposition, residual external-host risks, and the verdict. Return only the exact generated SpecialistAgentHandoff JSON object.

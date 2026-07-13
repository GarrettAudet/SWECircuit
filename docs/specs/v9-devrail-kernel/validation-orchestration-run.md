# V9 Validation Kernel Orchestration Run

## Status

Complete.

## Pattern

Single implementation owner plus one independent read-only reviewer.

## Branch And State

- Branch: `codex/v9-devrail-kernel`
- Frozen input baseline: `9932371`
- Active task: T006 deterministic project validation
- Dirty state at review fan-out: integrated source and test implementation with 36 local tests passing after hardening
- Merge target: none for the reviewer handoff

## Roster

| Role | Work Unit | Authority | Stop Condition |
| --- | --- | --- | --- |
| Primary IDE agent | A: integrated implementation | Own source, tests, diagnosis, synthesis, and verification. | Stop on contract ambiguity, scope expansion, or unsafe behavior. |
| Locke (`019f5cab-286c-7ed0-a7d6-6daaae21d020`) | B: independent validation review | Read and recommend only. | Stop outside T006 project validation. |

## Fan-Out Log

| Step | Role | Work | Context Bundle |
| --- | --- | --- | --- |
| 1 | Integration owner | Implement and harden parser, path, schema, reference, graph, permission, and diagnostic behavior. | ADR 0001, v1alpha1 schemas, diagnostic catalog, case matrix, and feature package. |
| 1 | Locke | Independently challenge the integrated validation behavior. | Same frozen contracts plus current source and tests. |

## Integration Notes

- The reviewer has no write authority, so kernel ownership remains unambiguous.
- Local work continues only on non-overlapping implementation and fixture hardening.
- A parser/Ajv boundary crash entered the diagnosis protocol, received a confirmed RCA, and now has regression coverage.

## Handoff

Locke returned `REVISE` with six findings. The integration owner mapped them as follows:

- Fixed: forbidden explicit roots are rejected before filesystem access, and discovered links are rejected without target dereference.
- Fixed: canonical comparison is rooted at the resolved project root, so a project reached through an aliased ancestor remains valid.
- Clarified and deferred: opaque same-path Windows reparse attributes are not visible through the approved pure Node API; enforceable link and path-altering reparse behavior remains fail-closed.
- Fixed: filesystem identity checks use bigint device and inode values.
- Fixed: JSON Pointer sanitization decodes RFC 6901 tokens and truncates before encoded host-path content.
- Fixed: native link tests are mandatory and cannot silently skip in supported CI.
- Added: multi-node bounded and unbounded cycles, fan-out mismatch, reachability, all permission kinds, invalid scope grammar, and filesystem prefix-boundary tests.
- Fixed after re-review: canonical containment is an extracted production decision with deterministic exact-path, internal-mismatch, and outside-root `SC1014` coverage. The required X04 case is separate from deferred opaque same-path Windows metadata.

Locke re-reviewed the integrated disposition and returned `PASS` with no remaining T006 defect.

## Verification

The canonical executable gate passes 49 tests with zero skips plus format, lint, typecheck, build, and package inspection. The workflow checker and all seventeen malformed-repository regressions pass. Independent reviewer fan-in is `PASS`. GitHub Actions run `29277160551` passes Template Check and Node 22/24 on Ubuntu, Windows, and macOS.

# V11 Specialist Compiler Implementation Plan

## Status

In progress.

## Summary

Add one small pure compiler family above the existing V9/V10 kernel. Goal synthesis remains semantic and IDE-facing; core validates a closed GoalContract, constructs canonical team partitions, selects one under an explicit objective, derives exact AgentBlueprints, and renders a digest-bound provider-neutral package.

## Impacted Areas

- `src/specialist.ts` for contracts, validation, candidate construction, scheduling, selection, digesting, and rendering.
- `src/constants.ts`, `src/diagnostics.ts`, and `src/index.ts` for additive public values.
- `test/specialist.test.mjs` and specialist fixtures for behavior and golden baselines.
- Packed-consumer checks for additive public API and current-export compatibility.
- ADR 0004, IDE kickoff, module guide, README status, feature evidence, milestone, and memory.

## Approach

1. Freeze the closed JSON contract and fixed limits.
2. Snapshot untrusted direct inputs before reading them.
3. Normalize unordered semantic sets and derive a supply-free authority projection.
4. Validate one stable work-unit DAG and exact evidence ownership.
5. Enumerate all canonical partitions for small goals; use deterministic structural candidates for larger goals; add normalized supplied partitions.
6. Derive each candidate's agent DAG, authority/context unions, conflict graph, deterministic schedule, and exact metrics.
7. Reject candidates that violate hard gates, then select by one total comparator.
8. Compile selected groups into immutable AgentBlueprints and bind the compilation with SHA-256 canonical JSON digests.
9. Render static JSON/Markdown files without filesystem effects or raw Markdown interpolation.
10. Dogfood the compiler on its own remaining work and independently review one immutable candidate.

## Interfaces And Data

Additive root exports:

- `SPECIALIST_API_VERSION`, `SPECIALIST_LIMITS`, and `SPECIALIST_KINDS`.
- `deriveTaskAuthorityProjection(input)`.
- `compileAgentBlueprints(input)`.
- `renderSpecialistPackage(compilation)`.
- Public specialist input, output, metric, blueprint, manifest, and rendered-file types.

No existing schema, artifact kind, command, or executor type changes. V11 specialist values use a separate `swecircuit/specialist/v1alpha1` family.

## Architecture And ADR Impact

ADR 0004 records the split and supersedes ADR 0003 only as the V11 implementation target. ADR 0003 and all failed review evidence remain retrievable for the later runtime layer.

## Security And Privacy

- Direct inputs are detached through the existing bounded JSON snapshot.
- Closed records, bounded arrays/text, safe identifiers, finite safe integers, SHA-256 grammar, and high-confidence secret rejection fail before output.
- Context sources require expected digest and byte count; repository sources require an exact read-scope key.
- Candidate teams can only narrow owner-declared authority.
- Rendering uses generated paths and contained machine values; it never executes or writes them.

## Rollback Or Recovery

The implementation is additive on a version branch. Revert the specialist-specific commit while retaining the split ADR and Round-4 evidence if the compiler gate fails. Do not merge or advertise the API until independent review passes.

## Risks And Mitigations

- Risk: Exact search consumes excessive CPU or memory.
- Mitigation: Fix the exhaustive limit, cap candidates/agents/work units, stream evaluation into bounded retained summaries, and test boundary counts.
- Risk: Candidate identifiers influence selection.
- Mitigation: Rank canonical partitions, not user labels or input order.
- Risk: Deterministic metrics are mistaken for real duration.
- Mitigation: Name them planning weights, preserve costs and mode, and dogfood against observed outcomes.
- Risk: Bounded search misses a better team.
- Mitigation: Include serial, atomic/balanced, Module, evidence, dependency, and scope candidates plus supplied alternatives; expose bounded mode and evaluation digest.
- Risk: A host launches a changed roster.
- Mitigation: Put the compilation digest in every rendered contract and manifest launch entry.

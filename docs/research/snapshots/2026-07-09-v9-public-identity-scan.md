# 2026-07-09 V9 Public Identity Scan

## Purpose

Reopen naming after the DevRail collision and recommend a distinctive identity before V9 freezes package, binary, schema, configuration, repository, or domain names.

## Criteria

A strong name must be:

- Clear enough to explain in one sentence.
- Distinct within AI-assisted software development.
- Easy to pronounce, spell, search, and extend.
- Compatible with a modular and parallel workflow visual language.
- Broad enough for core, CLI, adapters, packs, and community modules.
- Free of known exact package and repository collisions.
- Available enough that the owner can secure the important namespace promptly.

## Rejected Names

| Name | Reason |
| --- | --- |
| TraceRail | Active adjacent agentic automation product at tracerail.io. |
| DevRail | Active AI-agent development standards framework, existing initializer and configuration vocabulary, and occupied npm package. |
| AgentRail | Occupied npm package for coding-agent event normalization. |
| BuildRail | Occupied npm package for AI-native development workflows. |
| WorkRail | Multiple active developer work-trace and AI workflow products. |
| SpecRail | Occupied npm package for a spec-driven AI coding-agent workflow. |
| RailStack | Occupied guardrails CLI package. |
| SpecWeave | Occupied AI skills and spec-first planning product. |
| Proofline | Occupied AI-code verification product. |
| RailForge | Active AI systems company and several rail products. |
| SWEFlow | Existing software-engineering research framework and unrelated established software product. |
| SWEChain | Existing SWE-agent economics SDK and dataset vocabulary. |
| CodeCircuit | Existing 2026 LLM code-correctness research project and other active brands. |
| AgentCircuit | Existing AI-agent reliability package. |
| DevCircuit | Existing AI-enhanced circuit product. |

## Finalists

| Candidate | Semantic Fit | Collision Result | Tradeoff |
| --- | --- | --- | --- |
| SWECircuit | Excellent | No exact npm, PyPI, crates.io, or GitHub repository result; swecircuit.com, .dev, .ai, and .io returned not found in registry checks. | Requires circuit to become the public composition primitive. |
| SWEAssembly | Good | No exact npm or GitHub repository result; sweassembly.com and .dev returned not found. | Conveys modular construction but not routing, gates, feedback, or traceability as strongly. |
| SWELattice | Good | No exact npm or GitHub repository result; swelattice.com and .dev returned not found. | Conveys parallel structure but is more abstract and less immediately pronounceable. |
| TraceCircuit | Good | No exact npm or GitHub repository result; tracecircuit.dev returned not found. | tracecircuit.com is registered and the name emphasizes observability more than software delivery. |

Registry status is point-in-time evidence, not a reservation or legal clearance.

## Recommendation

Use **SWECircuit**.

The name follows the same simple pattern that makes ecosystem names memorable:

```txt
SWE + Circuit
domain + composition primitive
```

It maps directly to the product:

| Product Concept | Circuit Concept |
| --- | --- |
| Module | Component |
| Typed handoff | Connection |
| Routing decision | Gate |
| Parallel work | Branch |
| Retry or diagnosis | Feedback loop |
| Execution history | Signal trace |
| Verified output | Tested circuit output |

This metaphor is more accurate for parallel agent development than a purely linear rail. It naturally supports fan-out, fan-in, conditional routing, feedback, and inspection while keeping the visible formula simple.

## Proposed Positioning

Short category line:

> Composable circuits for AI software engineering.

Repository description:

> SWECircuit gives AI software teams modular workflows for decomposing tasks, routing agents, verifying outputs, and merging changes with a full execution trace.

Core expression:

```txt
goal | component | gate | component | evidence
```

Expanded expression:

```txt
goal -> spec -> decompose -> route -> parallel work -> integrate -> verify -> review -> memory
```

## Vocabulary Migration

If approved:

- `Circuit` becomes the public end-to-end workflow composition.
- `Component` is the public-friendly term for a module instance; `module` remains the extension contract type.
- `Gate`, `outcome`, `evidence`, `work packet`, `trace`, and `memory` remain.
- Historical TraceRail and Rail Composition artifacts remain unchanged as provenance.
- V9 documents a 0.x migration alias from `rail` to `circuit` rather than silently rewriting history.
- Current canonical docs, schemas, CLI, examples, and package surfaces use SWECircuit vocabulary consistently.

## Historical Namespace Proposal

The scan initially explored the following possible surfaces. The owner later approved only the project and GitHub repository name, so this table is research evidence rather than an active acquisition plan:

| Surface | Proposed Value |
| --- | --- |
| Display name | SWECircuit |
| Repository | SWECircuit |
| npm package | swecircuit or an owner-controlled scoped package |
| CLI binary | swecircuit |
| Project manifest | swecircuit.json |
| Local state directory | .swecircuit/ |
| Schema namespace | owner-controlled SWECircuit schema URL |

Only the display name and GitHub repository were approved. Re-evaluate every other value if and when an implemented public interface creates a real need.

## Evidence Collected

- Exact npm queries across 51 candidates.
- Exact GitHub repository-name queries for seven finalists.
- Public search for adjacent products and research projects.
- RDAP checks for finalist .com, .dev, .ai, and .io domains where supported.
- Exact PyPI and crates.io checks for SWECircuit.

## Resolution

The owner approved SWECircuit as the project and GitHub repository identity on 2026-07-10 and clarified that this decision concerns the repository name, not speculative package or domain acquisition. The GitHub repository was renamed to `GarrettAudet/SWECircuit` on 2026-07-13.

Circuit is approved as the public composition metaphor. Historical TraceRail, DevRail, Rail Composition, `tracepack-*`, `.tracerail/`, and rail-named paths remain source or 0.x compatibility artifacts until V9 defines tested machine-facing migration behavior.

The following remain deferred until an implemented interface creates a real need:

- npm package identity or publishing.
- CLI binary naming.
- Schema namespace.
- Domain acquisition.
- Local-state directory migration.

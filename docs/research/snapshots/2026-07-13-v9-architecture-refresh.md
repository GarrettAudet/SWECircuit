# 2026-07-13 V9 Architecture Refresh

## Purpose

Refresh volatile primary-source assumptions in ADR 0001 before SWECircuit freezes its first executable contracts. This supplements rather than replaces the 2026-07-09 kernel architecture scan.

## Questions

- Are the proposed Node support lines still production-supported?
- Has the recommended TypeScript compiler baseline changed?
- Is JSON Schema 2020-12 still the latest released dialect?
- Does Ajv strict validation remain appropriate?
- Has the pending MCP specification become stable?

## Primary Sources Reviewed

| Source | Current Evidence | V9 Impact |
| --- | --- | --- |
| [Node.js release policy](https://nodejs.org/en/about/previous-releases) | Node 24 and Node 22 are LTS; Node 26 is Current. Production applications should use Active or Maintenance LTS. | Keep Node 24 as the primary line and Node 22 as the compatibility line; do not make Node 26 a production baseline yet. |
| [TypeScript 7 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) | TypeScript 7 became generally available on 2026-07-08 with a native compiler and LSP, substantial build and editor speedups, and production-readiness evidence. | The ADR's TypeScript 5.8-era baseline is stale and needs an explicit 6-versus-7 decision. |
| [TypeScript 7 compatibility guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-60) | TypeScript 7.0 does not expose a compiler API; tools such as typescript-eslint may still require the TypeScript 6 compatibility package until 7.1. | SWECircuit may use TS7's `tsc` only if lint, declaration, and editor tooling do not depend on the compiler API; otherwise pin TypeScript 6 for V9 and record a 7.1 review trigger. |
| [Node test runner](https://nodejs.org/api/test.html) | `node:test` has been stable since Node 20. | Keep the dependency-free test-runner choice and avoid Node 26-only test features. |
| [Node `util.parseArgs`](https://nodejs.org/api/util.html#utilparseargsconfig) | The parser has been stable since Node 20. | Keep the built-in parser for the intentionally small V9 command surface. |
| [JSON Schema specification](https://json-schema.org/specification) | Draft 2020-12 remains the latest released meta-schema. | Keep 2020-12 as the canonical wire-contract dialect. |
| [Ajv strict mode](https://ajv.js.org/strict-mode) | Strict mode rejects ignored or ambiguous schema constructs and remains recommended for JSON Schema. | Keep Ajv 2020 strict compilation plus deterministic diagnostic normalization. |
| [MCP 2026-07-28 release candidate](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) | The candidate was locked on 2026-05-21, but final publication is scheduled for 2026-07-28. Tasks moves into an extension and the revision contains breaking changes. | Continue to borrow lifecycle concepts only; do not claim MCP Tasks or 2026-07-28 compatibility in V9. |
| [Biome documentation](https://biomejs.dev/) | Biome provides one formatter and linter for TypeScript, JavaScript, and JSON without requiring TypeScript's compiler API for its core parsing model. | Evaluate Biome as the smallest TS7-compatible format/lint path; do not adopt it until the ADR review confirms the dependency and configuration tradeoff. |

## Findings

### Stable Choices

- Node 24 primary plus Node 22 compatibility remains sound.
- Compiled ESM, built-in `node:test`, and built-in `util.parseArgs` remain the smallest portable runtime surface.
- Canonical JSON, JSON Schema 2020-12, Ajv strict validation, and separate semantic graph validation remain current.
- MCP remains an optional adapter influence rather than a core compatibility target.

### Material Change: TypeScript 7

TypeScript 7 is now stable and directly relevant to SWECircuit's IDE-first goal. Its native compiler and language server can materially shorten agent and developer feedback loops. The tradeoff is transitional tooling compatibility: 7.0 has no programmatic compiler API, so tools that embed TypeScript may still need 6.0 until 7.1.

The V9 choice should therefore be explicit rather than `5.8 or newer`:

1. Use TypeScript 7 for `tsc`, avoid compiler-API consumers in V9, and use a parser-independent formatter/linter such as Biome; or
2. Use TypeScript 6 for the first kernel, retain mature compiler-API tooling, and revisit TypeScript 7 when 7.1 exposes its API.

For SWECircuit's small, new, ESM-only kernel, option 1 is the leading recommendation if a clean toolchain spike passes on Node 22 and 24. Option 2 is the fallback if lint, declaration, or editor integration requires dual compiler packages or other transition complexity.

## ADR Changes Required Before Acceptance

- Replace `TypeScript 5.8 or newer` with a specific V9 compiler/tooling decision.
- State whether any build or lint tool may import the TypeScript compiler API.
- Name the formatter and linter strategy required by AC6.
- Keep Node 26 out of the supported production matrix until it reaches LTS.
- Clarify that MCP 2026-07-28 remains pre-final on the review date.

## Recommended Validation Spike

Before schemas or public APIs are frozen, create the smallest private toolchain shell and prove:

- clean install on Node 22 and Node 24;
- compiled ESM execution on both lines;
- strict typecheck and declaration emit;
- formatter and linter checks without a second TypeScript compiler;
- `node:test` execution against compiled output;
- no network access after dependency installation;
- no public package, CLI, schema, or local-state namespace commitment.

This spike validates the toolchain only. It must not freeze schema fields or command names before ADR acceptance.

## Decision State

The refresh supports the overall Node, JSON Schema, Ajv, event, and adapter direction. ADR 0001 should be revised for the TypeScript 7 transition and the missing format/lint choice before acceptance.

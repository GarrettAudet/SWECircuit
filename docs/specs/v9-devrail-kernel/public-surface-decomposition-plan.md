# V9 Public Surface Decomposition Plan

## Status

Local implementation checkpoint passed; branch CI remains.

## Goal

Make SWECircuit's repository surface concise, current, and executable without claiming capabilities or distribution interfaces that V9 does not provide.

## Product Boundary

- SWECircuit is the repository and project name only.
- The root package remains private and has no `bin` entry.
- The CLI is an internal source-checkout interface invoked as `node dist/cli.js`; it is not a published command.
- V9 implements project initialization, offline validation, and read-only trace inspection.
- V9 does not launch or schedule agents, execute circuits, write traces, retrieve evidence, merge branches, or improve workflows automatically.
- The protocol remains usable as file-based guidance; the executable kernel has pinned runtime dependencies.
- Historical TraceRail and DevRail records remain source provenance rather than current identity.

## Canonical Story

The public surface should explain one progression:

```txt
module -> circuit -> work packet -> external agent -> evidence gate -> verified integration -> caller-owned trace + project memory
```

Modules use one standard contract. A circuit composes modules. Decomposition creates bounded work packets. External IDEs or agent runtimes execute those packets, evaluate the protocol's evidence gates, and produce the caller-owned trace and project-memory artifacts. The V9 kernel validates and inspects those artifacts; it does not perform the external execution.

## Frozen Quick Start

Prerequisites are a source checkout, Node.js 22.14 or newer, and the npm version supplied with that Node installation. Every command starts at the repository root.

The immediate, repeatable example transcript is:

```powershell
npm ci
npm run build
node dist/cli.js validate --project examples/minimal
node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl
```

`npm ci` and `npm run build` must exit zero. The operation output is exact:

```txt
Validated example-project (0 artifacts).
Inspected traces/example.jsonl (2 events, 1 runs).
```

The example commands are read-only after installation and may be repeated without cleanup. `--trace` is relative to the explicit `--project` root.

Initialization uses the same built internal CLI against an existing empty directory:

```powershell
node dist/cli.js init --project <existing-empty-directory> --project-id quick-start
```

It prints `Initialized quick-start at swecircuit.json.` on first success. Initialization is intentionally one-time: a repeat reports owned collisions and does not overwrite the first result. The caller owns the target directory and its cleanup.

The E2E test must execute the example transcript after the test build, create a real temporary empty directory, run the exact `init` grammar with project ID `quick-start`, validate it, copy the example trace below that root, inspect it by repository-relative path, assert the exact summaries, assert package privacy/no `bin`, and remove only the test-owned temporary directory in `finally`.

## Deliverables

1. Rewrite `README.md` around the current product model, shipped kernel operations, explicit runtime boundary, and concise repository navigation.
2. Add one minimal valid example project and caller-owned JSONL trace for immediate validation and inspection.
3. Replace the current README embed with a SWECircuit-branded overview derived from the accepted V8 composition, while preserving the original TraceRail file and dated references as historical evidence.
4. Add executable quick-start coverage and checker regressions for identity, repository URL, overview asset, current operations, internal-CLI wording, and prohibited stale claims.
5. Update T009 specification, implementation, review, identity, and memory records with evidence.

## Work Unit A: Public Contract And Copy

- Objective: make the README truthful, distinctive, and easy to scan.
- Scope: `README.md`, the T009 plan/run, identity migration, and feature notes.
- Authority: revise current canonical wording and links only.
- Stop conditions: public package or CLI naming, license selection, hosted-service claims, runtime execution, or historical-source rewrites.

## Work Unit B: Example And Executable Quick Start

- Objective: let a source-checkout user build the private workspace, validate a known project, inspect a known trace, and understand how to initialize an empty project.
- Scope: `examples/minimal/`, a focused quick-start test, package scripts only if strictly necessary, and README commands.
- Contract: every command is repository-local, non-interactive, offline after install, and backed by an automated test or the canonical gate.
- Stop conditions: publishing, installing globally, `npx`, public `bin`, network calls in kernel operations, or a second CLI surface.

## Work Unit C: Overview Asset

- Objective: preserve the accepted task-to-agents-to-verified-change composition while replacing TraceRail identity with SWECircuit and Circuit terminology.
- Scope: one new `docs/assets/swecircuit-overview.png`, README reference, asset documentation, and checker requirement.
- Contract: the visual distinguishes the target operating model from the three operations shipped by the V9 kernel; no image-only claim may contradict the text.
- Stop conditions: replacing historical assets, inventing new product capabilities, or redesigning the accepted information hierarchy without evidence.

## Work Unit D: Independent Review

- Objective: challenge clarity, claim accuracy, naming scope, command reproducibility, visual semantics, and regression coverage.
- Authority: read and recommend only; no edits, installs, commits, pushes, or external actions.
- Handoff: severity-ordered findings with file evidence and strict `PASS` or `REVISE`.
- Stop conditions: implementation internals outside public claims, licensing, external namespace acquisition, runtime orchestration, and post-V9 roadmap design.

## Verification

- A clean source checkout passes `npm ci`, `npm run build`, and `npm run verify` on the supported matrix.
- The documented example validates and its trace inspects successfully.
- A temporary empty project initializes, validates, and inspects a copied example trace through the exact documented internal CLI grammar.
- README links resolve locally and the required overview asset exists.
- Checker regressions implement the closed public-surface matrix below.
- The template checker and all checker regression fixtures pass.
- Independent preimplementation and implementation reviews return `PASS`.
- Encoding, whitespace, branch status, package privacy, and absence of `bin` are rechecked before commit.

### Closed Public-Surface Regression Matrix

| Invariant | Negative mutation that must fail |
| --- | --- |
| Current identity | Replace the README heading with TraceRail, or replace the current GitHub URL with the retired TraceRail URL. |
| Current overview | Replace the README's `docs/assets/swecircuit-overview.png` embed with `docs/assets/tracerail-overview.png`, or remove the current asset. The historical file remains tracked and valid outside the current embed. |
| Shipped operations | Remove any one of the exact repository-local `init`, `validate`, or `inspect` command forms required by the quick start. |
| Capability boundary | Remove the exact current-limit statement, or add a positive claim that SWECircuit launches/schedules agents, executes circuits, writes traces, retrieves evidence, merges branches, or updates memory automatically. |
| Internal command boundary | Add `npx swecircuit`, `npm install swecircuit`, `npm install -g swecircuit`, or language describing a published/public SWECircuit CLI. |
| Private package boundary | Set `package.json` `private` to false or add a `bin` field. |
| Navigation | Remove the current GitHub URL or any required README link to `AGENTS.md`, the handbook, the example, framework docs, specs, or memory. |
| Current kernel status | Add the stale phrase `planned executable kernel` or remove language saying initialize, validate, and inspect are implemented now. |

The checker may enforce required exact boundary sentences plus targeted forbidden positive forms so ordinary negations are not false positives. Each row has at least one isolated fixture; identity, operation, package privacy, and command-boundary rows cover each enumerated alternative when one mutation could otherwise escape.

## Fan-In Gate

T009 passes only when current capability and target model are visibly separated, the quick start is executable from a source checkout, SWECircuit remains repo-only, the accepted visual story is rebranded without losing clarity, every finding is resolved or explicitly dispositioned, and local plus remote gates pass.

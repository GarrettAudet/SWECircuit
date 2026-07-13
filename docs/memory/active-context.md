# Active Context

## Current Focus

Define and verify the V9 swecircuit/v1alpha1 schemas and adversarial fixtures from the accepted executable-kernel architecture.

## Current Stage

V8.2 is complete on main at 5caaa29. V9 adopted it at 35f96d2 and recorded the independent architecture gate at 349fc04. The owner approved the integrated architecture bundle on 2026-07-13, ADR 0001 is accepted, and the private TypeScript 7 toolchain spike passes locally. T004 is complete; T005 is the active stage. The repository remains unlicensed.

## Important Current Constraints

- SWECircuit is the repository and project name, not a reserved package, domain, CLI, or hosted-service namespace.
- The shipped baseline remains a checked operating protocol until V9 closes.
- V9 is bounded to initialize, validate, and read-only trace inspection.
- V9 does not launch agents, schedule work, write traces, execute adapters, fetch evidence, or merge code.
- Circuit is the canonical machine composition term; historical rail-named files remain checker-supported provenance and are not kernel inputs.
- Canonical machine input is strict UTF-8 JSON under swecircuit/v1alpha1.
- Supported kinds are Project, Module, Circuit, WorkPacket, RunEvent, and AdapterManifest.
- The private package uses Node 24 primary, Node 22 compatibility, TypeScript 7, Biome, Ajv 2020 strict mode, and jsonc-parser.
- Core commands must remain offline, deterministic, fail closed, and usable without optional adapters.
- Full chats, prompts, environment dumps, command output, credentials, and evidence content are excluded from traces by default.
- Sequence and causation are authoritative; timestamps are evidence only.
- The README overview represents the target operating model.
- The primary README overview PNG still contains the historical TraceRail label and must be replaced before V9 is merge-ready.
- Public reuse remains legally unclear until the owner selects a license.
- Main remains the stable V8.2 baseline while V9 is isolated on codex/v9-devrail-kernel.

## Recently Learned

- Independent architecture, security, and developer-experience reviews converged on compatibility, diagnostics, liveness, privacy, path safety, and portability gaps before schema freeze.
- TypeScript 7 became stable after the original scan and works for the kernel without compiler API use.
- Ajv 8.20.0 must use its named Ajv2020 export under strict TypeScript 7 NodeNext compilation.
- Node test discovery needs an explicit test-file glob on Windows.
- Repository-local npm cache makes dry-run package inspection reproducible inside the restricted workspace.
- PowerShell execution policy blocks npm.ps1 on this host; npm.cmd works without changing machine policy.
- The known Windows patch-helper sandbox refresh failure still requires bounded direct-write recovery plus independent verification.
- Legacy Markdown remains simpler and safer as checker-supported provenance than as a second kernel input language.
- Private local file and API identifiers do not imply external namespace acquisition.

## Next Likely Work

- Define the v1alpha1 schema envelope, six artifact schemas, and valid fixtures.
- Add strict parser, version-dispatch, reference, graph, event-state, path, limit, and diagnostic negative fixtures.
- Freeze schemas only after fixture review.
- Replace the primary overview visual with SWECircuit branding before V9 closeout.

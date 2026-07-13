# Active Context

## Current Focus

Implement T006 deterministic project validation against the frozen swecircuit/v1alpha1 schemas, diagnostics, and adversarial case matrix.

## Current Stage

V8.2 is complete on main at 5caaa29. V9 adopted it at 35f96d2, recorded the architecture gate at 349fc04, and accepted the private toolchain at 5e44035. GitHub Actions run 29268926620 passed Node 22 and 24 on Ubuntu, Windows, and macOS. T005 is complete after two independent REVISE handoffs were integrated into a passing schema and fixture gate. T006 is active. The repository remains unlicensed.

## Important Current Constraints

- SWECircuit is the repository and project name, not a reserved package, domain, CLI, or hosted-service namespace.
- V9 is bounded to initialize, validate, and read-only trace inspection.
- V9 does not launch agents, schedule work, write traces, execute adapters, fetch evidence, or merge code.
- swecircuit.json is the sole project discovery authority; no ancestor search or recursive artifact scan is allowed.
- Canonical machine input is strict UTF-8 JSON under swecircuit/v1alpha1.
- Supported kinds are Project, Module, Circuit, WorkPacket, RunEvent, and AdapterManifest.
- Historical Markdown and rail-named files remain checker-supported provenance and are not kernel inputs.
- Module permissions are requirements, WorkPacket permissions are ceilings, and Adapter permissions are declaration-only requests. None grants runtime authority.
- Circuit routes own exact port transfers; cyclic routes are bounded; parallel fan-out and fan-in are explicit.
- Sequence and causation are authoritative; timestamps are optional evidence only.
- Full chats, prompts, environment dumps, command output, credentials, and evidence content are excluded from traces by default.
- Diagnostic codes, rules, severity, pointer conventions, sort order, and exit classes are frozen in schemas/v1alpha1/diagnostic-catalog.json.
- The primary README overview PNG still contains the historical TraceRail label and must be replaced before V9 is merge-ready.
- Public reuse remains legally unclear until the owner selects a license.
- Main remains the stable V8.2 baseline while V9 is isolated on codex/v9-devrail-kernel.

## Recently Learned

- Two read-only schema reviewers independently found useful gaps without creating write conflicts.
- One explicit Project artifact list is simpler and leaves each target envelope authoritative for kind.
- Instance identities and versioned reusable definitions must remain distinct.
- Free-form package compatibility ranges are premature; v1alpha1 compatibility is exact API-version membership.
- A permission requirement/ceiling relationship is clearer than fields that could look like grants.
- Port transfers, fan-out declarations, and joins make parallel composition statically reviewable.
- Every cyclic route must be bounded; one bounded edge cannot make another cycle safe.
- time can remain optional because sequence and causation determine trace order.
- High-confidence secret detection is warning-only suppression; forbidden capture fields remain schema errors.
- Resource limits must be independently reachable. The graph ceiling is 10,000 edges so its overflow can be tested before the 1 MiB artifact ceiling.
- Biome plus strict Ajv catches portability and contract-quality issues before implementation.
- The known Windows patch-helper sandbox refresh failure still requires bounded direct-write recovery plus independent verification.

## Next Likely Work

- Implement strict UTF-8 and duplicate-aware JSON parsing with pre-parse limits.
- Implement fail-closed API and kind dispatch plus normalized diagnostics.
- Implement explicit project loading, safe path containment, identity indexing, and reference checks.
- Implement Circuit outcome, transfer, cycle, fan-out, join, and permission-ceiling semantics.
- Execute the frozen T006 generated and native fixture matrix.

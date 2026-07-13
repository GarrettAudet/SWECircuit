# Active Context

## Current Focus

Implement T007 offline, non-overwriting project initialization over the verified validation operation.

## Current Stage

V8.2 is complete on main at 5caaa29. V9 adopted it at 35f96d2, recorded the architecture gate at 349fc04, accepted the private toolchain at 5e44035, and froze v1alpha1 at 9932371. T006 validation is complete at a364bf6 after independent `REVISE` and focused `PASS` handoffs; GitHub Actions run 29277160551 passed all seven jobs across Node 22/24 on Ubuntu, Windows, and macOS. T007 is active. The repository remains unlicensed.

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
- Pure Node cannot inspect every opaque same-path Windows reparse attribute; links, junctions, canonical divergence, regular-file state, containment, and descriptor identity remain enforced, while that native metadata boundary is explicitly deferred.
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
- A duplicate-aware parser and a downstream validator must be integration-tested together; jsonc-parser's null-prototype values exposed an Ajv equality assumption that isolated library probes missed.
- Deterministic security classification should be extracted and tested separately from native operating-system fixture creation; this preserved `SC1014` coverage without pretending pure Node can inspect every reparse attribute.

## Next Likely Work

- Freeze the smallest valid initialized project shape and collision behavior.
- Implement an offline, non-interactive initializer that never overwrites existing paths.
- Validate generated output immediately through the T006 operation.
- Add temp-directory integration coverage for success, collision, invalid target, and no-network behavior.
- Run an independent T007 contract review before remote matrix verification.

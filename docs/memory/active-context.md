# Active Context

## Current Focus

Complete T009 current-surface identity migration and the public quick start over the verified initialize, validate, and inspect kernel.

## Current Stage

V8.2 is complete on main at 5caaa29. V9 adopted it at 35f96d2, recorded the architecture gate at 349fc04, accepted the private toolchain at 5e44035, and froze v1alpha1 at 9932371. T006 validation is complete at a364bf6 with GitHub Actions run 29277160551 green. T007 initialization is complete at 095a391 with run 29281182002 green. T008 trace inspection is complete at 36efbf1 after preimplementation `REVISE -> REVISE -> REVISE -> REVISE -> PASS`, implementation `REVISE -> REVISE -> PASS`, 202 local tests, and GitHub Actions run 29288359476 passing all seven jobs. T009 is active. The repository remains unlicensed.

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
- Trace inspection takes one explicit repository-relative caller-owned JSONL file, does not scan the manifest, and never writes, executes, fetches, or dereferences content.
- Trace bytes, lines, events, retained framing, evidence summaries, and read allocation are independently bounded; the byte limit is a ceiling rather than a fixed allocation.
- Full chats, prompts, environment dumps, command output, credentials, and evidence content are excluded from traces by default.
- Diagnostic codes, rules, severity, pointer conventions, sort order, and exit classes are frozen in schemas/v1alpha1/diagnostic-catalog.json.
- The primary README overview PNG still contains the historical TraceRail label and must be replaced before V9 is merge-ready.
- Pure Node cannot inspect every opaque same-path Windows reparse attribute; links, junctions, canonical divergence, regular-file state, containment, and descriptor identity remain enforced, while that native metadata boundary is explicitly deferred.
- Pure Node initialization cannot atomically bind directory creation to first identity capture or final identity checks to pathname removal. X07 names both malicious replacement windows; pending creations force `SC1022`, and detected mismatches are preserved.
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
- A successful filesystem create is not cleanup-owned until identity capture succeeds; track the gap as pending and preserve it on uncertainty.
- A concurrency test must place its barrier after preflight and immediately before the contended mutation; worker readiness before entering the operation does not prove a race was exercised.
- Independent review remained useful after the first hardening pass: two `REVISE` rounds found ownership and test-validity gaps that a green local suite missed.
- Event ceilings must bound retained records before rejection; validating a count after materialization leaves a memory-amplification path.
- Allocate bounded readers from verified input size plus the smallest growth-detection margin, not from the maximum accepted size.
- Bind case-matrix variants to table-driven tests so coverage statements fail when executable evidence drifts.
- A single reviewer loop caught six T008 defects despite a green suite, reinforcing review as an evidence-producing gate rather than ceremony.

## Next Likely Work

- Audit current product surfaces and classify historical TraceRail/DevRail provenance versus canonical SWECircuit content.
- Replace the historical README overview asset with a reviewed SWECircuit visual and preserve current-capability versus target-model honesty.
- Publish a concise quick start for the three implemented library operations without claiming a public package or CLI namespace.
- Add stale-name, link, asset, and documented-command regressions, then run independent public-surface review and the remote matrix.
- Keep V9 isolated on `codex/v9-devrail-kernel`; do not merge to `main` before T009-T011 and owner approval.

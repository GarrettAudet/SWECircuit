# V11 Implementation Notes

## Status

Planning only. T001 research, specification, architecture, and traceability bootstrap is complete on the stacked branch; no kernel behavior has changed.

## Summary Of Changes

The bootstrap defines the V11 product boundary and proof obligations through the feature package, decomposition and orchestration records, dated research snapshot, proposed ADR 0003, draft milestone, architecture index, and memory pointers. Planned executable work begins only after independent review accepts the architecture.

## Deviations From Plan

V11 planning started before V10 was merged so progress could continue without modifying the immutable V10 branch. The exception is explicit: V11 cannot be accepted or merged until V10 is owner-approved or V11 is rebased and fully reverified against an approved replacement.

The Windows sandbox patch helper failed before changing the first copied template. The documented bounded recovery wrote only the intended ASCII Markdown files, followed by placeholder, byte-shape, whitespace, template, and canonical verification.

## Assumptions Used

- V10 remains the sole work-packet execution primitive.
- The selected circuit and modules are explicit inputs.
- Planner and executor implementations are injected by the host and are not dynamically loaded from declarations.
- Core owns portable policy; the host owns external effects and enforcement.

## Follow-Up Work

- Resolve every open ADR 0003 question through independent review.
- Add live IDE/provider adapters only after the portable planner and reducer are proven.
- Add durable persistence, distributed claiming, workspace creation, merge, and memory mutation in separately versioned work.

## Verification Performed

- `git diff --check` passed.
- The unresolved-placeholder scan passed.
- Sixteen changed or new Markdown files were confirmed BOM-free and LF-only.
- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1` passed.
- `npm.cmd run verify` passed with format, lint, typecheck, build, 275 tests, deterministic V10 dogfood, package inspection, and the offline packed consumer.
- No V11 runtime behavior was exercised because none exists yet.

## Durable Learnings

Current primary sources converge on inspectable plans, fresh bounded worker context, structured capabilities, dependency-aware claiming, isolated writes, bounded concurrency, human approval pauses, lifecycle gates, and independent fan-in verification. Promotion remains pending architecture review and dogfood evidence.

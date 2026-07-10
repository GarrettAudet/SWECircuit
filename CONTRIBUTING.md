# Contributing

## Quick Path

1. Read `AGENTS.md` and `docs/ai/handbook.md`.
2. Open or create a feature package under `docs/specs/` for meaningful work.
3. Keep the change small enough to verify and review.
4. Run the template checker and checker regression suite before requesting review.
5. Update memory, milestone, or retrieval pointers when the work creates durable context.

## Contribution Rules

- Preserve the simple public surface: README, AGENTS, handbook, rails, modules, packs, memory, and checker.
- Keep TraceRail file-based unless an adapter evaluation proves a tool dependency is worth it.
- Prefer narrow, source-backed changes over broad rewrites.
- Do not promote optional tools into core without research, adapter evaluation, registry updates, and dogfooding evidence.
- Do not erase or overwrite user or agent work without explicit approval.

## Workflow

Use the TraceRail rail for meaningful changes:

```txt
goal | clarify | spec | architecture_review | task_plan | implement | verify | review | memory
```

For repository or workflow changes, also update the relevant milestone, history ledger, retrieval index, and feature package.

## Validation

The required local check is:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\test-check-template.ps1
```

For documentation-heavy changes, also scan for unresolved placeholders and non-ASCII text unless the file intentionally needs them.

## Pull Request Standard

A good pull request includes:

- Feature package link.
- Acceptance criteria status.
- Validation evidence.
- Architecture or ADR impact.
- Memory updates or a note that none were needed.
- Residual risks and follow-up work.

## Extension Standard

New rails, modules, packs, and adapters must define their contract, verification path, ownership boundary, rollback path, and promotion criteria before they are treated as reusable framework pieces.

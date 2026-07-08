# Repository Standards

## Purpose

This is the quality bar for TraceRail itself. The repository should look calm, intentional, and easy to audit. A new human or agent should understand where to start, what rules matter, how to validate changes, and how extension points work.

## Quality Bar

A change is high quality when it is:

- Simple on the surface and deep only where needed.
- Traceable from request to spec, implementation, verification, review, and memory.
- Source-preserving, with evidence stored before summaries.
- Consistent with rail and module contracts.
- Validated by the checker and any relevant manual review.
- Honest about residual risks and skipped checks.

## File Standards

- Keep Markdown files focused around one purpose.
- Prefer tables for maps and contracts.
- Prefer short sections over long narrative blocks.
- Use ASCII unless the file has a clear reason to use otherwise.
- Avoid unresolved placeholders in committed files.
- End files with a newline.
- Keep root files public-facing and concise.

## Documentation Standards

- README is the public front door.
- AGENTS is the agent contract.
- The handbook is the operating manual.
- Specs are source evidence.
- Memory is durable summary plus pointers.
- Rails, modules, and packs are reusable framework contracts.
- Research snapshots preserve dated external evidence.

## Validation Standards

Required local validation for workflow changes:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1
```

Recommended supplemental checks:

- Scan docs for unresolved placeholders.
- Scan docs for unexpected non-ASCII characters.
- Run `git diff --check` before committing.
- Review the rendered README and any Mermaid diagrams in GitHub when practical.

## Review Standards

Reviews should lead with findings, then evidence, then residual risk. For TraceRail changes, reviewers should check:

- Does the quick path remain understandable?
- Are source artifacts preserved?
- Are rails, modules, packs, and adapters in the right layer?
- Is the checker updated for new required files or contracts?
- Is memory updated only for durable lessons?
- Is merge approval explicit?

## Release Standards

A version is ready for approval when:

- Feature packages are complete.
- Validation passes.
- The milestone has an approval gate.
- Memory and retrieval pointers are current.
- Residual risks are recorded.
- The branch is pushed and ready for the user decision.

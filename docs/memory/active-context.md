# Active Context

## Current Focus

V4 standalone agent, IDE execution, and user interaction baseline on branch `codex/v4-agent-work-packages`.

## Current Stage

V4 ready for approval on branch `codex/v4-agent-work-packages` after adding explicit IDE-user interaction and standalone agent execution rules.

## Important Current Constraints

- Make the workflow visibly active in IDE chat: workflow, branch, stage, artifact, assumptions, evidence, and next gate.
- Build an excellent standalone single-agent/IDE workflow before expanding multi-agent orchestration.
- Keep the system simple at the surface and robust underneath.
- Use milestones as concise version overviews, not replacements for specs or reviews.
- Preserve source artifacts before summarizing memory.
- Develop this version on the dedicated V4 branch and do not merge to `main` before approval.
- Do not install external frameworks or memory tools by default.

## Recently Learned

- Strong multi-agent development depends on a strong visible single-agent/IDE baseline first.
- The IDE-user conversation is part of the workflow surface, not just a transport for commands.
- A standalone agent needs explicit goal, completion evidence, scope, authority, context, verification, stop conditions, handoff, and memory obligations.
- The branch workflow is now being dogfooded: V4 started from the committed `main` baseline on a dedicated branch.

## Next Likely Work

- Complete V4 docs, checker, memory, review, and milestone.
- Validate V4 on the branch before requesting approval to merge.



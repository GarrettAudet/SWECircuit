# Ecosystem Scan: 2026-07-08

Purpose: capture the research context behind v1 of this workflow. This is a curated snapshot, not a live dependency.

## Sources Reviewed

- OpenAI Codex AGENTS.md docs: `https://developers.openai.com/codex/guides/agents-md`
- GitHub Spec Kit docs: `https://github.github.com/spec-kit/`
- GitHub Spec Kit quickstart: `https://github.github.com/spec-kit/quickstart.html`
- BMAD Method workflow map: `https://docs.bmad-method.org/reference/workflow-map/`
- Ask or Assume? Uncertainty-Aware Clarification-Seeking in Coding Agents: `https://arxiv.org/abs/2603.26233`
- On the Impact of AGENTS.md Files on the Efficiency of AI Coding Agents: `https://arxiv.org/abs/2601.20404`
- Context Engineering for AI Agents in Open-Source Software: `https://arxiv.org/abs/2510.21413`
- Serena: `https://github.com/oraios/serena`
- Repomix: `https://repomix.com/`
- Basic Memory: `https://github.com/basicmachines-co/basic-memory`
- agentmemory: `https://github.com/rohitg00/agentmemory`

## Takeaways

- `AGENTS.md` is the right v1 instruction anchor for Codex-first usage.
- Spec Kit is the strongest current workflow backbone, especially its clarify, checklist, analyze, implement, and converge phases.
- BMAD is the strongest full-lifecycle reference, but its default system is heavier than this template should be at v1.
- Research supports clarification-seeking behavior for underspecified coding tasks.
- Research also shows that AI context files are still not fully standardized across open source projects, so this template should stay explicit and portable.
- Memory and retrieval tools are useful, but the first version should establish local file contracts before installing external systems.

## Promoted Into V1

- `AGENTS.md` as the AI entrypoint.
- One handbook as the human operating manual.
- Feature spec as the unit of work.
- Guided gates with typed outcomes.
- Clarification policy.
- Stage-aware retrieval policy.
- First-class root-cause/problem-solving protocol.
- Markdown memory files.
- Local PowerShell verifier.

## Deferred

- Spec Kit installation.
- BMAD installation.
- Serena MCP.
- Repomix config.
- Basic Memory or agentmemory setup.
- Context7/docs MCP setup.
- CI integration.

## Next Review

Recommended cadence: review this ecosystem scan after the template is used in one or two real projects, or when a tool is proposed for installation.


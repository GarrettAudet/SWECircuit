# Architecture Review Module

## Purpose

Check whether a proposed change fits the system architecture, coding standards, boundaries, data flow, and long-lived design constraints before implementation proceeds.

## Input

- Feature spec or change request.
- Relevant architecture docs, ADRs, module boundaries, and existing patterns.
- Known constraints, risks, assumptions, and acceptance criteria.
- Optional code, dependency, data, security, or performance context.

## Action

Review the proposed design for architecture fit, scope boundaries, interface impact, data flow, dependency choices, coding best practices, maintainability, and whether an ADR or redesign is needed.

## Output

- Architecture review note or section in the feature package.
- Required design changes, if any.
- ADR recommendation, if the decision is long-lived.
- Typed outcome for the rail gate.

## Gate

Implementation may proceed only when the review can show that the change is local enough, compatible with existing architecture, and has a credible verification path. If not, route to `redesign`, `clarify`, `split`, or `block` before implementation.

## Outcome

- `pass`: architecture is compatible and implementation can proceed.
- `fix`: a small design issue must be corrected before implementation.
- `clarify`: product or technical intent is unclear.
- `redesign`: architecture, boundaries, or data flow need redesign.
- `split`: the change is too broad for one feature package.
- `block`: implementation would be unsafe without a user or owner decision.
- `learn`: durable architecture guidance should be recorded in memory or an ADR.

## Artifacts

- Feature package plan or architecture section.
- ADR, when needed.
- Review notes with evidence and outcome.
- Memory update for durable architecture patterns or constraints.

## Adapter

File-based by default. This module may be run by the main IDE agent, a dedicated architecture subagent, or a future pack/adapter such as a BMAD-style architect role, a Superpowers-style design review skill, or an Astraeus-style generated architect agent.

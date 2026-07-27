# Medium Dogfood Goal: Impact Planner

## Product Goal

Build a dependency-free, offline Change Impact Planner for Windows that lets a software team
model components and dependencies, select changed components, calculate deterministic transitive
impact and risk, persist the workspace locally, and safely import or export it as JSON.

## User

A developer preparing a change who needs a quick, explainable answer to: "What else can this
change affect, why, and how risky is it?"

## Acceptance Criteria

- Users can add, update, and remove components with name, owner, criticality, and dependencies.
- Invalid identifiers, duplicate components, missing dependency references, self-dependencies,
  and dependency cycles are rejected with actionable messages.
- Selecting one or more changed components produces deterministic affected components, shortest
  dependency paths, distance, risk score, risk level, and a concise summary.
- Import accepts only the closed versioned workspace format, rejects unsafe or oversized input,
  and never mutates current state when validation fails.
- Export produces deterministic JSON that can be imported without information loss.
- Valid state persists through reload; malformed or unavailable storage fails safely and visibly.
- The interface is keyboard-operable, responsive at 390 and 1280 CSS pixels, exposes visible
  focus, uses semantic status regions, and honors reduced motion.
- The local server uses no third-party runtime dependency, makes no network request, and serves a
  restrictive CSP with `connect-src 'none'`.
- Automated domain, codec, storage, interface, integration, server, and evidence tests pass.
- Browser QA proves the main workflow, invalid-data recovery, import/export, persistence,
  responsive layout, focus recovery, reduced motion, and a clean console.

## Constraints

- All application files live under `examples/impact-planner/`.
- The application is local-only and dependency-free.
- Agents may edit only their compiled write scopes.
- No agent may install dependencies, access the network, mutate Git, merge, or update memory.
- The integration owner alone accepts fan-in, final verification, memory updates, and release
  claims.

## Closed Decisions

- Workspace schema version is `1`.
- Maximum import size is 65,536 UTF-8 bytes.
- Maximum component count is `50`.
- Component identifiers use lowercase ASCII letters, digits, and hyphens and are 1-32 characters.
- Criticality is one of `low`, `medium`, or `high`.
- Risk weights are low `1`, medium `2`, and high `3`.
- Risk score is the sum of each affected component's weight, doubled for directly changed
  components.
- Risk level is `low` for scores 1-4, `medium` for 5-9, and `high` for 10 or greater.
- Removing a component also removes references to it from remaining components.
- For equal-length impact paths, the lexicographically smallest identifier path wins.
- Current supported reference host is Windows Codex Desktop; core contracts remain host-neutral.

## Outcome

The medium dogfood passes only when the compiled team runs through dependency-safe native launch,
verified handoffs, integration, browser verification, independent review, and durable evidence.

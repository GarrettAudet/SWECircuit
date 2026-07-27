# V13 Dogfood Validation

## Status

Active.

## Problem

V12 passed synthetic, lifecycle, release, and independent-review gates, but it has not yet been
used from one ordinary product request to build and verify a small application through native IDE
subagents. The next test must distinguish application quality from orchestration quality.

## Users Or Actors

- A developer giving one product goal to an agentic IDE.
- The integration owner coordinating the run.
- Task-specific implementation and review specialists.
- The external IDE host that supplies models, tools, workspaces, and execution.

## Goals

- Build a polished, dependency-free local issue-triage board in one bounded dogfood run.
- Exercise clarification, architecture, decomposition, specialist compilation, parallel roots,
  dependency fan-in, integration, verification, independent review, and memory update.
- Preserve enough evidence to identify useful automation and unnecessary ceremony.

## Non-Goals

- A backend, authentication, collaboration, cloud sync, or deployment.
- A production ChatGPT Desktop panel or portable host adapter.
- Changes to the V12 kernel API or its security model.
- Artificially maximizing agent count when work is not independent.

## Requirements

- Users can create, edit, delete, and move issues between backlog, in-progress, and done.
- Every issue has a title, optional details, priority, status, and stable identifier.
- Users can search and filter issues, see status counts, and clear active filters.
- Issues persist in browser local storage and can be exported to or imported from JSON.
- Invalid input and destructive actions receive clear, accessible feedback.
- The interface works at desktop and mobile widths and supports keyboard operation.
- Pure application behavior has deterministic Node tests with no network dependency.
- V12 compiles the work into exact task-specific contracts and tracks exact raw handoffs through
  its immutable run session.

## Acceptance Criteria

- [ ] **AC1:** A valid issue can be created, edited, moved, and deleted through the UI.
- [ ] **AC2:** Search, status filtering, and priority filtering produce correct visible issues and
      counts.
- [ ] **AC3:** Refresh restores valid saved issues; malformed saved or imported data fails safely.
- [ ] **AC4:** JSON export and import round-trip the supported issue schema.
- [ ] **AC5:** The app is responsive, keyboard-operable, and has no blocking browser-console error.
- [ ] **AC6:** Automated domain and persistence tests pass from a clean checkout.
- [ ] **AC7:** V12 produces a verified package, dependency-safe agent waves, exact verified
      handoffs, and an integration-ready final inspection.
- [ ] **AC8:** Independent review finds no unresolved material product or orchestration defect.
- [ ] **AC9:** Dogfood notes record elapsed observations, user interventions, conflicts, failures,
      and recommended framework changes.

## Architecture Impact

No core architecture or public API changes are planned. The repository gains one isolated example
application and one dogfood feature package. The application uses browser-native ES modules and
local storage; Node's built-in test runner verifies pure modules.

## Risks

- Process overhead could dominate a deliberately small build.
- Parallel specialists could conflict if their write scopes are not disjoint.
- A visually attractive app could hide weak domain validation or incomplete orchestration evidence.
- Native subagent status is a host observation and is not yet represented by V12 run state.

## Open Questions

None block the run. Any native-host visibility gap discovered during execution becomes dogfood
evidence rather than expanded application scope.

## Assumptions

- The target is a current Chromium-based desktop browser.
- Local storage is sufficient persistence for this validation.
- Seed data may be shown only when no saved state exists.
- The external host may select different model and effort levels without changing compiled
  specialist contracts.

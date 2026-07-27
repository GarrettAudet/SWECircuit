# V14 Small Dogfood Goal

## Goal

Build a dependency-free Release Board browser application that lets a developer track release
checks, see blockers, filter work, and retain local progress.

## Acceptance

- The app ships under `examples/release-board/` and runs locally without network access or runtime
  dependencies.
- A user can view seeded release checks, add a check, change its status, and delete it.
- Each check has a title, owner, category, status, and optional evidence note.
- Summary counts and readiness update from the current state.
- Filters expose all, blocked, pending, and passed checks.
- State persists through a small versioned local-storage boundary and invalid stored data fails
  safely to seeded data.
- The interface is responsive, keyboard accessible, and uses semantic controls.
- Pure domain and storage behavior has deterministic Node tests.

## Closed Decisions

- This is a local single-user app with no backend, authentication, collaboration, or deployment.
- Status is one of `pending`, `passed`, or `blocked`.
- Category is one of `build`, `test`, `review`, or `docs`.
- Readiness is true only when at least one check exists, every check passed, and no check is
  blocked.
- The first wave has two independent modules: domain plus storage, and semantic interface.
- The main IDE agent is the integration owner for event wiring, final tests, and review routing.

## Assumption

The user asked for a small application to validate orchestration but did not prescribe the product.
Release Board is a low-risk, repository-relevant choice recorded here before implementation.

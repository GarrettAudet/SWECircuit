# ADR 0006: Windows-First Release Support

## Status

Accepted on 2026-07-24 by owner decision.

## Context

The executable kernel was originally qualified across Windows, Ubuntu, and macOS. During V12
release review, the exact Revision 68 candidate passed Template Check plus Windows and Ubuntu on
Node 22 and 24, while both macOS jobs failed one host-environment assertion.

IDECircuit's product requirement is IDE and provider neutrality. That requirement does not require
the first public repository release to support every operating system. Continuing to make
unsupported platforms release-blocking adds time and complexity without serving the owner's
immediate Windows development workflow.

## Decision

- The v0.1 release supports Windows only.
- Hosted release qualification requires Template Check and `windows-latest` on Node 22 and 24.
- macOS and Linux are unsupported and are not release gates.
- Core contracts remain IDE-, model-, provider-, and API-neutral.
- Historical cross-platform evidence remains immutable provenance.
- Existing non-Windows compatibility code may remain when it is bounded and verified, but it does
  not create a support claim.

This decision supersedes ADR 0001 only for the active release-support and CI-matrix policy.
ADR 0001 remains the historical V9 architecture record.

## Consequences

- Release status is determined by three hosted jobs instead of seven.
- Unsupported-platform failures no longer generate required-check failures or delay Windows
  releases.
- Public documentation must distinguish host neutrality from operating-system support.
- Contributors may propose broader support later, but support expands only through a new accepted
  decision and passing qualification on every added platform.

## Revisit Triggers

- A maintained macOS or Linux host adapter is needed by a real project.
- A public package requires broader installation support.
- Community ownership exists for another platform's CI and failures.
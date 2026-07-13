# V9 Initialization Decomposition Plan

## Status

In progress.

## Goal

Implement the smallest offline, non-interactive, non-overwriting project initializer over the completed T006 validation operation, then challenge its contract independently before T007 can pass.

## Recorded Assumptions

- The target project directory already exists and must be a local directory accepted by the T006 root policy.
- Initialization owns only `swecircuit.json`, `swecircuit/modules/`, and `swecircuit/circuits/`; either existing owned root path is a collision.
- An explicit project ID is accepted. Otherwise, the exact NFKD, lowercase, combining-mark removal, separator collapse, prefix, truncation, and fallback transform frozen in the v1alpha1 contract derives the ID.
- The manifest has frozen UTF-8 bytes: stable field order, two-space indentation, no BOM, LF line endings, and one final LF.
- Creation uses exclusive filesystem operations and journals each captured created entry's type, canonical path, and BigInt device/inode identity. A successful create that cannot be captured stays pending, is preserved, and produces `SC1022`.
- Recovery attempts reverse non-recursive removal only after root and entry identity checks. Detected changed, missing, linked, or non-empty entries survive and produce `SC1022`; the documented create-to-capture and check-to-remove race windows require a native adapter for categorical malicious-race protection.
- The open manifest descriptor, exact bytes, generated project ID, and normal project-validation result are checked before success.
- Pure Node identity checks bound races between operations; a malicious replacement inside one native path syscall remains an explicit deferred native boundary.

## Work Unit A: Integrated Implementation

- Objective: add initialization diagnostics, library types, deterministic project generation, bounded recovery, and integration tests.
- Scope: `src/`, v1alpha1 diagnostic metadata, initializer tests, and T007 feature evidence.
- Dependencies: completed T006 commit `a364bf6` and closeout commit `3e0b698`.
- Authority: edit bounded V9 files, run local checks, and integrate reviewer findings.
- Evidence: success, exact manifest bytes and ID transform, collision preservation, invalid target, ancestor isolation, every-checkpoint fault injection, pre-capture pending preservation, non-empty and identity-swapped recovery, a process race synchronized after both preflights, immediate validation, dynamic and static offline boundaries, package inspection, and remote matrix.
- Stop conditions: overwrite risk, ambiguous ownership, unsafe cleanup, network/process behavior, or public-distribution scope.

## Work Unit B: Independent Contract Review

- Objective: challenge initializer correctness, filesystem safety, portability, determinism, API clarity, and missing cases.
- Scope: ADR 0001, v1alpha1 Project contract and diagnostics, T007 assumptions, current initializer source, and tests.
- Authority: read and recommend only; no edits, installs, commits, or pushes.
- Handoff: severity-ordered findings with exact evidence and `PASS` or `REVISE`.
- Stop conditions: CLI rendering, trace inspection, README, naming, licensing, and public packaging are out of scope.

## Fan-In Gate

T007 can pass only after every review finding is fixed, explicitly deferred, or rejected with source-backed rationale; the generated project validates immediately; and the complete local and remote matrix passes.
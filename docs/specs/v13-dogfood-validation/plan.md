# Implementation Plan

## Status

Active.

## Approach

1. Bind the exact spec and application contract into a V12 `GoalContract`.
2. Compile and review the selected specialist partition against its serial baseline.
3. Render, approve, and verify the exact specialist package.
4. Create the immutable V12 run session and launch only dependency-eligible contracts.
5. Integrate each completed dependency wave and record its exact raw handoff.
6. Run automated and browser verification, then independent review.
7. Complete fan-in, update dogfood evidence and memory, and report framework friction.

## Architecture

The application is a static ES-module example. Pure domain and persistence modules are independent
from semantic HTML/CSS. A dependent controller binds those outputs. One read-only reviewer checks
the fully integrated result.

## Parallelization

`implement.domain` and `implement.ui` are the only initial parallel wave. Integration and review
remain sequential because they consume preceding outputs.

## Rollback

The entire application and dogfood package are additive on `codex/v13-dogfood-validation`. A
failed run is preserved and routed; it is not merged into `main`.

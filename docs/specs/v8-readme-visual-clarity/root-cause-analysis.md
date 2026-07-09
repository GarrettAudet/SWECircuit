# Root-Cause Analysis

## Status

Complete.

## Trigger

Repeated user rejection of README visuals culminated in a direct instruction to use a supplied TraceRail overview and make the README clean, concise, and crisp.

## Reproduction

The prior README led with internal framework explanation and embedded a visual that required readers to infer the value proposition. Repeated replacements changed visual metaphors without first locking the exact public story.

## Confirmed Root Cause

The work lacked a concrete public-surface acceptance contract. We optimized generated artifacts for internal conceptual completeness instead of validating whether the repository owner would use the visual to explain TraceRail to another developer.

## Why It Was Missed

Checks proved file existence, deterministic generation, label rendering, and Markdown structure. None of those proved product clarity or owner acceptance. The implementation continued to reinterpret the request after the user had narrowed it.

## Fix

- Preserve the supplied image exactly as `docs/assets/tracerail-overview.png`.
- Position it immediately after one plain-language product definition.
- Explain the rail in five short steps.
- Keep contract detail compact and route deeper material to canonical docs.
- Require the accepted asset and README headings in the checker.
- Remove rejected V8 SVG drafts from the final branch.

## Regression Coverage

- Checker requires the approved overview asset and its README embed.
- Asset docs designate the PNG as the public source of truth.
- V8 trace artifacts record the acceptance failure and final direction.
- Rendered desktop and narrow-width review is a release gate.

## Follow-Up Work

- Consider preserving editable design source if the asset is revised later.
- Conduct naming review only as a separate product decision.

## Memory Update

Public communication changes need a human acceptance gate in addition to deterministic generation and structural checks. Once an owner-approved asset exists, preserve it directly.

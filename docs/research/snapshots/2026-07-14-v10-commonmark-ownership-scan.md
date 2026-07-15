# V10 CommonMark Ownership Snapshot

## Snapshot

- Date: 2026-07-14
- Scope: active Markdown ownership, fenced blocks, quote and list containers, blank lines, tab columns, partial delimiter consumption, and semantic checker boundaries
- Decision target: close the exact V10 review findings without claiming or implementing a full Markdown renderer
- Evidence policy: primary specification evidence plus exact-candidate reproductions

## Question

How should the V10 checker distinguish active public claims from fenced examples while remaining portable, dependency-free, and honest about its limits?

## Primary Sources And Findings

### Characters And Blank Lines

CommonMark 0.31.2 defines a blank line as empty or containing only U+0020 spaces or U+0009 tabs. Unicode whitespace such as U+00A0 is text, not a CommonMark blank line.

Implication: .NET IsNullOrWhiteSpace is too broad for Markdown block-state transitions.

Source: https://spec.commonmark.org/0.31.2/#characters-and-lines

### Fenced Blocks And Containers

An unclosed fenced code block ends at the end of its containing block. Quote and list context therefore participates in ownership; delimiter matching alone cannot determine whether later prose is active.

Implication: the checker must retain bounded quote and list state around a fence and end ownership when the relevant container ends.

Source: https://spec.commonmark.org/0.31.2/#fenced-code-blocks

### Blank Quote And List Transitions

A blank line separates consecutive block quotes. A blank line can remain inside a list item without normal continuation indentation, and a quote marker can make a line blank relative to an outer quote.

Implication: raw whitespace is insufficient. A line containing only a surviving outer quote marker may terminate an inner quote while preserving the outer quote and list.

Sources: https://spec.commonmark.org/0.31.2/#block-quotes and https://spec.commonmark.org/0.31.2/#list-items

### Tabs And Physical Columns

CommonMark expands tabs to the next four-column tab stop and defines indentation in columns. Removing a quote or list prefix does not move the remaining characters to a new physical line. Example 6 specifically treats a tab after `>` as several indentation columns: one column belongs to the block-quote marker and the remaining columns stay in the content.

Implication: a continuation parser must carry the current physical column when it strips a prefix, and delimiter parsing must preserve the unconsumed columns of a tab. Re-expanding a substring from column zero or deleting a whole partially consumed tab changes the block structure.

Source: https://spec.commonmark.org/0.31.2/#tabs

## Evaluated Practices

| Practice | Disposition | Rationale |
| --- | --- | --- |
| CommonMark-specific blank predicate | Accept for V10 | Exact spaces-and-tabs semantics prevent Unicode whitespace from extending container ownership. |
| Container-relative blank state | Accept for V10 | Preserves only the containers that remain active when an inner quote ends. |
| Absolute column propagation | Accept for V10 | Keeps tab width and nested indentation correct after quote or list prefixes are stripped. |
| Partial tab consumption | Accept for V10 | A quote marker consumes one virtual indentation column from a following tab and preserves the remaining columns as content. |
| Paired rejection and preservation fixtures | Accept for V10 | Every adversarial rejection needs an equivalent valid example to constrain false positives. |
| Full CommonMark parser in PowerShell | Reject from V10 | It would expand scope, complexity, and conformance claims far beyond the acceptance finding. |
| Proven Markdown parser adapter | Defer | Evaluate separately if active-Markdown checking grows or a portable dependency is justified. |
| Independent semantic review | Retain | Hosted CI repeatedly passed exact candidates that still contained ownership bypasses. |

## V10 Decision

Keep the checker bounded and dependency-free. Use exact CommonMark blank semantics, container-relative quote and list state, physical-column propagation, explicit partial-tab consumption, causal diagnostics, and paired fixtures for the contract surfaces V10 actually checks. Do not describe the checker as a CommonMark renderer or complete semantic verifier.

The acceptance boundary is finite: close the reproduced findings, pass the complete regression matrix, and retain independent review. Broader grammar coverage or parser replacement belongs in a separately specified version.

## Promotion Targets

- scripts/check-template.ps1 and scripts/test-check-template.ps1 for the bounded implementation and regressions.
- The V10 feature package for reproductions, RCA, and exact-candidate evidence.
- docs/research/practice-register.md for the accepted and deferred practices.
- docs/memory/decisions.md, patterns.md, and known-issues.md for durable guidance and limits.

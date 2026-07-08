# Implementation Plan

## Status

Complete.

## Summary

Harden the local checker so official pack conformance validates required fields, not only headings.

## Impacted Areas

- `scripts/check-template.ps1`
- `docs/packs/conformance.md`
- `docs/milestones/v6.md`
- `docs/memory/`
- `docs/specs/v6-pack-conformance-checker/`

## Approach

Add small reusable checker helpers for Markdown section extraction and required-term checks. Use those helpers to validate the current official pack contract fields.

## Interfaces And Data

No public API, schema, or data migration changes. The local validation command becomes stricter for official pack content.

## Architecture And ADR Impact

No ADR is needed. This is a validation improvement inside the existing file-based checker.

## Security And Privacy

No secret, credential, authentication, privacy, retention, or destructive-action impact.

## Rollback Or Recovery

Remove `Test-PackConformance` and the checker call if term-based validation proves too brittle.

## Risks And Mitigations

- Risk: Required-term checks become brittle if pack wording changes.
- Mitigation: Check stable contract labels rather than prose.
- Risk: Checker can still pass low-quality text.
- Mitigation: Keep review and dogfooding as quality gates.

# Pack Conformance

## Purpose

Define the minimum checks a pack must pass before it can be recommended.

## Required Files

- Pack README.
- Pack manifest or completed pack template.
- Rail or module contracts.
- Verification evidence.
- Rollback notes.
- Security and privacy notes.

## Required Contract Fields

Every provided rail or module must define:

- Input.
- Action.
- Output.
- Gate.
- Outcome.
- Artifacts.
- Verification.
- Rollback or removal path.

## Permission Review

The pack must state:

- Files it reads.
- Files it writes.
- Network access.
- Secret access.
- External services.
- Data retention.

## Verification Review

The pack must provide:

- Example usage.
- Passing conformance check.
- Manual review notes.
- Known risks.
- Failure routes.

## Recommendation Checklist

- [x] Contract fields are present.
- [x] Permissions are explicit.
- [x] Verification is documented.
- [x] Rollback is documented.
- [x] Maintainer is named.
- [x] Source evidence is preserved.

## Non-Conformance

If a pack fails conformance, mark it community or experimental. Do not recommend it until the failure is fixed or consciously accepted with a documented risk.

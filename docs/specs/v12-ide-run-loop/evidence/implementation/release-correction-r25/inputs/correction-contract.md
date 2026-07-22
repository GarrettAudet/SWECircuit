# Revision 25 Correction Contract

## Trigger

The exact one-shot gate for commit `6f08e0a50ec6fd7fee76254ebd07995ae6f692db` preserved source and repository identity and passed 425 of 426 tests. The isolated copied-production lifecycle failed when its synthetic fixture commit inherited the outer candidate's repository-scoped Git environment.

## Objective

Make every nested fixture repository process independent of an enclosing release-gate Git context without changing product-runtime behavior or weakening exact candidate verification.

## Scope

- Create one deterministic environment builder for nested fixture repository processes.
- Remove inherited repository-routing variables, including mixed-case aliases and `GIT_CONFIG_COUNT` injection tuples.
- Set closed system/global Git configuration and disable terminal prompting.
- Use that environment for fixture initialization, the copied canonical gate, and copied release-review parent processes.
- Add focused regression coverage for the exact hostile environment shape supplied by the outer candidate gate.
- Preserve and rerun the complete isolated copied-production lifecycle.

## Boundaries

- Preserve Candidate 12 evidence exactly and never rerun its gate.
- Preserve the outer source-status inspection, which intentionally uses the release gate's candidate Git context.
- Do not change production kernel behavior, package metadata, lock data, compiler behavior, release-review trust policy, or external host responsibilities.
- Do not freeze or gate a successor until focused verification, the complete copied-production lifecycle, pre-freeze verification, and independent semantic review pass.

## Acceptance

- Nested fixture environments contain none of `GIT_DIR`, `GIT_WORK_TREE`, `GIT_INDEX_FILE`, the other repository-routing keys, or injected `GIT_CONFIG_COUNT/KEY_n/VALUE_n` values from their parent process.
- Nested fixture environments set platform-correct null global configuration, disable system configuration, and disable terminal prompting.
- Fixture initialization, copied canonical gate execution, and copied release-review parent execution all consume the same closed environment builder.
- A focused hostile-environment regression passes.
- The complete copied-production lifecycle passes from the corrected source.

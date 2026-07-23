# Revision 40 Root Cause Analysis

## Reproduction

Run fresh R2 preparation against Candidate 16 and its exact passing gate receipt. The candidate child stops before review-package compilation with:

```txt
Correction revision sequence is not contiguous from revision 1: missing revision 30.
```

## Evidence

- Complete package-backed correction roots exist for Revisions 1 through 22.
- Later `release-correction-rN` roots contain implementation notes, diagnoses, test plans, or attempt history but no root-level package envelope, approval, or handoff verification.
- `discoverCorrectionEvidenceSpecs` previously registered a revision after seeing any path under the numbered root.
- The first numeric gap among all named diagnostic roots was Revision 30, so the scanner reported a false lineage break before validating any package.

## Confirmed Cause

Directory naming was used as evidence of package completion. The scanner lacked a closed marker contract that distinguishes specialist-package evidence from diagnostic artifacts sharing the correction prefix.

## Causal Fix

Collect the three root-level package markers per numbered correction root. Include only roots with all three markers, ignore roots with none, and reject roots with a partial marker set. Continue enforcing contiguous numbering across the resulting package-backed revisions.

## Regression Coverage

- Complete package-backed revisions remain discoverable with no terminal count.
- Diagnostic-only higher-numbered roots are ignored.
- A partial marker set fails closed.
- The exact Candidate 16 tree resolves to 22 contiguous package-backed revisions.
- The lifecycle identity pin matches the corrected harness bytes.
- The complete concurrent V12 release suite passes 50 of 50 tests.

## Durable Learning

Names route artifacts; they do not prove artifact completeness. Dynamic evidence discovery must use a closed content marker contract and reject ambiguous partial states.

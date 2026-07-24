# Candidate 22 Retirement

## Candidate

V12 Revision 45 commit `13723ce555413aaf2af3039290867880cf94fe13`, tree `f0012a961be271d39a8d95c7f2b36e49a3756569`.

## Verification Outcome

The exact copied-production lifecycle ran for 97.4 seconds. It removed both gate-only supply keys before review-parent launch, but the fallback-package guard still found source `node_modules` in the nested fixture's ancestor chain.

## Root Cause

The canonical gate's private Git runtime and `TEMP` were owned beneath repository `.local`. Nested lifecycle work therefore remained a descendant of the source checkout even under a closed environment.

## Retirement

No candidate-addressed Revision 45 canonical gate was consumed. Candidate 22 is retired. Revision 46 moves all release-gate scratch ownership outside repository ancestry.
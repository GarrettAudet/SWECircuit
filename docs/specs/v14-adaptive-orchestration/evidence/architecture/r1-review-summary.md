# V14 Architecture Review R1

## Candidate

- Commit: `99d0bcf`
- Compilation:
  `sha256:2af08a1285008a1dacf199674fd8bc80f891c92e65b222d57fd2191873726a5a`
- Package:
  `sha256:04079d416b1f3f1f4b2fa77175a89a56ca99eb272e46daf070ad4797d3733209`
- Search: exhaustive four-work-unit partition search.
- Selected team: four independent read-only reviewers.
- Runtime plan: two Sol/high, one Terra/high, and one Luna/medium according to recorded risk.

## Verified Outcomes

| Work Unit | Outcome | Raw Digest |
| --- | --- | --- |
| `review.routing-api` | `redesign` | `sha256:9831252be4592ad075b14d7f28b1127dcb2bb5180bb81600783dedf273776733` |
| `review.host-lifecycle` | `redesign` | `sha256:743473eb633b07f7f17bbbd5752e2d745abeb0984e16850a105e9cb79e2de6b4` |
| `review.security-evidence` | `redesign` | `sha256:d4cdf1d574a9a3d592b8ad11fa3a0b51e4e11c28e4d87693a53217abd4caddd5` |
| `review.product-runview` | `fix` | `sha256:ece8ae625892ebe76ff41c0f7deb492058cd28c5a49d929a5380d60a33458f7b` |

## Integrated Findings

1. The proposed types and operations are names, not a closed normative API. Revision 2 must define
   exact shapes, schemas, limits, diagnostics, canonical ordering, digest domains, and exports.
2. Runtime demand is not derivable from existing blueprint prose. An owner-authored,
   digest-bound demand policy must provide complete deterministic coverage.
3. Independence and feasibility belong to the complete assignment vector, not isolated
   profile/effort rows. Search claims and global tie-breaking must be explicit.
4. Assignment-only retry contradicts V12 terminal non-pass behavior. Correction must create a new
   immutable generation and V12 session with predecessor evidence and a bounded route budget.
5. An internally consistent receipt cannot prove execution. External expectations, one-use launch
   authorization, materialization claims, and result-capture bindings must prevent cross-run,
   cross-assignment, and cross-receipt substitution.
6. Calibration, inventory completeness, and independence domains are host claims requiring
   owner-reviewed evidence, drift handling, and truthful bounded language.
7. The adaptive session must preserve every identity-bearing input and host observation needed for
   exact restore. Missing source must block.
8. RunView must label kernel-derived, internally verified, host-attested, independently verified,
   and unresolved state separately.
9. The human view must expose serial-versus-parallel rationale, assignment alternatives, typed
   interventions, and the ordinary one-goal quick path.
10. V14 must measure reduction in V13 manual host actions and latency rather than merely claiming
    better ergonomics.

## Host Integration Finding

The first host-lifecycle attempt returned an invalid non-contract response because the launch
translation prohibited commands without delivering source content through another channel. The
integration owner preserved the 145-byte failure, delivered all package-verified context inline,
and accepted only the corrected 6,903-byte handoff after exact verification.

Revision 2 must distinguish host context delivery from specialist-authorized process execution.

## Outcome

`redesign`

No V14 public TypeScript interface may freeze from R1. Preserve this candidate and its handoffs as
failed architecture evidence, then compile and independently review Revision 2.

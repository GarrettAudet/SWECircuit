# V11 Candidate A Standing Approval Binding: Attempt 21

## Owner Authorization

On 2026-07-17, the owner directed:

> Keep pursuing the goal. Don't stop until it's achieved. You have my permission for any revisions and audits.

This standing authority permits correction, recompilation, package verification, and read-only specialist audit loops without another conversational pause. It does not authorize merge to `main`.

## Exact Candidate Binding

- Goal revision: 21.
- Candidate compilation: `sha256:d8ebaaa5e5fd1fe5b6c575c5b53d64b4d495ce5007c987e9189c53614a401266`.
- Candidate package: `sha256:651bdc5ab823d8fb490b5c48f7212d07f042fc1cafbd07efc3460b9954001f7e`.
- Audit B compilation: `sha256:56436e40b2aa999dce21672ec59056cde96f2e5bf08bea9c16fb9302f213694c`.
- Audit B package: `sha256:2c8708ec0e11ec0e5c7e29e182170030129e2a7ffeb2ac40575e1fd396136d90`.
- Audit B semantic handoff: `docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass-attempt-21.json`, 6,559 bytes, `sha256:afcaea5d83a1f2d5c293cccabdf57e816d7da094147c88bd6a5347e4894c66f3`, outcome `pass`.
- Host verification receipt: `docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json`, 2,255 bytes, `sha256:eb17673205ad50f5d544f7f9b2a74c8773bd939b7fd346bb34f895a45491277f`, outcome `pass`.

## Admission Result

The external host bound `approval.json` and `launch-authorization.json` to the identities above. `node scripts/run-v11-dogfood.mjs --check-evidence` then reconstructed both packages, strictly parsed the semantic handoff, verified both independent evidence duties, and returned `result: pass` with launch authorization `pass`.

## Authority Boundary

Authorized effects are limited to the exact contract permissions and stop conditions of the admitted Candidate A specialists. Source corrections require a new revision and new digest pair. Integration may occur only after unanimous admitted PASS handoffs. Merge remains subject to a separate final owner decision.

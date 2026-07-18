# Two-Phase Prelaunch Review

## Status

Accepted V11 dogfood protocol, hardened after attempt 17. This protocol governs an exact compilation that requires semantic review of its own selected team, authority, schedule, or rendered package before launch.

## Problem

A work unit inside compilation A cannot independently inspect the complete bytes of compilation A. Adding those bytes to that work unit changes its blueprint, which changes the compilation and digest. A digest without authenticated bytes proves no reviewable semantics.

## Protocol

```txt
reviewed goal
  -> compile, render, and freeze candidate A
  -> compile and render audit B over A's immutable files
  -> approve B
  -> host reconstructs A and approval-verifies B
  -> host preserves and delivers the external verification receipt
  -> run B binder, then B semantic reviewer
  -> on PASS, bind receipt plus semantic handoff in final authorization
  -> separately approve and verify A
  -> launch only A's exact contracts
```

Candidate A remains the execution package. It contains the goal's specialized work, verification, review, and integration contracts. Its internal algorithm reviewer audits the generic compiler implementation and evidence; it does not claim to review A's own complete compilation.

Audit B is a separate prelaunch package. Its authenticated repository context contains A's complete normalized compilation and every rendered package file, plus the bounded compiler, renderer, contract, and test sources needed to evaluate them. Its candidate binder produces the frozen candidate evidence; a different owner must review exact selection, authority, schedule, evidence coverage, package bindings, and claimed search semantics.

Every rendered-file binding uses standard SHA-256 over exact bytes and a byte count, as declared by the package manifest. Canonical compilation, blueprint, manifest, and package identities remain domain-separated and are verified through `verifySpecialistPackage`. An audit specialist must not be asked to infer an undisclosed digest domain.

## Trust Root

The protocol intentionally stops recursion at audit B. The owner reviews B's small GoalContract and roster, preserves B's expected digest pair outside B, and the external host verifies B against that approval before launch. B does not review itself. Its authority is read-only and cannot execute A, approve A, integrate changes, or mutate memory.

After verification, the host MUST preserve a closed `PrelaunchPackageVerificationReceipt` outside both packages and deliver it as declared runtime input before B Wave 1. It is not a `contextSource`, does not affect B's compilation or package identity, and cannot approve A. B's agents MUST NOT be tasked with reconstructing B's own final root package digest.

After B returns semantic `PASS`, candidate A still requires its own external two-digest approval and package verification. Any change to A changes B's authenticated context and requires a new B compilation, package, approval, receipt, and audit.

The final cross-package launch authorization MUST bind both digest pairs; the receipt's exact path, raw SHA-256, byte count, and `pass` outcome; and the semantic handoff's exact path, raw SHA-256, byte count, and `pass` outcome. The host MUST parse and validate both exact bound byte sequences. Neither an authorization outcome, prose, nor a filename establishes `PASS`.

## Prelaunch Package Verification Receipt

The external host MUST complete this sequence before launching Audit B:

1. Reconstruct Candidate A with `verifySpecialistPackage` against the frozen A pair.
2. Verify Audit B with `verifySpecialistPackage` against B's externally approved pair and preserve the exact B approval record.
3. Generate and preserve the receipt outside both rendered packages.
4. Deliver the same receipt bytes through the binder and reviewer `PrelaunchPackageVerificationReceipt` input ports before Wave 1.
5. Run Wave 1 only when the receipt is closed, current, and `pass`; run Wave 2 only after the binder passes.
6. After Wave 2 returns semantic `PASS`, bind the exact receipt and handoff bytes in final authorization. Approve Candidate A only afterward.

The receipt is the following closed JSON shape. Values are illustrative; a live receipt uses exact reconstructed identities, manifest bindings, waves, approval bytes, and byte counts.

```json
{
  "apiVersion": "swecircuit/prelaunch-package-verification-receipt/v1alpha1",
  "kind": "PrelaunchPackageVerificationReceipt",
  "outcome": "pass",
  "verifier": {
    "operation": "verifySpecialistPackage",
    "specialistApiVersion": "swecircuit/specialist/v1alpha1"
  },
  "candidate": {
    "compilationDigest": "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "packageDigest": "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "verificationOutcome": "pass"
  },
  "prelaunchAudit": {
    "compilationDigest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    "packageDigest": "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    "verificationOutcome": "pass",
    "approvalOutcome": "pass"
  },
  "auditApproval": {
    "path": "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json",
    "digest": "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    "bytes": 197
  },
  "candidateLaunchApproved": false,
  "binder": {
    "agentId": "agent.1111111111111111111111111111111111111111111111111111111111111111",
    "blueprintDigest": "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    "contractFile": "agents/agent.1111111111111111111111111111111111111111111111111111111111111111.md",
    "contractDigest": "sha256:0000000000000000000000000000000000000000000000000000000000000000",
    "contractBytes": 12000
  },
  "reviewer": {
    "agentId": "agent.2222222222222222222222222222222222222222222222222222222222222222",
    "blueprintDigest": "sha256:3333333333333333333333333333333333333333333333333333333333333333",
    "contractFile": "agents/agent.2222222222222222222222222222222222222222222222222222222222222222.md",
    "contractDigest": "sha256:4444444444444444444444444444444444444444444444444444444444444444",
    "contractBytes": 30000
  },
  "launchWaves": [
    {
      "start": 0,
      "agentIds": [
        "agent.1111111111111111111111111111111111111111111111111111111111111111"
      ]
    },
    {
      "start": 4,
      "agentIds": [
        "agent.2222222222222222222222222222222222222222222222222222222222222222"
      ]
    }
  ]
}
```

Validation MUST fail closed unless:

- strict, duplicate-aware JSON contains exactly these fields, uses safe text, and is at most 16,384 bytes;
- both digest pairs equal the host's trusted reconstructions and both verification outcomes are `pass`;
- the Audit B approval outcome is `pass`, its expected pair equals B, and `auditApproval` binds that exact approval path, raw digest, and byte count;
- `verifier` names `verifySpecialistPackage` and the exact Specialist API version;
- `binder`, `reviewer`, and `launchWaves` exactly equal B's verified manifest and blueprint bindings;
- `candidateLaunchApproved` is exactly `false`; and
- the delivered receipt is present and current before each Audit B wave that declares the receipt input.

The receipt cannot be part of B's `contextSources` or package. Including an artifact that binds B's final package digest in the package whose digest it binds creates self-reference: adding or changing the artifact changes that digest. Keeping the receipt external lets the host make its package verification visible in the evidence chain without asking B to verify itself. Merely deleting the over-broad verification demand is insufficient because it would leave the host verification unbound and invisible.

## Audit Handoff Envelope

Audit B Wave 2 returns exactly one `swecircuit/prelaunch-audit-handoff/v1alpha1` `PrelaunchAuditHandoff` object:

The identities below are illustrative; a live handoff uses the exact reconstructed values.

```json
{
  "apiVersion": "swecircuit/prelaunch-audit-handoff/v1alpha1",
  "kind": "PrelaunchAuditHandoff",
  "outcome": "pass",
  "destination": "v11.integration-owner",
  "goal": {
    "id": "v11.specialist-compiler.prelaunch-audit",
    "revision": 25,
    "digest": "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "agent": {
    "id": "agent.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "blueprintDigest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
  },
  "compilationDigest": "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  "reviewer": {
    "agentId": "agent.bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "blueprintDigest": "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
  },
  "candidate": {
    "compilationDigest": "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
    "packageDigest": "sha256:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  },
  "prelaunchAudit": {
    "compilationDigest": "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    "packageDigest": "sha256:0000000000000000000000000000000000000000000000000000000000000000"
  },
  "summary": "PASS summary grounded in the attached review artifact.",
  "workUnitsCompleted": [
    "audit.review-candidate-compilation"
  ],
  "artifacts": [
    {
      "name": "candidate-compilation-review.md",
      "mediaType": "text/markdown",
      "content": "# Candidate Compilation Review\n\nOutcome: `PASS`\n"
    }
  ],
  "evidence": [
    {
      "criterionId": "criterion.candidate-authority-package",
      "requirementId": "evidence.candidate-authority-review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "candidate-compilation-review.md"
    },
    {
      "criterionId": "criterion.candidate-selection",
      "requirementId": "evidence.candidate-selection-review",
      "kind": "review",
      "duty": "review",
      "status": "pass",
      "artifact": "candidate-compilation-review.md"
    }
  ],
  "assumptions": [],
  "risks": [],
  "followUps": []
}
```
The host validates all of these conditions against its trusted reconstructions:

- The object and every nested record contain exactly the documented keys; malformed JSON, duplicate keys, unknown fields, unsafe controls, and bidirectional formatting controls fail closed.
- `goal` names Audit B's exact goal revision and digest.
- `agent` and `reviewer` both name the sole selected blueprint that owns `audit.review-candidate-compilation`, while `compilationDigest` and `prelaunchAudit.compilationDigest` both name Audit B's exact compilation.
- Any disagreement between those duplicate standard and audit-specific bindings fails closed.
- `candidate` and `prelaunchAudit` match the two externally retained digest pairs.
- `destination`, `workUnitsCompleted`, and the artifact list match the selected reviewer blueprint.
- Both independent review duties appear exactly once with `status: "pass"` and reference the bound review artifact.
- The launch authorization's handoff outcome matches the parsed envelope. The authorization field, prose, artifact content, or filename cannot establish `PASS` by itself.

## Required Evidence

- Candidate A GoalContract, compilation, report, package, and later external approval.
- Audit B GoalContract, compilation, report, package, and separate prelaunch approval.
- Exact external `PrelaunchPackageVerificationReceipt` delivered before B launch.
- Raw B semantic handoff bound to both digest pairs.
- Final authorization binding both pairs plus the exact receipt and handoff bytes.
- Raw A specialist handoffs, release verification, and integration review showing B passed before A approval.

## Host Boundary

V11 core supplies pure compilation, rendering, and package-verification operations. The reference host or dogfood protocol reconstructs packages, creates and delivers the receipt, preserves ordering and raw evidence, enforces authority, executes agents, and prevents A from launching before B passes. The receipt records those external checks; it does not claim that V11 core performs or enforces runtime effects.

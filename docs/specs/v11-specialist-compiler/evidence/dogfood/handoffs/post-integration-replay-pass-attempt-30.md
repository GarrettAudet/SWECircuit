# V11 Post-Integration Replay: Attempt 30

## Outcome

`PASS`

## Bound Integration

- Integration handoff: 13,720 bytes, `sha256:a5fd2bcf1b9bf76137aeca02f74f2b7365a5737f0372ede9e0ca0456d5d30413`.
- Integration handoff semantic digest: `sha256:40a5bcd5b52ddfbe82962a799cdf08cd5bb7519d767c5dcb5ff88415cd5935f3`.
- Machine fan-in: 3,464 bytes, `sha256:eaaef20dcae183a7c97cc2396f55e32c7cb434d73ce2e708fc0c1d792d330823`, `integrationReady: true`.

The integration handoff's review and milestone artifacts exactly matched the persisted files, and its ledger artifact was present verbatim in the history ledger.

## Replay

```powershell
npm.cmd run dogfood:v11
```

```json
{"result":"pass","candidate":{"result":"pass","compilationDigest":"sha256:ced8186898ebb27bac53e50e6b803c353766ae015464a2bae2b758cb6cf6cc36","packageDigest":"sha256:ddb642a474815b4ded464b40f5bd8225a404f610d3bd4a91d0ab2d43dc695f43","selectedAgents":6,"projectedMakespan":23,"serialEligible":false,"serialProjectedMakespan":40,"searchMode":"exact","evaluatedCandidates":203},"prelaunchAudit":{"result":"pass","compilationDigest":"sha256:79c5a7103225b12398e27c0e959b993597f38dcc5ddca6d9750a4d2b62f2d065","packageDigest":"sha256:367d9b3d57b918aabc6543dae16b9b3cf5fee81338fd241226ef9bef2209510f","selectedAgents":2,"projectedMakespan":16,"serialEligible":false,"serialProjectedMakespan":13,"searchMode":"exact","evaluatedCandidates":2},"packageVerificationReceipt":{"result":"pass","path":"docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json","digest":"sha256:7d859cd7ef8c069b08ff3ce569e29715322dcb7ae176b1e5f0607eb4f1c0664f","bytes":2255,"outcome":"pass"},"launchAuthorization":{"result":"pass"}}
```

The first default-sandbox invocation was denied while rebuilding `dist/**`. The exact command was retried with write authority limited to `dist/**` and `.local/npm-cache/**`; that retry passed.

## Interpretation

- Authorized integration outputs did not change either package's immutable inputs.
- Both approved compilation/package pairs remain reconstructable after integration.
- The external receipt and semantic Audit B handoff retain their exact raw identities and `pass` outcomes.
- Revision 30 may proceed to final host verification, accepted-run archival, branch publication, and the explicit owner merge gate.
- This evidence is not merge approval and does not claim V11 core performed runtime or persistence effects.

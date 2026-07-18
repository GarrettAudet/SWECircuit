# V11 Dogfood Attempt 18

Status: retired with `fix` during Audit B Wave 1.

## Frozen Identities

- Candidate A compilation: `sha256:cac4d6f9c7702a5b3018f1a66df63a96f55805e0ddfde174a0f7db0048f12df3`
- Candidate A package: `sha256:5a1d43a399cabb60af82913eb5006afc312c3f2e816aac025fee1bd601736851`
- Audit B compilation: `sha256:6b2ff4940cd116618572d80fda9df8c3de455e0ec4c31c35009d28e6004e7048`
- Audit B package: `sha256:c7ad2f3b97801d426dfa51c4f630e40dfc817be627c6dc26b3282807fd234b28`

Audit B received exact owner approval. Candidate A did not: the archived root
`approval.json` and `launch-authorization.json` are stale attempt-17 controls
preserved as evidence that the host rejected them for attempt 18.

## Outcome

The read-only binder authenticated all 10 authorized Candidate A files and
passed 93 structural checks, then failed closed because the runtime prompt
required package-root proof outside its declared authority. The exact raw
handoff is copied under `handoffs/`: 14,869 bytes,
`sha256:38c5ce9466bcc6b987209e2eca176643caebcb728d08f35e105c152e6a9fb3d6`.

Audit B Wave 2 did not run. Candidate A was not approved, launched, or
integrated. Revision 19 must use the external
`PrelaunchPackageVerificationReceipt` protocol before repeating the audit.

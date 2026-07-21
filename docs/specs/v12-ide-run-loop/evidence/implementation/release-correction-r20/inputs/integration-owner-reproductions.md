# Revision 20 Integration-Owner Reproductions

## 1. Non-Scalar Handoff Path Accepted

The exact Revision 19 parent test hook accepted a lone high surrogate in a handoff filename:

```txt
input code unit: d800
parsePhaseInputs outcome: accepted
serialized path: handoffs/\ud800.json
```

The boundary encoded the original string with `Buffer.from(value, "utf8")`, validated the replacement-decoded path, then returned the original non-scalar string. The fix must validate and use one identical scalar value.

## 2. Repository Cache Accepted

The exact Revision 19 cache hook accepted the repository root as the explicit npm cache:

```json
{"repositoryCacheAccepted":"C:\\tmp\\swecircuit-identity-main"}
```

This permits a cache-using process to create untracked state in the source/evidence tree before the parent reaches its final tracked-only repository check. The fix must reject equal, descendant, ancestor, and realpath-alias overlap before invoking npm or another cache-using host tool.

## 3. Independent Package Identity Finding

The exact Revision 19 independent reviewer returned verified `fix`:

- Raw handoff: 14,245 bytes; `sha256:3e9b1b368f22be254a5835f667be23d19c58f0e3509aec490c0f5e878e69bb41`.
- Semantic digest: `sha256:bbda869cc5296bdd5f7d7a748843fb17006dabe9656d55692044e32037136dcb`.
- Content digest: `sha256:f258a7d4531a078c2801a6b06a38fa493def671e724c5099d617f186e8c35b55`.
- Complete reviewer package roster; `phaseReady: false` because the semantic outcome is `fix`.

Its critical reproduction traced phase-specific owner/handoff values into `externalInputsDigest`, candidate manifest bytes, request context, and therefore package identity. A successful Revision 20 must demonstrate one compile pair surviving fresh approve and verify reconstruction.

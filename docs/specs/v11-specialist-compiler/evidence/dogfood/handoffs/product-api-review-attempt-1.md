# Product/API Review Handoff: Attempt 1

## Binding

- Compilation: `sha256:32f615017d7f5b0f7648a6818420857c0ffb258aa6a721d94c685da08b8c6254`
- Agent: `agent.5594b1d7ca363b54a76d653f6374169d51641bf35ecec55d69107226b666069e`
- Work unit: `review.product-api`
- Verdict: `REVISE`

## Findings

### P1: Reviewed assumptions are not canonical

The contract requires assumptions and unresolved decisions to be reviewed and presented before launch, but the closed `GoalContract` schema and TypeScript interface contain neither. Launch-critical assumptions can therefore remain outside `goalDigest` and the compilation digest.

Required correction: add digest-bound assumptions and unresolved decisions, or a required typed reference to them.

### P1: The portable package cannot satisfy its launch gate alone

The gate requires assumptions, search mode and bounded-search disclaimer, plus the first decisive comparator or independence gate. The rendered integration summary and manifest omit those values, while `RenderedSpecialistPackage` exposes no compilation. A downstream host receiving only the advertised package cannot legally launch from it.

Required correction: include a digest-bound launch-review summary or the complete compilation.

### P2: TypeScript permission kind is wider than the schema

`SpecialistPermission.kind` is unrestricted `string`, while the schema permits exactly five values. TypeScript consumers can construct apparently valid requests that fail at runtime.

Required correction: export and use the exact permission-kind union with a type-level installed-consumer regression.

## Handoff

```json
{
  "summary": "REVISE: two P1 contract-closure failures and one P2 TypeScript/schema mismatch prevent product/API acceptance. The task demand is exact and the reviewed core does not require a provider or runtime.",
  "workUnitsCompleted": ["review.product-api"],
  "artifacts": ["product-api-review.md"],
  "evidence": [
    "Context integrity PASS: all seven declared context items matched their exact byte counts and SHA-256 digests.",
    "The requested compilation digest matches the generated contract header.",
    "Independent review completed against criterion.product-api / evidence.product-review.",
    "One initial read-only hash-report command had a PowerShell pipeline parser error; the corrected command passed 7/7 checks.",
    "No files were changed and no processes or tests were executed."
  ],
  "assumptions": [
    "The integration host satisfied the compiled producer dependency before dispatch.",
    "Only the seven digest-bound candidate artifacts were treated as review evidence."
  ],
  "risks": [
    "Compiler algorithm and lifecycle behavior were outside this product/API blueprint.",
    "Until revised, hosts may depend on unbound out-of-band review context while believing the rendered package is launch-complete."
  ],
  "followUps": [
    "Bind assumptions and unresolved decisions into GoalContract semantics.",
    "Add launch-gate data to the rendered package.",
    "Narrow SpecialistPermission.kind and add TypeScript/schema parity coverage.",
    "Recompile, render under a new digest, and repeat independent product/API review."
  ]
}
```

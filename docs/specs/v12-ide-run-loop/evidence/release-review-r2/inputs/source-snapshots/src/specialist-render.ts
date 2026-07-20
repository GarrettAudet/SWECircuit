import { createHash } from "node:crypto";
import { TextEncoder } from "node:util";
import {
  boundedJsonUtf8ByteLength,
  boundedUtf8ByteLength,
  canonicalJson,
  digestCanonicalJson,
} from "./canonical-json.js";
import { SPECIALIST_API_VERSION, SPECIALIST_LIMITS } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import { hasParsingErrors, parseJsonBuffer } from "./json.js";
import type { JsonObject, JsonValue } from "./model.js";
import { snapshotJsonValue } from "./snapshot.js";
import { compileAgentBlueprints } from "./specialist-compiler.js";
import type {
  AgentBlueprint,
  AgentBlueprintCompilation,
  RenderedSpecialistFile,
  RenderedSpecialistPackage,
  SpecialistPackageExpectation,
  SpecialistPackageManifest,
} from "./specialist-types.js";
import type { OperationResult } from "./types.js";

const ARTIFACT = "specialist-compilation.json";
const PACKAGE_ARTIFACT = "specialist-package.json";
const PACKAGE_ENVELOPE_BYTES = SPECIALIST_LIMITS.outputBytes * 8;
const encoder = new TextEncoder();

interface FileBudget {
  remaining: number;
}

interface Reconstruction<T> {
  readonly value: T | null;
  readonly limitExceeded: boolean;
}

class SpecialistLimitError extends Error {}

function invalidReconstruction<T>(limitExceeded = false): Reconstruction<T> {
  return Object.freeze({ value: null, limitExceeded });
}

function validReconstruction<T>(value: T): Reconstruction<T> {
  return Object.freeze({ value, limitExceeded: false });
}

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function stringifyBounded(value: JsonValue): string {
  if (boundedJsonUtf8ByteLength(value, SPECIALIST_LIMITS.outputBytes, 2) === null) {
    throw new SpecialistLimitError();
  }
  const json = JSON.stringify(value, null, 2);
  if (json === undefined) {
    throw new TypeError("Specialist JSON rendering returned no content.");
  }
  return json;
}

function freezeJson<T>(value: T): T {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null) {
    throw new TypeError("Constructed specialist package is not bounded JSON.");
  }
  return snapshot.value as unknown as T;
}

function withDigest<T extends JsonObject>(
  domain: string,
  value: T,
): T & { readonly contentDigest: string } {
  return {
    ...value,
    contentDigest: digestCanonicalJson(domain, value),
  };
}

function isObject(value: JsonValue): value is JsonObject {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function property(object: JsonObject, key: string): JsonValue | undefined {
  return Object.getOwnPropertyDescriptor(object, key)?.value as JsonValue | undefined;
}

function rawSha256Digest(bytes: Uint8Array): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function dynamicFence(text: string): string {
  let longest = 0;
  let current = 0;
  for (const character of text) {
    if (character === "`") {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 0;
    }
  }
  return "`".repeat(Math.max(3, longest + 1));
}

export function expectedSpecialistHandoffMediaType(name: string): string {
  if (name.endsWith(".json")) {
    return "application/json";
  }
  if (name.endsWith(".md")) {
    return "text/markdown";
  }
  return "text/plain";
}

function renderHandoffEnvelope(blueprint: AgentBlueprint, compilationDigest: string): JsonObject {
  const artifacts = blueprint.handoff.artifacts;
  const firstArtifact = artifacts[0];
  if (firstArtifact === undefined) {
    throw new TypeError("Specialist handoff has no declared artifact.");
  }
  return {
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistAgentHandoff",
    outcome: "pass",
    destination: blueprint.handoff.destination,
    goal: {
      id: blueprint.goalId,
      revision: blueprint.goalRevision,
      digest: blueprint.goalDigest,
    },
    agent: {
      id: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
    },
    compilationDigest,
    summary: "Replace with a concise result summary.",
    workUnitsCompleted: [...blueprint.workUnitIds],
    artifacts: artifacts.map((name) => ({
      name,
      mediaType: expectedSpecialistHandoffMediaType(name),
      content: "Replace with the complete artifact content.",
    })),
    evidence: blueprint.evidenceDuties.map((duty, index) => ({
      criterionId: duty.criterionId,
      requirementId: duty.requirementId,
      kind: duty.kind,
      duty: duty.duty,
      status: "pass",
      artifact: artifacts[index % artifacts.length] ?? firstArtifact,
    })),
    assumptions: [],
    risks: [],
    followUps: [],
  };
}

function renderAgentContract(blueprint: AgentBlueprint, compilationDigest: string): string {
  const json = stringifyBounded(asJson(blueprint));
  const fence = dynamicFence(json);
  const handoffJson = stringifyBounded(asJson(renderHandoffEnvelope(blueprint, compilationDigest)));
  const handoffFence = dynamicFence(handoffJson);
  return `# Specialist Contract: ${blueprint.id}

Compilation: \`${compilationDigest}\`
Blueprint: \`${blueprint.contentDigest}\`

This is the exact provider-neutral task contract approved for this specialist. A host may translate it into runtime-specific instructions, but it must not widen authority, add work, omit evidence, or change the handoff.

## Operating Rules

1. Verify every delivered context item against its declared raw SHA-256 digest and byte count before using it.
2. Work only on the listed work units, Modules, scopes, capabilities, and permissions.
3. Respect agent dependencies and stop when a stop condition or undeclared decision is reached.
4. Produce every assigned evidence duty and every required handoff field.
5. Report assumptions, risks, failed attempts, and follow-up work; do not silently expand scope.

Manifest file digests use standard SHA-256 over the exact file bytes. Compilation, blueprint, manifest, and package identities are SWECircuit domain-separated digests and must be verified through the package verifier or another implementation of the published contract.

## Blueprint

${fence}json
${json}
${fence}

## Required Handoff Envelope

Return one strict UTF-8 JSON object with exactly the shape below. Replace the summary and artifact content, but do not add keys or substitute the blueprint evidence-duty shape.

- Artifact content is always a string, including for application/json.
- Evidence entries contain exactly criterionId, requirementId, kind, duty, status, and artifact.
- A pass must list every owned work unit, exact artifact name, and exact evidence duty. A non-pass outcome lists only work actually completed and preserves bounded failure evidence.
- If a stop condition explicitly requires a stricter custom envelope, the host must provide that closed schema; it must retain the standard goal, agent, compilation, artifact, evidence, and outcome bindings shown here.

${handoffFence}json
${handoffJson}
${handoffFence}
`;
}

function renderIntegrationContract(compilation: AgentBlueprintCompilation): string {
  const summary = stringifyBounded(
    asJson({
      compilationDigest: compilation.contentDigest,
      goalId: compilation.goal.id,
      goalRevision: compilation.goal.revision,
      assumptions: compilation.goal.assumptions,
      unresolvedDecisions: compilation.goal.unresolvedDecisions,
      search: compilation.search,
      selectedCandidateId: compilation.selected.id,
      selectedMetrics: compilation.selected.metrics,
      selectionReason: compilation.selectionReason,
      serialBaseline: {
        id: compilation.serialBaseline.id,
        eligible: compilation.serialBaseline.eligible,
        rejectionCodes: compilation.serialBaseline.rejectionCodes,
        metrics: compilation.serialBaseline.metrics,
      },
      launchWaves: compilation.launchWaves,
      blueprintDigests: compilation.blueprints.map((blueprint) => ({
        agentId: blueprint.id,
        digest: blueprint.contentDigest,
      })),
    }),
  );
  const fence = dynamicFence(summary);
  return `# Specialist Integration Contract

Compilation: \`${compilation.contentDigest}\`

The integration owner launches only the contracts bound to this compilation, preserves each raw handoff, verifies required evidence, resolves declared dependencies in order, and returns to clarification or redesign when a specialist crosses its boundary.

## Integration Gates

1. Confirm every emitted file matches its manifest-listed raw SHA-256 digest and byte count, and every agent contract carries this compilation digest and its manifest-listed blueprint digest.
2. Launch agents only when their dependency wave is ready and external workspace isolation is adequate.
3. Reject undeclared files, authority, context, decisions, or evidence substitutions.
4. Fan in handoffs through the declared integration owner; do not let one specialist silently approve its own independent duty.
5. Run feature-level verification and review before merge, then promote only source-linked durable learning.

## Compiled Plan

${fence}json
${summary}
${fence}
`;
}

function renderedFile(
  path: string,
  mediaType: RenderedSpecialistFile["mediaType"],
  content: string,
  budget: FileBudget,
): RenderedSpecialistFile {
  const byteLength = boundedUtf8ByteLength(content, budget.remaining);
  if (byteLength === null) {
    throw new SpecialistLimitError();
  }
  const bytes = encoder.encode(content);
  if (bytes.byteLength !== byteLength) {
    throw new TypeError("Specialist UTF-8 measurement disagrees with encoding.");
  }
  budget.remaining -= byteLength;
  return Object.freeze({
    path,
    mediaType,
    bytes: byteLength,
    digest: rawSha256Digest(bytes),
    content,
  });
}

function packageRootDigest(
  compilationDigest: string,
  manifestDigest: string,
  files: readonly RenderedSpecialistFile[],
): string {
  return digestCanonicalJson(
    "swecircuit.specialist.package-root.v1",
    asJson({
      compilationDigest,
      manifestDigest,
      files: files.map((file) => ({
        path: file.path,
        mediaType: file.mediaType,
        bytes: file.bytes,
        digest: file.digest,
      })),
    }),
  );
}
function reconstructCompilation(value: unknown): Reconstruction<AgentBlueprintCompilation> {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null || !isObject(snapshot.value)) {
    return invalidReconstruction();
  }
  if (boundedJsonUtf8ByteLength(snapshot.value, SPECIALIST_LIMITS.outputBytes) === null) {
    return invalidReconstruction(true);
  }

  const object = snapshot.value;
  const apiVersion = property(object, "apiVersion");
  const kind = property(object, "kind");
  const contentDigest = property(object, "contentDigest");
  const goal = property(object, "goal");
  const proposedCandidates = property(object, "proposedCandidates");
  if (
    apiVersion !== SPECIALIST_API_VERSION ||
    kind !== "AgentBlueprintCompilation" ||
    typeof contentDigest !== "string" ||
    goal === undefined ||
    !Array.isArray(proposedCandidates)
  ) {
    return invalidReconstruction();
  }
  const result = compileAgentBlueprints({
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal,
    proposedCandidates,
  });
  if (!result.ok || result.value === null) {
    return invalidReconstruction(
      result.diagnostics.some((diagnostic) => diagnostic.code === "SC4308"),
    );
  }
  if (
    result.value.contentDigest !== contentDigest ||
    canonicalJson(asJson(result.value)) !== canonicalJson(snapshot.value)
  ) {
    return invalidReconstruction();
  }
  return validReconstruction(result.value);
}

export function renderSpecialistPackage(
  input: unknown,
): OperationResult<RenderedSpecialistPackage> {
  try {
    const reconstructed = reconstructCompilation(input);
    if (reconstructed.limitExceeded) {
      return operationResult<RenderedSpecialistPackage>(
        [createDiagnostic("SC4308", ARTIFACT)],
        null,
      );
    }
    const compilation = reconstructed.value;
    if (compilation === null) {
      return operationResult<RenderedSpecialistPackage>(
        [createDiagnostic("SC4307", ARTIFACT)],
        null,
      );
    }

    const budget: FileBudget = { remaining: SPECIALIST_LIMITS.outputBytes };
    const compilationFile = renderedFile(
      "compilation.json",
      "application/json",
      `${stringifyBounded(asJson(compilation))}\n`,
      budget,
    );
    const integrationFile = renderedFile(
      "integration.md",
      "text/markdown",
      renderIntegrationContract(compilation),
      budget,
    );
    const agentFiles = compilation.blueprints.map((blueprint) =>
      renderedFile(
        `agents/${blueprint.id}.md`,
        "text/markdown",
        renderAgentContract(blueprint, compilation.contentDigest),
        budget,
      ),
    );
    const fileByPath = new Map(agentFiles.map((file) => [file.path, file] as const));
    const agents = compilation.blueprints.map((blueprint) => {
      const contractFile = `agents/${blueprint.id}.md`;
      const file = fileByPath.get(contractFile);
      if (file === undefined) {
        throw new TypeError("Rendered specialist contract is missing.");
      }
      return {
        agentId: blueprint.id,
        blueprintDigest: blueprint.contentDigest,
        contractFile,
        contractDigest: file.digest,
        contractBytes: file.bytes,
      };
    });
    const manifestBase = {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "SpecialistPackageManifest",
      goalId: compilation.goal.id,
      goalRevision: compilation.goal.revision,
      fileDigestAlgorithm: "sha256",
      fileDigestScope: "raw-file-bytes",
      compilationDigest: compilation.contentDigest,
      selectedCandidateId: compilation.selected.id,
      launchWaves: compilation.launchWaves,
      compilationFile: "compilation.json",
      compilationFileDigest: compilationFile.digest,
      compilationFileBytes: compilationFile.bytes,
      agents,
      integrationFile: "integration.md",
      integrationDigest: integrationFile.digest,
      integrationBytes: integrationFile.bytes,
    } as const;
    const manifest = freezeJson(
      withDigest(
        "swecircuit.specialist.package-manifest.v1",
        manifestBase as unknown as JsonObject,
      ) as unknown as SpecialistPackageManifest,
    );
    const manifestFile = renderedFile(
      "manifest.json",
      "application/json",
      `${stringifyBounded(asJson(manifest))}\n`,
      budget,
    );
    const files = [manifestFile, compilationFile, integrationFile, ...agentFiles].sort(
      (left, right) => compareText(left.path, right.path),
    );
    const result = freezeJson<RenderedSpecialistPackage>({
      compilationDigest: compilation.contentDigest,
      packageDigest: packageRootDigest(compilation.contentDigest, manifest.contentDigest, files),
      manifest,
      files,
    });
    return operationResult([], result);
  } catch (error) {
    return error instanceof SpecialistLimitError
      ? operationResult<RenderedSpecialistPackage>([createDiagnostic("SC4308", ARTIFACT)], null)
      : operationResult<RenderedSpecialistPackage>([createDiagnostic("SC9001", ARTIFACT)], null);
  }
}
function reconstructPackage(value: unknown): Reconstruction<RenderedSpecialistPackage> {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null || !isObject(snapshot.value)) {
    return invalidReconstruction();
  }
  if (boundedJsonUtf8ByteLength(snapshot.value, PACKAGE_ENVELOPE_BYTES) === null) {
    return invalidReconstruction(true);
  }

  const files = property(snapshot.value, "files");
  if (!Array.isArray(files)) {
    return invalidReconstruction();
  }
  let remaining = SPECIALIST_LIMITS.outputBytes;
  for (const file of files) {
    if (!isObject(file)) {
      return invalidReconstruction();
    }
    const fileContent = property(file, "content");
    if (typeof fileContent !== "string") {
      return invalidReconstruction();
    }
    const bytes = boundedUtf8ByteLength(fileContent, remaining);
    if (bytes === null) {
      return invalidReconstruction(true);
    }
    remaining -= bytes;
  }

  const compilationFiles = files.filter(
    (file) => isObject(file) && property(file, "path") === "compilation.json",
  );
  if (compilationFiles.length !== 1) {
    return invalidReconstruction();
  }
  const compilationFile = compilationFiles[0];
  if (compilationFile === undefined || !isObject(compilationFile)) {
    return invalidReconstruction();
  }
  const content = property(compilationFile, "content");
  if (typeof content !== "string") {
    return invalidReconstruction();
  }
  const parsed = parseJsonBuffer(
    encoder.encode(content),
    "compilation.json",
    SPECIALIST_LIMITS.outputBytes,
  );
  if (hasParsingErrors(parsed) || parsed.value === null) {
    return invalidReconstruction();
  }
  const rendered = renderSpecialistPackage(parsed.value);
  if (!rendered.ok || rendered.value === null) {
    return invalidReconstruction(
      rendered.diagnostics.some((diagnostic) => diagnostic.code === "SC4308"),
    );
  }
  if (boundedJsonUtf8ByteLength(asJson(rendered.value), PACKAGE_ENVELOPE_BYTES) === null) {
    return invalidReconstruction(true);
  }
  return canonicalJson(asJson(rendered.value)) === canonicalJson(snapshot.value)
    ? validReconstruction(rendered.value)
    : invalidReconstruction();
}
function reconstructExpectation(value: unknown): SpecialistPackageExpectation | null {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null || !isObject(snapshot.value)) {
    return null;
  }
  if (
    Object.keys(snapshot.value).length !== 2 ||
    typeof property(snapshot.value, "compilationDigest") !== "string" ||
    typeof property(snapshot.value, "packageDigest") !== "string"
  ) {
    return null;
  }
  return snapshot.value as unknown as SpecialistPackageExpectation;
}

export function verifySpecialistPackage(
  input: unknown,
  expectation: unknown,
): OperationResult<RenderedSpecialistPackage> {
  try {
    const expected = reconstructExpectation(expectation);
    const reconstructed = reconstructPackage(input);
    if (reconstructed.limitExceeded) {
      return operationResult<RenderedSpecialistPackage>(
        [createDiagnostic("SC4308", PACKAGE_ARTIFACT)],
        null,
      );
    }
    const value = reconstructed.value;
    if (
      expected === null ||
      value === null ||
      value.compilationDigest !== expected.compilationDigest ||
      value.packageDigest !== expected.packageDigest
    ) {
      return operationResult<RenderedSpecialistPackage>(
        [createDiagnostic("SC4307", PACKAGE_ARTIFACT)],
        null,
      );
    }
    return operationResult([], value);
  } catch {
    return operationResult<RenderedSpecialistPackage>(
      [createDiagnostic("SC9001", PACKAGE_ARTIFACT)],
      null,
    );
  }
}

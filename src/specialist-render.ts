import { TextEncoder } from "node:util";
import { canonicalJson, digestBytes, digestCanonicalJson } from "./canonical-json.js";
import { SPECIALIST_API_VERSION, SPECIALIST_LIMITS } from "./constants.js";
import { createDiagnostic, operationResult } from "./diagnostics.js";
import type { JsonObject, JsonValue } from "./model.js";
import { snapshotJsonValue } from "./snapshot.js";
import { compileAgentBlueprints } from "./specialist-compiler.js";
import type {
  AgentBlueprint,
  AgentBlueprintCompilation,
  RenderedSpecialistFile,
  RenderedSpecialistPackage,
  SpecialistPackageManifest,
} from "./specialist-types.js";
import type { OperationResult } from "./types.js";

const ARTIFACT = "specialist-compilation.json";
const encoder = new TextEncoder();

function asJson(value: unknown): JsonValue {
  return value as JsonValue;
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
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

function renderAgentContract(blueprint: AgentBlueprint, compilationDigest: string): string {
  const json = JSON.stringify(blueprint, null, 2);
  const fence = dynamicFence(json);
  return `# Specialist Contract: ${blueprint.id}

Compilation: \`${compilationDigest}\`
Blueprint: \`${blueprint.contentDigest}\`

This is the exact provider-neutral task contract approved for this specialist. A host may translate it into runtime-specific instructions, but it must not widen authority, add work, omit evidence, or change the handoff.

## Operating Rules

1. Verify every delivered context item against its declared digest and byte count before using it.
2. Work only on the listed work units, Modules, scopes, capabilities, and permissions.
3. Respect agent dependencies and stop when a stop condition or undeclared decision is reached.
4. Produce every assigned evidence duty and every required handoff field.
5. Report assumptions, risks, failed attempts, and follow-up work; do not silently expand scope.

## Blueprint

${fence}json
${json}
${fence}
`;
}

function renderIntegrationContract(compilation: AgentBlueprintCompilation): string {
  const summary = JSON.stringify(
    {
      compilationDigest: compilation.contentDigest,
      goalId: compilation.goal.id,
      goalRevision: compilation.goal.revision,
      selectedCandidateId: compilation.selected.id,
      selectedMetrics: compilation.selected.metrics,
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
    },
    null,
    2,
  );
  const fence = dynamicFence(summary);
  return `# Specialist Integration Contract

Compilation: \`${compilation.contentDigest}\`

The integration owner launches only the contracts bound to this compilation, preserves each raw handoff, verifies required evidence, resolves declared dependencies in order, and returns to clarification or redesign when a specialist crosses its boundary.

## Integration Gates

1. Confirm every agent contract carries this compilation digest and its manifest-listed blueprint digest.
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
): RenderedSpecialistFile {
  const bytes = encoder.encode(content);
  return Object.freeze({
    path,
    mediaType,
    bytes: bytes.byteLength,
    digest: digestBytes("swecircuit.specialist.rendered-file.v1", bytes),
    content,
  });
}

function reconstructCompilation(value: unknown): AgentBlueprintCompilation | null {
  const snapshot = snapshotJsonValue(value);
  if (snapshot.failure !== null || snapshot.value === null || !isObject(snapshot.value)) {
    return null;
  }
  const object = snapshot.value;
  if (
    object["apiVersion"] !== SPECIALIST_API_VERSION ||
    object["kind"] !== "AgentBlueprintCompilation" ||
    typeof object["contentDigest"] !== "string" ||
    object["goal"] === undefined ||
    !Array.isArray(object["proposedCandidates"])
  ) {
    return null;
  }
  const result = compileAgentBlueprints({
    apiVersion: SPECIALIST_API_VERSION,
    kind: "SpecialistCompilationRequest",
    goal: object["goal"],
    proposedCandidates: object["proposedCandidates"],
  });
  if (!result.ok || result.value === null) {
    return null;
  }
  if (
    result.value.contentDigest !== object["contentDigest"] ||
    canonicalJson(asJson(result.value)) !== canonicalJson(snapshot.value)
  ) {
    return null;
  }
  return result.value;
}

export function renderSpecialistPackage(
  input: unknown,
): OperationResult<RenderedSpecialistPackage> {
  try {
    const compilation = reconstructCompilation(input);
    if (compilation === null) {
      return operationResult<RenderedSpecialistPackage>(
        [createDiagnostic("SC4307", ARTIFACT)],
        null,
      );
    }

    const agents = compilation.blueprints.map((blueprint) => ({
      agentId: blueprint.id,
      blueprintDigest: blueprint.contentDigest,
      contractFile: `agents/${blueprint.id}.md`,
    }));
    const manifestBase = {
      apiVersion: SPECIALIST_API_VERSION,
      kind: "SpecialistPackageManifest",
      goalId: compilation.goal.id,
      goalRevision: compilation.goal.revision,
      compilationDigest: compilation.contentDigest,
      selectedCandidateId: compilation.selected.id,
      launchWaves: compilation.launchWaves,
      agents,
      integrationFile: "integration.md",
    } as const;
    const manifest = freezeJson(
      withDigest(
        "swecircuit.specialist.package-manifest.v1",
        manifestBase as unknown as JsonObject,
      ) as unknown as SpecialistPackageManifest,
    );
    const files = [
      renderedFile("manifest.json", "application/json", `${JSON.stringify(manifest, null, 2)}\n`),
      renderedFile("integration.md", "text/markdown", renderIntegrationContract(compilation)),
      ...compilation.blueprints.map((blueprint) =>
        renderedFile(
          `agents/${blueprint.id}.md`,
          "text/markdown",
          renderAgentContract(blueprint, compilation.contentDigest),
        ),
      ),
    ].sort((left, right) => compareText(left.path, right.path));
    const result = freezeJson<RenderedSpecialistPackage>({
      compilationDigest: compilation.contentDigest,
      manifest,
      files,
    });
    const outputBytes = files.reduce((total, file) => total + file.bytes, 0);
    if (outputBytes > SPECIALIST_LIMITS.outputBytes) {
      return operationResult<RenderedSpecialistPackage>(
        [createDiagnostic("SC4308", ARTIFACT)],
        null,
      );
    }
    return operationResult([], result);
  } catch {
    return operationResult<RenderedSpecialistPackage>([createDiagnostic("SC9001", ARTIFACT)], null);
  }
}

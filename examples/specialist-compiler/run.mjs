import { createHash } from "node:crypto";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  compileAgentBlueprints,
  parseJsonBuffer,
  renderSpecialistPackage,
  SPECIALIST_LIMITS,
  verifySpecialistPackage,
} from "../../dist/index.js";
import {
  inspectRelativeArtifactPath,
  readContainedFileBytes,
  resolveProjectRoot,
} from "../../dist/path.js";
import { containsHighConfidenceSecret } from "../../dist/privacy.js";
import { containsControlCharacters, containsLoneSurrogate } from "../../dist/text.js";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const DEFAULT_APPROVAL = fileURLToPath(new URL("./approval.json", import.meta.url));
const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;
const APPROVAL_BYTE_LIMIT = 16_384;
const APPROVAL_KEYS = ["apiVersion", "kind", "sources", "expectation"];
const SOURCE_KEYS = ["id", "path", "description", "workUnitId", "bytes", "digest"];
const EXPECTATION_KEYS = ["compilationDigest", "packageDigest"];

function fail(message) {
  throw new Error(message);
}

function rawDigest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasExactKeys(value, expected) {
  if (!isRecord(value)) {
    return false;
  }
  const actual = Object.keys(value).sort();
  const sortedExpected = [...expected].sort();
  return (
    actual.length === sortedExpected.length &&
    actual.every((key, index) => key === sortedExpected[index])
  );
}

function hasError(diagnostics) {
  return diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

function safeExternalApprovalPath(value) {
  if (
    containsControlCharacters(value) ||
    containsLoneSurrogate(value) ||
    containsHighConfidenceSecret(value)
  ) {
    fail("Approval path is unsafe.");
  }
  return resolve(value);
}

function readBoundedApproval(path) {
  const root = resolveProjectRoot(dirname(path));
  if (root.root === null || root.realRoot === null) {
    fail("Approval file is not readable strict JSON.");
  }
  const result = readContainedFileBytes(
    root.root,
    root.realRoot,
    basename(path),
    "SC1001",
    APPROVAL_BYTE_LIMIT,
    "SC5001",
  );
  if (result.bytes === null) {
    fail("Approval file is not readable strict JSON.");
  }
  return result.bytes;
}

function parseArguments(argv) {
  let approvalPath = DEFAULT_APPROVAL;
  let deriveApproval = false;
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--derive-approval") {
      deriveApproval = true;
      continue;
    }
    if (argument === "--approval") {
      const value = argv[index + 1];
      if (value === undefined) {
        fail("Missing value for --approval.");
      }
      approvalPath = safeExternalApprovalPath(value);
      index += 1;
      continue;
    }
    fail("Unknown example argument.");
  }
  return { approvalPath, deriveApproval };
}

function readApproval(path) {
  const parsed = parseJsonBuffer(readBoundedApproval(path), "approval.json", APPROVAL_BYTE_LIMIT);
  if (parsed.value === null || hasError(parsed.diagnostics)) {
    fail("Approval file is not readable strict JSON.");
  }
  const value = parsed.value;
  if (
    !hasExactKeys(value, APPROVAL_KEYS) ||
    value.apiVersion !== "swecircuit/example-approval/v1alpha1" ||
    value.kind !== "SpecialistExampleApproval" ||
    !Array.isArray(value.sources) ||
    value.sources.length !== 2 ||
    !value.sources.every(
      (source) =>
        hasExactKeys(source, SOURCE_KEYS) &&
        typeof source.id === "string" &&
        typeof source.path === "string" &&
        typeof source.description === "string" &&
        typeof source.workUnitId === "string" &&
        Number.isSafeInteger(source.bytes) &&
        source.bytes >= 0 &&
        typeof source.digest === "string" &&
        DIGEST_PATTERN.test(source.digest),
    ) ||
    !hasExactKeys(value.expectation, EXPECTATION_KEYS) ||
    typeof value.expectation.compilationDigest !== "string" ||
    typeof value.expectation.packageDigest !== "string" ||
    !DIGEST_PATTERN.test(value.expectation.compilationDigest) ||
    !DIGEST_PATTERN.test(value.expectation.packageDigest)
  ) {
    fail("Approval file does not match the closed example contract.");
  }
  return value;
}

function sourcePath(path) {
  if (
    typeof path !== "string" ||
    containsHighConfidenceSecret(path) ||
    inspectRelativeArtifactPath(path) !== null
  ) {
    fail("Approval contains an unsafe repository source path.");
  }
  return path;
}

function bindSources(approval, requireMatch) {
  const root = resolveProjectRoot(ROOT);
  if (root.root === null || root.realRoot === null) {
    fail("Repository source boundary is unavailable.");
  }
  const ids = new Set();
  const paths = new Set();
  const bound = approval.sources.map((source) => {
    if (
      source === null ||
      typeof source !== "object" ||
      typeof source.id !== "string" ||
      typeof source.path !== "string" ||
      typeof source.description !== "string" ||
      typeof source.workUnitId !== "string" ||
      ids.has(source.id) ||
      paths.has(source.path)
    ) {
      fail("Approval source declarations are invalid.");
    }
    ids.add(source.id);
    paths.add(source.path);
    const path = sourcePath(source.path);
    const read = readContainedFileBytes(
      root.root,
      root.realRoot,
      path,
      "SC1001",
      SPECIALIST_LIMITS.contextSourceBytes,
      "SC5001",
    );
    if (read.bytes === null) {
      fail("Approval source cannot be read from the repository boundary.");
    }
    const bytes = read.bytes;
    const actual = {
      id: source.id,
      path: source.path,
      description: source.description,
      workUnitId: source.workUnitId,
      bytes: bytes.byteLength,
      digest: rawDigest(bytes),
    };
    if (
      requireMatch &&
      (source.bytes !== actual.bytes || source.digest !== actual.digest)
    ) {
      fail("Context source mismatch.");
    }
    return actual;
  });
  const expected = new Set(["context.public-api", "context.workflow-contract"]);
  if (bound.some((source) => !expected.delete(source.id)) || expected.size !== 0) {
    fail("Approval must bind the two documented example sources.");
  }
  return bound;
}

function sourceById(sources, id) {
  const source = sources.find((candidate) => candidate.id === id);
  if (source === undefined) {
    fail("Required example source is missing.");
  }
  return source;
}

function contextSource(source) {
  return {
    id: source.id,
    kind: "repository",
    locator: `path:${source.path}`,
    digest: source.digest,
    bytes: source.bytes,
    description: source.description,
    allowedWorkUnits: [source.workUnitId],
    readScope: source.path,
  };
}

function workUnit({
  id,
  objective,
  weight,
  moduleId,
  action,
  capability,
  source,
  evidenceRequirementId,
  artifact,
}) {
  return {
    id,
    objective,
    weight,
    module: {
      id: moduleId,
      action,
      inputPorts: [{ name: "source", artifactType: "RepositorySource" }],
      outputPorts: [{ name: "review", artifactType: "ReviewEvidence" }],
    },
    dependencies: [],
    requiredCapabilities: [capability],
    contextUses: [
      {
        sourceId: source.id,
        purpose: "Review the exact source bound by the example approval.",
      },
    ],
    scope: {
      read: [source.path],
      write: [],
      conflictZones: [],
    },
    permissions: [{ kind: "filesystem.read", scopes: [source.path] }],
    evidenceRequirementIds: [evidenceRequirementId],
    handoffArtifacts: [artifact],
    stopConditions: ["Stop if the declared source binding does not match."],
  };
}

function requestFor(sources) {
  const api = sourceById(sources, "context.public-api");
  const contract = sourceById(sources, "context.workflow-contract");
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: "example.specialist-first-run",
      revision: 1,
      objective:
        "Review the public API and workflow contract through independent read-only specialists.",
      integrationOwner: "example.integration-owner",
      assumptions: [],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.public-api",
          description: "The package public API receives a focused review.",
          evidenceRequirements: [
            {
              id: "evidence.public-api",
              kind: "review",
              duty: "produce",
              description: "Preserve the public API review.",
              independentFromProducer: false,
            },
          ],
        },
        {
          id: "criterion.workflow-contract",
          description: "The specialist workflow contract receives a focused review.",
          evidenceRequirements: [
            {
              id: "evidence.workflow-contract",
              kind: "review",
              duty: "produce",
              description: "Preserve the workflow contract review.",
              independentFromProducer: false,
            },
          ],
        },
      ],
      contextSources: [contextSource(api), contextSource(contract)],
      authority: {
        allowedModules: ["review.public-api", "review.workflow-contract"],
        allowedCapabilities: ["analyze.public-api", "audit.workflow-contract"],
        permissionCeiling: [
          {
            kind: "filesystem.read",
            scopes: [api.path, contract.path].sort(),
          },
        ],
        forbiddenEffects: [
          "Do not write files, invoke a model, launch an agent, or execute a runtime.",
        ],
        maxAgents: 2,
        maxConcurrency: 2,
      },
      optimization: {
        agentStartupCost: 1,
        handoffCost: 1,
      },
      workUnits: [
        workUnit({
          id: "review.api",
          objective: "Review the exported specialist compiler API.",
          weight: 5,
          moduleId: "review.public-api",
          action: "Inspect public exports and report contract risks.",
          capability: "analyze.public-api",
          source: api,
          evidenceRequirementId: "evidence.public-api",
          artifact: "public-api-review.json",
        }),
        workUnit({
          id: "review.contract",
          objective: "Review the documented specialist workflow contract.",
          weight: 3,
          moduleId: "review.workflow-contract",
          action: "Inspect workflow guarantees and report contract risks.",
          capability: "audit.workflow-contract",
          source: contract,
          evidenceRequirementId: "evidence.workflow-contract",
          artifact: "workflow-contract-review.json",
        }),
      ],
    },
  };
}

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    fail(`${stage} failed with ${result.diagnostics.map((item) => item.code).join(",")}.`);
  }
  return result.value;
}

function assertExamplePlan(compilation, specialistPackage) {
  if (
    compilation.search.mode !== "exact" ||
    compilation.search.claim !== "exhaustive_partition_search_fixed_scheduler" ||
    compilation.search.evaluatedCandidates !== 2 ||
    compilation.serialBaseline.metrics?.agentCount !== 1 ||
    compilation.serialBaseline.metrics.projectedMakespan !== 9 ||
    compilation.selected.metrics?.agentCount !== 2 ||
    compilation.selected.metrics.projectedMakespan !== 6 ||
    compilation.selectionReason.kind !== "lower_metric" ||
    compilation.selectionReason.decisiveField !== "projectedMakespan" ||
    specialistPackage.files.length !== 5
  ) {
    fail("Compiled example no longer matches its documented planning result.");
  }
}

function compileExample(sources) {
  const compilation = requireValue(
    compileAgentBlueprints(requestFor(sources)),
    "Specialist compilation",
  );
  const specialistPackage = requireValue(
    renderSpecialistPackage(compilation),
    "Specialist package rendering",
  );
  assertExamplePlan(compilation, specialistPackage);
  return { compilation, specialistPackage };
}

function printStory(compilation, specialistPackage) {
  const baseline = compilation.serialBaseline.metrics;
  const selected = compilation.selected.metrics;
  process.stdout.write(
    [
      "SWECircuit specialist compiler",
      "Context: 2/2 repository sources verified",
      `Search: exact | ${compilation.search.evaluatedCandidates} candidate teams evaluated`,
      `Baseline: ${baseline.agentCount} agent | makespan ${baseline.projectedMakespan}`,
      `Selected: ${selected.agentCount} specialists | makespan ${selected.projectedMakespan}`,
      "Decision: lower projectedMakespan (6 < 9)",
      `Package: ${specialistPackage.files.length} files | approval-bound verification PASS`,
      "Runtime: not invoked; 0 agents executed",
      "",
    ].join("\n"),
  );
}

function main() {
  const options = parseArguments(process.argv.slice(2));
  const approval = readApproval(options.approvalPath);
  const sources = bindSources(approval, !options.deriveApproval);
  const { compilation, specialistPackage } = compileExample(sources);

  if (options.deriveApproval) {
    process.stdout.write(
      `${JSON.stringify(
        {
          apiVersion: approval.apiVersion,
          kind: approval.kind,
          sources,
          expectation: {
            compilationDigest: compilation.contentDigest,
            packageDigest: specialistPackage.packageDigest,
          },
        },
        null,
        2,
      )}\n`,
    );
    return;
  }

  requireValue(
    verifySpecialistPackage(specialistPackage, approval.expectation),
    "Approval-bound package verification",
  );
  printStory(compilation, specialistPackage);
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : "Unexpected example failure.";
  process.stderr.write(`Example failed: ${message}\n`);
  process.exitCode = 1;
}

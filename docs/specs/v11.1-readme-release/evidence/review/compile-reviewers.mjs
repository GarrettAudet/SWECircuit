import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  compileAgentBlueprints,
  renderSpecialistPackage,
  verifySpecialistPackage,
} from "../../../../../dist/index.js";

const ROOT = fileURLToPath(new URL("../../../../../", import.meta.url));
const EVIDENCE = dirname(fileURLToPath(import.meta.url));
const PACKAGE_DIR = join(EVIDENCE, "package");

const SOURCE_DEFINITIONS = [
  {
    id: "context.readme",
    path: "README.md",
    description: "Frozen concise public README candidate.",
    allowedWorkUnits: ["review.visual", "review.boundary"],
  },
  {
    id: "context.workflow-gif",
    path: "docs/assets/swecircuit-flow.gif",
    description: "Exact primary animated workflow asset.",
    allowedWorkUnits: ["review.visual"],
  },
  {
    id: "context.generator",
    path: "docs/assets/source/generate-swecircuit-flow-gif.py",
    description: "Deterministic GIF layout and validation source.",
    allowedWorkUnits: ["review.visual"],
  },
  {
    id: "context.checker",
    path: "scripts/check-template.ps1",
    description: "Public-surface enforcement rules.",
    allowedWorkUnits: ["review.boundary"],
  },
  {
    id: "context.checker-tests",
    path: "scripts/test-check-template.ps1",
    description: "Negative public-surface regression fixtures.",
    allowedWorkUnits: ["review.boundary"],
  },
  {
    id: "context.compiler-contract",
    path: "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
    description: "Normative V11 compiler and host boundary.",
    allowedWorkUnits: ["review.boundary"],
  },
];

function digest(bytes) {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function requireValue(result, stage) {
  if (!result.ok || result.value === null) {
    const codes = result.diagnostics.map((item) => item.code).join(",");
    throw new Error(`${stage} failed: ${codes}`);
  }
  return result.value;
}

async function bindSources() {
  return Promise.all(
    SOURCE_DEFINITIONS.map(async (source) => {
      const bytes = await readFile(join(ROOT, source.path));
      return {
        id: source.id,
        kind: "repository",
        locator: `path:${source.path}`,
        digest: digest(bytes),
        bytes: bytes.byteLength,
        description: source.description,
        allowedWorkUnits: source.allowedWorkUnits,
        readScope: source.path,
      };
    }),
  );
}

function contextUses(sourceIds, purpose) {
  return sourceIds.map((sourceId) => ({ sourceId, purpose }));
}

function workUnit({
  id,
  objective,
  weight,
  moduleId,
  action,
  capability,
  sourceIds,
  sourcePaths,
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
      inputPorts: [{ name: "candidate", artifactType: "FrozenPublicSurface" }],
      outputPorts: [{ name: "review", artifactType: "ReviewEvidence" }],
    },
    dependencies: [],
    requiredCapabilities: [capability],
    contextUses: contextUses(sourceIds, "Review the exact frozen public candidate."),
    scope: {
      read: sourcePaths,
      write: [],
      conflictZones: [],
    },
    permissions: [{ kind: "filesystem.read", scopes: sourcePaths }],
    evidenceRequirementIds: [evidenceRequirementId],
    handoffArtifacts: [artifact],
    stopConditions: [
      "Stop if a declared source is unavailable or does not match its bound digest.",
      "Do not modify repository files.",
    ],
  };
}

function requestFor(contextSources) {
  const visualPaths = [
    "README.md",
    "docs/assets/swecircuit-flow.gif",
    "docs/assets/source/generate-swecircuit-flow-gif.py",
  ];
  const boundaryPaths = [
    "README.md",
    "scripts/check-template.ps1",
    "scripts/test-check-template.ps1",
    "docs/specs/v11-specialist-compiler/specialist-compiler-contract.md",
  ];
  return {
    apiVersion: "swecircuit/specialist/v1alpha1",
    kind: "SpecialistCompilationRequest",
    goal: {
      apiVersion: "swecircuit/specialist/v1alpha1",
      kind: "GoalContract",
      id: "v11.1.readme-release-review",
      revision: 5,
      objective:
        "Independently review the frozen V11.1 README release for visual comprehension and capability-boundary accuracy.",
      integrationOwner: "codex.main",
      assumptions: [],
      unresolvedDecisions: [],
      acceptanceCriteria: [
        {
          id: "criterion.visual-clarity",
          description:
            "The primary visual explains modules, host-run parallel specialists, verified fan-in, integration, trace, and memory without overlap or ambiguity.",
          evidenceRequirements: [
            {
              id: "evidence.visual-review",
              kind: "review",
              duty: "produce",
              description: "Preserve an independent visual-comprehension verdict.",
              independentFromProducer: false,
            },
          ],
        },
        {
          id: "criterion.boundary-accuracy",
          description:
            "The concise README and checker preserve the exact V11 core versus external-host capability boundary.",
          evidenceRequirements: [
            {
              id: "evidence.boundary-review",
              kind: "review",
              duty: "produce",
              description: "Preserve an independent capability-boundary verdict.",
              independentFromProducer: false,
            },
          ],
        },
      ],
      contextSources,
      authority: {
        allowedModules: ["review.visual-clarity", "review.capability-boundary"],
        allowedCapabilities: ["analyze.visual-flow", "audit.public-contract"],
        permissionCeiling: [
          {
            kind: "filesystem.read",
            scopes: [...new Set([...visualPaths, ...boundaryPaths])].sort(),
          },
        ],
        forbiddenEffects: [
          "Do not write files, access the network, launch another agent, or change the candidate.",
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
          id: "review.visual",
          objective:
            "Judge whether the README GIF communicates the SWECircuit concept clearly at first read and remains legible when scaled.",
          weight: 4,
          moduleId: "review.visual-clarity",
          action:
            "Inspect the opening, parallel, and complete visual states plus adjacent README prose; report only actionable clarity findings.",
          capability: "analyze.visual-flow",
          sourceIds: ["context.readme", "context.workflow-gif", "context.generator"],
          sourcePaths: visualPaths,
          evidenceRequirementId: "evidence.visual-review",
          artifact: "visual-clarity-review.json",
        }),
        workUnit({
          id: "review.boundary",
          objective:
            "Audit the concise README and its checker rules against the normative V11 compiler and external-host boundary.",
          weight: 5,
          moduleId: "review.capability-boundary",
          action:
            "Compare every public capability claim and negative regression with the normative contract; report contradictions or missing truth anchors.",
          capability: "audit.public-contract",
          sourceIds: [
            "context.readme",
            "context.checker",
            "context.checker-tests",
            "context.compiler-contract",
          ],
          sourcePaths: boundaryPaths,
          evidenceRequirementId: "evidence.boundary-review",
          artifact: "capability-boundary-review.json",
        }),
      ],
    },
  };
}

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function main() {
  const contextSources = await bindSources();
  const request = requestFor(contextSources);
  const compilation = requireValue(
    compileAgentBlueprints(request),
    "Reviewer compilation",
  );
  const specialistPackage = requireValue(
    renderSpecialistPackage(compilation),
    "Reviewer package rendering",
  );
  if (compilation.selected.metrics.agentCount !== 2) {
    throw new Error("The approved two-reviewer partition was not selected.");
  }

  const approval = {
    apiVersion: "swecircuit/review-approval/v1alpha1",
    kind: "SpecialistReviewApproval",
    goalId: request.goal.id,
    goalRevision: request.goal.revision,
    approvedBy: "repository-owner",
    approvalBasis:
      "The owner approved the V11 merge and scoped README/GIF release work through completion.",
    contextSources,
    expectation: {
      compilationDigest: compilation.contentDigest,
      packageDigest: specialistPackage.packageDigest,
    },
  };

  await mkdir(PACKAGE_DIR, { recursive: true });
  for (const file of specialistPackage.files) {
    const output = join(PACKAGE_DIR, file.path);
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, file.content, "utf8");
  }
  await writeJson(join(EVIDENCE, "request.json"), request);
  await writeJson(join(EVIDENCE, "approval.json"), approval);
  await writeJson(join(EVIDENCE, "package-envelope.json"), specialistPackage);

  const trustedApproval = JSON.parse(await readFile(join(EVIDENCE, "approval.json"), "utf8"));
  requireValue(
    verifySpecialistPackage(specialistPackage, trustedApproval.expectation),
    "Approval-bound package verification",
  );

  const summary = {
    goalId: compilation.goal.id,
    goalRevision: compilation.goal.revision,
    search: compilation.search,
    serialBaseline: compilation.serialBaseline.metrics,
    selected: compilation.selected.metrics,
    selectionReason: compilation.selectionReason,
    compilationDigest: compilation.contentDigest,
    packageDigest: specialistPackage.packageDigest,
    agents: compilation.blueprints.map((blueprint) => ({
      id: blueprint.id,
      workUnitIds: blueprint.workUnitIds,
      contractFile: specialistPackage.manifest.agents.find(
        (agent) => agent.agentId === blueprint.id,
      )?.contractFile,
    })),
    packageVerified: true,
    runtimeInvoked: false,
  };
  await writeJson(join(EVIDENCE, "compilation-summary.json"), summary);
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  process.exitCode = 1;
});

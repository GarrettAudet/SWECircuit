import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { compileAgentBlueprints } from "../dist/index.js";
import {
  buildPrelaunchAuditGoal,
  buildPrelaunchPackageVerificationReceipt,
  parseGitAttributes,
  readDogfoodControlJson,
  readRepositoryContextFile,
  verifyCheckoutCanonicalContext,
  verifyDogfoodContext,
  verifyLaunchAuthorization,
  writeDogfoodEvidenceFiles,
} from "../scripts/run-v11-dogfood.mjs";

function withTempDirectory(callback) {
  const root = mkdtempSync(join(tmpdir(), "swecircuit-v11-dogfood-"));
  try {
    return callback(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}

test("dogfood context reads accept regular files inside the repository root", () => {
  withTempDirectory((repositoryRoot) => {
    mkdirSync(join(repositoryRoot, "context"));
    writeFileSync(join(repositoryRoot, "context", "source.txt"), "trusted context\n", "utf8");

    const result = readRepositoryContextFile(repositoryRoot, "path:context/source.txt");

    assert.equal(result.relativePath, "context/source.txt");
    assert.equal(Buffer.from(result.bytes).toString("utf8"), "trusted context\n");
  });
});

test("dogfood context verification rejects bytes changed by an LF clean filter", () => {
  const bytes = Buffer.from("line one\r\nline two\n", "utf8");
  const rawObjectId = "a".repeat(40);
  const filteredObjectId = "b".repeat(40);

  assert.throws(
    () =>
      verifyCheckoutCanonicalContext(
        "context/source.txt",
        bytes,
        process.cwd(),
        (_repositoryRoot, _relativePath, _bytes, applyFilters) =>
          applyFilters ? filteredObjectId : rawObjectId,
        () => ({ text: "auto", eol: "lf" }),
      ),
    /context is not checkout-canonical.*Git checkout rules would change reviewed bytes/,
  );
});

test("dogfood context verification accepts a deterministic CRLF checkout round trip", () => {
  const bytes = Buffer.from("line one\r\nline two\r\n", "utf8");
  const rawObjectId = "a".repeat(40);
  const filteredObjectId = "b".repeat(40);

  assert.doesNotThrow(() =>
    verifyCheckoutCanonicalContext(
      "scripts/check.ps1",
      bytes,
      process.cwd(),
      (_repositoryRoot, _relativePath, _bytes, applyFilters) =>
        applyFilters ? filteredObjectId : rawObjectId,
      () => ({ text: "set", eol: "crlf" }),
    ),
  );
});

test("dogfood context verification rejects LF bytes under an explicit CRLF checkout", () => {
  const objectId = "a".repeat(40);

  assert.throws(
    () =>
      verifyCheckoutCanonicalContext(
        "scripts/check.ps1",
        Buffer.from("line one\nline two\n", "utf8"),
        process.cwd(),
        () => objectId,
        () => ({ text: "set", eol: "crlf" }),
      ),
    /context is not checkout-canonical.*Git checkout rules would change reviewed bytes/,
  );
});

test("dogfood context verification rejects an active custom Git filter", () => {
  const objectId = "a".repeat(40);

  assert.throws(
    () =>
      verifyCheckoutCanonicalContext(
        "context/source.txt",
        Buffer.from("line one\n", "utf8"),
        process.cwd(),
        () => objectId,
        () => ({ text: "auto", eol: "lf", filter: "lfs" }),
      ),
    /context is not checkout-canonical.*unsupported Git transform is active/,
  );
});

test("dogfood context verification rejects an active working-tree encoding", () => {
  const objectId = "a".repeat(40);

  assert.throws(
    () =>
      verifyCheckoutCanonicalContext(
        "context/source.txt",
        Buffer.from("line one\n", "utf8"),
        process.cwd(),
        () => objectId,
        () => ({ text: "auto", eol: "lf", "working-tree-encoding": "UTF-16LE" }),
      ),
    /context is not checkout-canonical.*unsupported Git transform is active/,
  );
});

test("dogfood context verification rejects a source without an explicit eol policy", () => {
  for (const attributes of [{ text: "unset" }, { eol: "unspecified" }, { eol: "unset" }]) {
    let hashCalls = 0;
    assert.throws(
      () =>
        verifyCheckoutCanonicalContext(
          "context/source.bin",
          Buffer.from([0x00, 0xff]),
          process.cwd(),
          () => {
            hashCalls += 1;
            return "a".repeat(40);
          },
          () => attributes,
        ),
      /context is not checkout-canonical.*explicit eol=lf or eol=crlf is required/,
    );
    assert.equal(hashCalls, 0);
  }
});

test("dogfood context verification rejects an active filter before hashing bytes", () => {
  let hashCalls = 0;

  assert.throws(
    () =>
      verifyCheckoutCanonicalContext(
        "context/source.txt",
        Buffer.from("sensitive context\n", "utf8"),
        process.cwd(),
        () => {
          hashCalls += 1;
          return "a".repeat(40);
        },
        () => ({ text: "auto", eol: "lf", filter: "external" }),
      ),
    /context is not checkout-canonical.*unsupported Git transform is active/,
  );
  assert.equal(hashCalls, 0);
});

test("dogfood context verification rejects ident expansion before hashing bytes", () => {
  let hashCalls = 0;

  assert.throws(
    () =>
      verifyCheckoutCanonicalContext(
        "context/source.bin",
        Buffer.from([0x24, 0x49, 0x64, 0x24, 0x00]),
        process.cwd(),
        () => {
          hashCalls += 1;
          return "a".repeat(40);
        },
        () => ({ text: "unset", ident: "set" }),
      ),
    /context is not checkout-canonical.*unsupported Git transform is active/,
  );
  assert.equal(hashCalls, 0);
});

test("dogfood context verification rejects the legacy crlf attribute before hashing bytes", () => {
  let hashCalls = 0;

  assert.throws(
    () =>
      verifyCheckoutCanonicalContext(
        "context/source.txt",
        Buffer.from("sensitive context\n", "utf8"),
        process.cwd(),
        () => {
          hashCalls += 1;
          return "a".repeat(40);
        },
        () => ({ text: "auto", eol: "lf", crlf: "input" }),
      ),
    /context is not checkout-canonical.*unsupported Git transform is active/,
  );
  assert.equal(hashCalls, 0);
});

test("dogfood context verification rejects a bare CR under an explicit LF checkout", () => {
  const objectId = "a".repeat(40);

  assert.throws(
    () =>
      verifyCheckoutCanonicalContext(
        "context/source.txt",
        Buffer.from("line one\rline two\n", "utf8"),
        process.cwd(),
        () => objectId,
        () => ({ text: "auto", eol: "lf" }),
      ),
    /context is not checkout-canonical.*Git checkout rules would change reviewed bytes/,
  );
});

test("dogfood context verification rejects ambiguous filter names before hashing bytes", () => {
  for (const filter of ["unspecified", "unset"]) {
    let hashCalls = 0;
    assert.throws(
      () =>
        verifyCheckoutCanonicalContext(
          `context/${filter}.txt`,
          Buffer.from("sensitive context\n", "utf8"),
          process.cwd(),
          () => {
            hashCalls += 1;
            return "a".repeat(40);
          },
          () => ({ text: "auto", eol: "lf", filter }),
        ),
      /context is not checkout-canonical.*unsupported Git transform is active/,
    );
    assert.equal(hashCalls, 0);
  }
});

test("Git attribute parsing accepts variable unique records and rejects malformed output", () => {
  const relativePath = "context/source.txt";
  const records = [
    ["text", "auto"],
    ["eol", "lf"],
    ["custom-attribute", "value"],
  ];
  const render = (entries, terminal = true) => {
    const fields = entries.flatMap(([name, value]) => [relativePath, name, value]);
    return Buffer.from(`${fields.join("\0")}${terminal ? "\0" : ""}`, "utf8");
  };

  assert.deepEqual({ ...parseGitAttributes(relativePath, Buffer.alloc(0)) }, {});
  assert.deepEqual(
    { ...parseGitAttributes(relativePath, render(records)) },
    {
      text: "auto",
      eol: "lf",
      "custom-attribute": "value",
    },
  );

  const duplicate = [records[0], records[1], records[1]];
  const wrongPath = Buffer.from(`other/source.txt\0text\0auto\0`, "utf8");
  const emptyName = Buffer.from(`${relativePath}\0\0auto\0`, "utf8");
  const emptyValue = Buffer.from(`${relativePath}\0text\0\0`, "utf8");
  const incomplete = Buffer.from(`${relativePath}\0text\0`, "utf8");
  for (const malformed of [
    render(duplicate),
    render(records, false),
    wrongPath,
    emptyName,
    emptyValue,
    incomplete,
  ]) {
    assert.throws(
      () => parseGitAttributes(relativePath, malformed),
      /Git attribute check returned malformed records/,
    );
  }
});
test("dogfood context reads reject an in-root junction targeting an external directory", () => {
  withTempDirectory((sandbox) => {
    const repositoryRoot = join(sandbox, "repository");
    const externalRoot = join(sandbox, "external");
    mkdirSync(join(repositoryRoot, "context"), { recursive: true });
    mkdirSync(externalRoot);
    const externalFile = join(externalRoot, "secret.txt");
    writeFileSync(externalFile, "must remain outside the context boundary\n", "utf8");
    symlinkSync(
      externalRoot,
      join(repositoryRoot, "context", "linked"),
      process.platform === "win32" ? "junction" : "dir",
    );

    assert.throws(
      () => readRepositoryContextFile(repositoryRoot, "path:context/linked/secret.txt"),
      (error) => {
        assert.match(error.message, /context read rejected/);
        assert.match(error.message, /SC1013/);
        return true;
      },
    );
    assert.equal(readFileSync(externalFile, "utf8"), "must remain outside the context boundary\n");
  });
});

test("dogfood goal and approval controls reject duplicate JSON keys", () => {
  withTempDirectory((repositoryRoot) => {
    mkdirSync(join(repositoryRoot, "controls"));
    for (const name of ["goal-contract.json", "approval.json"]) {
      const candidate = `controls/${name}`;
      writeFileSync(
        join(repositoryRoot, "controls", name),
        '{"id":"first","id":"second"}\n',
        "utf8",
      );
      assert.throws(
        () => readDogfoodControlJson(repositoryRoot, candidate, 1_024),
        /strict JSON control rejected.*SC1103/,
      );
    }
  });
});

test("dogfood approval controls reject a parent junction instead of following it", () => {
  withTempDirectory((sandbox) => {
    const repositoryRoot = join(sandbox, "repository");
    const externalRoot = join(sandbox, "external");
    mkdirSync(join(repositoryRoot, "controls"), { recursive: true });
    mkdirSync(externalRoot);
    const externalApproval = join(externalRoot, "approval.json");
    const approvalText =
      '{"compilationDigest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","packageDigest":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"}\n';
    writeFileSync(externalApproval, approvalText, "utf8");
    symlinkSync(
      externalRoot,
      join(repositoryRoot, "controls", "linked"),
      process.platform === "win32" ? "junction" : "dir",
    );

    assert.throws(
      () => readDogfoodControlJson(repositoryRoot, "controls/linked/approval.json", 512),
      /contained read rejected.*SC1013/,
    );
    assert.equal(readFileSync(externalApproval, "utf8"), approvalText);
  });
});

test("dogfood evidence writes reject package-parent redirection before mutation", () => {
  withTempDirectory((sandbox) => {
    const repositoryRoot = join(sandbox, "repository");
    const externalRoot = join(sandbox, "external");
    mkdirSync(join(repositoryRoot, "evidence"), { recursive: true });
    mkdirSync(externalRoot);
    const externalMarker = join(externalRoot, "owner.txt");
    writeFileSync(externalMarker, "external owner\n", "utf8");
    symlinkSync(
      externalRoot,
      join(repositoryRoot, "evidence", "package"),
      process.platform === "win32" ? "junction" : "dir",
    );

    const files = new Map([
      ["evidence/compilation.json", "{}\n"],
      ["evidence/report.json", "{}\n"],
      ["evidence/package/output.txt", "must not be written\n"],
    ]);
    assert.throws(
      () => writeDogfoodEvidenceFiles(repositoryRoot, "evidence/package", files),
      /unsafe fixed evidence path.*SC1013/,
    );

    assert.equal(readFileSync(externalMarker, "utf8"), "external owner\n");
    assert.equal(existsSync(join(externalRoot, "output.txt")), false);
    assert.equal(existsSync(join(repositoryRoot, "evidence", "compilation.json")), false);
    assert.equal(existsSync(join(repositoryRoot, "evidence", "report.json")), false);
  });
});

test("dogfood context verification rejects unsupported source kinds", () => {
  withTempDirectory((repositoryRoot) => {
    assert.throws(
      () =>
        verifyDogfoodContext(
          {
            contextSources: [
              {
                id: "context.external",
                kind: "external",
                locator: "https://example.invalid/context",
              },
            ],
          },
          repositoryRoot,
        ),
      /unsupported context source kind for context\.external: external/,
    );
  });
});

function syntheticCandidateForAudit() {
  return {
    compilation: {
      contentDigest: `sha256:${"a".repeat(64)}`,
      goal: {
        revision: 15,
        contextSources: [
          {
            id: "context.algorithm",
            kind: "repository",
            locator: "path:src/compiler.ts",
            digest: `sha256:${"1".repeat(64)}`,
            bytes: 10,
            description: "Algorithm source.",
            allowedWorkUnits: ["review.algorithm-lifecycle"],
            readScope: "src/compiler.ts",
          },
          {
            id: "context.security",
            kind: "repository",
            locator: "path:src/security.ts",
            digest: `sha256:${"2".repeat(64)}`,
            bytes: 12,
            description: "Security source.",
            allowedWorkUnits: ["review.security-trace"],
            readScope: "src/security.ts",
          },
          {
            id: "context.product-only",
            kind: "repository",
            locator: "path:README.md",
            digest: `sha256:${"3".repeat(64)}`,
            bytes: 8,
            description: "Unneeded product source.",
            allowedWorkUnits: ["review.product-api"],
            readScope: "README.md",
          },
        ],
      },
    },
    renderedPackage: {
      packageDigest: `sha256:${"b".repeat(64)}`,
      files: [{ path: "manifest.json" }, { path: "agents/agent.md" }],
    },
  };
}

function syntheticAuditCandidateForLaunch() {
  const auditCandidate = syntheticCandidateForAudit();
  const reviewerId = `agent.${"1".repeat(64)}`;
  const binderId = `agent.${"2".repeat(64)}`;
  const reviewerDigest = `sha256:${"f".repeat(64)}`;
  const binderDigest = `sha256:${"6".repeat(64)}`;
  auditCandidate.compilation.contentDigest = `sha256:${"c".repeat(64)}`;
  auditCandidate.compilation.goal = {
    ...auditCandidate.compilation.goal,
    id: "v11.specialist-compiler.prelaunch-audit",
  };
  auditCandidate.compilation.goalDigest = `sha256:${"e".repeat(64)}`;
  auditCandidate.compilation.blueprints = [
    {
      id: reviewerId,
      workUnitIds: ["audit.review-candidate-compilation"],
      evidenceDuties: [
        {
          criterionId: "criterion.candidate-authority-package",
          requirementId: "evidence.candidate-authority-review",
          kind: "review",
          duty: "review",
        },
        {
          criterionId: "criterion.candidate-selection",
          requirementId: "evidence.candidate-selection-review",
          kind: "review",
          duty: "review",
        },
      ],
      handoff: {
        destination: "v11.integration-owner",
        artifacts: ["candidate-compilation-review.md"],
      },
      contentDigest: reviewerDigest,
    },
    {
      id: binderId,
      workUnitIds: ["audit.bind-candidate"],
      evidenceDuties: [
        {
          criterionId: "criterion.candidate-authority-package",
          requirementId: "evidence.candidate-authority-binding",
          kind: "digest",
          duty: "produce",
        },
        {
          criterionId: "criterion.candidate-selection",
          requirementId: "evidence.candidate-selection-binding",
          kind: "digest",
          duty: "produce",
        },
      ],
      handoff: {
        destination: reviewerId,
        artifacts: ["candidate-audit-binding.json"],
      },
      contentDigest: binderDigest,
    },
  ];
  auditCandidate.renderedPackage.packageDigest = `sha256:${"d".repeat(64)}`;
  auditCandidate.renderedPackage.manifest = {
    launchWaves: [
      { start: 0, agentIds: [binderId] },
      { start: 4, agentIds: [reviewerId] },
    ],
    agents: [
      {
        agentId: binderId,
        blueprintDigest: binderDigest,
        contractFile: `agents/${binderId}.md`,
        contractDigest: `sha256:${"4".repeat(64)}`,
        contractBytes: 100,
      },
      {
        agentId: reviewerId,
        blueprintDigest: reviewerDigest,
        contractFile: `agents/${reviewerId}.md`,
        contractDigest: `sha256:${"5".repeat(64)}`,
        contractBytes: 200,
      },
    ],
  };
  return auditCandidate;
}

function validPrelaunchAuditHandoff(candidate, auditCandidate) {
  const reviewer = auditCandidate.compilation.blueprints[0];
  const artifact = reviewer.handoff.artifacts[0];
  return {
    apiVersion: "swecircuit/prelaunch-audit-handoff/v1alpha1",
    kind: "PrelaunchAuditHandoff",
    outcome: "pass",
    destination: reviewer.handoff.destination,
    goal: {
      id: auditCandidate.compilation.goal.id,
      revision: auditCandidate.compilation.goal.revision,
      digest: auditCandidate.compilation.goalDigest,
    },
    agent: {
      id: reviewer.id,
      blueprintDigest: reviewer.contentDigest,
    },
    compilationDigest: auditCandidate.compilation.contentDigest,
    reviewer: {
      agentId: reviewer.id,
      blueprintDigest: reviewer.contentDigest,
    },
    candidate: {
      compilationDigest: candidate.compilation.contentDigest,
      packageDigest: candidate.renderedPackage.packageDigest,
    },
    prelaunchAudit: {
      compilationDigest: auditCandidate.compilation.contentDigest,
      packageDigest: auditCandidate.renderedPackage.packageDigest,
    },
    summary: "PASS. The exact candidate compilation and package satisfy both review duties.",
    workUnitsCompleted: [...reviewer.workUnitIds],
    artifacts: [
      {
        name: artifact,
        mediaType: "text/markdown",
        content: "# Candidate Compilation Review\n\nOutcome: `PASS`\n",
      },
    ],
    evidence: reviewer.evidenceDuties.map((duty) => ({
      criterionId: duty.criterionId,
      requirementId: duty.requirementId,
      kind: duty.kind,
      duty: duty.duty,
      status: "pass",
      artifact,
    })),
    assumptions: [],
    risks: [],
    followUps: [],
  };
}

function writeLaunchFixture(
  repositoryRoot,
  candidate,
  auditCandidate,
  handoff,
  handoffPath = "docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-pass.json",
) {
  const authorizationPath = "controls/launch-authorization.json";
  const receiptPath =
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/package-verification-receipt.json";
  const auditApprovalPath =
    "docs/specs/v11-specialist-compiler/evidence/dogfood/prelaunch-audit/approval.json";
  const auditApprovalValue = {
    compilationDigest: auditCandidate.compilation.contentDigest,
    packageDigest: auditCandidate.renderedPackage.packageDigest,
  };
  const auditApprovalBytes = Buffer.from(`${JSON.stringify(auditApprovalValue)}\n`, "utf8");
  const auditApproval = {
    result: "pass",
    expectation: auditApprovalValue,
    binding: {
      path: auditApprovalPath,
      digest: `sha256:${createHash("sha256").update(auditApprovalBytes).digest("hex")}`,
      bytes: auditApprovalBytes.byteLength,
    },
  };
  const receipt = buildPrelaunchPackageVerificationReceipt(
    candidate,
    auditCandidate,
    auditApproval,
  );
  const receiptBytes = Buffer.from(`${JSON.stringify(receipt)}\n`, "utf8");
  const handoffBytes = Buffer.isBuffer(handoff)
    ? handoff
    : Buffer.from(`${JSON.stringify(handoff)}\n`, "utf8");

  mkdirSync(join(repositoryRoot, "controls"), { recursive: true });
  for (const path of [auditApprovalPath, receiptPath, handoffPath]) {
    mkdirSync(join(repositoryRoot, ...path.split("/").slice(0, -1)), { recursive: true });
  }
  writeFileSync(join(repositoryRoot, ...auditApprovalPath.split("/")), auditApprovalBytes);
  writeFileSync(join(repositoryRoot, ...receiptPath.split("/")), receiptBytes);
  writeFileSync(join(repositoryRoot, ...handoffPath.split("/")), handoffBytes);

  const authorization = {
    candidate: {
      compilationDigest: candidate.compilation.contentDigest,
      packageDigest: candidate.renderedPackage.packageDigest,
    },
    prelaunchAudit: {
      compilationDigest: auditCandidate.compilation.contentDigest,
      packageDigest: auditCandidate.renderedPackage.packageDigest,
    },
    verificationReceipt: {
      path: receiptPath,
      digest: `sha256:${createHash("sha256").update(receiptBytes).digest("hex")}`,
      bytes: receiptBytes.byteLength,
      outcome: "pass",
    },
    handoff: {
      path: handoffPath,
      digest: `sha256:${createHash("sha256").update(handoffBytes).digest("hex")}`,
      bytes: handoffBytes.byteLength,
      outcome: "pass",
    },
  };
  const authorizationFile = join(repositoryRoot, ...authorizationPath.split("/"));
  writeFileSync(authorizationFile, `${JSON.stringify(authorization)}\n`, "utf8");
  return {
    auditApprovalBytes,
    auditApprovalPath,
    authorization,
    authorizationFile,
    authorizationPath,
    handoffBytes,
    handoffPath,
    receipt,
    receiptBytes,
    receiptPath,
  };
}

function syntheticCandidateFiles() {
  return new Map([
    [
      "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
      "candidate compilation\n",
    ],
    [
      "docs/specs/v11-specialist-compiler/evidence/dogfood/report.json",
      "mutable approval report\n",
    ],
    [
      "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json",
      "candidate manifest\n",
    ],
    [
      "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.md",
      "candidate agent\n",
    ],
  ]);
}

test("prelaunch audit authenticates the complete candidate without self-reference", () => {
  const goal = buildPrelaunchAuditGoal(syntheticCandidateForAudit(), syntheticCandidateFiles());
  const artifactContexts = goal.contextSources.filter((source) =>
    source.id.startsWith("context.candidate-artifact."),
  );

  assert.equal(goal.id, "v11.specialist-compiler.prelaunch-audit");
  assert.equal(goal.revision, 15);
  assert.equal(artifactContexts.length, 3);
  assert.deepEqual(artifactContexts.map((source) => source.readScope).sort(), [
    "docs/specs/v11-specialist-compiler/evidence/dogfood/compilation.json",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/package/agents/agent.md",
    "docs/specs/v11-specialist-compiler/evidence/dogfood/package/manifest.json",
  ]);
  assert.equal(
    goal.contextSources.some(
      (source) =>
        source.locator.includes("/prelaunch-audit/") ||
        source.locator.includes("\\prelaunch-audit\\"),
    ),
    false,
  );
  assert.equal(
    goal.contextSources.some((source) => source.locator.endsWith("/report.json")),
    false,
  );
  assert.deepEqual(
    goal.contextSources
      .filter((source) => !source.id.startsWith("context.candidate-artifact."))
      .map((source) => source.id)
      .sort(),
    ["context.algorithm", "context.security"],
  );
});

test("prelaunch audit forces an independent binder and compilation reviewer", () => {
  const candidate = syntheticCandidateForAudit();
  const files = syntheticCandidateFiles();
  const goal = buildPrelaunchAuditGoal(candidate, files);
  const [binder, reviewer] = goal.workUnits;

  assert.equal(goal.authority.maxAgents, 2);
  assert.deepEqual(reviewer.dependencies, [binder.id]);
  assert.deepEqual(binder.evidenceRequirementIds, [
    "evidence.candidate-selection-binding",
    "evidence.candidate-authority-binding",
  ]);
  assert.deepEqual(reviewer.evidenceRequirementIds, [
    "evidence.candidate-selection-review",
    "evidence.candidate-authority-review",
  ]);
  assert.equal(binder.scope.write.length, 0);
  assert.equal(reviewer.scope.write.length, 0);
  assert.deepEqual(
    binder.module.inputPorts.map((port) => port.artifactType),
    ["RenderedSpecialistPackage", "PrelaunchPackageVerificationReceipt"],
  );
  assert.deepEqual(
    binder.module.inputPorts.map((port) => port.name),
    ["candidate", "verification-receipt"],
  );
  assert.deepEqual(
    reviewer.module.inputPorts.map((port) => port.artifactType),
    ["CandidateAuditBinding", "PrelaunchPackageVerificationReceipt"],
  );
  assert.deepEqual(
    reviewer.module.inputPorts.map((port) => port.name),
    ["binding", "verification-receipt"],
  );
  const compilation = compileAgentBlueprints({
    apiVersion: goal.apiVersion,
    kind: "SpecialistCompilationRequest",
    goal,
  });
  assert.equal(compilation.ok, true, JSON.stringify(compilation.diagnostics, null, 2));
  assert.equal(
    binder.permissions.some(({ kind }) => kind === "process.spawn"),
    false,
  );
  assert.match(
    reviewer.stopConditions.join(" "),
    /swecircuit\/prelaunch-audit-handoff\/v1alpha1 PrelaunchAuditHandoff/,
  );
  assert.equal(
    goal.authority.permissionCeiling.some(({ kind }) => kind === "filesystem.write"),
    false,
  );

  const pendingReceipt = buildPrelaunchPackageVerificationReceipt(
    candidate,
    syntheticAuditCandidateForLaunch(),
    { result: "pending", reason: "missing" },
  );
  assert.equal(pendingReceipt.outcome, "pending");
  assert.equal(pendingReceipt.auditApproval, null);
  assert.equal(pendingReceipt.candidateLaunchApproved, false);

  const first = goal.contextSources.find((source) =>
    source.id.startsWith("context.candidate-artifact."),
  );
  files.set(first.readScope, `${files.get(first.readScope)}tampered\n`);
  const changed = buildPrelaunchAuditGoal(candidate, files);
  const changedFirst = changed.contextSources.find((source) => source.id === first.id);
  assert.notEqual(changedFirst.digest, first.digest);
  assert.notEqual(changedFirst.bytes, first.bytes);
});

test("launch authorization binds both packages, the verification receipt, and the exact PASS handoff", () => {
  withTempDirectory((repositoryRoot) => {
    const candidate = syntheticCandidateForAudit();
    const auditCandidate = syntheticAuditCandidateForLaunch();
    const handoff = validPrelaunchAuditHandoff(candidate, auditCandidate);
    const fixture = writeLaunchFixture(repositoryRoot, candidate, auditCandidate, handoff);

    const verified = verifyLaunchAuthorization(
      candidate,
      auditCandidate,
      repositoryRoot,
      fixture.authorizationPath,
    );
    assert.equal(verified.verificationReceipt.outcome, "pass");
    assert.equal(verified.handoff.outcome, "pass");
    assert.equal(fixture.receipt.candidateLaunchApproved, false);

    writeFileSync(
      join(repositoryRoot, ...fixture.handoffPath.split("/")),
      "changed handoff\n",
      "utf8",
    );
    assert.throws(
      () =>
        verifyLaunchAuthorization(
          candidate,
          auditCandidate,
          repositoryRoot,
          fixture.authorizationPath,
        ),
      /launch authorization handoff mismatch/,
    );
  });
});

test("launch authorization rejects malformed, non-PASS, stale, and incomplete audit handoffs", () => {
  const metadataFields = [
    {
      name: "destination",
      mutate(handoff, value) {
        handoff.destination = value;
      },
    },
    {
      name: "goal id",
      mutate(handoff, value) {
        handoff.goal.id = value;
      },
    },
    {
      name: "agent id",
      mutate(handoff, value) {
        handoff.agent.id = value;
      },
    },
    {
      name: "reviewer agent id",
      mutate(handoff, value) {
        handoff.reviewer.agentId = value;
      },
    },
    {
      name: "summary",
      mutate(handoff, value) {
        handoff.summary = value;
      },
    },
    {
      name: "assumption",
      mutate(handoff, value) {
        handoff.assumptions = [value];
      },
    },
    {
      name: "risk",
      mutate(handoff, value) {
        handoff.risks = [value];
      },
    },
    {
      name: "follow-up",
      mutate(handoff, value) {
        handoff.followUps = [value];
      },
    },
  ];
  const loneSurrogateFields = [
    ...metadataFields,
    {
      name: "artifact content",
      mutate(handoff, value) {
        handoff.artifacts[0].content = value;
      },
    },
  ];
  const loneSurrogateCases = loneSurrogateFields.flatMap(({ name, mutate }) => [
    {
      name: `lone high surrogate in ${name}`,
      mutate(handoff) {
        mutate(handoff, "\ud800");
      },
      expected: /launch authorization handoff malformed/,
    },
    {
      name: `lone low surrogate in ${name}`,
      mutate(handoff) {
        mutate(handoff, "\udc00");
      },
      expected: /launch authorization handoff malformed/,
    },
  ]);
  const unsafeMetadataCases = metadataFields.flatMap(({ name, mutate }) =>
    [
      ["TAB", "safe\tvalue"],
      ["LF", "safe\nvalue"],
      ["CR", "safe\rvalue"],
      ["secret", `sk-proj-${"A".repeat(24)}`],
    ].map(([kind, value]) => ({
      name: `${kind} in ${name}`,
      mutate(handoff) {
        mutate(handoff, value);
      },
      expected: /launch authorization handoff malformed/,
    })),
  );
  const cases = [
    ...loneSurrogateCases,
    ...unsafeMetadataCases,
    {
      name: "TAB in artifact content",
      mutate(handoff) {
        handoff.artifacts[0].content = "# Review\n\nsafe\tvalue\n";
      },
      expected: /launch authorization handoff malformed/,
    },
    {
      name: "CR in artifact content",
      mutate(handoff) {
        handoff.artifacts[0].content = "# Review\r\n";
      },
      expected: /launch authorization handoff malformed/,
    },
    {
      name: "secret in artifact content",
      mutate(handoff) {
        handoff.artifacts[0].content = `# Review\n\nsk-proj-${"A".repeat(24)}\n`;
      },
      expected: /launch authorization handoff malformed/,
    },
    {
      name: "malformed JSON",
      prepare: () => Buffer.from("{not-json", "utf8"),
      expected: /launch authorization handoff malformed/,
    },
    {
      name: "non-PASS outcome",
      mutate(handoff) {
        handoff.outcome = "revise";
      },
      expected: /launch authorization handoff did not pass/,
    },
    {
      name: "unrelated reviewer",
      mutate(handoff) {
        handoff.reviewer.agentId = `agent.${"9".repeat(64)}`;
      },
      expected: /launch authorization handoff stale/,
    },
    {
      name: "mismatched standard agent identity",
      mutate(handoff) {
        handoff.agent.id = `agent.${"8".repeat(64)}`;
      },
      expected: /launch authorization handoff stale/,
    },
    {
      name: "mismatched standard blueprint identity",
      mutate(handoff) {
        handoff.agent.blueprintDigest = `sha256:${"8".repeat(64)}`;
      },
      expected: /launch authorization handoff stale/,
    },
    {
      name: "stale standard compilation identity",
      mutate(handoff) {
        handoff.compilationDigest = `sha256:${"8".repeat(64)}`;
      },
      expected: /launch authorization handoff stale/,
    },
    {
      name: "stale candidate identity",
      mutate(handoff) {
        handoff.candidate.compilationDigest = `sha256:${"9".repeat(64)}`;
      },
      expected: /launch authorization handoff stale/,
    },
    {
      name: "missing review evidence",
      mutate(handoff) {
        handoff.evidence.pop();
      },
      expected: /launch authorization handoff malformed/,
    },
    {
      name: "bidi-spoofed summary",
      mutate(handoff) {
        handoff.summary = `PASS ${"\u202e"}REVISE`;
      },
      expected: /launch authorization handoff malformed/,
    },
    {
      name: "unknown field",
      mutate(handoff) {
        handoff.approved = true;
      },
      expected: /launch authorization handoff malformed/,
    },
  ];

  for (const scenario of cases) {
    withTempDirectory((repositoryRoot) => {
      const candidate = syntheticCandidateForAudit();
      const auditCandidate = syntheticAuditCandidateForLaunch();
      const handoff = validPrelaunchAuditHandoff(candidate, auditCandidate);
      scenario.mutate?.(handoff);
      const rawHandoff = scenario.prepare?.() ?? handoff;
      const fixture = writeLaunchFixture(repositoryRoot, candidate, auditCandidate, rawHandoff);
      assert.throws(
        () =>
          verifyLaunchAuthorization(
            candidate,
            auditCandidate,
            repositoryRoot,
            fixture.authorizationPath,
          ),
        scenario.expected,
        scenario.name,
      );
    });
  }
});

test("launch authorization accepts paired supplementary Unicode in free-text handoff fields", () => {
  withTempDirectory((repositoryRoot) => {
    const candidate = syntheticCandidateForAudit();
    const auditCandidate = syntheticAuditCandidateForLaunch();
    const handoff = validPrelaunchAuditHandoff(candidate, auditCandidate);
    const supplementaryCharacter = "\ud83d\ude80";
    handoff.summary = `PASS ${supplementaryCharacter}`;
    handoff.assumptions = [`Assumption ${supplementaryCharacter}`];
    handoff.risks = [`Risk ${supplementaryCharacter}`];
    handoff.followUps = [`Follow-up ${supplementaryCharacter}`];
    handoff.artifacts[0].content = `# Review\n\n${supplementaryCharacter}\n`;
    const fixture = writeLaunchFixture(repositoryRoot, candidate, auditCandidate, handoff);

    assert.doesNotThrow(() =>
      verifyLaunchAuthorization(
        candidate,
        auditCandidate,
        repositoryRoot,
        fixture.authorizationPath,
      ),
    );
  });
});

test("launch authorization rejects secret-bearing and non-scalar handoff paths", async (t) => {
  const prefix = "docs/specs/v11-specialist-compiler/evidence/dogfood/handoffs/prelaunch-audit-";
  const cases = [
    ["lone high surrogate", `${prefix}${String.fromCharCode(0xd800)}.json`],
    ["lone low surrogate", `${prefix}${String.fromCharCode(0xdc00)}.json`],
    ["secret", `${prefix}sk-proj-${"A".repeat(24)}.json`],
  ];

  for (const [name, handoffPath] of cases) {
    await t.test(name, () => {
      withTempDirectory((repositoryRoot) => {
        const candidate = syntheticCandidateForAudit();
        const auditCandidate = syntheticAuditCandidateForLaunch();
        const fixture = writeLaunchFixture(
          repositoryRoot,
          candidate,
          auditCandidate,
          validPrelaunchAuditHandoff(candidate, auditCandidate),
        );
        fixture.authorization.handoff.path = handoffPath;
        writeFileSync(
          fixture.authorizationFile,
          `${JSON.stringify(fixture.authorization)}\n`,
          "utf8",
        );

        assert.throws(
          () =>
            verifyLaunchAuthorization(
              candidate,
              auditCandidate,
              repositoryRoot,
              fixture.authorizationPath,
            ),
          /launch authorization malformed/,
        );
      });
    });
  }
});

test("launch authorization rejects unbound or semantically invalid verification receipts", () => {
  const cases = [
    {
      name: "raw receipt tampering",
      prepare: () => Buffer.from('{"changed":true}\n', "utf8"),
      preserveBinding: true,
      expected: /launch authorization verification receipt mismatch/,
    },
    {
      name: "malformed JSON",
      prepare: () => Buffer.from("{not-json", "utf8"),
      expected: /launch authorization verification receipt malformed/,
    },
    {
      name: "duplicate JSON key",
      prepare(receipt) {
        const raw = JSON.stringify(receipt).replace(
          '"kind":',
          '"kind":"PrelaunchPackageVerificationReceipt","kind":',
        );
        return Buffer.from(`${raw}\n`, "utf8");
      },
      expected: /launch authorization verification receipt malformed/,
    },
    {
      name: "unknown field",
      mutate(receipt) {
        receipt.approved = true;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "missing reviewer binding",
      mutate(receipt) {
        delete receipt.reviewer;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "candidate launch approval",
      mutate(receipt) {
        receipt.candidateLaunchApproved = true;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "stale candidate pair",
      mutate(receipt) {
        receipt.candidate.packageDigest = `sha256:${"9".repeat(64)}`;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "stale audit pair",
      mutate(receipt) {
        receipt.prelaunchAudit.compilationDigest = `sha256:${"9".repeat(64)}`;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "stale approval binding",
      mutate(receipt) {
        receipt.auditApproval.digest = `sha256:${"9".repeat(64)}`;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "stale agent binding",
      mutate(receipt) {
        receipt.binder.agentId = `agent.${"9".repeat(64)}`;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "stale launch wave",
      mutate(receipt) {
        receipt.launchWaves[0].start = 1;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "non-PASS receipt",
      mutate(receipt) {
        receipt.outcome = "pending";
        receipt.prelaunchAudit.approvalOutcome = "pending";
        receipt.auditApproval = null;
      },
      expected: /launch authorization verification receipt malformed or stale/,
    },
    {
      name: "bidi-spoofed operation",
      mutate(receipt) {
        receipt.verifier.operation = `verify${"\u202e"}SpecialistPackage`;
      },
      expected: /launch authorization verification receipt malformed/,
    },
    {
      name: "oversized receipt",
      prepare: () => Buffer.alloc(16_385, 0x20),
      expected: /launch authorization malformed/,
    },
    {
      name: "relocated receipt",
      relocate: true,
      expected: /launch authorization malformed/,
    },
  ];

  for (const scenario of cases) {
    withTempDirectory((repositoryRoot) => {
      const candidate = syntheticCandidateForAudit();
      const auditCandidate = syntheticAuditCandidateForLaunch();
      const fixture = writeLaunchFixture(
        repositoryRoot,
        candidate,
        auditCandidate,
        validPrelaunchAuditHandoff(candidate, auditCandidate),
      );
      const receipt = structuredClone(fixture.receipt);
      scenario.mutate?.(receipt);
      const receiptBytes =
        scenario.prepare?.(receipt) ?? Buffer.from(`${JSON.stringify(receipt)}\n`, "utf8");
      writeFileSync(join(repositoryRoot, ...fixture.receiptPath.split("/")), receiptBytes);
      if (!scenario.preserveBinding) {
        fixture.authorization.verificationReceipt.digest = `sha256:${createHash("sha256").update(receiptBytes).digest("hex")}`;
        fixture.authorization.verificationReceipt.bytes = receiptBytes.byteLength;
      }
      if (scenario.relocate) {
        fixture.authorization.verificationReceipt.path = "outside/receipt.json";
      }
      writeFileSync(
        fixture.authorizationFile,
        `${JSON.stringify(fixture.authorization)}\n`,
        "utf8",
      );

      assert.throws(
        () =>
          verifyLaunchAuthorization(
            candidate,
            auditCandidate,
            repositoryRoot,
            fixture.authorizationPath,
          ),
        scenario.expected,
        scenario.name,
      );
    });
  }
});

test("launch authorization rejects stale package bindings and unowned handoff paths", () => {
  withTempDirectory((repositoryRoot) => {
    const candidate = syntheticCandidateForAudit();
    const auditCandidate = syntheticAuditCandidateForLaunch();
    const handoff = validPrelaunchAuditHandoff(candidate, auditCandidate);
    const fixture = writeLaunchFixture(
      repositoryRoot,
      candidate,
      auditCandidate,
      handoff,
      "outside/review.json",
    );
    fixture.authorization.prelaunchAudit.packageDigest = `sha256:${"9".repeat(64)}`;
    writeFileSync(fixture.authorizationFile, `${JSON.stringify(fixture.authorization)}\n`, "utf8");

    assert.throws(
      () =>
        verifyLaunchAuthorization(
          candidate,
          auditCandidate,
          repositoryRoot,
          fixture.authorizationPath,
        ),
      /launch authorization stale/,
    );

    fixture.authorization.prelaunchAudit.packageDigest =
      auditCandidate.renderedPackage.packageDigest;
    writeFileSync(fixture.authorizationFile, `${JSON.stringify(fixture.authorization)}\n`, "utf8");
    assert.throws(
      () =>
        verifyLaunchAuthorization(
          candidate,
          auditCandidate,
          repositoryRoot,
          fixture.authorizationPath,
        ),
      /launch authorization malformed/,
    );
  });
});

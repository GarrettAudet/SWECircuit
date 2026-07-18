import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import test from "node:test";
import { LIMITS, validateArtifactValue, validateProject } from "../dist/index.js";
import { inspectCanonicalArtifactPath } from "../dist/path.js";
import {
  parallelProjectBundle,
  projectArtifact,
  writeBundle,
  writeJson,
} from "./helpers/project-fixtures.mjs";

const diagnosticCodes = (result) => result.diagnostics.map((diagnostic) => diagnostic.code);

function withTempDirectory(callback) {
  const root = mkdtempSync(join(tmpdir(), "swecircuit-validation-"));
  try {
    return callback(root);
  } finally {
    rmSync(root, { force: true, recursive: true });
  }
}

function validateMutatedBundle(mutate) {
  return withTempDirectory((root) => {
    const bundle = parallelProjectBundle();
    mutate(bundle);
    writeBundle(root, bundle);
    return validateProject({ project: root });
  });
}

test("an explicit minimal project validates without discovery or optional adapters", () => {
  withTempDirectory((root) => {
    writeJson(root, "swecircuit.json", projectArtifact());
    const result = validateProject({ project: root });
    assert.equal(result.ok, true);
    assert.equal(result.exitCode, 0);
    assert.deepEqual(result.diagnostics, []);
    assert.deepEqual(result.value, {
      projectId: "fixture-project",
      projectArtifact: "swecircuit.json",
      artifacts: [],
    });
  });
});

test("a complete parallel project validates module routing, ownership, joins, and ceilings", () => {
  withTempDirectory((root) => {
    const bundle = parallelProjectBundle();
    writeBundle(root, bundle);
    const result = validateProject({ project: root });
    assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
    assert.equal(result.value.artifacts.length, Object.keys(bundle.artifacts).length);
    assert.equal(
      result.value.artifacts.at(0).artifact,
      "swecircuit/circuits/parallel-feature.json",
    );
  });
});

test("project loading rejects lexical escapes and every portable forbidden path form", async (t) => {
  const cases = [
    ["parent", "../escape.json", "SC1011"],
    ["posix absolute", "/tmp/module.json", "SC1012"],
    ["windows absolute", "C:/temp/module.json", "SC1012"],
    ["unc", "//server/share/module.json", "SC1012"],
    ["device", "\\\\?\\C:\\module.json", "SC1012"],
    ["alternate stream", "swecircuit/modules/a.json:stream", "SC1012"],
    ["URI", "file://module.json", "SC1012"],
    ["backslash", "swecircuit\\modules\\a.json", "SC1012"],
    ["lone high surrogate", `swecircuit/modules/${String.fromCharCode(0xd800)}.json`, "SC1012"],
    ["lone low surrogate", `swecircuit/modules/${String.fromCharCode(0xdc00)}.json`, "SC1012"],
  ];

  for (const [name, candidate, expectedCode] of cases) {
    await t.test(name, () => {
      withTempDirectory((root) => {
        writeJson(root, "swecircuit.json", projectArtifact([candidate]));
        const result = validateProject({ project: root });
        assert.deepEqual(diagnosticCodes(result), [expectedCode]);
        assert.equal(result.diagnostics[0].artifact, ".");
        assert.equal(result.diagnostics[0].pointer, "/spec/artifacts/0");
      });
    });
  }
});

test("project loading distinguishes missing references, non-files, and safe I/O failures", () => {
  withTempDirectory((root) => {
    writeJson(root, "swecircuit.json", projectArtifact(["swecircuit/modules/missing.json"]));
    const missing = validateProject({ project: root });
    assert.deepEqual(diagnosticCodes(missing), ["SC2001"]);
    assert.equal(missing.exitCode, 2);
  });

  withTempDirectory((root) => {
    writeJson(root, "swecircuit.json", projectArtifact(["swecircuit/modules/directory.json"]));
    mkdirSync(join(root, "swecircuit", "modules", "directory.json"), { recursive: true });
    assert.deepEqual(diagnosticCodes(validateProject({ project: root })), ["SC1015"]);
  });

  withTempDirectory((root) => {
    const missingRoot = join(root, "not-created");
    const result = validateProject({ project: missingRoot });
    assert.deepEqual(diagnosticCodes(result), ["SC1001"]);
    assert.equal(result.exitCode, 4);
    assert.equal(JSON.stringify(result.diagnostics).includes(missingRoot), false);
  });
});

test("contained missing-file diagnostics suppress secret-bearing artifact names", () => {
  withTempDirectory((root) => {
    const secret = `sk-proj-${"A".repeat(24)}`;
    const candidate = `swecircuit/modules/${secret}.json`;
    writeJson(root, "swecircuit.json", projectArtifact([candidate]));

    const result = validateProject({ project: root });
    assert.deepEqual(diagnosticCodes(result), ["SC2001"]);
    assert.equal(result.diagnostics[0].artifact, ".");
    assert.equal(JSON.stringify(result.diagnostics).includes(secret), false);
  });
});

test("explicit project roots reject remote, device, stream, and control forms before I/O", async (t) => {
  const cases = [
    ["file URI", "file:///definitely-not-read"],
    ["network URI", "https://example.invalid/project"],
    ["slash UNC", "//server/share/project"],
    ["backslash UNC", "\\\\server\\share\\project"],
    ["device path", "\\\\?\\C:\\project"],
    ["alternate stream", "C:\\project:stream"],
    ["control character", `bad${String.fromCharCode(1)}root`],
    ["lone high surrogate", `bad${String.fromCharCode(0xd800)}root`],
    ["lone low surrogate", `bad${String.fromCharCode(0xdc00)}root`],
  ];

  for (const [name, project] of cases) {
    await t.test(name, () => {
      const result = validateProject({ project });
      assert.deepEqual(diagnosticCodes(result), ["SC1012"]);
      assert.equal(result.exitCode, 2);
      assert.equal(result.diagnostics[0].artifact, ".");
    });
  }
});

test("project loading rejects links below the trust root", () => {
  withTempDirectory((root) => {
    const realModules = join(root, "real-modules");
    mkdirSync(realModules, { recursive: true });
    writeFileSync(join(realModules, "module.json"), "{}\n", "utf8");
    mkdirSync(join(root, "swecircuit"), { recursive: true });
    symlinkSync(
      realModules,
      join(root, "swecircuit", "modules"),
      process.platform === "win32" ? "junction" : "dir",
    );
    writeJson(root, "swecircuit.json", projectArtifact(["swecircuit/modules/module.json"]));
    assert.deepEqual(diagnosticCodes(validateProject({ project: root })), ["SC1013"]);
  });
});

test("project loading rejects external links without dereferencing their target", () => {
  withTempDirectory((root) => {
    withTempDirectory((external) => {
      writeFileSync(join(external, "module.json"), "{}\n", "utf8");
      mkdirSync(join(root, "swecircuit"), { recursive: true });
      symlinkSync(
        external,
        join(root, "swecircuit", "modules"),
        process.platform === "win32" ? "junction" : "dir",
      );
      writeJson(root, "swecircuit.json", projectArtifact(["swecircuit/modules/module.json"]));
      assert.deepEqual(diagnosticCodes(validateProject({ project: root })), ["SC1013"]);
    });
  });
});

test("project validation accepts a root reached through an aliased ancestor", () => {
  withTempDirectory((root) => {
    const realParent = join(root, "real-parent");
    const project = join(realParent, "project");
    mkdirSync(project, { recursive: true });
    writeJson(project, "swecircuit.json", projectArtifact());

    const aliasParent = join(root, "alias-parent");
    symlinkSync(realParent, aliasParent, process.platform === "win32" ? "junction" : "dir");
    const result = validateProject({ project: join(aliasParent, "project") });
    assert.equal(result.ok, true, JSON.stringify(result.diagnostics, null, 2));
  });
});
test("canonical containment distinguishes internal aliases from resolved escape", () => {
  withTempDirectory((root) => {
    const expected = join(root, "swecircuit", "modules", "module.json");
    const internalAlias = join(root, "canonical-modules", "module.json");
    const escaped = join(root, "..", "outside", "module.json");

    assert.equal(inspectCanonicalArtifactPath(root, expected, expected), null);
    assert.equal(inspectCanonicalArtifactPath(root, expected, internalAlias), "SC1013");
    assert.equal(inspectCanonicalArtifactPath(root, expected, escaped), "SC1014");
  });
});

test("project references fail closed for wrong kinds and duplicate identities", () => {
  const mismatch = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/modules/plan.json"].kind = "WorkPacket";
  });
  assert.deepEqual(diagnosticCodes(mismatch), ["SC2002"]);

  const duplicate = validateMutatedBundle((bundle) => {
    const path = "swecircuit/modules/plan-copy.json";
    bundle.artifacts[path] = structuredClone(bundle.artifacts["swecircuit/modules/plan.json"]);
    bundle.project.spec.artifacts.push(path);
  });
  assert.ok(diagnosticCodes(duplicate).includes("SC2003"));
});

test("reference and graph diagnostics identify undeclared outcomes, ports, and fan-in", () => {
  const missingModule = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.nodes[1].module =
      "missing-module";
  });
  assert.ok(diagnosticCodes(missingModule).includes("SC2001"));

  const outcome = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.routes[0].outcome = "learn";
    bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.fanOuts[0].outcome = "learn";
  });
  assert.ok(diagnosticCodes(outcome).includes("SC2101"));

  const missingPort = validateMutatedBundle((bundle) => {
    bundle.artifacts[
      "swecircuit/circuits/parallel-feature.json"
    ].spec.routes[0].transfers[0].output = "missing_output";
  });
  assert.ok(diagnosticCodes(missingPort).includes("SC2004"));

  const typeMismatch = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/modules/implement-frontend.json"].spec.input[0].artifactType =
      "Spec";
  });
  assert.ok(diagnosticCodes(typeMismatch).includes("SC2106"));

  const fanIn = validateMutatedBundle((bundle) => {
    delete bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.joins;
  });
  assert.ok(diagnosticCodes(fanIn).includes("SC2103"));

  const mismatchedSources = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.joins[0].sources = [
      "frontend",
      "memory",
    ];
  });
  assert.ok(diagnosticCodes(mismatchedSources).includes("SC2103"));
});

test("every project and graph reference class emits reference.not-found", () => {
  const mutations = [
    (bundle) => {
      bundle.project.spec.defaultCircuit = "missing-circuit";
    },
    (bundle) => {
      bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.routes[0].to =
        "missing-node";
    },
    (bundle) => {
      bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.nodes[1].workPacket =
        "missing-packet";
    },
    (bundle) => {
      bundle.artifacts["swecircuit/work-packets/frontend.json"].spec.dependencies = [
        "missing-packet",
      ];
    },
    (bundle) => {
      bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.fanOuts[0].branches[0] =
        "missing-branch";
    },
    (bundle) => {
      bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.joins[0].sources[0] =
        "missing-source";
    },
  ];

  for (const mutate of mutations) {
    assert.ok(diagnosticCodes(validateMutatedBundle(mutate)).includes("SC2001"));
  }
});
test("cycles, fan-out ownership, and permission ceilings are enforced semantically", () => {
  const cycle = validateMutatedBundle((bundle) => {
    const circuit = bundle.artifacts["swecircuit/circuits/parallel-feature.json"];
    bundle.artifacts["swecircuit/modules/memory.json"].spec.output[0].artifactType = "Change";
    circuit.spec.routes.push({
      from: "memory",
      outcome: "pass",
      to: "memory",
      transfers: [{ output: "memory_entry", input: "artifact" }],
    });
  });
  assert.ok(diagnosticCodes(cycle).includes("SC2102"));

  const owner = validateMutatedBundle((bundle) => {
    delete bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.nodes[1].owner;
  });
  assert.ok(diagnosticCodes(owner).includes("SC2104"));

  const ceiling = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/work-packets/frontend.json"].spec.authority.permissionCeiling = [
      { kind: "filesystem.read", scopes: ["src/frontend/**"] },
    ];
  });
  assert.ok(diagnosticCodes(ceiling).includes("SC4003"));

  const invalidScope = validateMutatedBundle((bundle) => {
    bundle.artifacts[
      "swecircuit/modules/implement-frontend.json"
    ].spec.requiredPermissions[0].scopes = ["../outside"];
  });
  assert.ok(diagnosticCodes(invalidScope).includes("SC4002"));
});

test("multi-node cycles require a bound on every cyclic route", () => {
  const addCycle = (bundle) => {
    const circuit = bundle.artifacts["swecircuit/circuits/parallel-feature.json"];
    bundle.artifacts["swecircuit/modules/memory.json"].spec.output[0].artifactType = "Goal";
    circuit.spec.routes.push({
      from: "memory",
      outcome: "pass",
      to: "route",
      transfers: [{ output: "memory_entry", input: "goal" }],
    });
    for (const route of circuit.spec.routes) {
      route.maxTraversals = 1;
    }
  };

  const unbounded = validateMutatedBundle((bundle) => {
    addCycle(bundle);
    delete bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.routes[0]
      .maxTraversals;
  });
  assert.ok(diagnosticCodes(unbounded).includes("SC2102"));

  const bounded = validateMutatedBundle(addCycle);
  assert.equal(bounded.ok, true, JSON.stringify(bounded.diagnostics, null, 2));
});

test("fan-out declarations and entry reachability stay structurally consistent", () => {
  const invalidFanOut = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.fanOuts[0].branches[1] =
      "memory";
  });
  assert.ok(diagnosticCodes(invalidFanOut).includes("SC2107"));

  const unreachable = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/circuits/parallel-feature.json"].spec.routes.pop();
  });
  assert.ok(diagnosticCodes(unreachable).includes("SC2108"));
});

test("permission grammar covers every kind and filesystem prefix boundaries", () => {
  const permissions = [
    { kind: "filesystem.read", scopes: ["src/frontend/**"] },
    { kind: "filesystem.write", scopes: ["src/frontend/**"] },
    { kind: "network.connect", scopes: ["api.example.com:443"] },
    { kind: "process.spawn", scopes: ["npm"] },
    { kind: "secrets.read", scopes: ["build_token"] },
  ];
  const valid = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/modules/implement-frontend.json"].spec.requiredPermissions =
      structuredClone(permissions);
    bundle.artifacts["swecircuit/work-packets/frontend.json"].spec.authority.permissionCeiling =
      structuredClone(permissions);
  });
  assert.equal(valid.ok, true, JSON.stringify(valid.diagnostics, null, 2));

  const invalidScopes = [
    ["network.connect", "API.example.com:443"],
    ["network.connect", "api.example.com:65536"],
    ["process.spawn", "npm test"],
    ["process.spawn", "C:/npm"],
    ["secrets.read", "BUILD_TOKEN"],
  ];
  for (const [kind, scope] of invalidScopes) {
    const invalid = validateMutatedBundle((bundle) => {
      const request = [{ kind, scopes: [scope] }];
      bundle.artifacts["swecircuit/modules/implement-frontend.json"].spec.requiredPermissions =
        structuredClone(request);
      bundle.artifacts["swecircuit/work-packets/frontend.json"].spec.authority.permissionCeiling =
        structuredClone(request);
    });
    assert.ok(diagnosticCodes(invalid).includes("SC4002"), `${kind}:${scope}`);
  }

  const prefixBoundary = validateMutatedBundle((bundle) => {
    bundle.artifacts["swecircuit/modules/implement-frontend.json"].spec.requiredPermissions = [
      { kind: "filesystem.read", scopes: ["src/ab/file.ts"] },
    ];
    bundle.artifacts["swecircuit/work-packets/frontend.json"].spec.authority.permissionCeiling = [
      { kind: "filesystem.read", scopes: ["src/a/**"] },
    ];
  });
  assert.ok(diagnosticCodes(prefixBoundary).includes("SC4003"));
});
test("project and circuit collection ceilings emit dedicated limit diagnostics", () => {
  const atProjectLimit = Array.from(
    { length: LIMITS.projectArtifacts },
    (_, index) => `swecircuit/modules/m${index}.json`,
  );
  assert.equal(validateArtifactValue(projectArtifact(atProjectLimit)).ok, true);

  withTempDirectory((root) => {
    const artifact = "swecircuit/modules/large.json";
    writeJson(root, "swecircuit.json", projectArtifact([artifact]));
    const target = join(root, ...artifact.split("/"));
    mkdirSync(join(root, "swecircuit", "modules"), { recursive: true });
    writeFileSync(target, Buffer.alloc(LIMITS.artifactBytes + 1));
    assert.deepEqual(diagnosticCodes(validateProject({ project: root })), ["SC5001"]);
  });
  withTempDirectory((root) => {
    const artifacts = Array.from(
      { length: LIMITS.projectArtifacts + 1 },
      (_, index) => `swecircuit/modules/m${index}.json`,
    );
    writeJson(root, "swecircuit.json", projectArtifact(artifacts));
    assert.deepEqual(diagnosticCodes(validateProject({ project: root })), ["SC5003"]);
  });

  const circuit = parallelProjectBundle().artifacts["swecircuit/circuits/parallel-feature.json"];
  circuit.spec.routes = Array.from({ length: LIMITS.circuitEdges }, () =>
    structuredClone(circuit.spec.routes[0]),
  );
  assert.equal(validateArtifactValue(circuit).ok, true);
  circuit.spec.routes.push(structuredClone(circuit.spec.routes[0]));
  assert.deepEqual(diagnosticCodes(validateArtifactValue(circuit)), ["SC5004"]);
});

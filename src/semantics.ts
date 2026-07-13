import type { ArtifactKind } from "./constants.js";
import { createDiagnostic } from "./diagnostics.js";
import type {
  AdapterManifestArtifact,
  ArtifactEnvelope,
  ArtifactRecord,
  CircuitArtifact,
  CircuitRoute,
  ModuleArtifact,
  ProjectArtifact,
  ProjectMemberArtifact,
  WorkPacketArtifact,
} from "./model.js";
import { permissionRequirementCovered, validatePermissionRequests } from "./permissions.js";
import type { Diagnostic } from "./types.js";

type MemberRecord = ArtifactRecord<ProjectMemberArtifact>;
type ModuleRecord = ArtifactRecord<ModuleArtifact>;
type WorkPacketRecord = ArtifactRecord<WorkPacketArtifact>;

interface ArtifactIndexes {
  readonly byKind: ReadonlyMap<ArtifactKind, ReadonlyMap<string, MemberRecord>>;
  readonly kindsById: ReadonlyMap<string, ReadonlySet<ArtifactKind>>;
}

function sameSet(left: ReadonlySet<string>, right: ReadonlySet<string>): boolean {
  return left.size === right.size && [...left].every((value) => right.has(value));
}

function buildIndexes(
  records: readonly MemberRecord[],
  diagnostics: Diagnostic[],
): ArtifactIndexes {
  const mutableByKind = new Map<ArtifactKind, Map<string, MemberRecord>>();
  const mutableKindsById = new Map<string, Set<ArtifactKind>>();

  for (const record of records) {
    const { id } = record.value.metadata;
    const kind = record.value.kind;
    let kindIndex = mutableByKind.get(kind);
    if (kindIndex === undefined) {
      kindIndex = new Map();
      mutableByKind.set(kind, kindIndex);
    }
    if (kindIndex.has(id)) {
      diagnostics.push(createDiagnostic("SC2003", record.artifact, "/metadata/id"));
    } else {
      kindIndex.set(id, record);
    }
    let kinds = mutableKindsById.get(id);
    if (kinds === undefined) {
      kinds = new Set();
      mutableKindsById.set(id, kinds);
    }
    kinds.add(kind);
  }

  return {
    byKind: mutableByKind,
    kindsById: mutableKindsById,
  };
}

function resolveArtifact<T extends ProjectMemberArtifact>(
  indexes: ArtifactIndexes,
  expectedKind: T["kind"],
  id: string,
  artifact: string,
  pointer: string,
  diagnostics: Diagnostic[],
): ArtifactRecord<T> | null {
  const record = indexes.byKind.get(expectedKind)?.get(id);
  if (record !== undefined) {
    return record as ArtifactRecord<T>;
  }
  diagnostics.push(
    createDiagnostic(indexes.kindsById.has(id) ? "SC2002" : "SC2001", artifact, pointer),
  );
  return null;
}

function duplicateValues(
  values: readonly string[],
  artifact: string,
  pointer: string,
  diagnostics: Diagnostic[],
): void {
  const seen = new Set<string>();
  for (const [index, value] of values.entries()) {
    if (seen.has(value)) {
      diagnostics.push(createDiagnostic("SC2003", artifact, `${pointer}/${index}`));
    } else {
      seen.add(value);
    }
  }
}

function validateModule(record: ModuleRecord, diagnostics: Diagnostic[]): void {
  const module = record.value;
  duplicateValues(
    module.spec.input.map((port) => port.name),
    record.artifact,
    "/spec/input",
    diagnostics,
  );
  duplicateValues(
    module.spec.output.map((port) => port.name),
    record.artifact,
    "/spec/output",
    diagnostics,
  );
  const evidenceIds = module.spec.evidence.map((evidence) => evidence.id);
  duplicateValues(evidenceIds, record.artifact, "/spec/evidence", diagnostics);
  const evidenceSet = new Set(evidenceIds);
  for (const [index, evidence] of module.spec.gate.evidence.entries()) {
    if (!evidenceSet.has(evidence)) {
      diagnostics.push(createDiagnostic("SC2001", record.artifact, `/spec/gate/evidence/${index}`));
    }
  }
  const outcomes = new Set(module.spec.outcomes);
  for (const [index, outcome] of module.spec.gate.failureOutcomes.entries()) {
    if (!outcomes.has(outcome)) {
      diagnostics.push(
        createDiagnostic("SC2108", record.artifact, `/spec/gate/failureOutcomes/${index}`),
      );
    }
  }
  diagnostics.push(
    ...validatePermissionRequests(
      module.spec.requiredPermissions,
      record.artifact,
      "/spec/requiredPermissions",
    ),
  );
}

function validateWorkPacket(
  record: WorkPacketRecord,
  indexes: ArtifactIndexes,
  diagnostics: Diagnostic[],
): void {
  const packet = record.value;
  diagnostics.push(
    ...validatePermissionRequests(
      packet.spec.authority.permissionCeiling,
      record.artifact,
      "/spec/authority/permissionCeiling",
    ),
  );
  for (const [index, dependency] of packet.spec.dependencies.entries()) {
    if (dependency === packet.metadata.id) {
      diagnostics.push(createDiagnostic("SC2108", record.artifact, `/spec/dependencies/${index}`));
      continue;
    }
    resolveArtifact<WorkPacketArtifact>(
      indexes,
      "WorkPacket",
      dependency,
      record.artifact,
      `/spec/dependencies/${index}`,
      diagnostics,
    );
  }
}

function routeGroups(
  routes: readonly CircuitRoute[],
): ReadonlyMap<string, readonly CircuitRoute[]> {
  const groups = new Map<string, CircuitRoute[]>();
  for (const route of routes) {
    const key = `${route.from}\u0000${route.outcome}`;
    const group = groups.get(key) ?? [];
    group.push(route);
    groups.set(key, group);
  }
  return groups;
}

function reachableNodes(
  start: string,
  adjacency: ReadonlyMap<string, ReadonlySet<string>>,
): ReadonlySet<string> {
  const visited = new Set<string>();
  const stack = [start];
  while (stack.length > 0) {
    const node = stack.pop();
    if (node === undefined || visited.has(node)) {
      continue;
    }
    visited.add(node);
    for (const next of adjacency.get(node) ?? []) {
      if (!visited.has(next)) {
        stack.push(next);
      }
    }
  }
  return visited;
}

function stronglyConnectedComponents(
  nodeIds: readonly string[],
  adjacency: ReadonlyMap<string, ReadonlySet<string>>,
): ReadonlyMap<string, number> {
  const visited = new Set<string>();
  const order: string[] = [];
  for (const start of nodeIds) {
    if (visited.has(start)) {
      continue;
    }
    const stack: Array<readonly [string, boolean]> = [[start, false]];
    while (stack.length > 0) {
      const item = stack.pop();
      if (item === undefined) {
        continue;
      }
      const [node, expanded] = item;
      if (expanded) {
        order.push(node);
        continue;
      }
      if (visited.has(node)) {
        continue;
      }
      visited.add(node);
      stack.push([node, true]);
      for (const next of adjacency.get(node) ?? []) {
        if (!visited.has(next)) {
          stack.push([next, false]);
        }
      }
    }
  }

  const reverse = new Map<string, Set<string>>();
  for (const node of nodeIds) {
    reverse.set(node, new Set());
  }
  for (const [from, targets] of adjacency) {
    for (const target of targets) {
      reverse.get(target)?.add(from);
    }
  }

  const components = new Map<string, number>();
  let component = 0;
  for (const start of order.reverse()) {
    if (components.has(start)) {
      continue;
    }
    const stack = [start];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node === undefined || components.has(node)) {
        continue;
      }
      components.set(node, component);
      for (const next of reverse.get(node) ?? []) {
        if (!components.has(next)) {
          stack.push(next);
        }
      }
    }
    component += 1;
  }
  return components;
}

function validateCircuit(
  record: ArtifactRecord<CircuitArtifact>,
  indexes: ArtifactIndexes,
  diagnostics: Diagnostic[],
): void {
  const circuit = record.value;
  const nodes = new Map<string, { readonly index: number; readonly module: ModuleRecord | null }>();
  const workPackets = new Map<string, WorkPacketRecord | null>();

  for (const [index, node] of circuit.spec.nodes.entries()) {
    if (nodes.has(node.id)) {
      diagnostics.push(createDiagnostic("SC2003", record.artifact, `/spec/nodes/${index}/id`));
      continue;
    }
    const module = resolveArtifact<ModuleArtifact>(
      indexes,
      "Module",
      node.module,
      record.artifact,
      `/spec/nodes/${index}/module`,
      diagnostics,
    );
    nodes.set(node.id, { index, module });

    if ((node.owner === undefined) !== (node.workPacket === undefined)) {
      diagnostics.push(createDiagnostic("SC2104", record.artifact, `/spec/nodes/${index}`));
    }
    if (node.workPacket !== undefined) {
      const packet = resolveArtifact<WorkPacketArtifact>(
        indexes,
        "WorkPacket",
        node.workPacket,
        record.artifact,
        `/spec/nodes/${index}/workPacket`,
        diagnostics,
      );
      workPackets.set(node.id, packet);
      if (packet !== null && node.owner !== packet.value.spec.role.owner) {
        diagnostics.push(createDiagnostic("SC2104", record.artifact, `/spec/nodes/${index}/owner`));
      }
      if (packet !== null && module !== null) {
        for (const requirement of module.value.spec.requiredPermissions) {
          if (
            !permissionRequirementCovered(
              requirement,
              packet.value.spec.authority.permissionCeiling,
            )
          ) {
            diagnostics.push(
              createDiagnostic("SC4003", record.artifact, `/spec/nodes/${index}/workPacket`),
            );
          }
        }
      }
    }
  }

  if (!nodes.has(circuit.spec.entry)) {
    diagnostics.push(createDiagnostic("SC2001", record.artifact, "/spec/entry"));
  }
  for (const [index, exit] of circuit.spec.exits.entries()) {
    if (!nodes.has(exit)) {
      diagnostics.push(createDiagnostic("SC2001", record.artifact, `/spec/exits/${index}`));
    }
  }

  const adjacency = new Map<string, Set<string>>();
  const predecessors = new Map<string, Set<string>>();
  for (const node of nodes.keys()) {
    adjacency.set(node, new Set());
    predecessors.set(node, new Set());
  }
  const routeKeys = new Set<string>();
  let allRoutesResolve = true;
  for (const [index, route] of circuit.spec.routes.entries()) {
    const source = nodes.get(route.from);
    const target = nodes.get(route.to);
    if (source === undefined) {
      diagnostics.push(createDiagnostic("SC2001", record.artifact, `/spec/routes/${index}/from`));
      allRoutesResolve = false;
    }
    if (target === undefined) {
      diagnostics.push(createDiagnostic("SC2001", record.artifact, `/spec/routes/${index}/to`));
      allRoutesResolve = false;
    }
    if (source === undefined || target === undefined) {
      continue;
    }
    adjacency.get(route.from)?.add(route.to);
    predecessors.get(route.to)?.add(route.from);

    const routeKey = `${route.from}\u0000${route.outcome}\u0000${route.to}`;
    if (routeKeys.has(routeKey)) {
      diagnostics.push(createDiagnostic("SC2108", record.artifact, `/spec/routes/${index}`));
    }
    routeKeys.add(routeKey);

    const sourceModule = source.module?.value;
    const targetModule = target.module?.value;
    if (sourceModule !== undefined && !sourceModule.spec.outcomes.includes(route.outcome)) {
      diagnostics.push(
        createDiagnostic("SC2101", record.artifact, `/spec/routes/${index}/outcome`),
      );
    }
    if (sourceModule === undefined || targetModule === undefined) {
      continue;
    }
    const outputs = new Map(sourceModule.spec.output.map((port) => [port.name, port]));
    const inputs = new Map(targetModule.spec.input.map((port) => [port.name, port]));
    for (const [transferIndex, transfer] of route.transfers.entries()) {
      const output = outputs.get(transfer.output);
      const input = inputs.get(transfer.input);
      if (output === undefined) {
        diagnostics.push(
          createDiagnostic(
            "SC2004",
            record.artifact,
            `/spec/routes/${index}/transfers/${transferIndex}/output`,
          ),
        );
      }
      if (input === undefined) {
        diagnostics.push(
          createDiagnostic(
            "SC2004",
            record.artifact,
            `/spec/routes/${index}/transfers/${transferIndex}/input`,
          ),
        );
      }
      if (
        output !== undefined &&
        input !== undefined &&
        output.artifactType !== input.artifactType
      ) {
        diagnostics.push(
          createDiagnostic(
            "SC2106",
            record.artifact,
            `/spec/routes/${index}/transfers/${transferIndex}`,
          ),
        );
      }
    }
  }

  const joins = circuit.spec.joins ?? [];
  const joinsByNode = new Map<string, (typeof joins)[number]>();
  for (const [index, join] of joins.entries()) {
    if (joinsByNode.has(join.node)) {
      diagnostics.push(createDiagnostic("SC2103", record.artifact, `/spec/joins/${index}/node`));
    } else {
      joinsByNode.set(join.node, join);
    }
    if (!nodes.has(join.node)) {
      diagnostics.push(createDiagnostic("SC2001", record.artifact, `/spec/joins/${index}/node`));
    }
    for (const [sourceIndex, source] of join.sources.entries()) {
      if (!nodes.has(source)) {
        diagnostics.push(
          createDiagnostic(
            "SC2001",
            record.artifact,
            `/spec/joins/${index}/sources/${sourceIndex}`,
          ),
        );
      }
    }
    const actual = predecessors.get(join.node) ?? new Set<string>();
    if (actual.size < 2 || !sameSet(actual, new Set(join.sources))) {
      diagnostics.push(createDiagnostic("SC2103", record.artifact, `/spec/joins/${index}/sources`));
    }
  }
  for (const [node, inbound] of predecessors) {
    if (inbound.size >= 2 && !joinsByNode.has(node)) {
      const index = nodes.get(node)?.index;
      diagnostics.push(
        createDiagnostic(
          "SC2103",
          record.artifact,
          index === undefined ? "/spec/nodes" : `/spec/nodes/${index}/id`,
        ),
      );
    }
  }

  const groups = routeGroups(circuit.spec.routes);
  const fanOuts = circuit.spec.fanOuts ?? [];
  const fanOutKeys = new Set<string>();
  const canReachJoin = new Map<string, ReadonlySet<string>>();
  for (const [index, fanOut] of fanOuts.entries()) {
    const key = `${fanOut.from}\u0000${fanOut.outcome}`;
    if (fanOutKeys.has(key)) {
      diagnostics.push(createDiagnostic("SC2107", record.artifact, `/spec/fanOuts/${index}`));
    }
    fanOutKeys.add(key);
    if (!nodes.has(fanOut.from)) {
      diagnostics.push(createDiagnostic("SC2001", record.artifact, `/spec/fanOuts/${index}/from`));
    }
    if (!nodes.has(fanOut.join)) {
      diagnostics.push(createDiagnostic("SC2001", record.artifact, `/spec/fanOuts/${index}/join`));
    }
    const matchingTargets = new Set((groups.get(key) ?? []).map((route) => route.to));
    if (!sameSet(matchingTargets, new Set(fanOut.branches))) {
      diagnostics.push(
        createDiagnostic("SC2107", record.artifact, `/spec/fanOuts/${index}/branches`),
      );
    }
    const join = joinsByNode.get(fanOut.join);
    if (join === undefined || join.owner !== fanOut.integrationOwner) {
      diagnostics.push(createDiagnostic("SC2107", record.artifact, `/spec/fanOuts/${index}/join`));
    }
    for (const [branchIndex, branch] of fanOut.branches.entries()) {
      const branchNode = circuit.spec.nodes[nodes.get(branch)?.index ?? -1];
      if (branchNode === undefined) {
        diagnostics.push(
          createDiagnostic(
            "SC2001",
            record.artifact,
            `/spec/fanOuts/${index}/branches/${branchIndex}`,
          ),
        );
        continue;
      }
      if (
        branchNode.owner === undefined ||
        branchNode.workPacket === undefined ||
        workPackets.get(branch) === null
      ) {
        diagnostics.push(
          createDiagnostic(
            "SC2104",
            record.artifact,
            `/spec/fanOuts/${index}/branches/${branchIndex}`,
          ),
        );
      }
      let reachingSources = canReachJoin.get(fanOut.join);
      if (reachingSources === undefined) {
        reachingSources = reachableNodes(fanOut.join, predecessors);
        canReachJoin.set(fanOut.join, reachingSources);
      }
      if (!reachingSources.has(branch)) {
        diagnostics.push(
          createDiagnostic(
            "SC2107",
            record.artifact,
            `/spec/fanOuts/${index}/branches/${branchIndex}`,
          ),
        );
      }
    }
  }
  for (const [key, group] of groups) {
    if (group.length > 1 && !fanOutKeys.has(key)) {
      const firstIndex = circuit.spec.routes.indexOf(group[0] as CircuitRoute);
      diagnostics.push(
        createDiagnostic("SC2107", record.artifact, `/spec/routes/${firstIndex}/outcome`),
      );
    }
  }

  if (allRoutesResolve) {
    const components = stronglyConnectedComponents([...nodes.keys()], adjacency);
    const componentSizes = new Map<number, number>();
    for (const component of components.values()) {
      componentSizes.set(component, (componentSizes.get(component) ?? 0) + 1);
    }
    for (const [index, route] of circuit.spec.routes.entries()) {
      const component = components.get(route.from);
      const cyclic =
        route.from === route.to ||
        (component !== undefined &&
          component === components.get(route.to) &&
          (componentSizes.get(component) ?? 0) > 1);
      if (cyclic && route.maxTraversals === undefined) {
        diagnostics.push(
          createDiagnostic("SC2102", record.artifact, `/spec/routes/${index}/maxTraversals`),
        );
      }
    }

    if (nodes.has(circuit.spec.entry)) {
      const reachableFromEntry = reachableNodes(circuit.spec.entry, adjacency);
      for (const [node, nodeRecord] of nodes) {
        if (!reachableFromEntry.has(node)) {
          diagnostics.push(
            createDiagnostic("SC2108", record.artifact, `/spec/nodes/${nodeRecord.index}/id`),
          );
        }
      }
    }
  }
}

export function validateProjectSemantics(
  project: ProjectArtifact,
  records: readonly MemberRecord[],
): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const indexes = buildIndexes(records, diagnostics);

  if (project.spec.defaultCircuit !== undefined) {
    resolveArtifact<CircuitArtifact>(
      indexes,
      "Circuit",
      project.spec.defaultCircuit,
      "swecircuit.json",
      "/spec/defaultCircuit",
      diagnostics,
    );
  }

  for (const record of records) {
    switch (record.value.kind) {
      case "Module":
        validateModule(record as ModuleRecord, diagnostics);
        break;
      case "WorkPacket":
        validateWorkPacket(record as WorkPacketRecord, indexes, diagnostics);
        break;
      case "Circuit":
        validateCircuit(record as ArtifactRecord<CircuitArtifact>, indexes, diagnostics);
        break;
      case "AdapterManifest":
        diagnostics.push(
          ...validatePermissionRequests(
            (record.value as AdapterManifestArtifact).spec.requestedPermissions,
            record.artifact,
            "/spec/requestedPermissions",
          ),
        );
        break;
      default:
        break;
    }
  }
  return Object.freeze(diagnostics);
}

export function artifactIdentity(value: ArtifactEnvelope): string {
  return value.metadata.id;
}

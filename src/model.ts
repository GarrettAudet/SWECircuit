import type { ArtifactKind } from "./constants.js";

export type JsonPrimitive = boolean | number | string | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
export interface JsonObject {
  readonly [key: string]: JsonValue;
}

export interface ArtifactMetadata {
  readonly id: string;
  readonly version?: string;
  readonly description?: string;
}

export interface ArtifactEnvelope {
  readonly apiVersion: string;
  readonly kind: ArtifactKind;
  readonly metadata: ArtifactMetadata;
  readonly spec: JsonObject;
}

export interface ProjectArtifact extends ArtifactEnvelope {
  readonly kind: "Project";
  readonly spec: JsonObject & {
    readonly artifacts: readonly string[];
    readonly defaultCircuit?: string;
  };
}

export interface ArtifactPort {
  readonly name: string;
  readonly artifactType: string;
  readonly required: boolean;
}

export interface PermissionRequest {
  readonly kind: string;
  readonly scopes: readonly string[];
}

export interface ModuleArtifact extends ArtifactEnvelope {
  readonly kind: "Module";
  readonly spec: JsonObject & {
    readonly input: readonly ArtifactPort[];
    readonly output: readonly ArtifactPort[];
    readonly gate: JsonObject & {
      readonly evidence: readonly string[];
      readonly failureOutcomes: readonly string[];
    };
    readonly outcomes: readonly string[];
    readonly evidence: readonly (JsonObject & { readonly id: string })[];
    readonly requiredPermissions: readonly PermissionRequest[];
    readonly stopConditions: readonly string[];
  };
}

export interface CircuitNode {
  readonly id: string;
  readonly module: string;
  readonly owner?: string;
  readonly workPacket?: string;
}

export interface CircuitRoute {
  readonly from: string;
  readonly outcome: string;
  readonly to: string;
  readonly maxTraversals?: number;
  readonly transfers: readonly (JsonObject & {
    readonly output: string;
    readonly input: string;
  })[];
}

export interface CircuitJoin {
  readonly node: string;
  readonly sources: readonly string[];
  readonly strategy: "all" | "any";
  readonly owner: string;
}

export interface CircuitFanOut {
  readonly from: string;
  readonly outcome: string;
  readonly branches: readonly string[];
  readonly join: string;
  readonly integrationOwner: string;
}

export interface CircuitArtifact extends ArtifactEnvelope {
  readonly kind: "Circuit";
  readonly spec: JsonObject & {
    readonly entry: string;
    readonly nodes: readonly CircuitNode[];
    readonly routes: readonly CircuitRoute[];
    readonly exits: readonly string[];
    readonly joins?: readonly CircuitJoin[];
    readonly fanOuts?: readonly CircuitFanOut[];
    readonly stopConditions: readonly string[];
  };
}

export interface WorkPacketArtifact extends ArtifactEnvelope {
  readonly kind: "WorkPacket";
  readonly spec: JsonObject & {
    readonly role: JsonObject & { readonly owner: string };
    readonly dependencies: readonly string[];
    readonly authority: JsonObject & {
      readonly permissionCeiling: readonly PermissionRequest[];
    };
    readonly stopConditions: readonly string[];
  };
}

export interface AdapterManifestArtifact extends ArtifactEnvelope {
  readonly kind: "AdapterManifest";
  readonly spec: JsonObject & {
    readonly requestedPermissions: readonly PermissionRequest[];
  };
}

export type ProjectMemberArtifact =
  | ModuleArtifact
  | CircuitArtifact
  | WorkPacketArtifact
  | AdapterManifestArtifact;

export interface ArtifactRecord<T extends ArtifactEnvelope = ArtifactEnvelope> {
  readonly artifact: string;
  readonly value: T;
}

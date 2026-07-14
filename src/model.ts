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
  readonly reason?: string;
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
    readonly deadline?: string;
  };
}

export interface AdapterManifestArtifact extends ArtifactEnvelope {
  readonly kind: "AdapterManifest";
  readonly spec: JsonObject & {
    readonly adapterKind: string;
    readonly compatibility: JsonObject & {
      readonly apiVersions: readonly string[];
    };
    readonly capabilities: readonly string[];
    readonly requestedPermissions: readonly PermissionRequest[];
    readonly inputKinds: readonly string[];
    readonly outputKinds: readonly string[];
    readonly behavior: JsonObject & {
      readonly timeout: JsonObject & {
        readonly supported: boolean;
        readonly maximumSeconds?: number;
      };
      readonly cancellation: JsonObject & {
        readonly supported: boolean;
        readonly acknowledged: boolean;
      };
      readonly errors: JsonObject & {
        readonly structured: boolean;
        readonly retryableDeclared: boolean;
      };
    };
  };
}

export type RunEventAttempt = JsonObject & {
  readonly id: string;
  readonly number: number;
  readonly workPacket: string;
  readonly state: import("./types.js").ExecutionState;
  readonly retryOf?: string;
  readonly deadline?: string;
  readonly terminalCode?: import("./types.js").TerminalCode;
};

export type RunEventEvidenceReference = JsonObject & {
  readonly id: string;
  readonly kind: import("./types.js").EvidenceKind;
  readonly ref: string;
  readonly digest?: string;
  readonly immutable?: boolean;
};

export interface RunEventArtifact extends ArtifactEnvelope {
  readonly kind: "RunEvent";
  readonly metadata: {
    readonly id: string;
  };
  readonly spec: JsonObject & {
    readonly type: import("./types.js").RunEventType;
    readonly eventTypeVersion: string;
    readonly runId: string;
    readonly sequence: number;
    readonly correlationId: string;
    readonly actor: string;
    readonly time?: string;
    readonly causationId?: string;
    readonly links?: readonly string[];
    readonly stage?: import("./types.js").WorkflowStage;
    readonly outcome?: import("./types.js").WorkflowOutcome;
    readonly workPacket?: string;
    readonly attemptId?: string;
    readonly attempt?: RunEventAttempt;
    readonly heartbeat?: JsonObject & {
      readonly observedAt: string;
      readonly expectedEverySeconds: number;
    };
    readonly cancellation?: JsonObject & {
      readonly requestedBy: string;
      readonly reasonCode: import("./types.js").CancellationReasonCode;
    };
    readonly evidence?: readonly RunEventEvidenceReference[];
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

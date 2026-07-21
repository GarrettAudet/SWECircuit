import type { SPECIALIST_RUN_API_VERSION } from "./constants.js";
import type {
  RenderedSpecialistPackage,
  SpecialistEvidenceDuty,
  SpecialistHandoffArtifactBinding,
} from "./specialist-types.js";
import type { EvidenceKind, WorkflowOutcome } from "./types.js";

export type SpecialistRunApiVersion = typeof SPECIALIST_RUN_API_VERSION;

export interface SpecialistRunGoalBinding {
  readonly id: string;
  readonly revision: number;
  readonly digest: string;
  readonly integrationOwner: string;
}

export interface SpecialistRunAcceptedHandoff {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly outcome: WorkflowOutcome;
  readonly rawEncoding: "base64";
  readonly rawBytes: number;
  readonly rawDigest: string;
  readonly rawBase64: string;
}

export interface SpecialistRunSession {
  readonly apiVersion: SpecialistRunApiVersion;
  readonly kind: "SpecialistRunSession";
  readonly goal: SpecialistRunGoalBinding;
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly selectedCandidateId: string;
  readonly package: RenderedSpecialistPackage;
  readonly acceptedHandoffs: readonly SpecialistRunAcceptedHandoff[];
  readonly contentDigest: string;
}

export type SpecialistRunStage = "collecting" | "routed" | "integration_ready";

export type SpecialistRunAgentStatusKind =
  | "accepted_pass"
  | "accepted_non_pass"
  | "dependency_eligible"
  | "waiting_for_dependencies"
  | "session_routed";

export interface SpecialistRunRoute {
  readonly agentId: string;
  readonly outcome: Exclude<WorkflowOutcome, "pass">;
}

export interface SpecialistRunAgentStatus {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly dependencies: readonly string[];
  readonly status: SpecialistRunAgentStatusKind;
  readonly outcome: WorkflowOutcome | null;
  readonly waitingForAgentIds: readonly string[];
  readonly blockingRoutes: readonly SpecialistRunRoute[];
}

export interface SpecialistRunEligibleContract {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly path: string;
  readonly mediaType: "text/markdown";
  readonly bytes: number;
  readonly digest: string;
  readonly content: string;
}

export interface SpecialistRunEvidenceBinding {
  readonly criterionId: string;
  readonly requirementId: string;
  readonly kind: EvidenceKind;
  readonly duty: SpecialistEvidenceDuty;
  readonly status: WorkflowOutcome;
  readonly artifact: string;
}

export interface SpecialistRunAcceptedEvidence {
  readonly agentId: string;
  readonly blueprintDigest: string;
  readonly outcome: WorkflowOutcome;
  readonly rawBytes: number;
  readonly rawDigest: string;
  readonly semanticDigest: string;
  readonly artifacts: readonly SpecialistHandoffArtifactBinding[];
  readonly evidence: readonly SpecialistRunEvidenceBinding[];
}

export type SpecialistRunNextAction =
  | {
      readonly kind: "external_host.evaluate_dependency_eligible_contracts";
      readonly actor: "external_host";
      readonly agentIds: readonly string[];
    }
  | {
      readonly kind: "integration_owner.route_specialist_outcome";
      readonly actor: "integration_owner";
      readonly integrationOwner: string;
      readonly routes: readonly SpecialistRunRoute[];
    }
  | {
      readonly kind: "integration_owner.integrate_and_verify";
      readonly actor: "integration_owner";
      readonly integrationOwner: string;
    };

export interface SpecialistRunInspection {
  readonly apiVersion: SpecialistRunApiVersion;
  readonly kind: "SpecialistRunInspection";
  readonly goal: SpecialistRunGoalBinding;
  readonly compilationDigest: string;
  readonly packageDigest: string;
  readonly selectedCandidateId: string;
  readonly sessionDigest: string;
  readonly stage: SpecialistRunStage;
  readonly agents: readonly SpecialistRunAgentStatus[];
  readonly dependencyEligibleContracts: readonly SpecialistRunEligibleContract[];
  readonly acceptedEvidence: readonly SpecialistRunAcceptedEvidence[];
  readonly routes: readonly SpecialistRunRoute[];
  readonly specialistOutcome: WorkflowOutcome | null;
  readonly integrationReady: boolean;
  readonly nextAction: SpecialistRunNextAction;
  readonly contentDigest: string;
}

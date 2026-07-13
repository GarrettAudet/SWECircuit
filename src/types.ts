export type DiagnosticSeverity = "error" | "warning";

export type ExitCode = 0 | 2 | 3 | 4 | 5;

export type WorkflowOutcome =
  | "pass"
  | "fix"
  | "diagnose"
  | "clarify"
  | "redesign"
  | "split"
  | "block"
  | "learn";

export type WorkflowStage =
  | "intake"
  | "clarify"
  | "spec"
  | "architecture_check"
  | "task_plan"
  | "implement"
  | "verify"
  | "review"
  | "memory_update"
  | "merge";

export type ExecutionState =
  | "queued"
  | "running"
  | "input_required"
  | "completed"
  | "failed"
  | "cancelled"
  | "timed_out";

export type RunEventType =
  | "run.started"
  | "run.completed"
  | "attempt.state"
  | "attempt.heartbeat"
  | "attempt.cancellation_requested"
  | "workflow.outcome"
  | "evidence.recorded"
  | "handoff.recorded"
  | "verification.recorded"
  | "review.recorded"
  | "memory.updated"
  | "merge.recorded";

export type TerminalCode =
  | "success"
  | "execution_failed"
  | "verification_failed"
  | "review_failed"
  | "handoff_failed"
  | "integration_failed"
  | "cancelled_by_user"
  | "cancelled_by_policy"
  | "cancelled_by_parent"
  | "deadline_exceeded"
  | "heartbeat_expired";

export type CancellationReasonCode =
  | "user_request"
  | "policy"
  | "superseded"
  | "dependency_failed"
  | "parent_cancelled"
  | "shutdown";

export type EvidenceKind =
  | "artifact"
  | "command"
  | "test"
  | "review"
  | "decision"
  | "commit"
  | "digest"
  | "handoff"
  | "memory";

export interface Diagnostic {
  readonly code: string;
  readonly severity: DiagnosticSeverity;
  readonly artifact: string;
  readonly pointer: string;
  readonly rule: string;
  readonly message: string;
  readonly hint?: string;
}

export interface OperationResult<T> {
  readonly ok: boolean;
  readonly exitCode: ExitCode;
  readonly diagnostics: readonly Diagnostic[];
  readonly value: T | null;
}

export interface ValidateProjectOptions {
  readonly project?: string;
}

export interface InitializeProjectOptions {
  readonly project?: string;
  readonly projectId?: string;
}

export interface InspectTraceOptions {
  readonly project?: string;
  readonly trace: string;
}

export interface ValidatedArtifactSummary {
  readonly artifact: string;
  readonly kind: string;
  readonly id: string;
  readonly version?: string;
}

export interface ProjectValidationSummary {
  readonly projectId: string;
  readonly projectArtifact: "swecircuit.json";
  readonly artifacts: readonly ValidatedArtifactSummary[];
}

export interface ProjectInitializationSummary {
  readonly projectId: string;
  readonly projectArtifact: "swecircuit.json";
  readonly created: readonly [
    "swecircuit.json",
    "swecircuit",
    "swecircuit/modules",
    "swecircuit/circuits",
  ];
  readonly validation: ProjectValidationSummary;
}

export interface TraceAttemptSummary {
  readonly id: string;
  readonly number: number;
  readonly workPacket: string;
  readonly state: ExecutionState;
  readonly retryOf?: string;
  readonly lastSequence: number;
  readonly terminalCode?: TerminalCode;
}

export interface TraceWorkflowOutcomeSummary {
  readonly sequence: number;
  readonly stage: WorkflowStage;
  readonly outcome: WorkflowOutcome;
  readonly workPacket?: string;
  readonly attemptId?: string;
}

export interface TraceEvidenceSummary {
  readonly sequence: number;
  readonly eventType: RunEventType;
  readonly id: string;
  readonly kind: EvidenceKind;
  readonly ref: string;
  readonly digest?: string;
  readonly immutable?: boolean;
}

export interface TraceRunSummary {
  readonly runId: string;
  readonly firstSequence: number;
  readonly lastSequence: number;
  readonly eventCount: number;
  readonly hasStartedEvent: boolean;
  readonly hasCompletedEvent: boolean;
  readonly correlationIds: readonly string[];
  readonly attempts: readonly TraceAttemptSummary[];
  readonly workflowOutcomes: readonly TraceWorkflowOutcomeSummary[];
  readonly evidence: readonly TraceEvidenceSummary[];
  readonly evidenceOmitted: number;
}

export interface TraceInspectionSummary {
  readonly traceArtifact: string;
  readonly eventCount: number;
  readonly runs: readonly TraceRunSummary[];
}

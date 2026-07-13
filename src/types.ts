export type DiagnosticSeverity = "error" | "warning";

export type ExitCode = 0 | 2 | 3 | 4 | 5;

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

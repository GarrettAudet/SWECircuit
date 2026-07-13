const SECRET_PATTERNS = Object.freeze([
  /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{20,}/,
  /\b(?:gh[pousr]_[A-Za-z0-9]{36,255}|github_pat_[A-Za-z0-9_]{82,255})/,
  /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/,
  /\bBearer[\t ]+[A-Za-z0-9._~+/=-]{20,}/i,
  /\b(?:api[_-]?key|access[_-]?token|auth[_-]?token|password|passwd|secret)[\t ]*[:=][\t ]*[^\s]{8,}/i,
]);

export const SUPPRESSED_VALUE = "[suppressed]" as const;

export interface SecretSuppressor {
  readonly matched: boolean;
  suppress(value: string): string;
}

export function containsHighConfidenceSecret(value: string): boolean {
  return SECRET_PATTERNS.some((pattern) => pattern.test(value));
}

export function createSecretSuppressor(): SecretSuppressor {
  let matched = false;
  return {
    get matched(): boolean {
      return matched;
    },
    suppress(value: string): string {
      if (!containsHighConfidenceSecret(value)) {
        return value;
      }
      matched = true;
      return SUPPRESSED_VALUE;
    },
  };
}

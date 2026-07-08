# Security Policy

## Reporting Security Issues

Do not report secrets, credential exposure, or exploitable security issues in a public issue. Use GitHub private vulnerability reporting if it is available for the repository. If private reporting is unavailable, contact the maintainer through the GitHub repository owner profile and avoid including sensitive exploit details in public channels.

## Scope

This repository is currently a file-based workflow framework. Security-sensitive areas include:

- Agent instructions and tool permissions.
- External adapter evaluation.
- Pack installation guidance.
- Memory and retrieval artifacts that may preserve private context.
- CI and validation configuration.

## Handling Expectations

Security reports should include the affected file or workflow, impact, reproduction path when safe to share, and recommended mitigation. Maintainers should preserve evidence privately, patch the smallest causal surface, and update memory or known issues when the lesson is durable.

## Security Review Rules

- Do not add network, credential, or external service requirements to core without explicit approval.
- Do not store secrets in specs, memory, snapshots, issue templates, or examples.
- Treat external tools as adapters until permissions, telemetry, data retention, rollback, and maintenance are reviewed.

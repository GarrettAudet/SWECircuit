# Security Policy

## Reporting Security Issues

Do not report secrets, credential exposure, or exploitable security issues in a public issue. Use GitHub private vulnerability reporting if it is available for the repository. If private reporting is unavailable, contact the maintainer through the GitHub repository owner profile and avoid including sensitive exploit details in public channels.

## Scope

This repository is a file-based workflow framework with a private 0.x kernel and one caller-injected execution boundary. Security-sensitive areas include:

- Agent instructions, invocation grants, and host-enforced tool permissions.
- Executor identity, input snapshotting, settlement normalization, and cancellation state.
- External adapter evaluation and pack installation guidance.
- Caller-owned traces, memory, and retrieval artifacts that may preserve private context.
- Package declarations, CI, and validation configuration.

## Handling Expectations

Security reports should include the affected file or workflow, impact, reproduction path when safe to share, and recommended mitigation. Maintainers should preserve evidence privately, patch the smallest causal surface, and update memory or known issues when the lesson is durable.

## Security Review Rules

- Do not add network, credential, provider, process, or external service requirements to core without explicit approval.
- Keep AdapterManifest declarative; never load executable code from manifest content.
- Treat an ExecutionGrant as a checked invocation contract, not proof that host tools enforce it.
- Treat abort_unconfirmed as potentially live work and keep its outputs out of integration.
- Do not store secrets, raw provider payloads, prompts, transcripts, logs, or command output in specs, events, memory, snapshots, issue templates, or examples.
- Treat external tools as adapters until permissions, isolation, telemetry, data retention, rollback, and maintenance are reviewed.

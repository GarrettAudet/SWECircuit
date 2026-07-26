# Support

## Getting Help

For questions about using SWECircuit, start with:

- `README.md` for the public overview.
- `AGENTS.md` for agent behavior.
- `docs/ai/handbook.md` for the full workflow.
- `docs/README.md` for the documentation map.
- `docs/memory/retrieval-index.md` for source artifacts by topic.

If the repository issue tracker is available, open an issue with the closest matching template. For project-specific use, keep sensitive implementation details in your private project repository.

## What To Include

Good support requests include:

- The circuit or module you are using.
- The feature package or artifact path.
- The expected outcome.
- The actual outcome.
- Validation commands and results.
- Any adapter, pack, or external tool involved.

## Platform Support

The v0.1 release supports Windows only. CI qualifies `windows-latest` with Node 22 and 24.
macOS and Linux are not release gates and are currently unsupported; compatibility reports are
welcome, but they do not block a Windows release. IDE and provider neutrality remain core product
contracts and do not imply operating-system support.

## Support Boundaries

SWECircuit is a workflow framework, not a hosted service or runtime agent platform. The repository can help with workflow structure, templates, validation, and extension design, but it does not provide support for third-party tools beyond adapter evaluation guidance.

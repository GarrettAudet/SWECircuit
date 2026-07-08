# 2026-07-08 Rail Composition Scan

## Purpose

Capture the source context for making Rail Composition the core TraceRail abstraction.

## Sources Reviewed

| Source | Type | Relevant Takeaway | TraceRail Decision |
| --- | --- | --- | --- |
| LangChain overview | Official docs | LangChain describes a configurable agent harness composed from model, tools, prompt, and middleware, and recommends composing only what the use case needs. | Use a similar compositional principle for TraceRail, adapted to software engineering artifacts. |
| LangGraph overview in LangChain docs | Official docs | LangGraph is positioned for advanced workflows that combine deterministic and agentic steps with durable execution and human-in-the-loop support. | Treat advanced orchestration as directed rails with gates, branches, fan-in, and evidence. |
| PromptChainer research | Research | Prompt chaining makes complex LLM work more transparent and controllable, but needs scaffolding for intermediate outputs and debugging at multiple granularities. | Require typed artifacts, gates, and evidence between modules instead of vague step lists. |

## Accepted Practices

- Make the rail the core abstraction.
- Use a simple composition shape: `input | module | module | output`.
- Give every module a common interface: input, action, output, gate, outcome.
- Treat failed gates as typed routes, not silent retries.
- Preserve intermediate artifacts and evidence for traceability.
- Keep runtime adapters optional.

## Deferred Practices

- Building a runtime pipe operator.
- Installing LangChain, LangGraph, or LangSmith.
- Adding visual rail authoring.
- Adding automatic trace visualization.

## V5 Rationale

TraceRail needs one primitive that everything else builds on. Rail Composition gives the system a simple mental model without hiding the deeper workflow requirements. It can represent single-agent work, diagnosis, adapter evaluation, release flow, and multi-agent decomposition using the same small contract.

## Source Links

- LangChain overview: `https://docs.langchain.com/oss/python/langchain/overview`
- PromptChainer: `https://arxiv.org/abs/2203.06566`

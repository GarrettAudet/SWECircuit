# Implementation Notes

## Status

Complete.

## Timeline

- Started from released V12 commit `32ee307e079ae3848b160b9d7f15eccf88dcd2b8`.
- Created branch `codex/v13-dogfood-validation` and closed the product contract before implementation.
- Compiled all 15 legal partitions, approved the exact four-specialist package, and launched two independent root specialists in parallel.
- Routed integration only after exact root handoffs assessed `integrationReady: true`.
- Rejected one mobile fix on browser replay, accepted the causal correction, and restarted the immutable run with revised handoffs.
- Routed the independent `fix` outcome to domain, UI, and integration owners; domain and UI corrected in parallel before dependent integration resumed.
- Final independent review and run inspection passed at approximately 11:10 MDT, about 67 wall-clock minutes after the first V13 contract commit. This is an environment-qualified observation, not a speed benchmark.
- Final closeout replay then rejected an in-place status edit to the bound specification. Restoring the exact approved bytes preserved the original package and made the replay pass; completion now lives in separate closeout records.

## Dogfood Observations

- V12 correctly chose only useful parallelism: two root agents, then integration, then independent review.
- Exact scopes prevented write conflicts. No agent modified another owner's files.
- Verification behaved fail-closed: browser replay rejected an incomplete responsive fix, the handoff verifier rejected non-canonical evidence status `fail`, and the run routed an independent `fix` rather than treating it as success.
- The correction loop preserved ownership: domain fixed date semantics, UI fixed contrast, integration fixed focus, and review remained read-only.
- The reviewer initially lacked inspectable browser evidence. Supplying a digest-bound runtime report and screenshots closed the review, but the compiler should make reviewer evidence inputs explicit from the start.
- The post-memory replay caught a mutable-launch-input mistake: a feature specification cannot simultaneously be an approved byte-exact context source and a mutable completion dashboard.
- The application was small enough that orchestration ceremony dominated implementation. More than a dozen manual start, record, assess, inspect, and browser-evidence actions were required.
- Runtime assignment was also manual: domain used gpt-5.6-terra/high, while UI, integration, and review used gpt-5.6-sol/high. V13 did not inspect a capability inventory or prove that each choice was the least costly profile able to clear its gate.
- Two user status check-ins occurred while the system was operating, but no product clarification or approval blocked implementation.
- The browser upload policy blocked a generated local import fixture and consumed avoidable time before returning. The host correctly prevented a workaround.

## Performance And Coordination

- Work units: 4.
- Selected agents: 4 exact specialists.
- Peak concurrency: 2.
- Search: 15 partitions evaluated, 5 eligible.
- Planner projection: selected makespan 22 planning units; serial baseline 25 and ineligible for requested review independence.
- Scope conflicts: 0.
- Product correction routes: mobile containment, calendar-exact dates, focus restoration, and contrast.
- Invalid specialist handoffs accepted: 0.
- Final accepted raw handoffs: 4, all `pass`.

## Decisions

- Keep the example dependency-free so the run measures orchestration rather than package setup.
- Preserve V13 as product and process evidence; defer core contract changes to a separately reviewed version.
- Treat small-task ergonomics as a first-class failure even though product correctness passed.
- Recommend an adaptive quick rail that defaults small work to one implementation owner plus an independent verifier, escalating to compiled multi-agent teams only when concurrency or evidence independence justifies the cost.

## Failed Attempts

- The first template check exposed required milestone, task-verification, and dormant diagnostic headings.
- Native `apply_patch` repeatedly failed before mutation with the known Windows sandbox refresh error. Hash-guarded bounded writes were used only after failure and followed by repository checks.
- The first compiler request returned `SC4301` because assumptions used prose strings instead of structured records.
- Initial evidence generation was denied by the default sandbox; the identical scoped retry succeeded.
- The first mobile correction still overflowed visually; measured browser geometry drove a second causal fix.
- The browser host refused the generated local import fixture; no policy bypass was attempted.
- The first review handoff used invalid evidence status `fail`; production verification returned `SC4310`, and the reviewer re-emitted canonical `fix`.
- Initial independent review returned `fix` for four material findings; the final correction wave and re-review passed.
- The first closeout replay rejected the approved package because status and checkbox edits changed the bound spec.md; exact restoration and a separate completion record resolved it.
- The first canonical repository gate rejected Active Context because V13 wording omitted the exact V12 Revision 73 baseline from current routing. A focused correction preserved both active V13 work and R73 release provenance; the complete gate then passed.

## Files Changed

- Runnable example under `examples/triage-board/`.
- V13 feature, browser, orchestration, and review evidence under `docs/specs/v13-dogfood-validation/`.
- V13 milestone and durable memory indexes.
- Dogfood host harness `scripts/run-v13-dogfood.mjs`.

## Verification

- Application tests: 13 passed, 0 failed.
- JavaScript syntax: four files passed.
- Local server: 200 root, 200 HEAD asset, 404 unknown route, 405 POST, and expected CSP.
- Browser: complete CRUD journey, persistence, filters, export, focus, 1280px desktop, 390px mobile, and zero console warnings/errors.
- Template checker: pass.
- Final compilation: `sha256:256d6b31b1a6301240230a6a0ee606a30682caeb02e45e24c53edf334d283b82`.
- Final package: `sha256:2fe0cfb24e45b47a847b3d4f2213c7f29a8ed4fa94a99feed8294d1789f98bcb`.
- Final session: `sha256:166276daee93c8f2f4dbe42c2c528d4bf9393e1a3818c683b06fd35117716f8e`.
- Final inspection: `integration_ready`, `specialistOutcome: pass`, `integrationReady: true`.
- Post-closeout source replay: approved spec.md restored at 4,048 bytes and raw SHA-256 7874343e2b81af39e7b26777a22152d1fb7a26b4faa8da939f48fa7acdbc9e69; exact inspection passes.
- Canonical repository gate: npm.cmd run verify passed after the focused R73 traceability correction; existing Biome warnings and informational diagnostics remained non-failing.

## Follow-Ups

1. Add a complexity-adaptive quick rail for small tasks.
2. Generate an explicit, digest-bound reviewer evidence bundle and authorize it in the compiled review contract.
3. Automate run start, handoff recording, dependency assessment, correction replay, and final inspection in the IDE host adapter.
4. Add a concise live RunView so users see stage, agents, evidence, blockers, and elapsed progress without asking for status.
5. Make generated handoff guidance enumerate valid non-pass evidence statuses and repair schema failures automatically.
6. Include new dogfood scripts and runnable examples in canonical format/lint coverage without hard-coded file lists.
7. Separate immutable launch-context snapshots from mutable progress and completion records.
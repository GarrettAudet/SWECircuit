# Root-Cause Analysis

## Status

Not needed for product behavior.

## Trigger

No new product failure entered problem-solving mode. The known patch-helper environment failure recurred.

## Reproduction

A bounded `apply_patch` call failed before file access with the recorded Windows sandbox refresh error.

## Confirmed Root Cause

The patch sandbox helper failed during environment refresh, not while parsing or applying repository content. Exact fallback writes succeeded and all independent validation passed.

## Why It Was Missed

It was not missed; V8.1 already records the environment failure and authorized recovery boundary.

## Fix

Use the smallest exact file writes only after helper failure, then inspect the diff and run positive, negative, and CI validation.

## Regression Coverage

Existing checker regressions validate repository output. The environment helper itself is outside repository control.

## Follow-Up Work

Continue recording recurrences until the host sandbox issue is resolved externally.

## Memory Update

The implementation notes link this recurrence to the existing durable tooling issue; no duplicate known-issue row is needed.

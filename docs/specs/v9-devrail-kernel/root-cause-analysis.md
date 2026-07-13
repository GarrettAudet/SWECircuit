# Root-Cause Analysis

Use this file when a failure required diagnosis or when a fix should teach future work.

## Status

Complete.

## Trigger

The required patch helper failed before creating the V9 intake artifacts.

## Reproduction

Use the exact helper invocation and absence checks recorded in debug-notes.md.

## Confirmed Root Cause

The Windows workspace patch-helper sandbox refresh failed before file access. The error signature and zero-write state match the V8.1 known issue.

## Why It Was Missed

The issue was not considered resolved; V8.1 explicitly retained it as a tool limitation. The normal edit policy still requires trying the patch helper first, so V9 reproduced the failure immediately.

## Fix

Use the repository-authorized bounded PowerShell write fallback only for the intended workspace files, then require diff review, positive validation, and regression validation.

## Regression Coverage

The repository checker and its fifteen-case regression suite validate the recovered artifacts. A platform-level patch-helper regression cannot be added inside this repository.

## Follow-Up Work

Keep the external patch-helper issue in failed attempts until the environment changes. Do not generalize direct-write fallback beyond the workspace and intended files.

## Memory Update

The existing failed-attempt and recovery-pattern entries remain authoritative. V9 implementation notes link this recurrence to the source evidence.

## T006 Parser And Validator Boundary RCA

### Trigger

The first schema-valid multi-artifact project caused an unexpected exception during Ajv uniqueItems validation.

### Confirmed Root Cause

jsonc-parser getNodeValue intentionally creates null-prototype objects. Ajv 8.20.0 delegates object equality for uniqueItems to a comparator that calls valueOf, which those objects do not have.

### Why It Was Missed

The toolchain probe proved imports, duplicate-key visibility, and isolated Ajv validation, but it did not pass getNodeValue output containing object arrays through an Ajv schema with uniqueItems.

### Fix

Keep jsonc-parser as the duplicate-aware structural parser, then use the native strict JSON.parse result after all parser-tree checks pass. Inputs remain capped at 1 MiB, so the second bounded parse does not create an unbounded resource path.

### Regression Coverage

The complete parallel-project fixture contains object arrays across modules, work packets, routes, joins, and fan-outs. It must validate without throwing, and all expected user-input failures must continue to return structured results.

### Follow-Up Work

Add parser-to-consumer compatibility to future dependency spikes whenever a library returns nonstandard object prototypes.

### Memory Update

Promote the parser-boundary lesson to implementation notes now and to durable patterns when T006 passes independent review.

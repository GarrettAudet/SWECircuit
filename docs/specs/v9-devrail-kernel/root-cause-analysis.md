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
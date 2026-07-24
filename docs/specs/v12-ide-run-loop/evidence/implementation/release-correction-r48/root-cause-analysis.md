# Revision 48 Root Cause Analysis

## Reproduction

Run the only canonical gate for exact Revision 47 commit `5efa889e5db5906108d44d51d58bc0817ebd9c7a`.

## Stable Evidence

- Receipt result: `fail`; exit code: 1.
- Candidate source, materialization, disposable Git context, live repository, toolchain, and host dependency closure remained exact.
- TypeScript emitted `TS2688: Cannot find type definition file for 'node'`.
- Candidate source contained no `node_modules`.

## Confirmed Cause

Executable discovery and module resolution are different authorities. PATH and an external compiler allow a process to start, but TypeScript and Node ESM resolve project dependencies from the candidate package ancestry. The exact materialization had no private dependency tree.

## Rejected Fix

A copied host `node_modules` mirror was drafted but rejected before commit or testing because it would preserve host-install provenance instead of deriving supply from the candidate's authenticated lock.

## Causal Fix

Provision the exact lock offline with scripts disabled inside the materialized candidate. Validate installed versions and direct-dependency containment, bind the raw install evidence and complete closure before and after verification, then remove the closure before exact source reconstruction.
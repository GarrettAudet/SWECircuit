import { types as utilTypes } from "node:util";
import { LIMITS } from "./constants.js";
import type { JsonObject, JsonValue } from "./model.js";

export type SnapshotFailure = "depth" | "invalid" | "nodes";

export interface JsonSnapshotResult {
  readonly failure: SnapshotFailure | null;
  readonly value: JsonValue | null;
}

interface SnapshotState {
  nodes: number;
  readonly seen: WeakSet<object>;
}

function fail(failure: SnapshotFailure): JsonSnapshotResult {
  return Object.freeze({ failure, value: null });
}

function ownKeys(value: object): readonly PropertyKey[] | null {
  try {
    return Reflect.ownKeys(value);
  } catch {
    return null;
  }
}

function prototypeOf(value: object): object | null | undefined {
  try {
    return Object.getPrototypeOf(value) as object | null;
  } catch {
    return undefined;
  }
}

function arrayValue(value: object): boolean | null {
  try {
    return Array.isArray(value);
  } catch {
    return null;
  }
}

function propertyDescriptor(
  value: object,
  key: PropertyKey,
): PropertyDescriptor | null | undefined {
  try {
    return Object.getOwnPropertyDescriptor(value, key);
  } catch {
    return null;
  }
}

function visit(value: unknown, depth: number, state: SnapshotState): JsonSnapshotResult {
  state.nodes += 1;
  if (state.nodes > LIMITS.executionSnapshotNodes) {
    return fail("nodes");
  }
  if (depth > LIMITS.jsonDepth) {
    return fail("depth");
  }
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return Object.freeze({ failure: null, value });
  }
  if (typeof value === "number") {
    return !Number.isFinite(value) || (Number.isInteger(value) && !Number.isSafeInteger(value))
      ? fail("invalid")
      : Object.freeze({ failure: null, value });
  }
  if (typeof value !== "object" || utilTypes.isProxy(value)) {
    return fail("invalid");
  }
  if (state.seen.has(value)) {
    return fail("invalid");
  }
  state.seen.add(value);

  const array = arrayValue(value);
  if (array === null) {
    state.seen.delete(value);
    return fail("invalid");
  }
  const result = array
    ? visitArray(value as readonly unknown[], depth, state)
    : visitObject(value, depth, state);
  state.seen.delete(value);
  return result;
}

function visitArray(
  value: readonly unknown[],
  depth: number,
  state: SnapshotState,
): JsonSnapshotResult {
  if (prototypeOf(value) !== Array.prototype) {
    return fail("invalid");
  }
  const lengthDescriptor = propertyDescriptor(value, "length");
  if (
    lengthDescriptor === null ||
    lengthDescriptor === undefined ||
    lengthDescriptor.enumerable ||
    !("value" in lengthDescriptor) ||
    !Number.isSafeInteger(lengthDescriptor.value) ||
    (lengthDescriptor.value as number) < 0
  ) {
    return fail("invalid");
  }
  const length = lengthDescriptor.value as number;
  if (length > LIMITS.executionSnapshotNodes - state.nodes) {
    return fail("nodes");
  }

  const keys = ownKeys(value);
  if (keys === null || keys.length !== length + 1 || keys.some((key) => typeof key !== "string")) {
    return fail("invalid");
  }

  const copy: JsonValue[] = [];
  for (let index = 0; index < length; index += 1) {
    const descriptor = propertyDescriptor(value, String(index));
    if (
      descriptor === null ||
      descriptor === undefined ||
      !descriptor.enumerable ||
      !("value" in descriptor)
    ) {
      return fail("invalid");
    }
    const child = visit(descriptor.value, depth + 1, state);
    if (child.value === null && child.failure !== null) {
      return child;
    }
    copy.push(child.value as JsonValue);
  }
  return Object.freeze({ failure: null, value: Object.freeze(copy) as unknown as JsonValue[] });
}
function visitObject(value: object, depth: number, state: SnapshotState): JsonSnapshotResult {
  const prototype = prototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    return fail("invalid");
  }
  const keys = ownKeys(value);
  if (keys === null || keys.some((key) => typeof key !== "string")) {
    return fail("invalid");
  }
  if (keys.length > LIMITS.executionSnapshotNodes - state.nodes) {
    return fail("nodes");
  }

  const copy: Record<string, JsonValue> = {};
  for (const key of keys as readonly string[]) {
    const descriptor = propertyDescriptor(value, key);
    if (
      descriptor === null ||
      descriptor === undefined ||
      !descriptor.enumerable ||
      !("value" in descriptor)
    ) {
      return fail("invalid");
    }
    const child = visit(descriptor.value, depth + 1, state);
    if (child.value === null && child.failure !== null) {
      return child;
    }
    Object.defineProperty(copy, key, {
      configurable: false,
      enumerable: true,
      value: child.value,
      writable: false,
    });
  }
  return Object.freeze({ failure: null, value: Object.freeze(copy) as JsonObject });
}

export function snapshotJsonValue(value: unknown): JsonSnapshotResult {
  return visit(value, 0, { nodes: 0, seen: new WeakSet<object>() });
}

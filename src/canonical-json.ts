import { createHash } from "node:crypto";
import type { JsonObject, JsonValue } from "./model.js";

const encoder = new TextEncoder();

interface ByteCounter {
  bytes: number;
  readonly limit: number;
}

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function assertUnicodeScalarString(value: string): void {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) {
        throw new TypeError("Canonical JSON rejects lone UTF-16 surrogates.");
      }
      index += 1;
      continue;
    }
    if (code >= 0xdc00 && code <= 0xdfff) {
      throw new TypeError("Canonical JSON rejects lone UTF-16 surrogates.");
    }
  }
}

function assertByteLimit(limit: number): void {
  if (!Number.isSafeInteger(limit) || limit < 0) {
    throw new RangeError("Byte measurement requires a non-negative safe-integer limit.");
  }
}

function addBytes(counter: ByteCounter, bytes: number): boolean {
  if (bytes > counter.limit - counter.bytes) {
    return false;
  }
  counter.bytes += bytes;
  return true;
}

function measureUtf8String(value: string, counter: ByteCounter): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    let bytes: number;
    if (code <= 0x7f) {
      bytes = 1;
    } else if (code <= 0x7ff) {
      bytes = 2;
    } else if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        bytes = 4;
        index += 1;
      } else {
        bytes = 3;
      }
    } else {
      bytes = 3;
    }
    if (!addBytes(counter, bytes)) {
      return false;
    }
  }
  return true;
}

function measureJsonString(value: string, counter: ByteCounter): boolean {
  if (!addBytes(counter, 1)) {
    return false;
  }
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    let bytes: number;
    if (code === 0x22 || code === 0x5c) {
      bytes = 2;
    } else if (code <= 0x1f) {
      bytes =
        code === 0x08 || code === 0x09 || code === 0x0a || code === 0x0c || code === 0x0d ? 2 : 6;
    } else if (code <= 0x7f) {
      bytes = 1;
    } else if (code <= 0x7ff) {
      bytes = 2;
    } else if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (next >= 0xdc00 && next <= 0xdfff) {
        bytes = 4;
        index += 1;
      } else {
        bytes = 6;
      }
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      bytes = 6;
    } else {
      bytes = 3;
    }
    if (!addBytes(counter, bytes)) {
      return false;
    }
  }
  return addBytes(counter, 1);
}

function addJsonIndent(counter: ByteCounter, depth: number, indentation: number): boolean {
  return addBytes(counter, 1 + depth * indentation);
}

function measureJsonValue(
  value: JsonValue,
  depth: number,
  indentation: number,
  counter: ByteCounter,
): boolean {
  if (value === null) {
    return addBytes(counter, 4);
  }
  if (typeof value === "boolean") {
    return addBytes(counter, value ? 4 : 5);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError("Canonical JSON requires finite numbers.");
    }
    const rendered = Object.is(value, -0) ? "0" : String(value);
    return addBytes(counter, rendered.length);
  }
  if (typeof value === "string") {
    return measureJsonString(value, counter);
  }
  if (Array.isArray(value)) {
    if (!addBytes(counter, 1)) {
      return false;
    }
    for (const [index, entry] of value.entries()) {
      if (
        (index > 0 && !addBytes(counter, 1)) ||
        (indentation > 0 && !addJsonIndent(counter, depth + 1, indentation)) ||
        !measureJsonValue(entry, depth + 1, indentation, counter)
      ) {
        return false;
      }
    }
    if (value.length > 0 && indentation > 0 && !addJsonIndent(counter, depth, indentation)) {
      return false;
    }
    return addBytes(counter, 1);
  }

  const object = value as JsonObject;
  const keys = Object.keys(object);
  if (!addBytes(counter, 1)) {
    return false;
  }
  for (const [index, key] of keys.entries()) {
    if (
      (index > 0 && !addBytes(counter, 1)) ||
      (indentation > 0 && !addJsonIndent(counter, depth + 1, indentation)) ||
      !measureJsonString(key, counter) ||
      !addBytes(counter, indentation > 0 ? 2 : 1) ||
      !measureJsonValue(object[key] as JsonValue, depth + 1, indentation, counter)
    ) {
      return false;
    }
  }
  if (keys.length > 0 && indentation > 0 && !addJsonIndent(counter, depth, indentation)) {
    return false;
  }
  return addBytes(counter, 1);
}

export function boundedUtf8ByteLength(value: string, limit: number): number | null {
  assertByteLimit(limit);
  const counter: ByteCounter = { bytes: 0, limit };
  return measureUtf8String(value, counter) ? counter.bytes : null;
}

export function boundedJsonUtf8ByteLength(
  value: JsonValue,
  limit: number,
  indentation = 0,
): number | null {
  assertByteLimit(limit);
  if (!Number.isSafeInteger(indentation) || indentation < 0 || indentation > 10) {
    throw new RangeError("JSON indentation must be a safe integer from zero through ten.");
  }
  const counter: ByteCounter = { bytes: 0, limit };
  return measureJsonValue(value, 0, indentation, counter) ? counter.bytes : null;
}

function serialize(value: JsonValue): string {
  if (value === null) {
    return "null";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new TypeError("Canonical JSON requires finite numbers.");
    }
    return JSON.stringify(value);
  }
  if (typeof value === "string") {
    assertUnicodeScalarString(value);
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => serialize(entry)).join(",")}]`;
  }

  const object = value as JsonObject;
  const entries = Object.keys(object)
    .sort(compareText)
    .map((key) => {
      assertUnicodeScalarString(key);
      return `${JSON.stringify(key)}:${serialize(object[key] as JsonValue)}`;
    });
  return `{${entries.join(",")}}`;
}

function lengthPrefix(length: number): Uint8Array {
  if (!Number.isSafeInteger(length) || length < 0 || length > 0xffff_ffff) {
    throw new RangeError("Digest frame length exceeds the supported domain.");
  }
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, length, false);
  return bytes;
}

export function canonicalJson(value: JsonValue): string {
  return serialize(value);
}

export function digestBytes(domain: string, bytes: Uint8Array): string {
  assertUnicodeScalarString(domain);
  const domainBytes = encoder.encode(domain);
  const hash = createHash("sha256");
  hash.update("SWECIRCUIT\0SPECIALIST\0V1\0", "ascii");
  hash.update(lengthPrefix(domainBytes.byteLength));
  hash.update(domainBytes);
  hash.update(lengthPrefix(bytes.byteLength));
  hash.update(bytes);
  return `sha256:${hash.digest("hex")}`;
}

export function digestCanonicalJson(domain: string, value: JsonValue): string {
  return digestBytes(domain, encoder.encode(canonicalJson(value)));
}

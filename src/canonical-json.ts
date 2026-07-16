import { createHash } from "node:crypto";
import type { JsonObject, JsonValue } from "./model.js";

const encoder = new TextEncoder();

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

import { getNodePath, parseTree, type Node, type ParseError } from "jsonc-parser";
import { LIMITS } from "./constants.js";
import { appendJsonPointer, createDiagnostic, type DiagnosticCode } from "./diagnostics.js";
import type { JsonValue } from "./model.js";
import type { Diagnostic } from "./types.js";

export interface ParsedJson {
  readonly value: JsonValue | null;
  readonly diagnostics: readonly Diagnostic[];
}

function pointerForNode(node: Node): string {
  let pointer = "";
  for (const segment of getNodePath(node)) {
    pointer = appendJsonPointer(pointer, segment);
  }
  return pointer;
}

function inspectTree(root: Node, artifact: string): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const rootDepth = root.type === "object" || root.type === "array" ? 1 : 0;
  const stack: Array<readonly [Node, number]> = [[root, rootDepth]];

  while (stack.length > 0) {
    const item = stack.pop();
    if (item === undefined) {
      continue;
    }
    const [node, depth] = item;
    if (depth > LIMITS.jsonDepth) {
      diagnostics.push(createDiagnostic("SC5002", artifact));
      break;
    }
    if (node.type === "number") {
      const value = node.value;
      if (
        typeof value !== "number" ||
        !Number.isFinite(value) ||
        (Number.isInteger(value) && !Number.isSafeInteger(value))
      ) {
        diagnostics.push(createDiagnostic("SC1104", artifact, pointerForNode(node)));
      }
      continue;
    }
    if (node.type === "object") {
      const seen = new Set<string>();
      const values: Node[] = [];
      for (const property of node.children ?? []) {
        const keyNode = property.children?.[0];
        const valueNode = property.children?.[1];
        if (typeof keyNode?.value === "string") {
          if (seen.has(keyNode.value)) {
            const containingObject = property.parent;
            diagnostics.push(
              createDiagnostic(
                "SC1103",
                artifact,
                containingObject === undefined ? "" : pointerForNode(containingObject),
              ),
            );
          } else {
            seen.add(keyNode.value);
          }
        }
        if (valueNode !== undefined) {
          values.push(valueNode);
        }
      }
      for (const valueNode of values.reverse()) {
        const childDepth =
          valueNode.type === "object" || valueNode.type === "array" ? depth + 1 : depth;
        stack.push([valueNode, childDepth]);
      }
      continue;
    }
    if (node.type === "array") {
      for (const child of [...(node.children ?? [])].reverse()) {
        const childDepth = child.type === "object" || child.type === "array" ? depth + 1 : depth;
        stack.push([child, childDepth]);
      }
    }
  }
  return Object.freeze(diagnostics);
}

function syntaxDiagnostic(artifact: string, _errors: readonly ParseError[]): Diagnostic {
  return createDiagnostic("SC1102", artifact);
}

export function parseJsonBuffer(
  bytes: Uint8Array,
  artifact: string,
  byteLimit = LIMITS.artifactBytes,
): ParsedJson {
  if (bytes.byteLength > byteLimit) {
    return Object.freeze({
      value: null,
      diagnostics: Object.freeze([createDiagnostic("SC5001", artifact)]),
    });
  }

  let text: string;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return Object.freeze({
      value: null,
      diagnostics: Object.freeze([createDiagnostic("SC1101", artifact)]),
    });
  }

  const parseErrors: ParseError[] = [];
  let tree: Node | undefined;
  try {
    tree = parseTree(text, parseErrors, {
      allowEmptyContent: false,
      allowTrailingComma: false,
      disallowComments: true,
    });
  } catch {
    return Object.freeze({
      value: null,
      diagnostics: Object.freeze([createDiagnostic("SC5002", artifact)]),
    });
  }
  if (tree === undefined || parseErrors.length > 0) {
    return Object.freeze({
      value: null,
      diagnostics: Object.freeze([syntaxDiagnostic(artifact, parseErrors)]),
    });
  }

  const diagnostics = inspectTree(tree, artifact);
  if (diagnostics.some((diagnostic) => diagnostic.severity === "error")) {
    return Object.freeze({ value: null, diagnostics });
  }
  let value: JsonValue;
  try {
    value = JSON.parse(text) as JsonValue;
  } catch {
    return Object.freeze({
      value: null,
      diagnostics: Object.freeze([createDiagnostic("SC1102", artifact)]),
    });
  }
  return Object.freeze({
    value,
    diagnostics,
  });
}

export function hasParsingErrors(parsed: ParsedJson): boolean {
  return parsed.diagnostics.some((diagnostic) => diagnostic.severity === "error");
}

export type ParsingDiagnosticCode = Extract<
  DiagnosticCode,
  "SC1101" | "SC1102" | "SC1103" | "SC1104" | "SC5001" | "SC5002"
>;

export const COMMON_SCHEMA_SOURCE = String.raw`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/common.schema.json",
  "title": "SWECircuit v1alpha1 Common Definitions",
  "description": "Package-owned definitions shared by SWECircuit v1alpha1 artifacts.",
  "$defs": {
    "apiVersion": {
      "const": "swecircuit/v1alpha1"
    },
    "identifier": {
      "type": "string",
      "minLength": 1,
      "maxLength": 128,
      "pattern": "^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$"
    },
    "artifactVersion": {
      "type": "string",
      "minLength": 5,
      "maxLength": 64,
      "pattern": "^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(?:-[0-9A-Za-z.-]+)?$"
    },
    "timestamp": {
      "type": "string",
      "maxLength": 64,
      "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(?:\\.[0-9]+)?(?:Z|[+-][0-9]{2}:[0-9]{2})$"
    },
    "relativePath": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1024,
      "pattern": "^(?!/)(?!.*//)(?!.*(?:^|/)\\.\\.(?:/|$))[A-Za-z0-9._*?/-]+$"
    },
    "workflowOutcome": {
      "enum": ["pass", "fix", "diagnose", "clarify", "redesign", "split", "block", "learn"]
    },
    "nonPassOutcome": {
      "enum": ["fix", "diagnose", "clarify", "redesign", "split", "block", "learn"]
    },
    "executionState": {
      "enum": [
        "queued",
        "running",
        "input_required",
        "completed",
        "failed",
        "cancelled",
        "timed_out"
      ]
    },
    "governanceState": {
      "enum": ["accepted", "optional", "watch", "deferred", "rejected"]
    },
    "workflowStage": {
      "enum": [
        "intake",
        "clarify",
        "spec",
        "architecture_check",
        "task_plan",
        "implement",
        "verify",
        "review",
        "memory_update",
        "merge"
      ]
    },
    "artifactKind": {
      "enum": ["Project", "Module", "Circuit", "WorkPacket", "RunEvent", "AdapterManifest"]
    },
    "artifactType": {
      "enum": [
        "Goal",
        "ContextBundle",
        "Assumption",
        "Spec",
        "ArchitectureDecision",
        "TaskPlan",
        "WorkPacket",
        "Change",
        "TestResult",
        "DebugRecord",
        "RootCauseAnalysis",
        "Review",
        "Milestone",
        "MemoryEntry",
        "RetrievalPointer",
        "RunTrace"
      ]
    },
    "artifactPort": {
      "type": "object",
      "additionalProperties": false,
      "required": ["name", "artifactType", "required"],
      "properties": {
        "name": {
          "$ref": "#/$defs/identifier"
        },
        "artifactType": {
          "$ref": "#/$defs/artifactType"
        },
        "required": {
          "type": "boolean"
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 512
        }
      }
    },
    "evidenceRef": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "kind", "ref"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "kind": {
          "enum": [
            "artifact",
            "command",
            "test",
            "review",
            "decision",
            "commit",
            "digest",
            "handoff",
            "memory"
          ]
        },
        "ref": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1286
        },
        "digest": {
          "type": "string",
          "pattern": "^sha256:[0-9a-f]{64}$"
        },
        "immutable": {
          "type": "boolean"
        }
      },
      "allOf": [
        {
          "if": {
            "required": ["kind"],
            "properties": {
              "kind": {
                "enum": ["artifact", "review", "decision", "handoff", "memory"]
              }
            }
          },
          "then": {
            "properties": {
              "ref": {
                "pattern": "^path:(?=[^#]{1,1024}(?:#|$))(?!\\.{1,2}(?:/|#|$))(?![^#]*/\\.{1,2}(?:/|#|$))[A-Za-z0-9._-]+(?:/[A-Za-z0-9._-]+)*(?:#[A-Za-z0-9][A-Za-z0-9._~/-]{0,255})?$",
                "type": "string"
              }
            }
          }
        },
        {
          "if": {
            "required": ["kind"],
            "properties": {
              "kind": {
                "const": "command"
              }
            }
          },
          "then": {
            "properties": {
              "ref": {
                "maxLength": 136,
                "pattern": "^command:[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$",
                "type": "string"
              }
            }
          }
        },
        {
          "if": {
            "required": ["kind"],
            "properties": {
              "kind": {
                "const": "test"
              }
            }
          },
          "then": {
            "properties": {
              "ref": {
                "maxLength": 133,
                "pattern": "^test:[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$",
                "type": "string"
              }
            }
          }
        },
        {
          "if": {
            "required": ["kind"],
            "properties": {
              "kind": {
                "const": "commit"
              }
            }
          },
          "then": {
            "properties": {
              "ref": {
                "pattern": "^git:[0-9a-f]{7,64}$",
                "type": "string"
              }
            }
          }
        },
        {
          "if": {
            "required": ["kind"],
            "properties": {
              "kind": {
                "const": "digest"
              }
            }
          },
          "then": {
            "properties": {
              "ref": {
                "pattern": "^sha256:[0-9a-f]{64}$",
                "type": "string"
              }
            }
          }
        }
      ]
    },
    "evidenceRequirement": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "kind", "description", "required"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "kind": {
          "enum": ["artifact", "command", "test", "review", "decision", "handoff", "memory"]
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1024
        },
        "required": {
          "type": "boolean"
        }
      }
    },
    "action": {
      "type": "object",
      "additionalProperties": false,
      "required": ["type", "description"],
      "properties": {
        "type": {
          "enum": ["transform", "decide", "retrieve", "execute", "verify", "synthesize", "record"]
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048
        }
      }
    },
    "gate": {
      "type": "object",
      "additionalProperties": false,
      "required": ["condition", "evidence", "failureOutcomes"],
      "properties": {
        "condition": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048
        },
        "evidence": {
          "type": "array",
          "minItems": 1,
          "maxItems": 64,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/identifier"
          }
        },
        "failureOutcomes": {
          "type": "array",
          "minItems": 1,
          "maxItems": 7,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/nonPassOutcome"
          }
        }
      }
    },
    "permissionRequest": {
      "type": "object",
      "additionalProperties": false,
      "required": ["kind", "scopes"],
      "properties": {
        "kind": {
          "enum": [
            "filesystem.read",
            "filesystem.write",
            "network.connect",
            "process.spawn",
            "secrets.read"
          ]
        },
        "scopes": {
          "type": "array",
          "minItems": 1,
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 512
          }
        },
        "reason": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1024
        }
      }
    },
    "authority": {
      "type": "object",
      "additionalProperties": false,
      "required": ["allowedActions", "disallowedActions", "permissionCeiling"],
      "properties": {
        "allowedActions": {
          "type": "array",
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 512
          }
        },
        "disallowedActions": {
          "type": "array",
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "type": "string",
            "minLength": 1,
            "maxLength": 512
          }
        },
        "permissionCeiling": {
          "type": "array",
          "maxItems": 64,
          "items": {
            "$ref": "#/$defs/permissionRequest"
          }
        }
      }
    },
    "compatibility": {
      "type": "object",
      "additionalProperties": false,
      "required": ["apiVersions"],
      "properties": {
        "apiVersions": {
          "type": "array",
          "minItems": 1,
          "maxItems": 8,
          "uniqueItems": true,
          "items": {
            "const": "swecircuit/v1alpha1"
          }
        }
      }
    },
    "identity": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1024
        }
      }
    },
    "versionedIdentity": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "version"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "version": {
          "$ref": "#/$defs/artifactVersion"
        },
        "description": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1024
        }
      }
    },
    "artifactTransfer": {
      "type": "object",
      "additionalProperties": false,
      "required": ["output", "input"],
      "properties": {
        "output": {
          "$ref": "#/$defs/identifier"
        },
        "input": {
          "$ref": "#/$defs/identifier"
        }
      }
    }
  }
}
`;

export const SPECIALIST_COMPILER_SCHEMA_SOURCE = String.raw`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-compiler.schema.json",
  "title": "SWECircuit Specialist Compiler v1alpha1 Inputs",
  "description": "Closed provider-neutral GoalContract and SpecialistCompilationRequest inputs.",
  "oneOf": [
    {
      "$ref": "#/$defs/goalContract"
    },
    {
      "$ref": "#/$defs/compilationRequest"
    }
  ],
  "$defs": {
    "identifier": {
      "$ref": "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/common.schema.json#/$defs/identifier"
    },
    "text": {
      "type": "string",
      "minLength": 1,
      "maxLength": 16384
    },
    "shortText": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1024
    },
    "digest": {
      "type": "string",
      "pattern": "^sha256:[0-9a-f]{64}$"
    },
    "scopeKey": {
      "type": "string",
      "minLength": 1,
      "maxLength": 512
    },
    "identifierSet": {
      "type": "array",
      "maxItems": 256,
      "uniqueItems": true,
      "items": {
        "$ref": "#/$defs/identifier"
      }
    },
    "scopeSet": {
      "type": "array",
      "maxItems": 256,
      "uniqueItems": true,
      "items": {
        "$ref": "#/$defs/scopeKey"
      }
    },
    "permission": {
      "type": "object",
      "additionalProperties": false,
      "required": ["kind", "scopes"],
      "properties": {
        "kind": {
          "enum": [
            "filesystem.read",
            "filesystem.write",
            "network.connect",
            "process.spawn",
            "secrets.read"
          ]
        },
        "scopes": {
          "$ref": "#/$defs/scopeSet"
        }
      }
    },
    "port": {
      "type": "object",
      "additionalProperties": false,
      "required": ["name", "artifactType"],
      "properties": {
        "name": {
          "$ref": "#/$defs/identifier"
        },
        "artifactType": {
          "type": "string",
          "minLength": 1,
          "maxLength": 128
        }
      }
    },
    "moduleBinding": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "action", "inputPorts", "outputPorts"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "action": {
          "$ref": "#/$defs/shortText"
        },
        "inputPorts": {
          "type": "array",
          "maxItems": 128,
          "items": {
            "$ref": "#/$defs/port"
          }
        },
        "outputPorts": {
          "type": "array",
          "maxItems": 128,
          "items": {
            "$ref": "#/$defs/port"
          }
        }
      }
    },
    "evidenceKind": {
      "enum": [
        "artifact",
        "command",
        "test",
        "review",
        "decision",
        "commit",
        "digest",
        "handoff",
        "memory"
      ]
    },
    "evidenceRequirement": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "kind", "duty", "description", "independentFromProducer"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "kind": {
          "$ref": "#/$defs/evidenceKind"
        },
        "duty": {
          "enum": ["produce", "verify", "review"]
        },
        "description": {
          "$ref": "#/$defs/shortText"
        },
        "independentFromProducer": {
          "type": "boolean"
        }
      }
    },
    "acceptanceCriterion": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "description", "evidenceRequirements"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "description": {
          "$ref": "#/$defs/text"
        },
        "evidenceRequirements": {
          "type": "array",
          "minItems": 1,
          "maxItems": 512,
          "items": {
            "$ref": "#/$defs/evidenceRequirement"
          }
        }
      }
    },
    "contextSourceBase": {
      "type": "object",
      "required": ["id", "kind", "locator", "digest", "bytes", "description", "allowedWorkUnits"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "kind": {
          "enum": ["repository", "documentation", "conversation", "memory", "evidence"]
        },
        "locator": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1286
        },
        "digest": {
          "$ref": "#/$defs/digest"
        },
        "bytes": {
          "type": "integer",
          "minimum": 0,
          "maximum": 67108864
        },
        "description": {
          "$ref": "#/$defs/shortText"
        },
        "allowedWorkUnits": {
          "$ref": "#/$defs/identifierSet"
        },
        "readScope": {
          "$ref": "#/$defs/scopeKey"
        }
      }
    },
    "contextSource": {
      "oneOf": [
        {
          "allOf": [
            {
              "$ref": "#/$defs/contextSourceBase"
            },
            {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "kind",
                "locator",
                "digest",
                "bytes",
                "description",
                "allowedWorkUnits",
                "readScope"
              ],
              "properties": {
                "id": true,
                "kind": {
                  "const": "repository"
                },
                "locator": true,
                "digest": true,
                "bytes": true,
                "description": true,
                "allowedWorkUnits": true,
                "readScope": true
              }
            }
          ]
        },
        {
          "allOf": [
            {
              "$ref": "#/$defs/contextSourceBase"
            },
            {
              "type": "object",
              "additionalProperties": false,
              "required": [
                "id",
                "kind",
                "locator",
                "digest",
                "bytes",
                "description",
                "allowedWorkUnits"
              ],
              "properties": {
                "id": true,
                "kind": {
                  "enum": ["documentation", "conversation", "memory", "evidence"]
                },
                "locator": true,
                "digest": true,
                "bytes": true,
                "description": true,
                "allowedWorkUnits": true
              }
            }
          ]
        }
      ]
    },
    "contextUse": {
      "type": "object",
      "additionalProperties": false,
      "required": ["sourceId", "purpose"],
      "properties": {
        "sourceId": {
          "$ref": "#/$defs/identifier"
        },
        "purpose": {
          "$ref": "#/$defs/shortText"
        }
      }
    },
    "scope": {
      "type": "object",
      "additionalProperties": false,
      "required": ["read", "write", "conflictZones"],
      "properties": {
        "read": {
          "$ref": "#/$defs/scopeSet"
        },
        "write": {
          "$ref": "#/$defs/scopeSet"
        },
        "conflictZones": {
          "$ref": "#/$defs/scopeSet"
        }
      }
    },
    "workUnit": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "id",
        "objective",
        "weight",
        "module",
        "dependencies",
        "requiredCapabilities",
        "contextUses",
        "scope",
        "permissions",
        "evidenceRequirementIds",
        "handoffArtifacts",
        "stopConditions"
      ],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "objective": {
          "$ref": "#/$defs/text"
        },
        "weight": {
          "type": "integer",
          "minimum": 1,
          "maximum": 1000000
        },
        "module": {
          "$ref": "#/$defs/moduleBinding"
        },
        "dependencies": {
          "$ref": "#/$defs/identifierSet"
        },
        "requiredCapabilities": {
          "type": "array",
          "minItems": 1,
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/identifier"
          }
        },
        "contextUses": {
          "type": "array",
          "minItems": 1,
          "maxItems": 256,
          "items": {
            "$ref": "#/$defs/contextUse"
          }
        },
        "scope": {
          "$ref": "#/$defs/scope"
        },
        "permissions": {
          "type": "array",
          "maxItems": 64,
          "items": {
            "$ref": "#/$defs/permission"
          }
        },
        "evidenceRequirementIds": {
          "type": "array",
          "minItems": 1,
          "maxItems": 512,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/identifier"
          }
        },
        "handoffArtifacts": {
          "type": "array",
          "minItems": 1,
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/identifier"
          }
        },
        "stopConditions": {
          "type": "array",
          "minItems": 1,
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/shortText"
          }
        }
      }
    },
    "authority": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "allowedModules",
        "allowedCapabilities",
        "permissionCeiling",
        "forbiddenEffects",
        "maxAgents",
        "maxConcurrency"
      ],
      "properties": {
        "allowedModules": {
          "type": "array",
          "minItems": 1,
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/identifier"
          }
        },
        "allowedCapabilities": {
          "type": "array",
          "minItems": 1,
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/identifier"
          }
        },
        "permissionCeiling": {
          "type": "array",
          "maxItems": 64,
          "items": {
            "$ref": "#/$defs/permission"
          }
        },
        "forbiddenEffects": {
          "type": "array",
          "minItems": 1,
          "maxItems": 128,
          "uniqueItems": true,
          "items": {
            "$ref": "#/$defs/shortText"
          }
        },
        "maxAgents": {
          "type": "integer",
          "minimum": 1,
          "maximum": 16
        },
        "maxConcurrency": {
          "type": "integer",
          "minimum": 1,
          "maximum": 16
        }
      }
    },
    "optimization": {
      "type": "object",
      "additionalProperties": false,
      "required": ["agentStartupCost", "handoffCost"],
      "properties": {
        "agentStartupCost": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000
        },
        "handoffCost": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000
        }
      }
    },
    "assumption": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "statement", "rationale"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "statement": {
          "$ref": "#/$defs/shortText"
        },
        "rationale": {
          "$ref": "#/$defs/shortText"
        }
      }
    },
    "unresolvedDecision": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "question", "owner", "blocking", "proceedRationale"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "question": {
          "$ref": "#/$defs/shortText"
        },
        "owner": {
          "$ref": "#/$defs/identifier"
        },
        "blocking": {
          "type": "boolean"
        },
        "proceedRationale": {
          "$ref": "#/$defs/shortText"
        }
      }
    },
    "goalContract": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "apiVersion",
        "kind",
        "id",
        "revision",
        "objective",
        "integrationOwner",
        "assumptions",
        "unresolvedDecisions",
        "acceptanceCriteria",
        "contextSources",
        "authority",
        "optimization",
        "workUnits"
      ],
      "properties": {
        "apiVersion": {
          "const": "swecircuit/specialist/v1alpha1"
        },
        "kind": {
          "const": "GoalContract"
        },
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "revision": {
          "type": "integer",
          "minimum": 1,
          "maximum": 2147483647
        },
        "objective": {
          "$ref": "#/$defs/text"
        },
        "integrationOwner": {
          "$ref": "#/$defs/identifier"
        },
        "assumptions": {
          "type": "array",
          "maxItems": 128,
          "items": {
            "$ref": "#/$defs/assumption"
          }
        },
        "unresolvedDecisions": {
          "type": "array",
          "maxItems": 128,
          "items": {
            "$ref": "#/$defs/unresolvedDecision"
          }
        },
        "acceptanceCriteria": {
          "type": "array",
          "minItems": 1,
          "maxItems": 128,
          "items": {
            "$ref": "#/$defs/acceptanceCriterion"
          }
        },
        "contextSources": {
          "type": "array",
          "minItems": 1,
          "maxItems": 256,
          "items": {
            "$ref": "#/$defs/contextSource"
          }
        },
        "authority": {
          "$ref": "#/$defs/authority"
        },
        "optimization": {
          "$ref": "#/$defs/optimization"
        },
        "workUnits": {
          "type": "array",
          "minItems": 1,
          "maxItems": 64,
          "items": {
            "$ref": "#/$defs/workUnit"
          }
        }
      }
    },
    "candidateProposal": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "groups"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "groups": {
          "type": "array",
          "minItems": 1,
          "maxItems": 16,
          "items": {
            "type": "array",
            "minItems": 1,
            "maxItems": 64,
            "uniqueItems": true,
            "items": {
              "$ref": "#/$defs/identifier"
            }
          }
        }
      }
    },
    "compilationRequest": {
      "type": "object",
      "additionalProperties": false,
      "required": ["apiVersion", "kind", "goal"],
      "properties": {
        "apiVersion": {
          "const": "swecircuit/specialist/v1alpha1"
        },
        "kind": {
          "const": "SpecialistCompilationRequest"
        },
        "goal": {
          "$ref": "#/$defs/goalContract"
        },
        "proposedCandidates": {
          "type": "array",
          "maxItems": 32,
          "items": {
            "$ref": "#/$defs/candidateProposal"
          }
        }
      }
    }
  }
}
`;

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

export const SPECIALIST_HANDOFF_SCHEMA_SOURCE = String.raw`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/specialist-handoff.schema.json",
  "title": "SWECircuit Specialist Agent Handoff v1alpha1",
  "description": "Closed provider-neutral result envelope for one compiled specialist agent.",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "apiVersion",
    "kind",
    "outcome",
    "destination",
    "goal",
    "agent",
    "compilationDigest",
    "summary",
    "workUnitsCompleted",
    "artifacts",
    "evidence",
    "assumptions",
    "risks",
    "followUps"
  ],
  "properties": {
    "apiVersion": {
      "const": "swecircuit/specialist/v1alpha1"
    },
    "kind": {
      "const": "SpecialistAgentHandoff"
    },
    "outcome": {
      "$ref": "#/$defs/outcome"
    },
    "destination": {
      "$ref": "#/$defs/text"
    },
    "goal": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "revision", "digest"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "revision": {
          "type": "integer",
          "minimum": 1
        },
        "digest": {
          "$ref": "#/$defs/digest"
        }
      }
    },
    "agent": {
      "type": "object",
      "additionalProperties": false,
      "required": ["id", "blueprintDigest"],
      "properties": {
        "id": {
          "$ref": "#/$defs/identifier"
        },
        "blueprintDigest": {
          "$ref": "#/$defs/digest"
        }
      }
    },
    "compilationDigest": {
      "$ref": "#/$defs/digest"
    },
    "summary": {
      "$ref": "#/$defs/text"
    },
    "workUnitsCompleted": {
      "type": "array",
      "maxItems": 64,
      "uniqueItems": true,
      "items": {
        "$ref": "#/$defs/identifier"
      }
    },
    "artifacts": {
      "type": "array",
      "maxItems": 128,
      "items": {
        "$ref": "#/$defs/artifact"
      }
    },
    "evidence": {
      "type": "array",
      "maxItems": 512,
      "items": {
        "$ref": "#/$defs/evidence"
      }
    },
    "assumptions": {
      "$ref": "#/$defs/textSet"
    },
    "risks": {
      "$ref": "#/$defs/textSet"
    },
    "followUps": {
      "$ref": "#/$defs/textSet"
    }
  },
  "$defs": {
    "identifier": {
      "$ref": "https://github.com/GarrettAudet/SWECircuit/schemas/v1alpha1/common.schema.json#/$defs/identifier"
    },
    "digest": {
      "type": "string",
      "pattern": "^sha256:[0-9a-f]{64}$"
    },
    "text": {
      "type": "string",
      "minLength": 1,
      "maxLength": 16384
    },
    "mediaType": {
      "type": "string",
      "minLength": 3,
      "maxLength": 128,
      "pattern": "^[A-Za-z0-9!#$&^_.+-]+/[A-Za-z0-9!#$&^_.+-]+$"
    },
    "outcome": {
      "enum": ["pass", "fix", "diagnose", "clarify", "redesign", "split", "block", "learn"]
    },
    "textSet": {
      "type": "array",
      "maxItems": 256,
      "uniqueItems": true,
      "items": {
        "$ref": "#/$defs/text"
      }
    },
    "artifact": {
      "type": "object",
      "additionalProperties": false,
      "required": ["name", "mediaType", "content"],
      "properties": {
        "name": {
          "$ref": "#/$defs/text"
        },
        "mediaType": {
          "$ref": "#/$defs/mediaType"
        },
        "content": {
          "type": "string",
          "maxLength": 262144
        }
      }
    },
    "evidence": {
      "type": "object",
      "additionalProperties": false,
      "required": ["criterionId", "requirementId", "kind", "duty", "status", "artifact"],
      "properties": {
        "criterionId": {
          "$ref": "#/$defs/identifier"
        },
        "requirementId": {
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
        "duty": {
          "enum": ["produce", "verify", "review"]
        },
        "status": {
          "$ref": "#/$defs/outcome"
        },
        "artifact": {
          "$ref": "#/$defs/text"
        }
      }
    }
  }
}
`;

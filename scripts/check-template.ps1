[CmdletBinding()]
param(
    [string]$Root = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

$failures = New-Object System.Collections.Generic.List[string]

function Add-Failure {
    param([string]$Message)
    $failures.Add($Message) | Out-Null
}

function Read-Text {
    param([string]$Path)
    return Get-Content -LiteralPath $Path -Raw
}

function Test-FileExists {
    param([string]$RelativePath)
    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        Add-Failure "Missing required file: $RelativePath"
        return $false
    }
    return $true
}

function Test-HasHeadings {
    param(
        [string]$RelativePath,
        [string[]]$Headings
    )

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        Add-Failure "Missing file for heading check: $RelativePath"
        return
    }

    $text = Read-Text $path
    foreach ($heading in $Headings) {
        $escaped = [regex]::Escape($heading)
        if ($text -notmatch "(?m)^#{1,6}\s+(?:\d+\.\s+)?$escaped\s*$") {
            Add-Failure "Missing heading '$heading' in $RelativePath"
        }
    }
}

function Test-NoUnresolvedPlaceholders {
    param([string]$RelativePath)

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        return
    }

    $text = Read-Text $path
    $patterns = @(
        "\bTODO\b",
        "\bTBD\b",
        "\bFIXME\b",
        "\{\{[^}]+\}\}",
        "<[^>\r\n]+>"
    )

    foreach ($pattern in $patterns) {
        if ($text -match $pattern) {
            Add-Failure "Unresolved placeholder pattern '$pattern' in $RelativePath"
        }
    }
}

function Get-MarkdownSection {
    param(
        [string]$Text,
        [string]$Heading
    )

    $escaped = [regex]::Escape($Heading)
    $match = [regex]::Match($Text, "(?ms)^##\s+$escaped\s*(.*?)(?=^##\s+|\z)")
    if ($match.Success) {
        return $match.Groups[1].Value.Trim()
    }
    return ""
}

function Test-SectionContains {
    param(
        [string]$RelativePath,
        [string]$SectionName,
        [string[]]$RequiredTerms
    )

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        Add-Failure "Missing file for section conformance check: $RelativePath"
        return
    }

    $text = Read-Text $path
    $section = Get-MarkdownSection $text $SectionName
    if ([string]::IsNullOrWhiteSpace($section)) {
        Add-Failure "Missing or empty section '$SectionName' in $RelativePath"
        return
    }

    foreach ($term in $RequiredTerms) {
        if ($section -notmatch [regex]::Escape($term)) {
            Add-Failure "Section '$SectionName' in $RelativePath must include '$term'"
        }
    }
}

function Test-PackConformance {
    param([string]$RelativePath)

    Test-SectionContains $RelativePath "Status" @("Official")
    Test-SectionContains $RelativePath "Provides" @("| Type | Name | Path |", "Rail", "Module", "Template", "Example")
    Test-SectionContains $RelativePath "Requires" @("TraceRail version:", "Required files:", "Optional tools:")
    Test-SectionContains $RelativePath "Permissions" @("Filesystem read", "Filesystem write", "Network", "Secrets", "External service", "Data retention")
    Test-SectionContains $RelativePath "Contracts" @("Inputs:", "Actions:", "Outputs:", "Gates:", "Outcomes:", "Artifacts:", "Verification:", "Rollback:")
    Test-SectionContains $RelativePath "Verification" @("Conformance checks:", "Manual checks:", "Example run:")
    Test-SectionContains $RelativePath "Maintenance" @("Owner:", "Review cadence:", "Compatibility policy:")
    Test-SectionContains $RelativePath "Recommendation Evidence" @("Dogfooding history:", "Failure mode solved:", "Known risks:")
}

function Get-FeatureDirectories {
    $specRoot = Join-Path $Root "docs\specs"
    if (-not (Test-Path -LiteralPath $specRoot -PathType Container)) {
        return @()
    }

    return Get-ChildItem -LiteralPath $specRoot -Directory |
        Where-Object { $_.Name -ne "_template" }
}

function Test-FeaturePackage {
    param([System.IO.DirectoryInfo]$FeatureDir)

    $required = @(
        "spec.md",
        "plan.md",
        "tasks.md",
        "test-plan.md",
        "implementation-notes.md",
        "debug-notes.md",
        "root-cause-analysis.md",
        "review.md"
    )

    foreach ($file in $required) {
        $relative = "docs/specs/$($FeatureDir.Name)/$file"
        Test-FileExists $relative | Out-Null
        Test-NoUnresolvedPlaceholders $relative
    }

    $specPath = Join-Path $FeatureDir.FullName "spec.md"
    if (Test-Path -LiteralPath $specPath -PathType Leaf) {
        $spec = Read-Text $specPath
        if ($spec -notmatch "(?ms)^##\s+Acceptance Criteria\s*(.+?)(^##\s+|\z)") {
            Add-Failure "Missing Acceptance Criteria section in docs/specs/$($FeatureDir.Name)/spec.md"
        } else {
            $criteria = $matches[1]
            if ($criteria -notmatch "- \[[ xX]\]") {
                Add-Failure "Acceptance Criteria must contain checklist items in docs/specs/$($FeatureDir.Name)/spec.md"
            }
        }
    }

    $tasksPath = Join-Path $FeatureDir.FullName "tasks.md"
    if (Test-Path -LiteralPath $tasksPath -PathType Leaf) {
        $tasks = Read-Text $tasksPath
        if ($tasks -notmatch "Verification:") {
            Add-Failure "Tasks must include verification mapping in docs/specs/$($FeatureDir.Name)/tasks.md"
        }
    }

    $debugPath = Join-Path $FeatureDir.FullName "debug-notes.md"
    if (Test-Path -LiteralPath $debugPath -PathType Leaf) {
        $debug = Read-Text $debugPath
        $status = ""
        if ($debug -match "(?ms)^##\s+Status\s*(.+?)(^##\s+|\z)") {
            $status = $matches[1].Trim()
        }
        if ($status -notmatch "Not started|Not needed|Draft|Complete") {
            foreach ($heading in @("Reproduction", "Stable Evidence", "Failure Classification", "Hypotheses", "Experiments")) {
                if ($debug -notmatch "(?m)^##\s+$([regex]::Escape($heading))\s*$") {
                    Add-Failure "Debug notes missing $heading in docs/specs/$($FeatureDir.Name)/debug-notes.md"
                }
            }
        }
    }

    $rcaPath = Join-Path $FeatureDir.FullName "root-cause-analysis.md"
    if (Test-Path -LiteralPath $rcaPath -PathType Leaf) {
        $rca = Read-Text $rcaPath
        $status = ""
        if ($rca -match "(?ms)^##\s+Status\s*(.+?)(^##\s+|\z)") {
            $status = $matches[1].Trim()
        }
        if ($status -notmatch "Not started|Not needed") {
            foreach ($heading in @("Reproduction", "Confirmed Root Cause", "Fix", "Regression Coverage", "Memory Update")) {
                if ($rca -notmatch "(?m)^##\s+$([regex]::Escape($heading))\s*$") {
                    Add-Failure "RCA missing $heading in docs/specs/$($FeatureDir.Name)/root-cause-analysis.md"
                }
            }
        }
    }
}

$requiredFiles = @(
    "README.md",
    "AGENTS.md",
    "docs/ai/handbook.md",
    "docs/research/practice-register.md",
    "docs/research/snapshots/2026-07-08-ecosystem-scan.md",
    "docs/research/snapshots/2026-07-08-parallel-agent-and-memory-scan.md",
    "docs/research/snapshots/2026-07-08-modular-orchestration-scan.md",
    "docs/research/snapshots/2026-07-08-capability-adapter-scan.md",
    "docs/research/snapshots/2026-07-08-rail-composition-scan.md",
    "docs/milestones/README.md",
    "docs/milestones/_template.md",
    "docs/milestones/v1.md",
    "docs/milestones/v2.md",
    "docs/milestones/v3.md",
    "docs/milestones/v4.md",
    "docs/milestones/v5.md",
    "docs/ide/README.md",
    "docs/ide/_message-templates.md",
    "docs/agents/README.md",
    "docs/agents/_template.md",
    "docs/framework/README.md",
    "docs/framework/rail-composition.md",
    "docs/framework/_rail-template.md",
    "docs/framework/module-registry.md",
    "docs/framework/orchestration-patterns.md",
    "docs/framework/capability-adapters.md",
    "docs/framework/_module-template.md",
    "docs/framework/_decomposition-plan-template.md",
    "docs/framework/_adapter-evaluation-template.md",
    "docs/framework/_orchestration-run-template.md",
    "docs/rails/README.md",
    "docs/rails/feature-rail.md",
    "docs/rails/diagnosis-rail.md",
    "docs/rails/decomposition-rail.md",
    "docs/rails/adapter-rail.md",
    "docs/rails/release-rail.md",
    "docs/modules/README.md",
    "docs/modules/clarify.md",
    "docs/modules/spec.md",
    "docs/modules/plan.md",
    "docs/modules/implement.md",
    "docs/modules/verify.md",
    "docs/modules/review.md",
    "docs/modules/memory.md",
    "docs/modules/superpowers-transition.md",
    "docs/modules/astraeus-orchestration-compiler.md",
    "docs/modules/spec-kit-adapter.md",
    "docs/modules/retrieval-adapters.md",
    "docs/modules/memory-adapters.md",
    "docs/packs/README.md",
    "docs/packs/_pack-template.md",
    "docs/packs/pack-lifecycle.md",
    "docs/packs/conformance.md",
    "docs/packs/official/README.md",
    "docs/packs/official/tracepack-orchestration-readiness/README.md",
    "docs/packs/official/tracepack-orchestration-readiness/examples/three-agent-docs-run.md",
    "docs/specs/_template/spec.md",
    "docs/specs/_template/plan.md",
    "docs/specs/_template/tasks.md",
    "docs/specs/_template/test-plan.md",
    "docs/specs/_template/implementation-notes.md",
    "docs/specs/_template/debug-notes.md",
    "docs/specs/_template/root-cause-analysis.md",
    "docs/specs/_template/review.md",
    "docs/memory/active-context.md",
    "docs/memory/decisions.md",
    "docs/memory/known-issues.md",
    "docs/memory/failed-attempts.md",
    "docs/memory/patterns.md",
    "docs/memory/glossary.md",
    "docs/memory/history-ledger.md",
    "docs/memory/retrieval-index.md",
    ".github/pull_request_template.md"
)

foreach ($file in $requiredFiles) {
    Test-FileExists $file | Out-Null
}

Test-HasHeadings "README.md" @(
    "Why TraceRail Exists",
    "Core Idea",
    "What TraceRail Provides",
    "Quick Start",
    "When Work Gets Bigger",
    "Tool Adapters",
    "Repository Map",
    "Design Principles",
    "Current Status"
)
Test-HasHeadings "docs/ai/handbook.md" @(
    "Daily Quick Path",
    "Design Invariants",
    "State Machine",
    "Stage Contracts",
    "Clarification Policy",
    "Retrieval Policy",
    "Problem-Solving And Root-Cause Protocol",
    "Verification And Review Protocol",
    "Traceability And Memory Architecture",
    "Memory Protocol",
    "Version Dogfooding",
    "Desired Edit State",
    "Development Milestones",
    "Branch And Merge Workflow",
    "Parallel Agent Development",
    "Practice Intake And Tool Adoption",
    "Modular Orchestration Framework"
)


foreach ($milestone in @(
    "docs/milestones/_template.md",
    "docs/milestones/v1.md",
    "docs/milestones/v2.md",
    "docs/milestones/v3.md",
    "docs/milestones/v4.md",
    "docs/milestones/v5.md"
)) {
    Test-HasHeadings $milestone @(
        "Status",
        "Goal",
        "Shipped",
        "Why It Matters",
        "Source Artifacts",
        "Verification",
        "Approval Gate",
        "Residual Risks",
        "Next Recommended Work",
        "User-Facing Overview"
    )
}


Test-SectionContains "docs/milestones/v6.md" "Approval Gate" @("Source branch:", "Target branch:", "Current state:", "Required decision:", "Merge action after approval:")

Test-HasHeadings "docs/ide/README.md" @(
    "When To Use",
    "Start-Of-Work Banner",
    "Stage Updates",
    "Clarification Prompts",
    "Diagnosis Notices",
    "Verification Reports",
    "Completion Or Handoff",
    "Interaction Principles"
)

Test-HasHeadings "docs/ide/_message-templates.md" @(
    "Start Banner",
    "Stage Update",
    "Assumption Notice",
    "Clarification Request",
    "Diagnosis Notice",
    "Verification Report",
    "Completion Handoff"
)
Test-HasHeadings "docs/agents/README.md" @(
    "When To Use",
    "Relationship To Other Artifacts",
    "Independence Readiness",
    "End-To-End Loop",
    "Handoff Standard"
)



Test-HasHeadings "docs/framework/rail-composition.md" @(
    "Purpose",
    "Core Formula",
    "Module Interface",
    "Composition Rules",
    "Standard Rails",
    "Gates",
    "Artifacts",
    "Human-Visible Form",
    "Adapter Mapping",
    "Done Definition"
)

Test-HasHeadings "docs/framework/_rail-template.md" @(
    "Rail Name",
    "Status",
    "Purpose",
    "When To Use",
    "When Not To Use",
    "Composition",
    "Modules",
    "Artifacts",
    "Gates",
    "Branching Or Fan-Out",
    "Verification",
    "Review",
    "Memory Updates",
    "Example"
)
Test-HasHeadings "docs/framework/README.md" @(
    "Purpose",
    "Quick Path",
    "Framework Layers",
    "Rail Definition",
    "Module Definition",
    "Adapter Definition",
    "Default Modules",
    "Adoption Rule",
    "Done Definition"
)

Test-HasHeadings "docs/framework/module-registry.md" @(
    "Purpose",
    "Status Values",
    "Baseline Modules",
    "Optional Adapter Candidates",
    "Promotion Path",
    "Removal Path"
)


Test-HasHeadings "docs/framework/capability-adapters.md" @(
    "Purpose",
    "Capability Classes",
    "Skills-Driven Development Transition",
    "Orchestration Compiler",
    "Safety Defaults",
    "Adapter Mapping",
    "Promotion Path",
    "Review Questions"
)
Test-HasHeadings "docs/framework/orchestration-patterns.md" @(
    "Purpose",
    "Selection Rule",
    "Pattern Matrix",
    "Scale Rule",
    "Bug Cascade Rule",
    "Cost Rule"
)

Test-HasHeadings "docs/framework/_module-template.md" @(
    "Module Name",
    "Status",
    "Purpose",
    "When To Use",
    "When Not To Use",
    "Inputs",
    "Outputs",
    "Stage Hooks",
    "Context Bundle",
    "Verification",
    "Failure Modes",
    "Adapter Options",
    "Adoption Criteria",
    "Rollback",
    "Memory Updates"
)

Test-HasHeadings "docs/framework/_decomposition-plan-template.md" @(
    "Status",
    "Goal",
    "Source Artifacts",
    "Branch And State",
    "Module Selection",
    "Decomposition Summary",
    "Dependency Graph",
    "Work Units",
    "Fan-Out Plan",
    "Fan-In Plan",
    "Verification Matrix",
    "Stop Or Redesign Triggers",
    "Memory Updates"
)

Test-HasHeadings "docs/framework/_adapter-evaluation-template.md" @(
    "Status",
    "Adapter Name",
    "Problem Solved",
    "Current File-Based Alternative",
    "Source Snapshot",
    "Fit Assessment",
    "Adoption Scope",
    "Decision",
    "Rationale",
    "Pilot Plan",
    "Memory And Registry Updates"
)

Test-HasHeadings "docs/framework/_orchestration-run-template.md" @(
    "Status",
    "Goal",
    "Pattern Chosen",
    "Why This Pattern",
    "Source Artifacts",
    "Branch And State",
    "Roster",
    "Work-Unit Contract References",
    "Fan-Out Log",
    "Handoffs",
    "Integration Notes",
    "Verification",
    "Review",
    "Memory Updates",
    "Completion Handoff"
)
Test-HasHeadings "docs/agents/_template.md" @(
    "Goal",
    "Completion Evidence",
    "Non-Goals",
    "Agent Role",
    "Scope Boundary",
    "Authority And Permissions",
    "Context Bundle",
    "Independence Readiness",
    "Execution Loop",
    "Clarification And Stop Conditions",
    "Verification Plan",
    "Handoff",
    "Review Result",
    "Memory Updates"
)

foreach ($featureDir in Get-FeatureDirectories) {
    if ($featureDir.Name -match "^v(?<Version>\d+)-") {
        $version = $matches.Version
        $milestone = "docs/milestones/v$version.md"
        Test-FileExists $milestone | Out-Null
        Test-HasHeadings $milestone @(
            "Status",
            "Goal",
            "Shipped",
            "Why It Matters",
            "Source Artifacts",
            "Verification",
            "Approval Gate",
            "Residual Risks",
            "Next Recommended Work",
            "User-Facing Overview"
        )
    }
}

Test-HasHeadings "docs/rails/README.md" @(
    "Purpose",
    "Catalog",
    "Selection Rule",
    "Common Interface",
    "Extension Rule"
)

foreach ($railFile in @(
    "docs/rails/feature-rail.md",
    "docs/rails/diagnosis-rail.md",
    "docs/rails/decomposition-rail.md",
    "docs/rails/adapter-rail.md",
    "docs/rails/release-rail.md"
)) {
    Test-HasHeadings $railFile @(
        "Purpose",
        "Composition",
        "Modules",
        "Artifacts",
        "Stop Conditions"
    )
}

Test-HasHeadings "docs/modules/README.md" @(
    "Purpose",
    "Module Interface",
    "Catalog",
    "Promotion Rule"
)

foreach ($moduleFile in @(
    "docs/modules/clarify.md",
    "docs/modules/spec.md",
    "docs/modules/plan.md",
    "docs/modules/implement.md",
    "docs/modules/verify.md",
    "docs/modules/review.md",
    "docs/modules/memory.md",
    "docs/modules/superpowers-transition.md",
    "docs/modules/astraeus-orchestration-compiler.md",
    "docs/modules/spec-kit-adapter.md",
    "docs/modules/retrieval-adapters.md",
    "docs/modules/memory-adapters.md"
)) {
    Test-HasHeadings $moduleFile @(
        "Purpose",
        "Input",
        "Action",
        "Output",
        "Gate",
        "Outcome",
        "Artifacts",
        "Adapter"
    )
}

Test-HasHeadings "docs/packs/README.md" @(
    "Purpose",
    "Tiers",
    "Pack Rule",
    "Current Official Packs",
    "Suggested Official Packs",
    "Extension Path",
    "Local Overrides"
)

Test-HasHeadings "docs/packs/_pack-template.md" @(
    "Pack Name",
    "Status",
    "Purpose",
    "Provides",
    "Requires",
    "Permissions",
    "Contracts",
    "Installation",
    "Verification",
    "Maintenance",
    "Recommendation Evidence"
)

Test-HasHeadings "docs/packs/pack-lifecycle.md" @(
    "Purpose",
    "Lifecycle",
    "Promotion Criteria",
    "Demotion Criteria",
    "Recommendation Rule"
)

Test-HasHeadings "docs/packs/conformance.md" @(
    "Purpose",
    "Required Files",
    "Required Contract Fields",
    "Permission Review",
    "Verification Review",
    "Recommendation Checklist",
    "Non-Conformance"
)

Test-HasHeadings "docs/packs/official/README.md" @(
    "Purpose",
    "Current Official Packs",
    "Use Rule",
    "Promotion Rule"
)

Test-HasHeadings "docs/packs/official/tracepack-orchestration-readiness/README.md" @(
    "Pack Name",
    "Status",
    "Purpose",
    "Provides",
    "Requires",
    "Permissions",
    "Contracts",
    "Installation",
    "Verification",
    "Maintenance",
    "Recommendation Evidence"
)

Test-PackConformance "docs/packs/official/tracepack-orchestration-readiness/README.md"

Test-HasHeadings "docs/packs/official/tracepack-orchestration-readiness/examples/three-agent-docs-run.md" @(
    "Purpose",
    "Shared Goal",
    "Pattern",
    "Work Units",
    "Fan-Out",
    "Fan-In",
    "Verification",
    "Memory",
    "Stop Conditions"
)
Test-HasHeadings "docs/specs/_template/spec.md" @(
    "Problem",
    "Goals",
    "Non-Goals",
    "Requirements",
    "Acceptance Criteria",
    "Architecture Impact",
    "Open Questions",
    "Assumptions"
)

Test-HasHeadings "docs/specs/_template/tasks.md" @(
    "Task List",
    "Tasks",
    "Dependencies",
    "Out Of Scope"
)

Test-HasHeadings "docs/specs/_template/debug-notes.md" @(
    "Reproduction",
    "Stable Evidence",
    "Failure Classification",
    "Context Retrieved",
    "Hypotheses",
    "Experiments",
    "Current Status",
    "Next Action"
)

Test-HasHeadings "docs/specs/_template/root-cause-analysis.md" @(
    "Trigger",
    "Reproduction",
    "Confirmed Root Cause",
    "Why It Was Missed",
    "Fix",
    "Regression Coverage",
    "Memory Update"
)

$prTemplatePath = Join-Path $Root ".github\pull_request_template.md"
if (Test-Path -LiteralPath $prTemplatePath -PathType Leaf) {
    $pr = Read-Text $prTemplatePath
    foreach ($requiredPhrase in @("Feature Package", "Development Milestone", "Branch And Merge", "IDE Interaction", "Standalone Agent Work", "Framework Modules", "Rails affected", "Modules affected", "Packs affected", "Traceability", "Verification", "Diagnosis", "Parallel Work", "Architecture And Memory", "Review Outcome")) {
        if ($pr -notmatch [regex]::Escape($requiredPhrase)) {
            Add-Failure "PR template missing '$requiredPhrase'"
        }
    }
}

foreach ($featureDir in Get-FeatureDirectories) {
    Test-FeaturePackage $featureDir
}

if ($failures.Count -gt 0) {
    Write-Host "Template check failed:" -ForegroundColor Red
    foreach ($failure in $failures) {
        Write-Host " - $failure" -ForegroundColor Red
    }
    exit 1
}

Write-Host "Template check passed." -ForegroundColor Green

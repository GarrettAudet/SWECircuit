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
    "AGENTS.md",
    "docs/ai/handbook.md",
    "docs/research/practice-register.md",
    "docs/research/snapshots/2026-07-08-ecosystem-scan.md",
    "docs/research/snapshots/2026-07-08-parallel-agent-and-memory-scan.md",
    "docs/milestones/README.md",
    "docs/milestones/_template.md",
    "docs/milestones/v1.md",
    "docs/milestones/v2.md",
    "docs/milestones/v3.md",
    "docs/ide/README.md",
    "docs/ide/_message-templates.md",
    "docs/agents/README.md",
    "docs/agents/_template.md",
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
    "Practice Intake And Tool Adoption"
)


foreach ($milestone in @(
    "docs/milestones/_template.md",
    "docs/milestones/v1.md",
    "docs/milestones/v2.md",
    "docs/milestones/v3.md"
)) {
    Test-HasHeadings $milestone @(
        "Status",
        "Goal",
        "Shipped",
        "Why It Matters",
        "Source Artifacts",
        "Verification",
        "Residual Risks",
        "Next Recommended Work",
        "User-Facing Overview"
    )
}


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
            "Residual Risks",
            "Next Recommended Work",
            "User-Facing Overview"
        )
    }
}
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
    foreach ($requiredPhrase in @("Feature Package", "Development Milestone", "Branch And Merge", "IDE Interaction", "Standalone Agent Work", "Traceability", "Verification", "Diagnosis", "Parallel Work", "Architecture And Memory", "Review Outcome")) {
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












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

function Get-NormalizedStatus {
    param([string]$Text)

    $status = Get-MarkdownSection $Text "Status"
    if ([string]::IsNullOrWhiteSpace($status)) {
        return ""
    }

    $firstLine = @($status -split "\r?\n" | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })[0]
    return $firstLine.Trim().TrimEnd([char[]]".").Trim()
}

function ConvertTo-RepoRelativePath {
    param([string]$Path)

    $trimChars = [char[]]@('\', '/')
    $rootPrefix = [System.IO.Path]::GetFullPath($Root).TrimEnd($trimChars) + [System.IO.Path]::DirectorySeparatorChar
    $fullPath = [System.IO.Path]::GetFullPath($Path)
    if (-not $fullPath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Path is outside the repository root: $Path"
    }

    return $fullPath.Substring($rootPrefix.Length).Replace('\', '/')
}

function Get-MarkdownFiles {
    param([string]$RelativeDirectory)

    $directory = Join-Path $Root $RelativeDirectory
    if (-not (Test-Path -LiteralPath $directory -PathType Container)) {
        Add-Failure "Missing required directory: $RelativeDirectory"
        return @()
    }

    return @(Get-ChildItem -LiteralPath $directory -Recurse -File -Filter "*.md" |
        Where-Object { $_.Name -ne "README.md" } |
        Sort-Object FullName)
}

function Test-SectionsNonEmpty {
    param(
        [string]$RelativePath,
        [string[]]$SectionNames
    )

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        Add-Failure "Missing file for non-empty section check: $RelativePath"
        return
    }

    $text = Read-Text $path
    foreach ($sectionName in $SectionNames) {
        $section = Get-MarkdownSection $text $sectionName
        if ([string]::IsNullOrWhiteSpace($section)) {
            Add-Failure "Section '$sectionName' in $RelativePath must not be empty"
        }
    }
}

function Test-SectionTableColumns {
    param(
        [string]$RelativePath,
        [string]$SectionName,
        [string[]]$RequiredColumns
    )

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        Add-Failure "Missing file for table conformance check: $RelativePath"
        return
    }

    $section = Get-MarkdownSection (Read-Text $path) $SectionName
    if ([string]::IsNullOrWhiteSpace($section)) {
        Add-Failure "Missing or empty section '$SectionName' in $RelativePath"
        return
    }

    $lines = @($section -split "\r?\n")
    $headerColumns = $null
    $headerLineIndex = -1
    for ($i = 0; $i -lt ($lines.Count - 1); $i++) {
        $headerLine = $lines[$i].Trim()
        $separatorLine = $lines[$i + 1].Trim()
        if ($headerLine -notmatch '^\|.*\|$' -or $separatorLine -notmatch '^\|.*\|$') {
            continue
        }

        $separatorColumns = @($separatorLine.Trim('|') -split '\|' | ForEach-Object { $_.Trim() })
        $isSeparator = $separatorColumns.Count -gt 0
        foreach ($column in $separatorColumns) {
            if ($column -notmatch '^:?-{3,}:?$') {
                $isSeparator = $false
                break
            }
        }

        if ($isSeparator) {
            $headerColumns = @($headerLine.Trim('|') -split '\|' | ForEach-Object { $_.Trim() })
            $headerLineIndex = $i
            break
        }
    }

    if ($null -eq $headerColumns) {
        Add-Failure "Section '$SectionName' in $RelativePath must include a Markdown table"
        return
    }

    foreach ($requiredColumn in $RequiredColumns) {
        if ($headerColumns -notcontains $requiredColumn) {
            Add-Failure "Table in section '$SectionName' in $RelativePath must include column '$requiredColumn'"
        }
    }

    $dataRowCount = 0
    for ($i = $headerLineIndex + 2; $i -lt $lines.Count; $i++) {
        $row = $lines[$i].Trim()
        if ($row -notmatch '^\|.*\|$') {
            break
        }

        $dataRowCount++
        $cells = @($row.Trim('|') -split '\|' | ForEach-Object { $_.Trim() })
        foreach ($requiredColumn in $RequiredColumns) {
            $columnIndex = [array]::IndexOf($headerColumns, $requiredColumn)
            if ($columnIndex -lt 0) {
                continue
            }
            if ($cells.Count -le $columnIndex -or [string]::IsNullOrWhiteSpace($cells[$columnIndex])) {
                Add-Failure "Table row $dataRowCount in section '$SectionName' in $RelativePath has an empty '$requiredColumn' value"
            }
        }
    }

    if ($dataRowCount -eq 0) {
        Add-Failure "Table in section '$SectionName' in $RelativePath must include at least one data row"
    }
}
$script:CanonicalOutcomes = @(
    "pass",
    "fix",
    "diagnose",
    "clarify",
    "redesign",
    "split",
    "block",
    "learn"
)

function Test-CanonicalOutcomeText {
    param(
        [string]$RelativePath,
        [string]$Context,
        [string]$Text
    )

    $tick = [regex]::Escape([string][char]96)
    $outcomeMatches = [regex]::Matches($Text, "$tick(?<Outcome>[a-z][a-z-]*)$tick")
    if ($outcomeMatches.Count -eq 0) {
        Add-Failure "$Context in $RelativePath must include at least one typed outcome"
        return
    }

    foreach ($outcomeMatch in $outcomeMatches) {
        $outcome = $outcomeMatch.Groups["Outcome"].Value
        if ($script:CanonicalOutcomes -notcontains $outcome) {
            Add-Failure "$Context in $RelativePath includes non-canonical workflow outcome '$outcome'"
        }
    }
}

function Test-ModuleOutcomes {
    param([string]$RelativePath)

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        return
    }

    $outcomeSection = Get-MarkdownSection (Read-Text $path) "Outcome"
    if (-not [string]::IsNullOrWhiteSpace($outcomeSection)) {
        Test-CanonicalOutcomeText $RelativePath "Outcome section" $outcomeSection
    }
}

function Test-RailOutcomes {
    param([string]$RelativePath)

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        return
    }

    $section = Get-MarkdownSection (Read-Text $path) "Modules"
    $lines = @($section -split "\r?\n")
    $headerIndex = -1
    $outcomesIndex = -1

    for ($i = 0; $i -lt ($lines.Count - 1); $i++) {
        $headerLine = $lines[$i].Trim()
        $separatorLine = $lines[$i + 1].Trim()
        if ($headerLine -notmatch '^\|.*\|$' -or $separatorLine -notmatch '^\|.*\|$') {
            continue
        }

        $separatorColumns = @($separatorLine.Trim('|') -split '\|' | ForEach-Object { $_.Trim() })
        $isSeparator = $separatorColumns.Count -gt 0
        foreach ($column in $separatorColumns) {
            if ($column -notmatch '^:?-{3,}:?$') {
                $isSeparator = $false
                break
            }
        }
        if (-not $isSeparator) {
            continue
        }

        $headers = @($headerLine.Trim('|') -split '\|' | ForEach-Object { $_.Trim() })
        $candidateIndex = [array]::IndexOf($headers, "Outcomes")
        if ($candidateIndex -ge 0) {
            $headerIndex = $i
            $outcomesIndex = $candidateIndex
            break
        }
    }

    if ($headerIndex -lt 0) {
        return
    }

    for ($i = $headerIndex + 2; $i -lt $lines.Count; $i++) {
        $row = $lines[$i].Trim()
        if ($row -notmatch '^\|.*\|$') {
            break
        }

        $cells = @($row.Trim('|') -split '\|' | ForEach-Object { $_.Trim() })
        if ($cells.Count -le $outcomesIndex) {
            Add-Failure "Module row in $RelativePath is missing its Outcomes value"
            continue
        }

        $moduleName = if ($cells.Count -gt 0) { $cells[0] } else { "Unknown module" }
        Test-CanonicalOutcomeText $RelativePath "Outcomes for module '$moduleName'" $cells[$outcomesIndex]
    }
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
    Test-SectionContains $RelativePath "Requires" @("SWECircuit version:", "Required files:", "Optional tools:")
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
        $specStatus = Get-NormalizedStatus $spec
        $criteriaMatch = [regex]::Match($spec, "(?ms)^##\s+Acceptance Criteria\s*(.+?)(^##\s+|\z)")
        if (-not $criteriaMatch.Success) {
            Add-Failure "Missing Acceptance Criteria section in docs/specs/$($FeatureDir.Name)/spec.md"
        } else {
            $criteria = $criteriaMatch.Groups[1].Value
            $checklistItems = [regex]::Matches($criteria, "(?m)^\s*-\s+\[(?<Mark>[ xX])\]\s+")
            if ($checklistItems.Count -eq 0) {
                Add-Failure "Acceptance Criteria must contain checklist items in docs/specs/$($FeatureDir.Name)/spec.md"
            } elseif ($specStatus -ieq "Complete") {
                $uncheckedCount = @($checklistItems | Where-Object { $_.Groups["Mark"].Value -notmatch "[xX]" }).Count
                if ($uncheckedCount -gt 0) {
                    Add-Failure "Complete feature package has $uncheckedCount unchecked Acceptance Criteria item(s) in docs/specs/$($FeatureDir.Name)/spec.md"
                }
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
        $status = Get-NormalizedStatus $debug
        if ($status -notin @("Not started", "Not needed")) {
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
    ".editorconfig",
    ".gitattributes",
    ".gitignore",
    "scripts/test-check-template.ps1",
    "CONTRIBUTING.md",
    "SECURITY.md",
    "SUPPORT.md",
    "CODE_OF_CONDUCT.md",
    "CHANGELOG.md",
    "README.md",
    "AGENTS.md",
    "docs/README.md",
    "docs/assets/README.md",
    "docs/assets/source/generate-readme-demo-gifs.py",
    "docs/assets/swecircuit-overview.png",
    "docs/assets/tracerail-overview.png",
    "docs/assets/tracerail-module-contract.gif",
    "docs/assets/tracerail-rail-flow.gif",
    "docs/assets/tracerail-platform-composition.gif",
    "docs/architecture/file-architecture.md",
    "docs/quality/repository-standards.md",
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
    "docs/framework/executor-boundary.md",
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
    "docs/modules/architecture-review.md",
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
    "examples/minimal/README.md",
    "examples/minimal/swecircuit.json",
    "examples/minimal/traces/example.jsonl",
    "schemas/v1alpha1/README.md",
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
    ".github/pull_request_template.md",
    ".github/ISSUE_TEMPLATE/bug_report.md",
    ".github/ISSUE_TEMPLATE/feature_request.md",
    ".github/ISSUE_TEMPLATE/workflow_improvement.md",
    ".github/ISSUE_TEMPLATE/config.yml",
    ".github/workflows/template-check.yml"
)

foreach ($file in $requiredFiles) {
    Test-FileExists $file | Out-Null
}

$executorLivenessPhrase = "all activity capable of advancing the invocation or producing invocation effects has stopped"
$executorLivenessSurfaces = @(
    @{ RelativePath = "docs/framework/executor-boundary.md"; SectionName = "Result Semantics" },
    @{ RelativePath = "schemas/v1alpha1/README.md"; SectionName = "Execution Boundary" },
    @{ RelativePath = "docs/ai/handbook.md"; SectionName = "20. Modular Orchestration Framework" },
    @{ RelativePath = "docs/framework/capability-adapters.md"; SectionName = "Provider Executor Bridge" },
    @{ RelativePath = "docs/research/practice-register.md"; SectionName = "Current Practices" },
    @{ RelativePath = "docs/memory/patterns.md"; SectionName = "Documentation Patterns" },
    @{ RelativePath = "docs/specs/v10-executor-adapter/spec.md"; SectionName = "Requirements" },
    @{ RelativePath = "docs/specs/v10-executor-adapter/plan.md"; SectionName = "Risks And Mitigations" },
    @{ RelativePath = "docs/memory/active-context.md"; SectionName = "Important Current Constraints" }
)
foreach ($surface in $executorLivenessSurfaces) {
    Test-SectionContains $surface.RelativePath $surface.SectionName @(
        $executorLivenessPhrase,
        "not acknowledgment"
    )
}

$grantNonGuaranteeSentence = "The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay."
$grantGuaranteeSurfaces = @(
    @{
        RelativePath = "docs/framework/executor-boundary.md"
        SectionName = "Host Responsibilities"
        Terms = @($grantNonGuaranteeSentence)
    },
    @{
        RelativePath = "schemas/v1alpha1/README.md"
        SectionName = "Execution Boundary"
        Terms = @($grantNonGuaranteeSentence)
    },
    @{
        RelativePath = "docs/ai/handbook.md"
        SectionName = "20. Modular Orchestration Framework"
        Terms = @($grantNonGuaranteeSentence)
    },
    @{
        RelativePath = "docs/framework/capability-adapters.md"
        SectionName = "Provider Executor Bridge"
        Terms = @($grantNonGuaranteeSentence)
    },
    @{
        RelativePath = "docs/research/practice-register.md"
        SectionName = "Current Practices"
        Terms = @($grantNonGuaranteeSentence)
    },
    @{
        RelativePath = "docs/memory/patterns.md"
        SectionName = "Documentation Patterns"
        Terms = @($grantNonGuaranteeSentence)
    },
    @{
        RelativePath = "docs/specs/v10-executor-adapter/spec.md"
        SectionName = "Requirements"
        Terms = @($grantNonGuaranteeSentence)
    },
    @{
        RelativePath = "docs/specs/v10-executor-adapter/plan.md"
        SectionName = "Security And Privacy"
        Terms = @($grantNonGuaranteeSentence)
    },
    @{
        RelativePath = "docs/memory/active-context.md"
        SectionName = "Important Current Constraints"
        Terms = @($grantNonGuaranteeSentence)
    }
)
foreach ($surface in $grantGuaranteeSurfaces) {
    Test-SectionContains $surface.RelativePath $surface.SectionName $surface.Terms
}

Test-SectionTableColumns "docs/research/practice-register.md" "Current Practices" @(
    "Practice",
    "Status",
    "Source",
    "Decision",
    "Rationale"
)
Test-SectionContains "docs/research/practice-register.md" "Current Practices" @(
    "Absolute monotonic lifecycle bounds",
    "Proxy rejection before reflection",
    "Public contract parity checks"
)
$practiceRegister = Read-Text (Join-Path $Root "docs/research/practice-register.md")
$rejectionCriteria = Get-MarkdownSection $practiceRegister "Rejection Criteria"
if ($rejectionCriteria -match '(?m)^\s*\|') {
    Add-Failure "Practice Register rows must remain inside Current Practices and must not appear under Rejection Criteria"
}

Test-HasHeadings "README.md" @(
    "How It Works",
    "Core Contracts",
    "Start Here",
    "Repository Guide",
    "Principles",
    "Status"
)
$readme = Read-Text (Join-Path $Root "README.md")
if ($readme -notmatch '(?m)^# SWECircuit\s*$') {
    Add-Failure "README must use SWECircuit as the current project heading"
}
if ($readme -notmatch [regex]::Escape("https://github.com/GarrettAudet/SWECircuit")) {
    Add-Failure "README must link the current GarrettAudet/SWECircuit repository"
}
if ($readme -match [regex]::Escape("https://github.com/GarrettAudet/TraceRail")) {
    Add-Failure "README contains the retired GarrettAudet/TraceRail repository URL"
}
$currentOverviewPath = "docs/assets/swecircuit-overview.png"
$currentOverviewPattern = '(?m)^!\[[^\]\r\n]+\]\(' + [regex]::Escape($currentOverviewPath) + '\)\s*$'
if ($readme -notmatch $currentOverviewPattern) {
    Add-Failure "README missing current SWECircuit overview visual embed: $currentOverviewPath"
}
$historicalOverviewPattern = '(?m)^!\[[^\]\r\n]+\]\(' + [regex]::Escape("docs/assets/tracerail-overview.png") + '\)\s*$'
if ($readme -match $historicalOverviewPattern) {
    Add-Failure "README embeds the historical TraceRail overview instead of the current SWECircuit overview"
}

$requiredReadmeText = @(
    "The V10 kernel can now validate and execute one host-selected work packet through a caller-injected executor",
    "External hosts still select and schedule work, enforce permissions, isolate runtimes, persist traces, and merge changes.",
    "node dist/cli.js init --project <existing-empty-directory> --project-id quick-start",
    "node dist/cli.js validate --project examples/minimal",
    "node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl",
    "These are repository-local development commands for the private workspace",
    "The V10 kernel does not dynamically load adapters, execute circuits, terminate process trees, merge branches, or update memory automatically."
)
foreach ($requiredText in $requiredReadmeText) {
    if ($readme -notmatch [regex]::Escape($requiredText)) {
        Add-Failure "README missing required current public-surface text: $requiredText"
    }
}

$requiredReadmeLinks = @(
    "AGENTS.md",
    "docs/ai/handbook.md",
    "examples/minimal/",
    "docs/framework/",
    "docs/framework/executor-boundary.md",
    "docs/specs/",
    "docs/memory/"
)
foreach ($linkTarget in $requiredReadmeLinks) {
    $linkPattern = '\]\(' + [regex]::Escape($linkTarget) + '\)'
    if ($readme -notmatch $linkPattern) {
        Add-Failure "README missing required local link: $linkTarget"
    }

    $resolvedLink = Join-Path $Root $linkTarget.TrimEnd('/')
    if (-not (Test-Path -LiteralPath $resolvedLink)) {
        Add-Failure "README local link target does not exist: $linkTarget"
    }
}

$forbiddenReadmePatterns = @(
    @{ Pattern = '(?i)\bplanned executable kernel\b'; Message = "README still describes the implemented kernel as planned" },
    @{ Pattern = '(?i)\bSWECircuit\s+(?:launches\s+agents|schedules\s+agents|executes\s+circuits|writes\s+traces|retrieves\s+evidence|merges\s+branches|updates\s+memory\s+automatically)\b'; Message = "README positively claims a capability owned by an external runtime" },
    @{ Pattern = '(?i)\bSWECircuit\s+(?:enforces\s+(?:permissions|grants)|loads\s+(?:providers|adapters)|persists\s+(?:traces|events)|terminates\s+process(?:es|\s+trees))\b'; Message = "README positively claims host-owned execution authority or persistence" },
    @{ Pattern = '(?i)\bnpx\s+swecircuit\b'; Message = "README implies a published npx command" },
    @{ Pattern = '(?i)\bnpm\s+install\s+(?:-g\s+)?swecircuit\b'; Message = "README implies an installable SWECircuit package" },
    @{ Pattern = '(?i)\b(?:published|public)\s+SWECircuit\s+CLI\b'; Message = "README implies a published SWECircuit CLI" }
)
foreach ($rule in $forbiddenReadmePatterns) {
    if ($readme -match $rule.Pattern) {
        Add-Failure $rule.Message
    }
}

try {
    $packageJson = (Read-Text (Join-Path $Root "package.json")) | ConvertFrom-Json -ErrorAction Stop
    if ($packageJson.private -ne $true) {
        Add-Failure "package.json must keep the V10 workspace private"
    }
    if ($packageJson.PSObject.Properties.Name -contains "bin") {
        Add-Failure "package.json must not expose a package binary in V10"
    }
} catch {
    Add-Failure "package.json is not valid JSON: $($_.Exception.Message)"
}

Test-HasHeadings "CONTRIBUTING.md" @(
    "Quick Path",
    "Contribution Rules",
    "Workflow",
    "Validation",
    "Pull Request Standard",
    "Extension Standard"
)
Test-HasHeadings "SECURITY.md" @(
    "Reporting Security Issues",
    "Scope",
    "Handling Expectations",
    "Security Review Rules"
)
Test-HasHeadings "SUPPORT.md" @(
    "Getting Help",
    "What To Include",
    "Support Boundaries"
)
Test-HasHeadings "CODE_OF_CONDUCT.md" @(
    "Expected Behavior",
    "Unacceptable Behavior",
    "Enforcement"
)
Test-HasHeadings "CHANGELOG.md" @(
    "Unreleased",
    "Version History"
)
Test-HasHeadings "docs/README.md" @(
    "Start Here",
    "Documentation Map",
    "Common Paths",
    "Review Standard"
)
Test-HasHeadings "docs/assets/README.md" @(
    "Purpose",
    "Assets",
    "Update Rule"
)

Test-HasHeadings "docs/architecture/file-architecture.md" @(
    "Purpose",
    "Root Surface",
    "Docs Architecture",
    "Artifact Ownership",
    "Extension Points",
    "Naming Conventions",
    "Change Rules"
)
Test-HasHeadings "docs/quality/repository-standards.md" @(
    "Purpose",
    "Quality Bar",
    "File Standards",
    "Documentation Standards",
    "Validation Standards",
    "Review Standards",
    "Release Standards"
)

Test-HasHeadings ".github/ISSUE_TEMPLATE/bug_report.md" @(
    "Summary",
    "Expected Behavior",
    "Actual Behavior",
    "Evidence",
    "Reproduction",
    "SWECircuit Area",
    "Validation"
)
Test-HasHeadings ".github/ISSUE_TEMPLATE/feature_request.md" @(
    "Goal",
    "Problem Solved",
    "Proposed Shape",
    "Acceptance Criteria",
    "Risks"
)
Test-HasHeadings ".github/ISSUE_TEMPLATE/workflow_improvement.md" @(
    "Current Workflow",
    "Friction",
    "Evidence",
    "Suggested Improvement",
    "Promotion Layer",
    "Validation"
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
    "Standard Circuits",
    "Gates",
    "Artifacts",
    "Human-Visible Form",
    "Adapter Mapping",
    "Done Definition"
)

Test-HasHeadings "docs/framework/_rail-template.md" @(
    "Circuit Name",
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
    "Circuit Definition",
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
    "Input",
    "Action",
    "Output",
    "Gate",
    "Outcome",
    "Artifacts",
    "Adapter",
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
    if ($featureDir.Name -match "^v(?<Version>\d+(?:\.\d+)*)-") {
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

$railFiles = @(Get-MarkdownFiles "docs/rails")
if ($railFiles.Count -eq 0) {
    Add-Failure "No rail Markdown files found under docs/rails"
}
foreach ($railFile in $railFiles) {
    $relativeRailPath = ConvertTo-RepoRelativePath $railFile.FullName
    Test-HasHeadings $relativeRailPath @(
        "Purpose",
        "Composition",
        "Modules",
        "Artifacts",
        "Stop Conditions"
    )
    Test-SectionTableColumns $relativeRailPath "Modules" @(
        "Module",
        "Input",
        "Action",
        "Output",
        "Gate",
        "Outcomes",
        "Artifacts"
    )
    Test-RailOutcomes $relativeRailPath
}

Test-HasHeadings "docs/modules/README.md" @(
    "Purpose",
    "Module Interface",
    "Catalog",
    "Promotion Rule"
)

$moduleContractSections = @(
    "Purpose",
    "Input",
    "Action",
    "Output",
    "Gate",
    "Outcome",
    "Artifacts",
    "Adapter"
)
$moduleFiles = @(Get-MarkdownFiles "docs/modules")
if ($moduleFiles.Count -eq 0) {
    Add-Failure "No module Markdown files found under docs/modules"
}
foreach ($moduleFile in $moduleFiles) {
    $relativeModulePath = ConvertTo-RepoRelativePath $moduleFile.FullName
    Test-HasHeadings $relativeModulePath $moduleContractSections
    Test-SectionsNonEmpty $relativeModulePath $moduleContractSections
    Test-ModuleOutcomes $relativeModulePath
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

$officialPacksRoot = Join-Path $Root "docs\packs\official"
$officialPackDirectories = @()
if (Test-Path -LiteralPath $officialPacksRoot -PathType Container) {
    $officialPackDirectories = @(Get-ChildItem -LiteralPath $officialPacksRoot -Directory | Sort-Object Name)
}
if ($officialPackDirectories.Count -eq 0) {
    Add-Failure "No official pack directories found under docs/packs/official"
}
foreach ($officialPackDirectory in $officialPackDirectories) {
    $packReadmePath = Join-Path $officialPackDirectory.FullName "README.md"
    $relativePackReadmePath = ConvertTo-RepoRelativePath $packReadmePath
    if (Test-FileExists $relativePackReadmePath) {
        Test-HasHeadings $relativePackReadmePath @(
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
        Test-PackConformance $relativePackReadmePath
    }
}

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

Test-SectionTableColumns "docs/memory/decisions.md" "Decision Log" @("Source")
Test-HasHeadings "docs/memory/patterns.md" @("Source Map")
Test-SectionTableColumns "docs/memory/patterns.md" "Source Map" @("Source Artifacts", "Named Patterns")
$prTemplatePath = Join-Path $Root ".github\pull_request_template.md"
if (Test-Path -LiteralPath $prTemplatePath -PathType Leaf) {
    $pr = Read-Text $prTemplatePath
    foreach ($requiredPhrase in @("Feature Package", "Development Milestone", "Branch And Merge", "IDE Interaction", "Standalone Agent Work", "Framework Modules", "Circuits affected", "Modules affected", "Packs affected", "Traceability", "Repository Quality", "Verification", "Diagnosis", "Parallel Work", "Architecture And Memory", "Review Outcome")) {
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

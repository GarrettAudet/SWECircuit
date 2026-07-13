[CmdletBinding()]
param(
    [string]$RepoRoot = ""
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($RepoRoot)) {
    $RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

$powerShellExe = (Get-Process -Id $PID).Path
$tempParent = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
$testRoot = Join-Path $tempParent "swecircuit-checker-tests-$PID"
$failures = New-Object System.Collections.Generic.List[string]

function Write-Utf8 {
    param(
        [string]$Path,
        [string]$Text
    )

    [System.IO.File]::WriteAllText($Path, $Text, [System.Text.UTF8Encoding]::new($false))
}

function New-Fixture {
    param([string]$Name)

    $fixture = Join-Path $testRoot $Name
    New-Item -ItemType Directory -Path $fixture -Force | Out-Null

    foreach ($item in Get-ChildItem -LiteralPath $RepoRoot -Force) {
        if ($item.Name -in @(".git", ".local")) {
            continue
        }
        Copy-Item -LiteralPath $item.FullName -Destination $fixture -Recurse -Force
    }

    return $fixture
}

function ConvertTo-ProcessArgument {
    param([AllowEmptyString()][string]$Value)

    if ($Value -notmatch '[\s"]') {
        return $Value
    }

    $builder = New-Object System.Text.StringBuilder
    $backslashes = 0
    [void]$builder.Append([char]34)

    foreach ($character in $Value.ToCharArray()) {
        if ($character -eq [char]92) {
            $backslashes++
            continue
        }

        if ($character -eq [char]34) {
            [void]$builder.Append([char]92, ($backslashes * 2) + 1)
            [void]$builder.Append([char]34)
            $backslashes = 0
            continue
        }

        if ($backslashes -gt 0) {
            [void]$builder.Append([char]92, $backslashes)
            $backslashes = 0
        }
        [void]$builder.Append($character)
    }

    if ($backslashes -gt 0) {
        [void]$builder.Append([char]92, $backslashes * 2)
    }
    [void]$builder.Append([char]34)
    return $builder.ToString()
}

function Invoke-CheckerProcess {
    param([string]$Fixture)

    $checker = Join-Path $Fixture "scripts\check-template.ps1"
    $arguments = @(
        "-NoProfile",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        $checker,
        "-Root",
        $Fixture
    )
    $quotedArguments = @($arguments | ForEach-Object { ConvertTo-ProcessArgument $_ })

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $powerShellExe
    $startInfo.Arguments = $quotedArguments -join " "
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $startInfo.RedirectStandardOutput = $true
    $startInfo.RedirectStandardError = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo

    try {
        if (-not $process.Start()) {
            throw "Child checker process did not start."
        }

        $standardOutput = $process.StandardOutput.ReadToEnd()
        $standardError = $process.StandardError.ReadToEnd()
        $process.WaitForExit()

        $combinedOutput = @($standardOutput, $standardError) |
            Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

        return [pscustomobject]@{
            ExitCode = $process.ExitCode
            Output = ($combinedOutput -join [Environment]::NewLine).Trim()
        }
    } finally {
        $process.Dispose()
    }
}
function Write-RegressionFailure {
    param([string]$Message)

    if ($env:GITHUB_ACTIONS -eq "true") {
        $escaped = $Message.Replace("%", "%25").Replace([string][char]13, "%0D").Replace([string][char]10, "%0A")
        Write-Host "::error title=SWECircuit checker regression::$escaped"
        return
    }

    Write-Error $Message -ErrorAction Continue
}

function Assert-CheckerResult {
    param(
        [string]$Name,
        [string]$Fixture,
        [bool]$ShouldPass
    )

    $result = Invoke-CheckerProcess $Fixture
    $passed = $result.ExitCode -eq 0
    if ($passed -ne $ShouldPass) {
        $expectation = if ($ShouldPass) { "pass" } else { "fail" }
        $failures.Add("$Name expected checker to $expectation but exit code was $($result.ExitCode). Output: $($result.Output)") | Out-Null
        return
    }

    $state = if ($ShouldPass) { "accepted" } else { "rejected" }
    Write-Host "PASS: $Name ($state as expected)"
}

try {
    $resolvedTestRoot = [System.IO.Path]::GetFullPath($testRoot)
    if (-not $resolvedTestRoot.StartsWith($tempParent, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to create checker fixtures outside the system temp directory: $resolvedTestRoot"
    }
    New-Item -ItemType Directory -Path $resolvedTestRoot -Force | Out-Null

    $baseline = New-Fixture "baseline"
    Assert-CheckerResult "valid repository" $baseline $true

    $legacyHeadingFixture = New-Fixture "legacy-readme-heading"
    $legacyHeadingPath = Join-Path $legacyHeadingFixture "README.md"
    $legacyHeadingText = (Get-Content -LiteralPath $legacyHeadingPath -Raw).Replace("# SWECircuit", "# TraceRail")
    Write-Utf8 $legacyHeadingPath $legacyHeadingText
    Assert-CheckerResult "legacy README project heading" $legacyHeadingFixture $false

    $legacyRemoteFixture = New-Fixture "legacy-readme-remote"
    $legacyRemotePath = Join-Path $legacyRemoteFixture "README.md"
    $legacyRemoteText = (Get-Content -LiteralPath $legacyRemotePath -Raw).Replace(
        "https://github.com/GarrettAudet/SWECircuit",
        "https://github.com/GarrettAudet/TraceRail"
    )
    Write-Utf8 $legacyRemotePath $legacyRemoteText
    Assert-CheckerResult "legacy README repository URL" $legacyRemoteFixture $false

    $debugFixture = New-Fixture "missing-debug-evidence"
    $debugPath = Join-Path $debugFixture "docs\specs\v8-readme-visual-clarity\debug-notes.md"
    $debugText = (Get-Content -LiteralPath $debugPath -Raw).Replace("## Reproduction", "## Reproduction Removed")
    Write-Utf8 $debugPath $debugText
    Assert-CheckerResult "complete debug record missing reproduction" $debugFixture $false

    $criteriaFixture = New-Fixture "unchecked-complete-criteria"
    $criteriaPath = Join-Path $criteriaFixture "docs\specs\v8.1-baseline-integrity\spec.md"
    $checkedCriterion = "- [x] Given a new reader opens the README"
    $uncheckedCriterion = "- [ ] Given a new reader opens the README"
    $criteriaText = (Get-Content -LiteralPath $criteriaPath -Raw).Replace($checkedCriterion, $uncheckedCriterion)
    Write-Utf8 $criteriaPath $criteriaText
    Assert-CheckerResult "complete feature with unchecked acceptance criterion" $criteriaFixture $false

    $packFixture = New-Fixture "invalid-discovered-pack"
    $packPath = Join-Path $packFixture "docs\packs\official\invalid-test-pack"
    New-Item -ItemType Directory -Path $packPath -Force | Out-Null
    Write-Utf8 (Join-Path $packPath "README.md") "# Invalid Test Pack`n"
    Assert-CheckerResult "dynamically discovered invalid official pack" $packFixture $false

    $milestoneFixture = New-Fixture "missing-decimal-milestone"
    Remove-Item -LiteralPath (Join-Path $milestoneFixture "docs\milestones\v8.1.md") -Force
    Assert-CheckerResult "decimal feature version missing milestone" $milestoneFixture $false

    $moduleFixture = New-Fixture "invalid-module-contract"
    $modulePath = Join-Path $moduleFixture "docs\modules\verify.md"
    $moduleText = (Get-Content -LiteralPath $modulePath -Raw).Replace("## Action", "## Action Removed")
    Write-Utf8 $modulePath $moduleText
    Assert-CheckerResult "module missing action contract" $moduleFixture $false

    $emptyModuleFixture = New-Fixture "empty-module-action"
    $emptyModulePath = Join-Path $emptyModuleFixture "docs\modules\verify.md"
    $emptyModuleText = Get-Content -LiteralPath $emptyModulePath -Raw
    $emptyModuleText = [regex]::Replace(
        $emptyModuleText,
        '(?ms)^## Action\s*.*?(?=^## Output)',
        "## Action" + [Environment]::NewLine + [Environment]::NewLine
    )
    Write-Utf8 $emptyModulePath $emptyModuleText
    Assert-CheckerResult "module with empty action section" $emptyModuleFixture $false

    $dynamicModuleFixture = New-Fixture "invalid-discovered-module"
    $dynamicModulePath = Join-Path $dynamicModuleFixture "docs\modules\invalid-test-module.md"
    Write-Utf8 $dynamicModulePath "# Invalid Test Module"
    Assert-CheckerResult "dynamically discovered invalid module" $dynamicModuleFixture $false

    $outcomeFixture = New-Fixture "invalid-workflow-outcome"
    $outcomePath = Join-Path $outcomeFixture "docs\modules\memory-adapters.md"
    $tick = [string][char]96
    $validOutcomeText = $tick + "pass" + $tick + ", " + $tick + "learn" + $tick + ", or " + $tick + "block" + $tick + "."
    $invalidOutcomeText = $tick + "pass" + $tick + " or " + $tick + "deferred" + $tick + "."
    $outcomeText = (Get-Content -LiteralPath $outcomePath -Raw).Replace($validOutcomeText, $invalidOutcomeText)
    Write-Utf8 $outcomePath $outcomeText
    Assert-CheckerResult "module emits non-canonical workflow outcome" $outcomeFixture $false

    $railFixture = New-Fixture "invalid-rail-contract"
    $railPath = Join-Path $railFixture "docs\rails\feature-rail.md"
    $railText = (Get-Content -LiteralPath $railPath -Raw).Replace("| Module | Input | Action | Output | Gate | Outcomes |", "| Module | Input | Output | Gate | Outcomes |")
    Write-Utf8 $railPath $railText
    Assert-CheckerResult "rail table missing action field" $railFixture $false

    $emptyRailFixture = New-Fixture "empty-rail-action"
    $emptyRailPath = Join-Path $emptyRailFixture "docs\rails\feature-rail.md"
    $railAction = "Ask material questions or record low-risk assumptions."
    $emptyRailText = (Get-Content -LiteralPath $emptyRailPath -Raw).Replace($railAction, "")
    Write-Utf8 $emptyRailPath $emptyRailText
    Assert-CheckerResult "rail module row with empty action value" $emptyRailFixture $false

    $dynamicRailFixture = New-Fixture "invalid-discovered-rail"
    $dynamicRailPath = Join-Path $dynamicRailFixture "docs\rails\invalid-test-rail.md"
    Write-Utf8 $dynamicRailPath "# Invalid Test Rail"
    Assert-CheckerResult "dynamically discovered invalid rail" $dynamicRailFixture $false

    $railOutcomeFixture = New-Fixture "invalid-rail-outcome"
    $railOutcomePath = Join-Path $railOutcomeFixture "docs\rails\feature-rail.md"
    $validRailOutcomeText = $tick + "pass" + $tick + ", " + $tick + "clarify" + $tick + ", " + $tick + "block" + $tick
    $invalidRailOutcomeText = $tick + "pass" + $tick + ", " + $tick + "clarify" + $tick + ", " + $tick + "deferred" + $tick
    $railOutcomeText = (Get-Content -LiteralPath $railOutcomePath -Raw).Replace($validRailOutcomeText, $invalidRailOutcomeText)
    Write-Utf8 $railOutcomePath $railOutcomeText
    Assert-CheckerResult "rail emits non-canonical workflow outcome" $railOutcomeFixture $false

    $decisionFixture = New-Fixture "missing-decision-provenance"
    $decisionPath = Join-Path $decisionFixture "docs\memory\decisions.md"
    $decisionText = (Get-Content -LiteralPath $decisionPath -Raw).Replace("| Source |", "| Origin |")
    Write-Utf8 $decisionPath $decisionText
    Assert-CheckerResult "decisions missing source field" $decisionFixture $false

    $patternFixture = New-Fixture "missing-pattern-provenance"
    $patternPath = Join-Path $patternFixture "docs\memory\patterns.md"
    $patternText = (Get-Content -LiteralPath $patternPath -Raw).Replace("## Source Map", "## Source Map Removed")
    Write-Utf8 $patternPath $patternText
    Assert-CheckerResult "patterns missing source map" $patternFixture $false

    if ($failures.Count -gt 0) {
        foreach ($failure in $failures) {
            Write-RegressionFailure $failure
        }
        exit 1
    }

    Write-Host "SWECircuit checker regression tests passed."
} catch {
    Write-RegressionFailure ("Unhandled regression harness error: " + $_.Exception.Message)
    exit 1
} finally {
    if (Test-Path -LiteralPath $testRoot) {
        $resolvedCleanup = [System.IO.Path]::GetFullPath($testRoot)
        if ($resolvedCleanup.StartsWith($tempParent, [System.StringComparison]::OrdinalIgnoreCase)) {
            try {
                Remove-Item -LiteralPath $resolvedCleanup -Recurse -Force
            } catch {
                Write-RegressionFailure ("Fixture cleanup failed: " + $_.Exception.Message)
                throw
            }
        }
    }
}

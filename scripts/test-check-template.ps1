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
        if ($item.Name -in @(".git", ".local", ".out", "coverage", "dist", "node_modules")) {
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

    $historicalOverviewFixture = New-Fixture "historical-readme-overview"
    $historicalOverviewPath = Join-Path $historicalOverviewFixture "README.md"
    $historicalOverviewText = (Get-Content -LiteralPath $historicalOverviewPath -Raw).Replace(
        "docs/assets/swecircuit-overview.png",
        "docs/assets/tracerail-overview.png"
    )
    Write-Utf8 $historicalOverviewPath $historicalOverviewText
    Assert-CheckerResult "historical README overview embed" $historicalOverviewFixture $false

    $plainOverviewFixture = New-Fixture "plain-text-readme-overview"
    $plainOverviewPath = Join-Path $plainOverviewFixture "README.md"
    $plainOverviewText = [regex]::Replace(
        (Get-Content -LiteralPath $plainOverviewPath -Raw),
        '(?m)^!\[[^\r\n]*\]\(docs/assets/swecircuit-overview\.png\)\s*$',
        "Current asset: docs/assets/swecircuit-overview.png"
    )
    Write-Utf8 $plainOverviewPath $plainOverviewText
    Assert-CheckerResult "plain-text current overview reference" $plainOverviewFixture $false

    $historicalLinkFixture = New-Fixture "historical-overview-link"
    $historicalLinkPath = Join-Path $historicalLinkFixture "README.md"
    $historicalLinkText = (Get-Content -LiteralPath $historicalLinkPath -Raw) + [Environment]::NewLine + "[Historical V8 overview](docs/assets/tracerail-overview.png)" + [Environment]::NewLine
    Write-Utf8 $historicalLinkPath $historicalLinkText
    Assert-CheckerResult "historical overview provenance link" $historicalLinkFixture $true

    $missingOverviewFixture = New-Fixture "missing-current-overview"
    Remove-Item -LiteralPath (Join-Path $missingOverviewFixture "docs\assets\swecircuit-overview.png") -Force
    Assert-CheckerResult "missing current overview asset" $missingOverviewFixture $false

    $operationCommands = @(
        @{ Name = "init"; Text = "node dist/cli.js init --project <existing-empty-directory> --project-id quick-start" },
        @{ Name = "validate"; Text = "node dist/cli.js validate --project examples/minimal" },
        @{ Name = "inspect"; Text = "node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl" }
    )
    foreach ($operation in $operationCommands) {
        $fixture = New-Fixture ("missing-readme-" + $operation.Name)
        $path = Join-Path $fixture "README.md"
        $content = (Get-Content -LiteralPath $path -Raw).Replace($operation.Text, "removed-command")
        Write-Utf8 $path $content
        Assert-CheckerResult ("README missing " + $operation.Name + " command") $fixture $false
    }

    $capabilityOverclaims = @(
        @{ Name = "launches"; Text = "SWECircuit launches agents." },
        @{ Name = "schedules"; Text = "SWECircuit schedules agents." },
        @{ Name = "executes"; Text = "SWECircuit executes circuits." },
        @{ Name = "writes"; Text = "SWECircuit writes traces." },
        @{ Name = "retrieves"; Text = "SWECircuit retrieves evidence." },
        @{ Name = "merges"; Text = "SWECircuit merges branches." },
        @{ Name = "updates"; Text = "SWECircuit updates memory automatically." }
    )
    foreach ($claim in $capabilityOverclaims) {
        $fixture = New-Fixture ("readme-overclaim-" + $claim.Name)
        $path = Join-Path $fixture "README.md"
        $content = (Get-Content -LiteralPath $path -Raw) + [Environment]::NewLine + $claim.Text + [Environment]::NewLine
        Write-Utf8 $path $content
        Assert-CheckerResult ("README capability overclaim: " + $claim.Name) $fixture $false
    }

    $truthfulNegationFixture = New-Fixture "truthful-capability-negation"
    $truthfulNegationPath = Join-Path $truthfulNegationFixture "README.md"
    $truthfulNegationText = (Get-Content -LiteralPath $truthfulNegationPath -Raw) + [Environment]::NewLine + "SWECircuit writes no traces; callers own trace production." + [Environment]::NewLine
    Write-Utf8 $truthfulNegationPath $truthfulNegationText
    Assert-CheckerResult "truthful capability negation" $truthfulNegationFixture $true

    $publicCommandClaims = @(
        @{ Name = "npx"; Text = "npx swecircuit" },
        @{ Name = "npm"; Text = "npm install swecircuit" },
        @{ Name = "global"; Text = "npm install -g swecircuit" },
        @{ Name = "published-cli"; Text = "Use the published SWECircuit CLI." }
    )
    foreach ($claim in $publicCommandClaims) {
        $fixture = New-Fixture ("readme-public-command-" + $claim.Name)
        $path = Join-Path $fixture "README.md"
        $content = (Get-Content -LiteralPath $path -Raw) + [Environment]::NewLine + $claim.Text + [Environment]::NewLine
        Write-Utf8 $path $content
        Assert-CheckerResult ("README public command claim: " + $claim.Name) $fixture $false
    }

    $publicPackageFixture = New-Fixture "public-package-metadata"
    $publicPackagePath = Join-Path $publicPackageFixture "package.json"
    $publicPackageText = (Get-Content -LiteralPath $publicPackagePath -Raw).Replace(
        '"private": true',
        '"private": false'
    )
    Write-Utf8 $publicPackagePath $publicPackageText
    Assert-CheckerResult "public package metadata" $publicPackageFixture $false

    $binaryPackageFixture = New-Fixture "package-binary-metadata"
    $binaryPackagePath = Join-Path $binaryPackageFixture "package.json"
    $binaryPackageText = (Get-Content -LiteralPath $binaryPackagePath -Raw).Replace(
        '"private": true,',
        '"private": true,' + [Environment]::NewLine + '  "bin": "dist/cli.js",'
    )
    Write-Utf8 $binaryPackagePath $binaryPackageText
    Assert-CheckerResult "package binary metadata" $binaryPackageFixture $false

    $navigationFixture = New-Fixture "missing-readme-navigation"
    $navigationPath = Join-Path $navigationFixture "README.md"
    $navigationText = (Get-Content -LiteralPath $navigationPath -Raw).Replace(
        "docs/ai/handbook.md",
        "docs/ai/handbook-removed.md"
    )
    Write-Utf8 $navigationPath $navigationText
    Assert-CheckerResult "README missing required navigation" $navigationFixture $false
    $executionLinkFixture = New-Fixture "missing-executor-boundary-link"
    $executionLinkPath = Join-Path $executionLinkFixture "README.md"
    $executionLinkText = (Get-Content -LiteralPath $executionLinkPath -Raw).Replace(
        "docs/framework/executor-boundary.md",
        "docs/framework/executor-boundary-removed.md"
    )
    Write-Utf8 $executionLinkPath $executionLinkText
    Assert-CheckerResult "README missing executor boundary navigation" $executionLinkFixture $false

    $staleKernelFixture = New-Fixture "stale-planned-kernel-claim"
    $staleKernelPath = Join-Path $staleKernelFixture "README.md"
    $staleKernelText = (Get-Content -LiteralPath $staleKernelPath -Raw) + [Environment]::NewLine + "The planned executable kernel comes next." + [Environment]::NewLine
    Write-Utf8 $staleKernelPath $staleKernelText
    Assert-CheckerResult "README stale planned-kernel claim" $staleKernelFixture $false

    $missingCapabilityFixture = New-Fixture "missing-current-capability"
    $missingCapabilityPath = Join-Path $missingCapabilityFixture "README.md"
    $missingCapabilityText = (Get-Content -LiteralPath $missingCapabilityPath -Raw).Replace(
        "The V10 kernel can now validate and execute one host-selected work packet through a caller-injected executor",
        "The V10 kernel status is undocumented"
    )
    Write-Utf8 $missingCapabilityPath $missingCapabilityText
    Assert-CheckerResult "README missing current kernel capability" $missingCapabilityFixture $false

    $missingBoundaryFixture = New-Fixture "missing-runtime-boundary"
    $missingBoundaryPath = Join-Path $missingBoundaryFixture "README.md"
    $missingBoundaryText = (Get-Content -LiteralPath $missingBoundaryPath -Raw).Replace(
        "The V10 kernel does not dynamically load adapters, execute circuits, terminate process trees, merge branches, or update memory automatically.",
        "Runtime boundary removed."
    )
    Write-Utf8 $missingBoundaryPath $missingBoundaryText
    Assert-CheckerResult "README missing runtime boundary" $missingBoundaryFixture $false

    $executorLivenessPhrase = "all activity capable of advancing the invocation or producing invocation effects has stopped"
    $livenessSurfaces = @(
        @{ Name = "executor-guide"; Path = "docs\framework\executor-boundary.md" },
        @{ Name = "schema-guide"; Path = "schemas\v1alpha1\README.md" },
        @{ Name = "handbook"; Path = "docs\ai\handbook.md" }
    )
    foreach ($surface in $livenessSurfaces) {
        $fixture = New-Fixture ("missing-executor-liveness-" + $surface.Name)
        $path = Join-Path $fixture $surface.Path
        $content = Get-Content -LiteralPath $path -Raw
        if ($content -notmatch [regex]::Escape($executorLivenessPhrase)) {
            throw "Liveness fixture source is missing the expected phrase: $($surface.Path)"
        }
        Write-Utf8 $path ($content.Replace($executorLivenessPhrase, "executor liveness prerequisite removed"))
        Assert-CheckerResult ("executor liveness prerequisite: " + $surface.Name) $fixture $false
    }

    $grantFixture = New-Fixture "missing-packaged-grant-non-guarantees"
    $grantPath = Join-Path $grantFixture "docs\framework\executor-boundary.md"
    $grantText = Get-Content -LiteralPath $grantPath -Raw
    $grantDisclaimer = "The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay."
    if ($grantText -notmatch [regex]::Escape($grantDisclaimer)) {
        throw "Grant fixture source is missing the expected disclaimer."
    }
    Write-Utf8 $grantPath ($grantText.Replace($grantDisclaimer, "Grant non-guarantees removed."))
    Assert-CheckerResult "packaged guide missing grant non-guarantees" $grantFixture $false

    $schemaGrantFixture = New-Fixture "missing-schema-grant-non-guarantees"
    $schemaGrantPath = Join-Path $schemaGrantFixture "schemas\v1alpha1\README.md"
    $schemaGrantText = Get-Content -LiteralPath $schemaGrantPath -Raw
    $schemaGrantDisclaimer = "The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay."
    if ($schemaGrantText -notmatch [regex]::Escape($schemaGrantDisclaimer)) {
        throw "Schema grant fixture source is missing the expected disclaimer."
    }
    Write-Utf8 $schemaGrantPath ($schemaGrantText.Replace($schemaGrantDisclaimer, "Schema grant non-guarantees removed."))
    Assert-CheckerResult "schema guide missing grant non-guarantees" $schemaGrantFixture $false

    $practiceStructureFixture = New-Fixture "practice-row-outside-current-table"
    $practiceStructurePath = Join-Path $practiceStructureFixture "docs\research\practice-register.md"
    $practiceStructureText = Get-Content -LiteralPath $practiceStructurePath -Raw
    $practiceRow = [regex]::Match(
        $practiceStructureText,
        '(?m)^\| Proxy rejection before reflection \|[^\r\n]*(?:\r?\n|$)'
    )
    if (-not $practiceRow.Success) {
        throw "Practice structure fixture could not find the accepted row."
    }
    $practiceStructureText = $practiceStructureText.Remove($practiceRow.Index, $practiceRow.Length)
    $practiceStructureText = $practiceStructureText.TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        $practiceRow.Value.TrimEnd([char]13, [char]10) +
        [Environment]::NewLine
    Write-Utf8 $practiceStructurePath $practiceStructureText
    Assert-CheckerResult "accepted practice outside Current Practices table" $practiceStructureFixture $false

    $lifecycleAnchor = "For invoked work, the executor promise must remain pending until all activity capable of advancing the invocation or producing invocation effects has stopped. Transferring live work to host ownership is not acknowledgment. Harmless cleanup may continue only when it cannot affect the packet, exercise invocation authority, or produce invocation evidence."
    $lifecycleContradictions = @(
        @{ Name = "timely-settlement-proves-stopped"; Claim = "Timely settlement proves all invocation activity has stopped." },
        @{ Name = "live-transfer-is-acknowledgment"; Claim = "Transferring live work to host ownership is acknowledgment." },
        @{ Name = "no-call-requires-acknowledgment"; Claim = "A no-call terminal result requires executor acknowledgment." }
    )
    foreach ($contradiction in $lifecycleContradictions) {
        $fixture = New-Fixture ("executor-lifecycle-contradiction-" + $contradiction.Name)
        $path = Join-Path $fixture "docs\framework\executor-boundary.md"
        $content = Get-Content -LiteralPath $path -Raw
        if (-not $content.Contains($lifecycleAnchor)) {
            throw "Lifecycle contradiction fixture could not find the intended contract line."
        }
        $content = $content.Replace(
            $lifecycleAnchor,
            $lifecycleAnchor + [Environment]::NewLine + [Environment]::NewLine + $contradiction.Claim
        )
        Write-Utf8 $path $content
        Assert-CheckerResult ("executor lifecycle contradiction: " + $contradiction.Name) $fixture $false
    }

    $grantAnchor = '`Invocation-scoped` describes the grant''s identity and permission binding only. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.'
    $grantContradictions = @(
        @{ Name = "authenticates-issuer"; Claim = "The stateless kernel authenticates the issuer." },
        @{ Name = "establishes-freshness"; Claim = "The stateless kernel establishes grant freshness." },
        @{ Name = "single-use"; Claim = "Every grant is single-use." },
        @{ Name = "enforces-grant"; Claim = "The stateless kernel enforces the grant." },
        @{ Name = "revokes-grant"; Claim = "The stateless kernel revokes the grant." },
        @{ Name = "consumes-grant"; Claim = "The stateless kernel consumes the grant." },
        @{ Name = "prevents-reuse"; Claim = "The stateless kernel prevents grant reuse." },
        @{ Name = "prevents-replay"; Claim = "The stateless kernel prevents grant replay." }
    )
    foreach ($contradiction in $grantContradictions) {
        $fixture = New-Fixture ("executor-grant-contradiction-" + $contradiction.Name)
        $path = Join-Path $fixture "docs\framework\executor-boundary.md"
        $content = Get-Content -LiteralPath $path -Raw
        if (-not $content.Contains($grantAnchor)) {
            throw "Grant contradiction fixture could not find the intended contract line."
        }
        $content = $content.Replace(
            $grantAnchor,
            $grantAnchor + [Environment]::NewLine + [Environment]::NewLine + $contradiction.Claim
        )
        Write-Utf8 $path $content
        Assert-CheckerResult ("executor grant contradiction: " + $contradiction.Name) $fixture $false
    }

    $livenessRelocationFixture = New-Fixture "executor-liveness-terms-relocated"
    $livenessRelocationPath = Join-Path $livenessRelocationFixture "docs\framework\executor-boundary.md"
    $livenessRelocationText = Get-Content -LiteralPath $livenessRelocationPath -Raw
    if (-not $livenessRelocationText.Contains($lifecycleAnchor)) {
        throw "Liveness relocation fixture could not find the intended contract line."
    }
    $livenessRelocationTarget = $lifecycleAnchor.Replace(
        $executorLivenessPhrase,
        "the intended promise-liveness prerequisite was removed"
    )
    $livenessRelocationDecoy = "Glossary only: all activity capable of advancing the invocation or producing invocation effects has stopped; transferring live work is not acknowledgment."
    $livenessRelocationText = $livenessRelocationText.Replace(
        $lifecycleAnchor,
        $livenessRelocationTarget + [Environment]::NewLine + [Environment]::NewLine + $livenessRelocationDecoy
    )
    Write-Utf8 $livenessRelocationPath $livenessRelocationText
    Assert-CheckerResult "executor liveness terms relocated within section" $livenessRelocationFixture $false

    $grantRelocationFixture = New-Fixture "executor-grant-disclaimer-relocated"
    $grantRelocationPath = Join-Path $grantRelocationFixture "docs\framework\executor-boundary.md"
    $grantRelocationText = Get-Content -LiteralPath $grantRelocationPath -Raw
    if (-not $grantRelocationText.Contains($grantAnchor)) {
        throw "Grant relocation fixture could not find the intended contract line."
    }
    $grantRelocationTarget = '`Invocation-scoped` describes the grant''s identity and permission binding only. The disclaimer was moved away from this contract statement.'
    $grantRelocationText = $grantRelocationText.Replace(
        $grantAnchor,
        $grantRelocationTarget + [Environment]::NewLine + [Environment]::NewLine + $grantDisclaimer
    )
    Write-Utf8 $grantRelocationPath $grantRelocationText
    Assert-CheckerResult "executor grant disclaimer relocated within section" $grantRelocationFixture $false

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

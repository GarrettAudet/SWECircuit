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
$testRoot = Join-Path $tempParent "sc-ct-$PID"
$fixtureSourceRoot = Join-Path $testRoot "base"
$failures = New-Object System.Collections.Generic.List[string]
$checkerCases = New-Object System.Collections.Generic.List[object]
$fixtureChanges = @{}
$fixtureOrdinal = 0
$checkerConcurrency = [Math]::Max(1, [Math]::Min(4, [Environment]::ProcessorCount))

function Get-FixtureBinding {
    param([string]$Path)

    $rootPrefix = [System.IO.Path]::GetFullPath($testRoot).TrimEnd([char[]]@('\', '/')) +
        [System.IO.Path]::DirectorySeparatorChar
    $fullPath = [System.IO.Path]::GetFullPath($Path)
    if (-not $fullPath.StartsWith($rootPrefix, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $null
    }

    $relativeToRoot = $fullPath.Substring($rootPrefix.Length)
    $separatorIndex = $relativeToRoot.IndexOf([System.IO.Path]::DirectorySeparatorChar)
    if ($separatorIndex -lt 1) {
        return $null
    }

    $fixtureName = $relativeToRoot.Substring(0, $separatorIndex)
    if ($fixtureName -notmatch '^f[0-9]{3}$') {
        return $null
    }

    return [pscustomobject]@{
        Root = Join-Path $testRoot $fixtureName
        Relative = $relativeToRoot.Substring($separatorIndex + 1)
    }
}

function Register-FixtureChange {
    param([string]$Path)

    $binding = Get-FixtureBinding $Path
    if ($null -eq $binding) {
        return
    }

    if (-not $script:fixtureChanges.ContainsKey($binding.Root)) {
        $script:fixtureChanges[$binding.Root] = New-Object System.Collections.Generic.List[string]
    }
    $changes = $script:fixtureChanges[$binding.Root]
    if (-not $changes.Contains($binding.Relative)) {
        $changes.Add($binding.Relative) | Out-Null
    }
}

function Reset-Fixture {
    param([string]$Fixture)

    $fixtureRoot = [System.IO.Path]::GetFullPath($Fixture)
    if (-not $script:fixtureChanges.ContainsKey($fixtureRoot)) {
        return
    }

    $parents = New-Object System.Collections.Generic.List[string]
    foreach ($relative in @($script:fixtureChanges[$fixtureRoot])) {
        $target = Join-Path $fixtureRoot $relative
        $source = Join-Path $fixtureSourceRoot $relative

        if (Test-Path -LiteralPath $target -PathType Leaf) {
            Remove-Item -LiteralPath $target -Force
        }
        if (Test-Path -LiteralPath $source -PathType Leaf) {
            $targetParent = Split-Path -Parent $target
            New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
            New-Item -ItemType HardLink -Path $target -Target $source -Force | Out-Null
        }

        $parent = Split-Path -Parent $relative
        while (-not [string]::IsNullOrWhiteSpace($parent)) {
            if (-not $parents.Contains($parent)) {
                $parents.Add($parent) | Out-Null
            }
            $nextParent = Split-Path -Parent $parent
            if ($nextParent -eq $parent) {
                break
            }
            $parent = $nextParent
        }
    }

    foreach ($relativeParent in @($parents | Sort-Object Length -Descending)) {
        $sourceParent = Join-Path $fixtureSourceRoot $relativeParent
        $targetParent = Join-Path $fixtureRoot $relativeParent
        if (-not (Test-Path -LiteralPath $sourceParent) -and
            (Test-Path -LiteralPath $targetParent -PathType Container) -and
            @(Get-ChildItem -LiteralPath $targetParent -Force).Count -eq 0) {
            Remove-Item -LiteralPath $targetParent -Force
        }
    }

    $script:fixtureChanges.Remove($fixtureRoot)
}

function Write-Utf8 {
    param(
        [string]$Path,
        [string]$Text
    )

    Register-FixtureChange $Path
    $directory = Split-Path -Parent $Path
    if (-not (Test-Path -LiteralPath $directory -PathType Container)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }

    $temporaryPath = Join-Path $directory (".sc-write-{0}-{1}.tmp" -f $PID, [Guid]::NewGuid().ToString("N"))
    try {
        [System.IO.File]::WriteAllText(
            $temporaryPath,
            $Text,
            [System.Text.UTF8Encoding]::new($false)
        )
        if (Test-Path -LiteralPath $Path) {
            Remove-Item -LiteralPath $Path -Force
        }
        Move-Item -LiteralPath $temporaryPath -Destination $Path -Force
    } finally {
        if (Test-Path -LiteralPath $temporaryPath) {
            Remove-Item -LiteralPath $temporaryPath -Force
        }
    }
}

function Remove-FixtureItem {
    param([string]$Path)

    Register-FixtureChange $Path
    Remove-Item -LiteralPath $Path -Force
}

function Test-FixtureSourceExclusion {
    param([string]$RelativePath)

    $normalized = $RelativePath.Replace('\', '/')
    $segments = @($normalized -split '/')
    if ($segments.Count -eq 0) {
        return $false
    }
    if ($segments[0] -in @(".git", ".local", ".out", "coverage", "dist", "node_modules")) {
        return $true
    }
    return $segments.Count -ge 4 -and
        $segments[0] -eq "docs" -and
        $segments[1] -eq "specs" -and
        $segments[3] -eq "evidence"
}

function Copy-FixtureSourceTree {
    param(
        [string]$Source,
        [string]$Destination
    )

    $pending = New-Object System.Collections.Generic.Stack[object]
    $pending.Push([pscustomobject]@{
        Source = [System.IO.Path]::GetFullPath($Source)
        Destination = [System.IO.Path]::GetFullPath($Destination)
        Relative = ""
    })

    while ($pending.Count -gt 0) {
        $current = $pending.Pop()
        New-Item -ItemType Directory -Path $current.Destination -Force | Out-Null

        foreach ($item in Get-ChildItem -LiteralPath $current.Source -Force) {
            $relative = if ([string]::IsNullOrEmpty($current.Relative)) {
                $item.Name
            } else {
                Join-Path $current.Relative $item.Name
            }
            if (Test-FixtureSourceExclusion $relative) {
                continue
            }

            $target = Join-Path $current.Destination $item.Name
            if ($item.PSIsContainer) {
                $pending.Push([pscustomobject]@{
                    Source = $item.FullName
                    Destination = $target
                    Relative = $relative
                })
            } else {
                Copy-Item -LiteralPath $item.FullName -Destination $target -Force
            }
        }
    }
}

function New-HardLinkedFixtureTree {
    param(
        [string]$Source,
        [string]$Destination
    )

    $pending = New-Object System.Collections.Generic.Stack[object]
    $pending.Push([pscustomobject]@{
        Source = [System.IO.Path]::GetFullPath($Source)
        Destination = [System.IO.Path]::GetFullPath($Destination)
    })

    while ($pending.Count -gt 0) {
        $current = $pending.Pop()
        New-Item -ItemType Directory -Path $current.Destination -Force | Out-Null

        foreach ($item in Get-ChildItem -LiteralPath $current.Source -Force) {
            $target = Join-Path $current.Destination $item.Name
            if ($item.PSIsContainer) {
                $pending.Push([pscustomobject]@{
                    Source = $item.FullName
                    Destination = $target
                })
            } else {
                New-Item -ItemType HardLink -Path $target -Target $item.FullName -Force | Out-Null
            }
        }
    }
}

function New-Fixture {
    param([string]$Name)

    $script:fixtureOrdinal += 1
    $slot = (($script:fixtureOrdinal - 1) % $checkerConcurrency) + 1
    $fixture = Join-Path $testRoot ("f{0:D3}" -f $slot)
    if (Test-Path -LiteralPath $fixture -PathType Container) {
        Reset-Fixture $fixture
    } else {
        New-HardLinkedFixtureTree $fixtureSourceRoot $fixture
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

function Start-CheckerProcess {
    param([object]$Case)

    $checker = Join-Path $Case.Fixture "scripts\check-template.ps1"
    $arguments = @(
        "-NoProfile",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        $checker,
        "-Root",
        $Case.Fixture
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

        return [pscustomobject]@{
            Case = $Case
            Process = $process
            StandardOutput = $process.StandardOutput.ReadToEndAsync()
            StandardError = $process.StandardError.ReadToEndAsync()
        }
    } catch {
        $process.Dispose()
        throw
    }
}

function Complete-CheckerProcess {
    param([object]$Running)

    $Running.Process.WaitForExit()
    $combinedOutput = @(
        $Running.StandardOutput.Result,
        $Running.StandardError.Result
    ) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }

    $result = [pscustomobject]@{
        Case = $Running.Case
        ExitCode = $Running.Process.ExitCode
        Output = ($combinedOutput -join [Environment]::NewLine).Trim()
    }
    $Running.Process.Dispose()
    return $result
}

function Invoke-QueuedCheckerProcesses {
    if ($script:checkerCases.Count -eq 0) {
        return
    }

    $pending = New-Object System.Collections.Generic.Queue[object]
    foreach ($case in $script:checkerCases) {
        $pending.Enqueue($case)
    }

    $running = New-Object System.Collections.Generic.List[object]
    $results = New-Object System.Collections.Generic.List[object]
    Write-Host "Running $($pending.Count) checker cases with concurrency $checkerConcurrency."

    try {
        while ($pending.Count -gt 0 -or $running.Count -gt 0) {
            while ($pending.Count -gt 0 -and $running.Count -lt $checkerConcurrency) {
                $running.Add((Start-CheckerProcess $pending.Dequeue())) | Out-Null
            }

            $completed = $false
            for ($index = $running.Count - 1; $index -ge 0; $index--) {
                if ($running[$index].Process.HasExited) {
                    $results.Add((Complete-CheckerProcess $running[$index])) | Out-Null
                    $running.RemoveAt($index)
                    $completed = $true
                }
            }

            if (-not $completed -and $running.Count -gt 0) {
                Start-Sleep -Milliseconds 25
            }
        }
    } finally {
        foreach ($entry in $running) {
            try {
                if (-not $entry.Process.HasExited) {
                    $entry.Process.Kill()
                    $entry.Process.WaitForExit()
                }
            } finally {
                $entry.Process.Dispose()
            }
        }
    }

    foreach ($result in @($results | Sort-Object { $_.Case.Ordinal })) {
        $passed = $result.ExitCode -eq 0
        if ($passed -ne $result.Case.ShouldPass) {
            $expectation = if ($result.Case.ShouldPass) { "pass" } else { "fail" }
            $failures.Add(
                "$($result.Case.Name) expected checker to $expectation but exit code was $($result.ExitCode). Output: $($result.Output)"
            ) | Out-Null
            continue
        }

        if (-not [string]::IsNullOrWhiteSpace($result.Case.ExpectedOutputTerm) -and
            $result.Output.IndexOf(
                $result.Case.ExpectedOutputTerm,
                [System.StringComparison]::OrdinalIgnoreCase
            ) -lt 0) {
            $failures.Add(
                "$($result.Case.Name) expected checker output to include '$($result.Case.ExpectedOutputTerm)'. Output: $($result.Output)"
            ) | Out-Null
            continue
        }

        $state = if ($result.Case.ShouldPass) { "accepted" } else { "rejected" }
        Write-Host "PASS: $($result.Case.Name) ($state as expected)"
    }

    $script:checkerCases.Clear()
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
        [bool]$ShouldPass,
        [string]$ExpectedOutputTerm = ""
    )

    $script:checkerCases.Add([pscustomobject]@{
        Ordinal = $script:checkerCases.Count
        Name = $Name
        Fixture = $Fixture
        ShouldPass = $ShouldPass
        ExpectedOutputTerm = $ExpectedOutputTerm
    }) | Out-Null

    if ($script:checkerCases.Count -ge $checkerConcurrency) {
        Invoke-QueuedCheckerProcesses
    }
}

try {
    $resolvedTestRoot = [System.IO.Path]::GetFullPath($testRoot)
    if (-not $resolvedTestRoot.StartsWith($tempParent, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to create checker fixtures outside the system temp directory: $resolvedTestRoot"
    }
    New-Item -ItemType Directory -Path $resolvedTestRoot -Force | Out-Null
    New-Item -ItemType Directory -Path $fixtureSourceRoot -Force | Out-Null
    Copy-FixtureSourceTree $RepoRoot $fixtureSourceRoot

    $baseline = New-Fixture "baseline"
    Assert-CheckerResult "valid repository" $baseline $true

    $legacyHeadingFixture = New-Fixture "legacy-readme-heading"
    $legacyHeadingPath = Join-Path $legacyHeadingFixture "README.md"
    $legacyHeadingText = (Get-Content -LiteralPath $legacyHeadingPath -Raw).Replace("# SWECircuit", "# TraceRail")
    Write-Utf8 $legacyHeadingPath $legacyHeadingText
    Assert-CheckerResult "legacy README project heading" $legacyHeadingFixture $false

    $fencedReadmeHeadingFixture = New-Fixture "fenced-readme-required-heading"
    $fencedReadmeHeadingPath = Join-Path $fencedReadmeHeadingFixture "README.md"
    $fencedReadmeHeadingText = Get-Content -LiteralPath $fencedReadmeHeadingPath -Raw
    $requiredReadmeHeading = "## How It Works"
    if (-not $fencedReadmeHeadingText.Contains($requiredReadmeHeading)) {
        throw "Fenced README fixture could not find the required heading."
    }
    $fencedReadmeHeading = '```markdown' + [Environment]::NewLine +
        $requiredReadmeHeading + [Environment]::NewLine +
        '```'
    $fencedReadmeHeadingText = $fencedReadmeHeadingText.Replace($requiredReadmeHeading, $fencedReadmeHeading)
    Write-Utf8 $fencedReadmeHeadingPath $fencedReadmeHeadingText
    Assert-CheckerResult "required README heading hidden in fence" $fencedReadmeHeadingFixture $false "Missing heading 'How It Works'"
    $splitReadmeHeadingFixture = New-Fixture "split-readme-required-heading"
    $splitReadmeHeadingPath = Join-Path $splitReadmeHeadingFixture "README.md"
    $splitReadmeHeadingText = Get-Content -LiteralPath $splitReadmeHeadingPath -Raw
    if (-not $splitReadmeHeadingText.Contains($requiredReadmeHeading)) {
        throw "Split README fixture could not find the required heading."
    }
    $splitReadmeHeadingText = $splitReadmeHeadingText.Replace(
        $requiredReadmeHeading,
        "##" + [Environment]::NewLine + "How It Works"
    )
    Write-Utf8 $splitReadmeHeadingPath $splitReadmeHeadingText
    Assert-CheckerResult "required README heading split across lines" $splitReadmeHeadingFixture $false "Missing heading 'How It Works'"

    $indentedFenceLiteralFixture = New-Fixture "indented-fence-literal-before-heading"
    $indentedFenceLiteralPath = Join-Path $indentedFenceLiteralFixture "README.md"
    $indentedFenceLiteralText = Get-Content -LiteralPath $indentedFenceLiteralPath -Raw
    if (-not $indentedFenceLiteralText.Contains($requiredReadmeHeading)) {
        throw "Indented-literal fixture could not find the required heading."
    }
    $indentedFenceLiteralText = $indentedFenceLiteralText.Replace(
        $requiredReadmeHeading,
        '    ```' + [Environment]::NewLine + $requiredReadmeHeading
    )
    Write-Utf8 $indentedFenceLiteralPath $indentedFenceLiteralText
    Assert-CheckerResult "four-space fence literal before active heading" $indentedFenceLiteralFixture $true

    $duplicateReadmeHeadingFixture = New-Fixture "duplicate-readme-required-heading"
    $duplicateReadmeHeadingPath = Join-Path $duplicateReadmeHeadingFixture "README.md"
    $duplicateReadmeHeadingText = Get-Content -LiteralPath $duplicateReadmeHeadingPath -Raw
    $duplicateReadmeHeadingText = $duplicateReadmeHeadingText.TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        "## How It Works" + [Environment]::NewLine + [Environment]::NewLine +
        "Duplicate active owner." + [Environment]::NewLine
    Write-Utf8 $duplicateReadmeHeadingPath $duplicateReadmeHeadingText
    Assert-CheckerResult "duplicate required README heading" $duplicateReadmeHeadingFixture $false "Duplicate heading 'How It Works'"

    $legacyRemoteFixture = New-Fixture "legacy-readme-remote"
    $legacyRemotePath = Join-Path $legacyRemoteFixture "README.md"
    $legacyRemoteText = (Get-Content -LiteralPath $legacyRemotePath -Raw).Replace(
        "https://github.com/GarrettAudet/SWECircuit",
        "https://github.com/GarrettAudet/TraceRail"
    )
    Write-Utf8 $legacyRemotePath $legacyRemoteText
    Assert-CheckerResult "legacy README repository URL" $legacyRemoteFixture $false

    $fencedLegacyRemoteFixture = New-Fixture "fenced-legacy-readme-remote"
    $fencedLegacyRemotePath = Join-Path $fencedLegacyRemoteFixture "README.md"
    $fencedLegacyRemoteText = (Get-Content -LiteralPath $fencedLegacyRemotePath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '```text' + [Environment]::NewLine +
        'https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine +
        '```' + [Environment]::NewLine
    Write-Utf8 $fencedLegacyRemotePath $fencedLegacyRemoteText
    Assert-CheckerResult "retired README URL hidden in fence" $fencedLegacyRemoteFixture $true

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
    Remove-FixtureItem (Join-Path $missingOverviewFixture "docs\assets\swecircuit-overview.png")
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

    $fencedOverclaimFixture = New-Fixture "fenced-capability-overclaim-example"
    $fencedOverclaimPath = Join-Path $fencedOverclaimFixture "README.md"
    $fencedOverclaimText = (Get-Content -LiteralPath $fencedOverclaimPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '```text' + [Environment]::NewLine +
        'SWECircuit launches agents.' + [Environment]::NewLine +
        '```' + [Environment]::NewLine
    Write-Utf8 $fencedOverclaimPath $fencedOverclaimText
    Assert-CheckerResult "fenced capability overclaim example" $fencedOverclaimFixture $true

    $listClosingFixture = New-Fixture "ordered-list-closing-fence-before-overclaim"
    $listClosingPath = Join-Path $listClosingFixture "README.md"
    $listClosingText = (Get-Content -LiteralPath $listClosingPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '10. ```text' + [Environment]::NewLine +
        '    inactive example' + [Environment]::NewLine +
        '    ```' + [Environment]::NewLine +
        'SWECircuit launches agents.' + [Environment]::NewLine
    Write-Utf8 $listClosingPath $listClosingText
    Assert-CheckerResult "ordered-list closing fence before active overclaim" $listClosingFixture $false "README positively claims a capability owned by an external runtime"

    $listEndFixture = New-Fixture "ordered-list-container-end-before-overclaim"
    $listEndPath = Join-Path $listEndFixture "README.md"
    $listEndText = (Get-Content -LiteralPath $listEndPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '10. ```text' + [Environment]::NewLine +
        '    inactive example' + [Environment]::NewLine +
        'SWECircuit launches agents.' + [Environment]::NewLine
    Write-Utf8 $listEndPath $listEndText
    Assert-CheckerResult "ordered-list container end exposes active overclaim" $listEndFixture $false "README positively claims a capability owned by an external runtime"

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

    $fencedNavigationFixture = New-Fixture "fenced-readme-navigation"
    $fencedNavigationPath = Join-Path $fencedNavigationFixture "README.md"
    $fencedNavigationText = Get-Content -LiteralPath $fencedNavigationPath -Raw
    $navigationLine = @($fencedNavigationText -split "\r?\n" | Where-Object { $_.Contains("docs/ai/handbook.md") })[0]
    if ([string]::IsNullOrWhiteSpace($navigationLine)) {
        throw "Fenced navigation fixture could not find the handbook link line."
    }
    $fencedNavigationBlock = '```markdown' + [Environment]::NewLine +
        $navigationLine + [Environment]::NewLine +
        '```'
    $fencedNavigationText = $fencedNavigationText.Replace($navigationLine, $fencedNavigationBlock)
    Write-Utf8 $fencedNavigationPath $fencedNavigationText
    Assert-CheckerResult "README navigation hidden in fence" $fencedNavigationFixture $false "README missing required active local link: AGENTS.md"
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

    $fencedCapabilityFixture = New-Fixture "fenced-readme-current-capability"
    $fencedCapabilityPath = Join-Path $fencedCapabilityFixture "README.md"
    $fencedCapabilityText = Get-Content -LiteralPath $fencedCapabilityPath -Raw
    $capabilityPhrase = "The V10 kernel can now validate and execute one host-selected work packet through a caller-injected executor"
    $capabilityLine = @($fencedCapabilityText -split "\r?\n" | Where-Object { $_.Contains($capabilityPhrase) })[0]
    if ([string]::IsNullOrWhiteSpace($capabilityLine)) {
        throw "Fenced capability fixture could not find the current capability line."
    }
    $fencedCapabilityBlock = '~~~text' + [Environment]::NewLine +
        $capabilityLine + [Environment]::NewLine +
        '~~~'
    $fencedCapabilityText = $fencedCapabilityText.Replace($capabilityLine, $fencedCapabilityBlock)
    Write-Utf8 $fencedCapabilityPath $fencedCapabilityText
    Assert-CheckerResult "README current capability hidden in fence" $fencedCapabilityFixture $false "README missing required active public-surface text"

    $mismatchedCloserFixture = New-Fixture "mismatched-container-closer"
    $mismatchedCloserPath = Join-Path $mismatchedCloserFixture "README.md"
    $mismatchedCloserText = (Get-Content -LiteralPath $mismatchedCloserPath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '```text' + [Environment]::NewLine +
        '- ```' + [Environment]::NewLine +
        $capabilityPhrase + [Environment]::NewLine +
        '- ```' + [Environment]::NewLine +
        '```' + [Environment]::NewLine
    Write-Utf8 $mismatchedCloserPath $mismatchedCloserText
    Assert-CheckerResult "mismatched list closer inside top-level fence" $mismatchedCloserFixture $false "README missing required active public-surface text"

    $matchedCloserFixture = New-Fixture "matched-container-closer-preserves-active-prose"
    $matchedCloserPath = Join-Path $matchedCloserFixture "README.md"
    $matchedCloserText = (Get-Content -LiteralPath $matchedCloserPath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '```text' + [Environment]::NewLine +
        '- ```' + [Environment]::NewLine +
        'inactive example' + [Environment]::NewLine +
        '- ```' + [Environment]::NewLine +
        '```' + [Environment]::NewLine +
        $capabilityPhrase + [Environment]::NewLine
    Write-Utf8 $matchedCloserPath $matchedCloserText
    Assert-CheckerResult "matched top-level closer preserves later active prose" $matchedCloserFixture $true

    $continuationFenceFixture = New-Fixture "ordered-list-continuation-fence"
    $continuationFencePath = Join-Path $continuationFenceFixture "README.md"
    $continuationFenceText = (Get-Content -LiteralPath $continuationFencePath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '10. example' + [Environment]::NewLine +
        '    ```text' + [Environment]::NewLine +
        '    ' + $capabilityPhrase + [Environment]::NewLine +
        '    ```' + [Environment]::NewLine
    Write-Utf8 $continuationFencePath $continuationFenceText
    Assert-CheckerResult "ordered-list continuation fence hides contract prose" $continuationFenceFixture $false "README missing required active public-surface text"

    $nestedQuoteFixture = New-Fixture "ordered-list-continuation-quote-fence"
    $nestedQuotePath = Join-Path $nestedQuoteFixture "README.md"
    $nestedQuoteText = (Get-Content -LiteralPath $nestedQuotePath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '10. outer item' + [Environment]::NewLine +
        '    > ```text' + [Environment]::NewLine +
        '    > ' + $capabilityPhrase + [Environment]::NewLine +
        '    > ```' + [Environment]::NewLine
    Write-Utf8 $nestedQuotePath $nestedQuoteText
    Assert-CheckerResult "ordered-list continuation quote fence hides contract prose" $nestedQuoteFixture $false "README missing required active public-surface text"

    $nestedListFixture = New-Fixture "ordered-list-continuation-nested-list-fence"
    $nestedListPath = Join-Path $nestedListFixture "README.md"
    $nestedListText = (Get-Content -LiteralPath $nestedListPath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '10. outer item' + [Environment]::NewLine +
        '    - ```text' + [Environment]::NewLine +
        '      ' + $capabilityPhrase + [Environment]::NewLine +
        '## Fixture Boundary' + [Environment]::NewLine
    Write-Utf8 $nestedListPath $nestedListText
    Assert-CheckerResult "ordered-list continuation nested-list fence hides contract prose" $nestedListFixture $false "README missing required active public-surface text"

    $survivingQuoteFixture = New-Fixture "surviving-outer-list-after-quote-fence"
    $survivingQuotePath = Join-Path $survivingQuoteFixture "README.md"
    $survivingQuoteText = (Get-Content -LiteralPath $survivingQuotePath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '1. outer item' + [Environment]::NewLine +
        '   > ```text' + [Environment]::NewLine +
        '   > inactive inner fence' + [Environment]::NewLine +
        '   outer continuation' + [Environment]::NewLine +
        '   ```text' + [Environment]::NewLine +
        '   inactive outer fence' + [Environment]::NewLine +
        'SWECircuit launches agents.' + [Environment]::NewLine
    Write-Utf8 $survivingQuotePath $survivingQuoteText
    Assert-CheckerResult "surviving outer list after quote fence exposes overclaim" $survivingQuoteFixture $false "README positively claims a capability owned by an external runtime"

    $survivingListFixture = New-Fixture "surviving-outer-list-after-nested-list-fence"
    $survivingListPath = Join-Path $survivingListFixture "README.md"
    $survivingListText = (Get-Content -LiteralPath $survivingListPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '1. outer item' + [Environment]::NewLine +
        '   1. ```text' + [Environment]::NewLine +
        '      inactive inner fence' + [Environment]::NewLine +
        '   outer continuation' + [Environment]::NewLine +
        '   ```text' + [Environment]::NewLine +
        '   inactive outer fence' + [Environment]::NewLine +
        'SWECircuit launches agents.' + [Environment]::NewLine
    Write-Utf8 $survivingListPath $survivingListText
    Assert-CheckerResult "surviving outer list after nested-list fence exposes overclaim" $survivingListFixture $false "README positively claims a capability owned by an external runtime"

    $tabbedFenceFixture = New-Fixture "tabbed-list-continuation-fence"
    $tabbedFencePath = Join-Path $tabbedFenceFixture "README.md"
    $tabCharacter = [string][char]9
    $tabbedFenceText = (Get-Content -LiteralPath $tabbedFencePath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '- outer item' + [Environment]::NewLine +
        $tabCharacter + '```text' + [Environment]::NewLine +
        $tabCharacter + $capabilityPhrase + [Environment]::NewLine +
        $tabCharacter + '```' + [Environment]::NewLine
    Write-Utf8 $tabbedFencePath $tabbedFenceText
    Assert-CheckerResult "tabbed list continuation fence hides contract prose" $tabbedFenceFixture $false "README missing required active public-surface text"

    $tabbedCloserFixture = New-Fixture "tabbed-list-closer-preserves-active-prose"
    $tabbedCloserPath = Join-Path $tabbedCloserFixture "README.md"
    $tabbedCloserText = (Get-Content -LiteralPath $tabbedCloserPath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '- outer item' + [Environment]::NewLine +
        $tabCharacter + '```text' + [Environment]::NewLine +
        $tabCharacter + 'inactive example' + [Environment]::NewLine +
        $tabCharacter + '```' + [Environment]::NewLine +
        $capabilityPhrase + [Environment]::NewLine
    Write-Utf8 $tabbedCloserPath $tabbedCloserText
    Assert-CheckerResult "tabbed list closer preserves later active prose" $tabbedCloserFixture $true

    $blankSeparatedQuoteFixture = New-Fixture "blank-separated-blockquote-fence"
    $blankSeparatedQuotePath = Join-Path $blankSeparatedQuoteFixture "README.md"
    $blankSeparatedQuoteText = (Get-Content -LiteralPath $blankSeparatedQuotePath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> ```text' + [Environment]::NewLine +
        '> inactive first quote' + [Environment]::NewLine +
        [Environment]::NewLine +
        '> SWECircuit launches agents.' + [Environment]::NewLine
    Write-Utf8 $blankSeparatedQuotePath $blankSeparatedQuoteText
    Assert-CheckerResult "blank-separated blockquote exposes active overclaim" $blankSeparatedQuoteFixture $false "README positively claims a capability owned by an external runtime"

    $blankSeparatedListQuoteFixture = New-Fixture "blank-separated-list-blockquote-fence"
    $blankSeparatedListQuotePath = Join-Path $blankSeparatedListQuoteFixture "README.md"
    $blankSeparatedListQuoteText = (Get-Content -LiteralPath $blankSeparatedListQuotePath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '1. outer item' + [Environment]::NewLine +
        '   > ```text' + [Environment]::NewLine +
        '   > inactive first quote' + [Environment]::NewLine +
        [Environment]::NewLine +
        '   > SWECircuit launches agents.' + [Environment]::NewLine
    Write-Utf8 $blankSeparatedListQuotePath $blankSeparatedListQuoteText
    Assert-CheckerResult "blank-separated nested blockquote exposes active overclaim" $blankSeparatedListQuoteFixture $false "README positively claims a capability owned by an external runtime"

    $markedBlankQuoteFixture = New-Fixture "marked-blank-blockquote-fence"
    $markedBlankQuotePath = Join-Path $markedBlankQuoteFixture "README.md"
    $markedBlankQuoteText = (Get-Content -LiteralPath $markedBlankQuotePath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> ```text' + [Environment]::NewLine +
        '> inactive first line' + [Environment]::NewLine +
        '>' + [Environment]::NewLine +
        '> SWECircuit launches agents.' + [Environment]::NewLine +
        '> ```' + [Environment]::NewLine
    Write-Utf8 $markedBlankQuotePath $markedBlankQuoteText
    Assert-CheckerResult "marked blockquote blank preserves fenced prose" $markedBlankQuoteFixture $true

    $relativeBlankFixture = New-Fixture "container-relative-blank-quote-fence"
    $relativeBlankPath = Join-Path $relativeBlankFixture "README.md"
    $relativeBlankText = (Get-Content -LiteralPath $relativeBlankPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> 1. > ~~~text' + [Environment]::NewLine +
        '>    > inactive inner fence' + [Environment]::NewLine +
        '>' + [Environment]::NewLine +
        '>    ~~~text' + [Environment]::NewLine +
        '>    inactive outer fence' + [Environment]::NewLine +
        '> SWECircuit launches agents.' + [Environment]::NewLine
    Write-Utf8 $relativeBlankPath $relativeBlankText
    Assert-CheckerResult "container-relative blank preserves outer list and exposes overclaim" $relativeBlankFixture $false "README positively claims a capability owned by an external runtime"

    $fullyMarkedBlankFixture = New-Fixture "fully-marked-nested-blank-fence"
    $fullyMarkedBlankPath = Join-Path $fullyMarkedBlankFixture "README.md"
    $fullyMarkedBlankText = (Get-Content -LiteralPath $fullyMarkedBlankPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> 1. > ~~~text' + [Environment]::NewLine +
        '>    > inactive first line' + [Environment]::NewLine +
        '>    >' + [Environment]::NewLine +
        '>    > SWECircuit launches agents.' + [Environment]::NewLine +
        '>    > ~~~' + [Environment]::NewLine
    Write-Utf8 $fullyMarkedBlankPath $fullyMarkedBlankText
    Assert-CheckerResult "fully marked nested blank preserves fenced prose" $fullyMarkedBlankFixture $true

    $noBreakSpace = [string][char]0x00A0
    $unicodeWhitespaceFixture = New-Fixture "unicode-whitespace-ends-list-fence"
    $unicodeWhitespacePath = Join-Path $unicodeWhitespaceFixture "README.md"
    $unicodeWhitespaceText = (Get-Content -LiteralPath $unicodeWhitespacePath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '- ~~~text' + [Environment]::NewLine +
        '  inactive first line' + [Environment]::NewLine +
        $noBreakSpace + [Environment]::NewLine +
        '  https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $unicodeWhitespacePath $unicodeWhitespaceText
    Assert-CheckerResult "Unicode whitespace ends list-owned fence" $unicodeWhitespaceFixture $false "README contains the retired GarrettAudet/TraceRail repository URL"

    $continuedUnicodeFixture = New-Fixture "continued-unicode-content-stays-fenced"
    $continuedUnicodePath = Join-Path $continuedUnicodeFixture "README.md"
    $continuedUnicodeText = (Get-Content -LiteralPath $continuedUnicodePath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '- ~~~text' + [Environment]::NewLine +
        '  inactive first line' + [Environment]::NewLine +
        '  ' + $noBreakSpace + [Environment]::NewLine +
        '  SWECircuit launches agents.' + [Environment]::NewLine +
        '  ~~~' + [Environment]::NewLine
    Write-Utf8 $continuedUnicodePath $continuedUnicodeText
    Assert-CheckerResult "continued Unicode content remains fenced" $continuedUnicodeFixture $true

    $partialTabFixture = New-Fixture "quote-list-partial-tab-ends-fence"
    $partialTabPath = Join-Path $partialTabFixture "README.md"
    $partialTabText = (Get-Content -LiteralPath $partialTabPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> 10. ~~~text' + [Environment]::NewLine +
        '> ' + [char]9 + 'https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $partialTabPath $partialTabText
    Assert-CheckerResult "partial quote-relative tab ends list-owned fence" $partialTabFixture $false "README contains the retired GarrettAudet/TraceRail repository URL"

    $fullTabFixture = New-Fixture "quote-list-full-tab-keeps-fence"
    $fullTabPath = Join-Path $fullTabFixture "README.md"
    $fullTabText = (Get-Content -LiteralPath $fullTabPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> 10. ~~~text' + [Environment]::NewLine +
        '> ' + [char]9 + [char]9 + 'https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $fullTabPath $fullTabText
    Assert-CheckerResult "full quote-relative tab continuation remains fenced" $fullTabFixture $true

    $quotePaddingOpeningRejectFixture = New-Fixture "quote-padding-tab-opening-insufficient-continuation"
    $quotePaddingOpeningRejectPath = Join-Path $quotePaddingOpeningRejectFixture "README.md"
    $quotePaddingOpeningRejectText = (Get-Content -LiteralPath $quotePaddingOpeningRejectPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '>' + [char]9 + '- ~~~text' + [Environment]::NewLine +
        '>   https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $quotePaddingOpeningRejectPath $quotePaddingOpeningRejectText
    Assert-CheckerResult "quote-padding tab opener requires full list continuation" $quotePaddingOpeningRejectFixture $false "README contains the retired GarrettAudet/TraceRail repository URL"

    $quotePaddingOpeningAcceptFixture = New-Fixture "quote-padding-tab-opening-sufficient-continuation"
    $quotePaddingOpeningAcceptPath = Join-Path $quotePaddingOpeningAcceptFixture "README.md"
    $quotePaddingOpeningAcceptText = (Get-Content -LiteralPath $quotePaddingOpeningAcceptPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '>' + [char]9 + '- ~~~text' + [Environment]::NewLine +
        '>     https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $quotePaddingOpeningAcceptPath $quotePaddingOpeningAcceptText
    Assert-CheckerResult "quote-padding tab opener with full list continuation remains fenced" $quotePaddingOpeningAcceptFixture $true

    $quotePaddingContinuationRejectFixture = New-Fixture "quote-padding-tab-continuation-insufficient"
    $quotePaddingContinuationRejectPath = Join-Path $quotePaddingContinuationRejectFixture "README.md"
    $quotePaddingContinuationRejectText = (Get-Content -LiteralPath $quotePaddingContinuationRejectPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> 10. ~~~text' + [Environment]::NewLine +
        '>' + [char]9 + ' https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $quotePaddingContinuationRejectPath $quotePaddingContinuationRejectText
    Assert-CheckerResult "quote-padding tab continuation rejects below the list threshold" $quotePaddingContinuationRejectFixture $false "README contains the retired GarrettAudet/TraceRail repository URL"

    $quotePaddingContinuationAcceptFixture = New-Fixture "quote-padding-tab-continuation-sufficient"
    $quotePaddingContinuationAcceptPath = Join-Path $quotePaddingContinuationAcceptFixture "README.md"
    $quotePaddingContinuationAcceptText = (Get-Content -LiteralPath $quotePaddingContinuationAcceptPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> 10. ~~~text' + [Environment]::NewLine +
        '>' + [char]9 + '  https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $quotePaddingContinuationAcceptPath $quotePaddingContinuationAcceptText
    Assert-CheckerResult "quote-padding tab continuation preserves the full list threshold" $quotePaddingContinuationAcceptFixture $true

    $mixedFenceUrlFixture = New-Fixture "mixed-quote-fence-preserves-retired-url"
    $mixedFenceUrlPath = Join-Path $mixedFenceUrlFixture "README.md"
    $mixedFenceUrlText = (Get-Content -LiteralPath $mixedFenceUrlPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> ' + [char]9 + '~~~text' + [Environment]::NewLine +
        '> ' + [char]9 + 'https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine +
        '> ' + [char]9 + '~~~' + [Environment]::NewLine
    Write-Utf8 $mixedFenceUrlPath $mixedFenceUrlText
    Assert-CheckerResult "mixed quote fence keeps retired URL inactive" $mixedFenceUrlFixture $true

    $mixedFenceCapabilityFixture = New-Fixture "mixed-quote-fence-hides-required-capability"
    $mixedFenceCapabilityPath = Join-Path $mixedFenceCapabilityFixture "README.md"
    $mixedFenceCapabilityText = Get-Content -LiteralPath $mixedFenceCapabilityPath -Raw
    $mixedFenceCapabilityLine = @($mixedFenceCapabilityText -split "\r?\n" | Where-Object { $_.Contains($capabilityPhrase) })[0]
    if ([string]::IsNullOrWhiteSpace($mixedFenceCapabilityLine)) {
        throw "Mixed quote-fence fixture could not find the current capability line."
    }
    $mixedFenceCapabilityBlock = '> ' + [char]9 + '~~~text' + [Environment]::NewLine +
        '> ' + [char]9 + $mixedFenceCapabilityLine + [Environment]::NewLine +
        '> ' + [char]9 + '~~~'
    $mixedFenceCapabilityText = $mixedFenceCapabilityText.Replace($mixedFenceCapabilityLine, $mixedFenceCapabilityBlock)
    Write-Utf8 $mixedFenceCapabilityPath $mixedFenceCapabilityText
    Assert-CheckerResult "mixed quote fence cannot own required capability" $mixedFenceCapabilityFixture $false "README missing required active public-surface text"

    $mixedFenceCloserFixture = New-Fixture "mixed-quote-fence-closer-exposes-retired-url"
    $mixedFenceCloserPath = Join-Path $mixedFenceCloserFixture "README.md"
    $mixedFenceCloserText = (Get-Content -LiteralPath $mixedFenceCloserPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '> ~~~text' + [Environment]::NewLine +
        '> inactive example' + [Environment]::NewLine +
        '> ' + [char]9 + '~~~' + [Environment]::NewLine +
        '> https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $mixedFenceCloserPath $mixedFenceCloserText
    Assert-CheckerResult "mixed quote-fence closer exposes later retired URL" $mixedFenceCloserFixture $false "README contains the retired GarrettAudet/TraceRail repository URL"

    $nestedMixedFenceUrlFixture = New-Fixture "nested-mixed-quote-fence-preserves-retired-url"
    $nestedMixedFenceUrlPath = Join-Path $nestedMixedFenceUrlFixture "README.md"
    $nestedMixedFenceUrlText = (Get-Content -LiteralPath $nestedMixedFenceUrlPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '10. > ' + [char]9 + '~~~text' + [Environment]::NewLine +
        '    > ' + [char]9 + 'https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine +
        '    > ' + [char]9 + '~~~' + [Environment]::NewLine
    Write-Utf8 $nestedMixedFenceUrlPath $nestedMixedFenceUrlText
    Assert-CheckerResult "nested mixed quote fence keeps retired URL inactive" $nestedMixedFenceUrlFixture $true

    $nestedMixedFenceCapabilityFixture = New-Fixture "nested-mixed-quote-fence-hides-required-capability"
    $nestedMixedFenceCapabilityPath = Join-Path $nestedMixedFenceCapabilityFixture "README.md"
    $nestedMixedFenceCapabilityText = Get-Content -LiteralPath $nestedMixedFenceCapabilityPath -Raw
    $nestedMixedFenceCapabilityLine = @($nestedMixedFenceCapabilityText -split "\r?\n" | Where-Object { $_.Contains($capabilityPhrase) })[0]
    if ([string]::IsNullOrWhiteSpace($nestedMixedFenceCapabilityLine)) {
        throw "Nested mixed quote-fence fixture could not find the current capability line."
    }
    $nestedMixedFenceCapabilityBlock = '10. > ' + [char]9 + '```text' + [Environment]::NewLine +
        '    > ' + [char]9 + $nestedMixedFenceCapabilityLine + [Environment]::NewLine +
        '    > ' + [char]9 + '```'
    $nestedMixedFenceCapabilityText = $nestedMixedFenceCapabilityText.Replace($nestedMixedFenceCapabilityLine, $nestedMixedFenceCapabilityBlock)
    Write-Utf8 $nestedMixedFenceCapabilityPath $nestedMixedFenceCapabilityText
    Assert-CheckerResult "nested mixed quote fence cannot own required capability" $nestedMixedFenceCapabilityFixture $false "README missing required active public-surface text"

    $nestedMixedFenceCloserFixture = New-Fixture "nested-mixed-quote-fence-closer-exposes-retired-url"
    $nestedMixedFenceCloserPath = Join-Path $nestedMixedFenceCloserFixture "README.md"
    $nestedMixedFenceCloserText = (Get-Content -LiteralPath $nestedMixedFenceCloserPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '10. > ' + [char]9 + '```text' + [Environment]::NewLine +
        '    > ' + [char]9 + 'inactive example' + [Environment]::NewLine +
        '    > ' + [char]9 + '```' + [Environment]::NewLine +
        '    > https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $nestedMixedFenceCloserPath $nestedMixedFenceCloserText
    Assert-CheckerResult "nested mixed quote-fence closer exposes later retired URL" $nestedMixedFenceCloserFixture $false "README contains the retired GarrettAudet/TraceRail repository URL"

    $fenceTicks = ([string][char]96) * 3

    $mixedContinuationUrlFixture = New-Fixture "mixed-list-continuation-fence-preserves-retired-url"
    $mixedContinuationUrlPath = Join-Path $mixedContinuationUrlFixture "README.md"
    $mixedContinuationUrlText = (Get-Content -LiteralPath $mixedContinuationUrlPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '- outer item' + [Environment]::NewLine +
        ' ' + [char]9 + '~~~text' + [Environment]::NewLine +
        ' ' + [char]9 + 'https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine +
        ' ' + [char]9 + '~~~' + [Environment]::NewLine
    Write-Utf8 $mixedContinuationUrlPath $mixedContinuationUrlText
    Assert-CheckerResult "mixed list continuation fence keeps retired URL inactive" $mixedContinuationUrlFixture $true

    $mixedContinuationCapabilityFixture = New-Fixture "mixed-list-continuation-fence-hides-required-capability"
    $mixedContinuationCapabilityPath = Join-Path $mixedContinuationCapabilityFixture "README.md"
    $mixedContinuationCapabilityText = (Get-Content -LiteralPath $mixedContinuationCapabilityPath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '- outer item' + [Environment]::NewLine +
        '  ' + [char]9 + $fenceTicks + 'text' + [Environment]::NewLine +
        '  ' + [char]9 + $capabilityPhrase + [Environment]::NewLine +
        '  ' + [char]9 + $fenceTicks + [Environment]::NewLine
    Write-Utf8 $mixedContinuationCapabilityPath $mixedContinuationCapabilityText
    Assert-CheckerResult "mixed list continuation fence cannot own required capability" $mixedContinuationCapabilityFixture $false "README missing required active public-surface text"

    $mixedContinuationCloserFixture = New-Fixture "mixed-list-continuation-closer-exposes-retired-url"
    $mixedContinuationCloserPath = Join-Path $mixedContinuationCloserFixture "README.md"
    $mixedContinuationCloserText = (Get-Content -LiteralPath $mixedContinuationCloserPath -Raw).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '- outer item' + [Environment]::NewLine +
        ' ' + [char]9 + $fenceTicks + 'text' + [Environment]::NewLine +
        ' ' + [char]9 + 'inactive example' + [Environment]::NewLine +
        ' ' + [char]9 + $fenceTicks + [Environment]::NewLine +
        '  https://github.com/GarrettAudet/TraceRail' + [Environment]::NewLine
    Write-Utf8 $mixedContinuationCloserPath $mixedContinuationCloserText
    Assert-CheckerResult "mixed list continuation closer exposes later retired URL" $mixedContinuationCloserFixture $false "README contains the retired GarrettAudet/TraceRail repository URL"

    $overLimitMixedContinuationFixture = New-Fixture "over-limit-mixed-list-continuation-remains-literal"
    $overLimitMixedContinuationPath = Join-Path $overLimitMixedContinuationFixture "README.md"
    $overLimitMixedContinuationText = (Get-Content -LiteralPath $overLimitMixedContinuationPath -Raw).Replace(
        $capabilityPhrase,
        "current capability removed"
    ).TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        '- outer item' + [Environment]::NewLine +
        '    ' + [char]9 + $fenceTicks + 'text' + [Environment]::NewLine +
        '  ' + $capabilityPhrase + [Environment]::NewLine
    Write-Utf8 $overLimitMixedContinuationPath $overLimitMixedContinuationText
    Assert-CheckerResult "over-limit mixed list continuation remains literal" $overLimitMixedContinuationFixture $true

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
        Assert-CheckerResult ("executor liveness prerequisite: " + $surface.Name) $fixture $false "Contract locator"
    }

    $grantFixture = New-Fixture "missing-packaged-grant-non-guarantees"
    $grantPath = Join-Path $grantFixture "docs\framework\executor-boundary.md"
    $grantText = Get-Content -LiteralPath $grantPath -Raw
    $grantDisclaimer = "The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay."
    if ($grantText -notmatch [regex]::Escape($grantDisclaimer)) {
        throw "Grant fixture source is missing the expected disclaimer."
    }
    Write-Utf8 $grantPath ($grantText.Replace($grantDisclaimer, "Grant non-guarantees removed."))
    Assert-CheckerResult "packaged guide missing grant non-guarantees" $grantFixture $false "Contract locator"

    $schemaGrantFixture = New-Fixture "missing-schema-grant-non-guarantees"
    $schemaGrantPath = Join-Path $schemaGrantFixture "schemas\v1alpha1\README.md"
    $schemaGrantText = Get-Content -LiteralPath $schemaGrantPath -Raw
    $schemaGrantDisclaimer = "The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay."
    if ($schemaGrantText -notmatch [regex]::Escape($schemaGrantDisclaimer)) {
        throw "Schema grant fixture source is missing the expected disclaimer."
    }
    Write-Utf8 $schemaGrantPath ($schemaGrantText.Replace($schemaGrantDisclaimer, "Schema grant non-guarantees removed."))
    Assert-CheckerResult "schema guide missing grant non-guarantees" $schemaGrantFixture $false "Contract locator"

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
    Assert-CheckerResult "accepted practice outside Current Practices table" $practiceStructureFixture $false "Contract table row"

    $practiceInsideFixture = New-Fixture "practice-row-below-current-table"
    $practiceInsidePath = Join-Path $practiceInsideFixture "docs\research\practice-register.md"
    $practiceInsideText = Get-Content -LiteralPath $practiceInsidePath -Raw
    $practiceInsideRow = [regex]::Match(
        $practiceInsideText,
        '(?m)^\| Public contract parity checks \|[^\r\n]*(?:\r?\n|$)'
    )
    if (-not $practiceInsideRow.Success) {
        throw "Practice-in-section fixture could not find the accepted row."
    }
    $practiceInsideText = $practiceInsideText.Remove($practiceInsideRow.Index, $practiceInsideRow.Length)
    $promotionMarker = "## Promotion Criteria"
    if (-not $practiceInsideText.Contains($promotionMarker)) {
        throw "Practice-in-section fixture could not find Promotion Criteria."
    }
    $relocatedPractice = "Relocated accepted row below the canonical table." +
        [Environment]::NewLine + [Environment]::NewLine +
        $practiceInsideRow.Value.TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        $promotionMarker
    $practiceInsideText = $practiceInsideText.Replace($promotionMarker, $relocatedPractice)
    Write-Utf8 $practiceInsidePath $practiceInsideText
    Assert-CheckerResult "accepted practice below first Current Practices table" $practiceInsideFixture $false "Contract table row"

    $fencedPracticeFixture = New-Fixture "practice-current-table-fenced"
    $fencedPracticePath = Join-Path $fencedPracticeFixture "docs\research\practice-register.md"
    $fencedPracticeText = Get-Content -LiteralPath $fencedPracticePath -Raw
    $practiceTableMatch = [regex]::Match(
        $fencedPracticeText,
        '(?m)^\| Practice \| Status \| Source \| Decision \| Rationale \|(?:\r?\n^\|[^\r\n]*\|)+(?=\r?\n\r?\n## Promotion Criteria(?:\r?\n|\z))'
    )
    if (-not $practiceTableMatch.Success) {
        throw "Fenced-practice fixture could not find the Current Practices table."
    }
    $practiceTableStart = $practiceTableMatch.Index
    $practiceTable = $practiceTableMatch.Value
    $fencedPracticeTable = "~~~markdown" + [Environment]::NewLine +
        $practiceTable + [Environment]::NewLine +
        "~~~"
    $fencedPracticeText = $fencedPracticeText.Remove(
        $practiceTableStart,
        $practiceTable.Length
    ).Insert($practiceTableStart, $fencedPracticeTable)
    Write-Utf8 $fencedPracticePath $fencedPracticeText
    Assert-CheckerResult "accepted practices hidden in fenced table" $fencedPracticeFixture $false "Contract table scope"

    $nestedPracticeFixture = New-Fixture "practice-current-table-list-fenced"
    $nestedPracticePath = Join-Path $nestedPracticeFixture "docs\research\practice-register.md"
    $nestedPracticeText = Get-Content -LiteralPath $nestedPracticePath -Raw
    $indentedPracticeTable = @($practiceTable -split "\r?\n" | ForEach-Object { "   $_" }) -join [Environment]::NewLine
    $nestedPracticeFence = "1. ~~~markdown" + [Environment]::NewLine +
        $indentedPracticeTable + [Environment]::NewLine +
        "   ~~~"
    if (-not $nestedPracticeText.Contains($practiceTable)) {
        throw "Nested-practice fixture could not find the Current Practices table."
    }
    $nestedPracticeText = $nestedPracticeText.Replace($practiceTable, $nestedPracticeFence)
    Write-Utf8 $nestedPracticePath $nestedPracticeText
    Assert-CheckerResult "accepted practices hidden in ordered-list fence" $nestedPracticeFixture $false "Contract table scope"

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
        Assert-CheckerResult ("executor lifecycle contradiction: " + $contradiction.Name) $fixture $false "Contract contradiction"
    }

    $logicalLifecycleContradictions = @(
        @{
            Name = "soft-wrapped-confirmation"
            Claim = "Timely settlement confirms all invocation" +
                [Environment]::NewLine +
                "activity has stopped."
        },
        @{
            Name = "confirmation-synonym"
            Claim = "Settlement confirms invocation work has stopped."
        }
    )
    foreach ($contradiction in $logicalLifecycleContradictions) {
        $fixture = New-Fixture ("executor-logical-lifecycle-contradiction-" + $contradiction.Name)
        $path = Join-Path $fixture "docs\framework\executor-boundary.md"
        $content = Get-Content -LiteralPath $path -Raw
        if (-not $content.Contains($lifecycleAnchor)) {
            throw "Logical lifecycle fixture could not find the intended contract line."
        }
        $content = $content.Replace(
            $lifecycleAnchor,
            $lifecycleAnchor + [Environment]::NewLine + [Environment]::NewLine + $contradiction.Claim
        )
        Write-Utf8 $path $content
        Assert-CheckerResult ("logical lifecycle contradiction: " + $contradiction.Name) $fixture $false "Contract contradiction"
    }

    $grantAnchor = '`Invocation-scoped` describes the grant''s identity and permission binding only. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.'
    $grantContradictions = @(
        @{ Name = "authenticates-issuer"; Claim = "The stateless kernel authenticates the issuer." },
        @{ Name = "establishes-freshness"; Claim = "The stateless kernel establishes grant freshness." },
        @{ Name = "single-use"; Claim = "Every grant is single-use." },
        @{ Name = "fresh"; Claim = "Every grant is fresh." },
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
        Assert-CheckerResult ("executor grant contradiction: " + $contradiction.Name) $fixture $false "Contract contradiction"
    }

    $truthfulContractFixture = New-Fixture "truthful-executor-contract-negations"
    $truthfulContractPath = Join-Path $truthfulContractFixture "docs\framework\executor-boundary.md"
    $truthfulContractText = Get-Content -LiteralPath $truthfulContractPath -Raw
    if (-not $truthfulContractText.Contains($lifecycleAnchor) -or
        -not $truthfulContractText.Contains($grantAnchor)) {
        throw "Truthful-negative fixture could not find both contract anchors."
    }
    $truthfulLifecycleClaims = "Timely settlement does not prove invocation work has stopped." +
        [Environment]::NewLine +
        "A no-call terminal result does not require executor acknowledgment."
    $truthfulGrantClaims = "The kernel never authenticates the issuer." +
        [Environment]::NewLine +
        "The stateless kernel does not establish grant freshness." +
        [Environment]::NewLine +
        "No grant is fresh or single-use by default."
    $truthfulContractText = $truthfulContractText.Replace(
        $lifecycleAnchor,
        $lifecycleAnchor + [Environment]::NewLine + [Environment]::NewLine + $truthfulLifecycleClaims
    )
    $truthfulContractText = $truthfulContractText.Replace(
        $grantAnchor,
        $grantAnchor + [Environment]::NewLine + [Environment]::NewLine + $truthfulGrantClaims
    )
    Write-Utf8 $truthfulContractPath $truthfulContractText
    Assert-CheckerResult "truthful executor contract negations" $truthfulContractFixture $true

    $livenessRelocationFixture = New-Fixture "handbook-liveness-sibling-subsection"
    $livenessRelocationPath = Join-Path $livenessRelocationFixture "docs\ai\handbook.md"
    $livenessRelocationText = Get-Content -LiteralPath $livenessRelocationPath -Raw
    $handbookLivenessAnchor = 'Cancellation is cooperative after invocation. A terminal `cancelled` result means either the abort or deadline won before any executor call, or caller cancellation won after invocation and the executor produced contract-compliant acknowledgment inside the window. A terminal `timed_out` result means the deadline won after invocation and the executor produced that acknowledgment inside the window. `cancellationAcknowledged: true` therefore means terminal certainty, not executor acknowledgment on a no-call path. For invoked work, settlement counts as acknowledgment only when the executor promise remains pending until all activity capable of advancing the invocation or producing invocation effects has stopped; transferring live work is not acknowledgment. An `abort_unconfirmed` result means work may still be live; quarantine the workspace or provider run and do not merge its output until the host resolves it.'
    if (-not $livenessRelocationText.Contains($handbookLivenessAnchor)) {
        throw "Liveness subsection fixture could not find the intended handbook contract line."
    }
    $livenessRelocationTarget = "Active cancellation contract removed from the bounded executor subsection."
    $livenessRelocationDecoy = "### Archived Executor Notes" +
        [Environment]::NewLine + [Environment]::NewLine +
        $handbookLivenessAnchor
    $livenessRelocationText = $livenessRelocationText.Replace(
        $handbookLivenessAnchor,
        $livenessRelocationTarget + [Environment]::NewLine + [Environment]::NewLine + $livenessRelocationDecoy
    )
    Write-Utf8 $livenessRelocationPath $livenessRelocationText
    Assert-CheckerResult "executor liveness contract relocated to sibling subsection" $livenessRelocationFixture $false "Contract locator"
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
    Assert-CheckerResult "executor grant disclaimer relocated within section" $grantRelocationFixture $false "Contract locator"

    $fencedGrantFixture = New-Fixture "executor-grant-contract-fenced"
    $fencedGrantPath = Join-Path $fencedGrantFixture "docs\framework\executor-boundary.md"
    $fencedGrantText = Get-Content -LiteralPath $fencedGrantPath -Raw
    if (-not $fencedGrantText.Contains($grantAnchor)) {
        throw "Fenced-grant fixture could not find the intended contract line."
    }
    $fencedGrantContract = '```text' + [Environment]::NewLine +
        $grantAnchor + [Environment]::NewLine +
        '```'
    $fencedGrantText = $fencedGrantText.Replace($grantAnchor, $fencedGrantContract)
    Write-Utf8 $fencedGrantPath $fencedGrantText
    Assert-CheckerResult "executor grant contract hidden in fence" $fencedGrantFixture $false "Contract locator"

    $nestedGrantFixture = New-Fixture "executor-grant-contract-nested-fenced"
    $nestedGrantPath = Join-Path $nestedGrantFixture "docs\framework\executor-boundary.md"
    $nestedGrantText = Get-Content -LiteralPath $nestedGrantPath -Raw
    if (-not $nestedGrantText.Contains($grantAnchor)) {
        throw "Nested-grant fixture could not find the intended contract line."
    }
    $nestedGrantContract = '> > - ```text' + [Environment]::NewLine +
        "> >   " + $grantAnchor + [Environment]::NewLine +
        '> >   ```'
    $nestedGrantText = $nestedGrantText.Replace($grantAnchor, $nestedGrantContract)
    Write-Utf8 $nestedGrantPath $nestedGrantText
    Assert-CheckerResult "executor grant contract hidden in nested blockquote/list fence" $nestedGrantFixture $false "Contract locator"

    $duplicateSectionFixture = New-Fixture "executor-result-semantics-duplicate-owner"
    $duplicateSectionPath = Join-Path $duplicateSectionFixture "docs\framework\executor-boundary.md"
    $duplicateSectionText = Get-Content -LiteralPath $duplicateSectionPath -Raw
    $duplicateSectionText = $duplicateSectionText.TrimEnd([char]13, [char]10) +
        [Environment]::NewLine + [Environment]::NewLine +
        "## Result Semantics" + [Environment]::NewLine + [Environment]::NewLine +
        "Timely settlement confirms all invocation activity has stopped." +
        [Environment]::NewLine
    Write-Utf8 $duplicateSectionPath $duplicateSectionText
    Assert-CheckerResult "duplicate executor contract section" $duplicateSectionFixture $false "Contract locator"

    $duplicateSubsectionFixture = New-Fixture "handbook-executor-duplicate-subsection"
    $duplicateSubsectionPath = Join-Path $duplicateSubsectionFixture "docs\ai\handbook.md"
    $duplicateSubsectionText = Get-Content -LiteralPath $duplicateSubsectionPath -Raw
    $nextHandbookSection = "## 21. Starting A New Feature"
    if (-not $duplicateSubsectionText.Contains($nextHandbookSection)) {
        throw "Duplicate-subsection fixture could not find the next handbook section."
    }
    $duplicateSubsectionOwner = "### Bounded Executor Boundary" +
        [Environment]::NewLine + [Environment]::NewLine +
        "Settlement confirms invocation work has stopped." +
        [Environment]::NewLine + [Environment]::NewLine +
        $nextHandbookSection
    $duplicateSubsectionText = $duplicateSubsectionText.Replace(
        $nextHandbookSection,
        $duplicateSubsectionOwner
    )
    Write-Utf8 $duplicateSubsectionPath $duplicateSubsectionText
    Assert-CheckerResult "duplicate handbook contract subsection" $duplicateSubsectionFixture $false "Contract locator"

    $debugFixture = New-Fixture "missing-debug-evidence"
    $debugPath = Join-Path $debugFixture "docs\specs\v8-readme-visual-clarity\debug-notes.md"
    $debugText = (Get-Content -LiteralPath $debugPath -Raw).Replace("## Reproduction", "## Reproduction Removed")
    Write-Utf8 $debugPath $debugText
    Assert-CheckerResult "complete debug record missing reproduction" $debugFixture $false

    $fencedDebugFixture = New-Fixture "fenced-debug-heading"
    $fencedDebugPath = Join-Path $fencedDebugFixture "docs\specs\v8-readme-visual-clarity\debug-notes.md"
    $fencedDebugText = Get-Content -LiteralPath $fencedDebugPath -Raw
    $debugHeading = "## Reproduction"
    if (-not $fencedDebugText.Contains($debugHeading)) {
        throw "Fenced debug fixture could not find Reproduction."
    }
    $fencedDebugHeading = '~~~markdown' + [Environment]::NewLine +
        $debugHeading + [Environment]::NewLine +
        '~~~'
    $fencedDebugText = $fencedDebugText.Replace($debugHeading, $fencedDebugHeading)
    Write-Utf8 $fencedDebugPath $fencedDebugText
    Assert-CheckerResult "debug heading hidden in fence" $fencedDebugFixture $false "Debug notes missing Reproduction"
    $splitDebugFixture = New-Fixture "split-debug-heading"
    $splitDebugPath = Join-Path $splitDebugFixture "docs\specs\v8-readme-visual-clarity\debug-notes.md"
    $splitDebugText = (Get-Content -LiteralPath $splitDebugPath -Raw).Replace(
        $debugHeading,
        "##" + [Environment]::NewLine + "Reproduction"
    )
    Write-Utf8 $splitDebugPath $splitDebugText
    Assert-CheckerResult "debug heading split across lines" $splitDebugFixture $false "Debug notes missing Reproduction"

    $splitRcaFixture = New-Fixture "split-rca-heading"
    $splitRcaPath = Join-Path $splitRcaFixture "docs\specs\v8-readme-visual-clarity\root-cause-analysis.md"
    $splitRcaText = (Get-Content -LiteralPath $splitRcaPath -Raw).Replace(
        "## Reproduction",
        "##" + [Environment]::NewLine + "Reproduction"
    )
    Write-Utf8 $splitRcaPath $splitRcaText
    Assert-CheckerResult "RCA heading split across lines" $splitRcaFixture $false "RCA missing Reproduction"

    $fencedCriteriaFixture = New-Fixture "fenced-acceptance-criteria-heading"
    $fencedCriteriaPath = Join-Path $fencedCriteriaFixture "docs\specs\v8.1-baseline-integrity\spec.md"
    $fencedCriteriaText = Get-Content -LiteralPath $fencedCriteriaPath -Raw
    $criteriaHeading = "## Acceptance Criteria"
    if (-not $fencedCriteriaText.Contains($criteriaHeading)) {
        throw "Fenced criteria fixture could not find Acceptance Criteria."
    }
    $fencedCriteriaHeading = '```markdown' + [Environment]::NewLine +
        $criteriaHeading + [Environment]::NewLine +
        '```'
    $fencedCriteriaText = $fencedCriteriaText.Replace($criteriaHeading, $fencedCriteriaHeading)
    Write-Utf8 $fencedCriteriaPath $fencedCriteriaText
    Assert-CheckerResult "Acceptance Criteria heading hidden in fence" $fencedCriteriaFixture $false "Missing Acceptance Criteria section"

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
    Remove-FixtureItem (Join-Path $milestoneFixture "docs\milestones\v8.1.md")
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

    Invoke-QueuedCheckerProcesses

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

param(
    [Parameter(Mandatory = $true)]
    [string]$RequestPath,

    [Parameter(Mandatory = $true)]
    [string]$NodePath,

    [Parameter(Mandatory = $true)]
    [string]$WorkerPath
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Get-Sha256 {
    param([Parameter(Mandatory = $true)][string]$Path)

    $stream = [System.IO.File]::Open(
        $Path,
        [System.IO.FileMode]::Open,
        [System.IO.FileAccess]::Read,
        [System.IO.FileShare]::Read
    )
    try {
        $sha = [System.Security.Cryptography.SHA256]::Create()
        try {
            return "sha256:" + (
                [System.BitConverter]::ToString($sha.ComputeHash($stream))
            ).Replace("-", "").ToLowerInvariant()
        }
        finally {
            $sha.Dispose()
        }
    }
    finally {
        $stream.Dispose()
    }
}

function Write-JsonAtomic {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)]$Value
    )

    $temporaryPath = "$Path.$PID.tmp"
    $json = ($Value | ConvertTo-Json -Depth 10).Replace("`r`n", "`n") + "`n"
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($temporaryPath, $json, $utf8)
    Move-Item -LiteralPath $temporaryPath -Destination $Path
}

$requestBytes = [System.IO.File]::ReadAllBytes($RequestPath)
$request = [System.Text.Encoding]::UTF8.GetString($requestBytes) | ConvertFrom-Json
if ($request.kind -ne "swecircuit.transport-probe-request.v1") {
    throw "Unexpected request kind."
}
if ((Get-Sha256 -Path $WorkerPath) -ne $request.source.worker.digest) {
    throw "Worker source digest mismatch."
}

$launcherProcess = Get-Process -Id $PID
$arguments = @($WorkerPath, $RequestPath)
$child = Start-Process `
    -FilePath $NodePath `
    -ArgumentList $arguments `
    -PassThru `
    -WindowStyle Hidden `
    -RedirectStandardOutput $request.output.workerStdoutPath `
    -RedirectStandardError $request.output.workerStderrPath

$launch = [ordered]@{
    kind = "swecircuit.transport-probe-launch.v1"
    probeId = $request.probeId
    requestDigest = Get-Sha256 -Path $RequestPath
    launchedAtUtc = [DateTime]::UtcNow.ToString("o")
    launcherProcessId = $PID
    launcherStartTimeUtc = $launcherProcess.StartTime.ToUniversalTime().ToString("o")
    processId = $child.Id
    processStartTimeUtc = $child.StartTime.ToUniversalTime().ToString("o")
    hidden = $true
    waitRequested = $false
    command = [ordered]@{
        executable = $NodePath
        arguments = $arguments
    }
    source = $request.source
    workerStdoutPath = $request.output.workerStdoutPath
    workerStderrPath = $request.output.workerStderrPath
}
Write-JsonAtomic -Path $request.output.launchPath -Value $launch

$summary = [ordered]@{
    probeId = $request.probeId
    processId = $child.Id
    processStartTimeUtc = $child.StartTime.ToUniversalTime().ToString("o")
} | ConvertTo-Json -Compress
[Console]::Out.Write($summary + "`n")

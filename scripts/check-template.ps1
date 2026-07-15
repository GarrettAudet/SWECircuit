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

    $text = Remove-MarkdownFencedContent (Read-Text $path)
    foreach ($heading in $Headings) {
        $escaped = [regex]::Escape($heading)
        $matches = [regex]::Matches($text, "(?m)^##[ \t]+(?:\d+\.[ \t]+)?$escaped[ \t]*\r?$")
        if ($matches.Count -eq 0) {
            Add-Failure "Missing heading '$heading' in $RelativePath"
        } elseif ($matches.Count -gt 1) {
            Add-Failure "Duplicate heading '$heading' in $RelativePath"
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

$script:markdownFenceCache = [System.Collections.Generic.Dictionary[string, string]]::new(
    [System.StringComparer]::Ordinal
)

# Track only block-container state that can change fenced-content ownership.
function Read-MarkdownIndentation {
    param(
        [string]$Line,
        [int]$StartIndex,
        [int]$StartColumn,
        [int]$MaximumColumns = [int]::MaxValue
    )

    $index = $StartIndex
    $column = $StartColumn
    while ($index -lt $Line.Length) {
        $character = $Line[$index]
        if ($character -eq [char]32) {
            $nextColumn = $column + 1
        } elseif ($character -eq [char]9) {
            $nextColumn = $column + (4 - ($column % 4))
        } else {
            break
        }

        if (($nextColumn - $StartColumn) -gt $MaximumColumns) {
            break
        }
        $column = $nextColumn
        $index++
    }

    return [pscustomobject]@{
        Index = $index
        Column = $column
        Columns = $column - $StartColumn
    }
}

function Remove-MarkdownQuoteMarkerPadding {
    param(
        [string]$Content,
        [int]$Index,
        [int]$Column
    )

    if ($Index -ge $Content.Length -or $Content[$Index] -notin @([char]32, [char]9)) {
        return [pscustomobject]@{
            Content = $Content.Substring($Index)
            Column = $Column
        }
    }

    if ($Content[$Index] -eq [char]32) {
        return [pscustomobject]@{
            Content = $Content.Substring($Index + 1)
            Column = $Column + 1
        }
    }

    $nextColumn = $Column + (4 - ($Column % 4))
    $surplusColumns = $nextColumn - $Column - 1
    return [pscustomobject]@{
        Content = (" " * $surplusColumns) + $Content.Substring($Index + 1)
        Column = $Column + 1
    }
}

function Remove-MarkdownIndentationColumns {
    param(
        [string]$Content,
        [int]$RequiredColumns,
        [int]$StartColumn = 0
    )

    $indentation = Read-MarkdownIndentation $Content 0 $StartColumn
    if ($indentation.Columns -lt $RequiredColumns) {
        return $null
    }

    $surplusColumns = $indentation.Columns - $RequiredColumns
    return [pscustomobject]@{
        Content = (" " * $surplusColumns) + $Content.Substring($indentation.Index)
        Column = $StartColumn + $RequiredColumns
    }
}
function Get-MarkdownExplicitContainer {
    param(
        [string]$Line,
        [int]$StartColumn = 0
    )

    $index = 0
    $column = $StartColumn
    $stack = New-Object System.Collections.Generic.List[object]
    while ($index -lt $Line.Length) {
        $leading = Read-MarkdownIndentation $Line $index $column 3
        $cursorIndex = $leading.Index
        $cursorColumn = $leading.Column

        if ($cursorIndex -lt $Line.Length -and $Line[$cursorIndex] -eq [char]62) {
            $stack.Add([pscustomobject]@{ Type = "quote" }) | Out-Null
            $remainder = Remove-MarkdownQuoteMarkerPadding $Line ($cursorIndex + 1) ($cursorColumn + 1)
            $Line = $remainder.Content
            $index = 0
            $column = $remainder.Column
            continue
        }

        $remainder = $Line.Substring($cursorIndex)
        $listMarker = [regex]::Match($remainder, '^(?<marker>[-+*]|\d{1,9}[.)])(?<indent>[ \t]+)')
        if (-not $listMarker.Success) {
            break
        }

        $marker = $listMarker.Groups['marker'].Value
        $indentStart = $cursorIndex + $marker.Length
        $following = Read-MarkdownIndentation $Line $indentStart ($cursorColumn + $marker.Length)
        if ($following.Columns -lt 1 -or $following.Columns -gt 4) {
            break
        }

        $stack.Add([pscustomobject]@{
            Type = "list"
            ContinuationColumns = $leading.Columns + $marker.Length + $following.Columns
        }) | Out-Null
        $index = $following.Index
        $column = $following.Column
    }

    return [pscustomobject]@{
        Stack = @($stack.ToArray())
        Content = $Line.Substring($index)
    }
}

function Get-MarkdownContinuationContent {
    param(
        [string]$Line,
        [object[]]$Stack,
        [int]$StartColumn = 0
    )

    $content = $Line
    $column = $StartColumn
    foreach ($container in $Stack) {
        if ($container.Type -eq "quote") {
            $leading = Read-MarkdownIndentation $content 0 $column 3
            if ($leading.Index -ge $content.Length -or $content[$leading.Index] -ne [char]62) {
                return $null
            }

            $remainder = Remove-MarkdownQuoteMarkerPadding $content ($leading.Index + 1) ($leading.Column + 1)
            $content = $remainder.Content
            $column = $remainder.Column
            continue
        }

        $continuation = Remove-MarkdownIndentationColumns $content ([int]$container.ContinuationColumns) $column
        if ($null -eq $continuation) {
            return $null
        }
        $content = $continuation.Content
        $column = $continuation.Column
    }

    return [pscustomobject]@{
        Content = $content
        Column = $column
    }
}
function Test-MarkdownStackContainsList {
    param([object[]]$Stack)

    foreach ($container in $Stack) {
        if ($container.Type -eq "list") {
            return $true
        }
    }
    return $false
}

function Test-MarkdownBlankLine {
    param([AllowEmptyString()][string]$Line)

    return $Line -match '^[ \t]*$'
}

function Get-MarkdownBlankContainerState {
    param(
        [string]$Line,
        [object[]]$Stack
    )

    $content = $Line
    $column = 0
    $prefix = New-Object System.Collections.Generic.List[object]
    foreach ($container in $Stack) {
        $continuation = Get-MarkdownContinuationContent $content @($container) $column
        if ($null -ne $continuation) {
            $content = $continuation.Content
            $column = $continuation.Column
            $prefix.Add($container) | Out-Null
            continue
        }

        if (-not (Test-MarkdownBlankLine $content)) {
            return $null
        }
        if ($container.Type -eq "list") {
            $prefix.Add($container) | Out-Null
            continue
        }

        return [pscustomobject]@{
            Stack = @($prefix.ToArray())
            QuoteTerminated = $true
        }
    }

    if (-not (Test-MarkdownBlankLine $content)) {
        return $null
    }
    return [pscustomobject]@{
        Stack = @($prefix.ToArray())
        QuoteTerminated = $false
    }
}

function Get-MarkdownBestContinuation {
    param(
        [string]$Line,
        [object[]]$Stack
    )

    for ($count = $Stack.Count; $count -gt 0; $count--) {
        $prefix = if ($count -eq 1) { @($Stack[0]) } else { @($Stack[0..($count - 1)]) }
        if (-not (Test-MarkdownStackContainsList $prefix)) {
            continue
        }
        $continuation = Get-MarkdownContinuationContent $Line $prefix
        if ($null -ne $continuation) {
            return [pscustomobject]@{
                Stack = $prefix
                Content = $continuation.Content
                Column = $continuation.Column
            }
        }
    }
    return $null
}

function Get-MarkdownFenceMarker {
    param(
        [string]$Content,
        [switch]$Closing
    )

    $pattern = if ($Closing) {
        '^[ ]{0,3}(?<marker>`{3,}|~{3,})[ \t]*$'
    } else {
        '^[ ]{0,3}(?<marker>`{3,}|~{3,})(?<info>.*)$'
    }
    $match = [regex]::Match($Content, $pattern)
    if (-not $match.Success) {
        return $null
    }

    $marker = $match.Groups['marker'].Value
    if (-not $Closing -and $marker[0] -eq [char]96 -and $match.Groups['info'].Value.Contains('`')) {
        return $null
    }
    return [pscustomobject]@{ Marker = $marker }
}

function Test-MarkdownParagraphContinuation {
    param([string]$Content)

    $trimmed = $Content.TrimStart([char]32, [char]9)
    if (Test-MarkdownBlankLine $trimmed) {
        return $false
    }
    return $trimmed -notmatch '^(?:#{1,6}(?:[ \t]+|$)|>|[-+*][ \t]+|\d{1,9}[.)][ \t]+|`{3,}|~{3,})'
}

function Remove-TopLevelMarkdownFencedContent {
    param([string]$Text)

    $visibleLines = New-Object System.Collections.Generic.List[string]
    $inFence = $false
    $fenceCharacter = [char]0
    $fenceLength = 0

    foreach ($line in @($Text -split "\r?\n")) {
        if (-not $inFence) {
            $opening = [regex]::Match($line, '^[ ]{0,3}(?<marker>`{3,}|~{3,})(?<info>.*)$')
            if (-not $opening.Success) {
                $visibleLines.Add($line) | Out-Null
                continue
            }

            $marker = $opening.Groups['marker'].Value
            if ($marker[0] -eq [char]96 -and $opening.Groups['info'].Value.Contains('`')) {
                $visibleLines.Add($line) | Out-Null
                continue
            }

            $inFence = $true
            $fenceCharacter = $marker[0]
            $fenceLength = $marker.Length
            $visibleLines.Add("") | Out-Null
            continue
        }

        $closing = [regex]::Match($line, '^[ ]{0,3}(?<marker>`{3,}|~{3,})[ \t]*$')
        if ($closing.Success) {
            $marker = $closing.Groups['marker'].Value
            if ($marker[0] -eq $fenceCharacter -and $marker.Length -ge $fenceLength) {
                $inFence = $false
                $fenceCharacter = [char]0
                $fenceLength = 0
            }
        }
        $visibleLines.Add("") | Out-Null
    }

    return $visibleLines -join "`n"
}

function Remove-MarkdownFencedContent {
    param([string]$Text)

    $cachedText = ""
    if ($script:markdownFenceCache.TryGetValue($Text, [ref]$cachedText)) {
        return $cachedText
    }

    if ($Text -notmatch '(?m)(?:`{3,}|~{3,})') {
        $script:markdownFenceCache[$Text] = $Text
        return $Text
    }

    # Keep ordinary top-level fences on the simple path; ambiguous container syntax uses full state.
    $hasExplicitContainerFence = $Text -match '(?m)^[ ]{0,3}(?:(?:>[ \t]?|(?:[-+*]|\d{1,9}[.)])[ \t]+)[ ]{0,3})+(?:`{3,}|~{3,})'
    $hasQuotedFence = $Text -match '(?m)^[ ]{0,3}>[^\r\n]*(?:`{3,}|~{3,})'
    $hasListMarker = $Text -match '(?m)^[ ]{0,3}(?:>[ \t]?[ ]{0,3})*(?:[-+*]|\d{1,9}[.)])[ \t]+'
    $hasIndentedFence = $Text -match '(?m)^(?: {2,}|\t)(?:`{3,}|~{3,})'
    $hasIndentedContainerFence = $Text -match '(?m)^[ 	]+(?:(?:>[ 	]?|(?:[-+*]|\d{1,9}[.)])[ 	]+)[ ]{0,3})+(?:`{3,}|~{3,})'
    if (
        -not $hasExplicitContainerFence -and
        -not $hasQuotedFence -and
        -not ($hasListMarker -and ($hasIndentedFence -or $hasIndentedContainerFence))
    ) {
        $visibleText = Remove-TopLevelMarkdownFencedContent $Text
        $script:markdownFenceCache[$Text] = $visibleText
        return $visibleText
    }

    $visibleLines = New-Object System.Collections.Generic.List[string]
    $inFence = $false
    $fenceCharacter = [char]0
    $fenceLength = 0
    $fenceStack = @()
    $activeListStack = @()
    $activeListCanBeLazy = $false
    $previousLineBlank = $true

    foreach ($line in @($Text -split "\r?\n")) {
        $handled = $false
        while (-not $handled) {
            if ($inFence) {
                $context = if ($fenceStack.Count -eq 0) {
                    [pscustomobject]@{ Content = $line }
                } else {
                    Get-MarkdownContinuationContent $line $fenceStack
                }

                if ($null -ne $context) {
                    $closing = Get-MarkdownFenceMarker $context.Content -Closing
                    if ($null -ne $closing) {
                        $marker = $closing.Marker
                        if ($marker[0] -eq $fenceCharacter -and $marker.Length -ge $fenceLength) {
                            if (Test-MarkdownStackContainsList $fenceStack) {
                                $activeListStack = @($fenceStack)
                            } else {
                                $activeListStack = @()
                            }
                            $activeListCanBeLazy = $false
                            $inFence = $false
                            $fenceCharacter = [char]0
                            $fenceLength = 0
                            $fenceStack = @()
                        }
                    }

                    $visibleLines.Add("") | Out-Null
                    $previousLineBlank = $false
                    $handled = $true
                    continue
                }

                $blankState = Get-MarkdownBlankContainerState $line $fenceStack
                if ($null -ne $blankState) {
                    if ($blankState.QuoteTerminated) {
                        # A container-relative blank ends only the first unmarked quote.
                        if (Test-MarkdownStackContainsList $blankState.Stack) {
                            $activeListStack = @($blankState.Stack)
                        } else {
                            $activeListStack = @()
                        }
                        $activeListCanBeLazy = $false
                        $inFence = $false
                        $fenceCharacter = [char]0
                        $fenceLength = 0
                        $fenceStack = @()
                        $previousLineBlank = $true
                    }
                    $visibleLines.Add("") | Out-Null
                    $handled = $true
                    continue
                }

                # A nested fence can end while an outer list remains active.
                $survivingList = Get-MarkdownBestContinuation $line $fenceStack
                $inFence = $false
                $fenceCharacter = [char]0
                $fenceLength = 0
                $fenceStack = @()
                if ($null -eq $survivingList) {
                    $activeListStack = @()
                } else {
                    $activeListStack = @($survivingList.Stack)
                }
                $activeListCanBeLazy = $false
                continue
            }

            $opening = $null
            if ($activeListStack.Count -gt 0) {
                $continuation = Get-MarkdownBestContinuation $line $activeListStack
                if ($null -ne $continuation) {
                    $nested = Get-MarkdownExplicitContainer -Line $continuation.Content -StartColumn $continuation.Column
                    $candidateStack = @($continuation.Stack) + @($nested.Stack)
                    $candidateMarker = Get-MarkdownFenceMarker $nested.Content
                    if ($null -ne $candidateMarker) {
                        $opening = [pscustomobject]@{
                            Marker = $candidateMarker.Marker
                            Stack = $candidateStack
                        }
                    }
                }
            }

            if ($null -eq $opening) {
                $explicit = Get-MarkdownExplicitContainer $line
                $candidateMarker = Get-MarkdownFenceMarker $explicit.Content
                if ($null -ne $candidateMarker) {
                    $opening = [pscustomobject]@{
                        Marker = $candidateMarker.Marker
                        Stack = @($explicit.Stack)
                    }
                }
            }

            if ($null -ne $opening) {
                $marker = $opening.Marker
                $inFence = $true
                $fenceCharacter = $marker[0]
                $fenceLength = $marker.Length
                $fenceStack = @($opening.Stack)
                if (Test-MarkdownStackContainsList $fenceStack) {
                    $activeListStack = @($fenceStack)
                } else {
                    $activeListStack = @()
                }
                $activeListCanBeLazy = $false
                $visibleLines.Add("") | Out-Null
                $previousLineBlank = $false
                $handled = $true
                continue
            }

            $visibleLines.Add($line) | Out-Null
            $isBlank = Test-MarkdownBlankLine $line
            $activeContinuation = if ($activeListStack.Count -gt 0) {
                Get-MarkdownBestContinuation $line $activeListStack
            } else {
                $null
            }
            $activeBlankState = if ($activeListStack.Count -gt 0) {
                Get-MarkdownBlankContainerState $line $activeListStack
            } else {
                $null
            }
            $explicitLine = Get-MarkdownExplicitContainer $line

            if ($null -ne $activeBlankState) {
                if (Test-MarkdownStackContainsList $activeBlankState.Stack) {
                    $activeListStack = @($activeBlankState.Stack)
                } else {
                    $activeListStack = @()
                }
                $activeListCanBeLazy = $false
            } elseif ($isBlank) {
                # Blank lines do not end a list item.
            } elseif ($null -ne $activeContinuation) {
                $nested = Get-MarkdownExplicitContainer -Line $activeContinuation.Content -StartColumn $activeContinuation.Column
                $combinedStack = @($activeContinuation.Stack) + @($nested.Stack)
                if (Test-MarkdownStackContainsList $combinedStack) {
                    $activeListStack = $combinedStack
                    $activeListCanBeLazy = Test-MarkdownParagraphContinuation $nested.Content
                }
            } elseif (Test-MarkdownStackContainsList $explicitLine.Stack) {
                $activeListStack = @($explicitLine.Stack)
                $activeListCanBeLazy = Test-MarkdownParagraphContinuation $explicitLine.Content
            } elseif (
                $activeListStack.Count -gt 0 -and
                $activeListCanBeLazy -and
                -not $previousLineBlank -and
                (Test-MarkdownParagraphContinuation $line)
            ) {
                $activeListCanBeLazy = $true
            } else {
                $activeListStack = @()
                $activeListCanBeLazy = $false
            }

            $previousLineBlank = $isBlank -or $null -ne $activeBlankState
            $handled = $true
        }
    }

    $visibleText = $visibleLines -join "`n"
    $script:markdownFenceCache[$Text] = $visibleText
    return $visibleText
}

function Get-MarkdownSection {
    param(
        [string]$Text,
        [string]$Heading
    )

    $visibleText = Remove-MarkdownFencedContent $Text
    $escaped = [regex]::Escape($Heading)
    $matches = [regex]::Matches($visibleText, "(?ms)^##[ \t]+$escaped[ \t]*(?:\r?\n|\z)(.*?)(?=^##[ \t]+|\z)")
    if ($matches.Count -eq 1) {
        return $matches[0].Groups[1].Value.Trim()
    }
    return ""
}

function Get-MarkdownScopedContent {
    param(
        [string]$Text,
        [string]$SectionName,
        [string]$SubsectionName = ""
    )

    $section = Get-MarkdownSection $Text $SectionName
    if ([string]::IsNullOrWhiteSpace($section)) {
        return ""
    }

    if ([string]::IsNullOrWhiteSpace($SubsectionName)) {
        $nestedHeading = [regex]::Match($section, '(?m)^#{3,6}\s+')
        if ($nestedHeading.Success) {
            return $section.Substring(0, $nestedHeading.Index).Trim()
        }
        return $section.Trim()
    }

    $escaped = [regex]::Escape($SubsectionName)
    $subsections = [regex]::Matches($section, "(?ms)^###[ \t]+$escaped[ \t]*(?:\r?\n|\z)(.*?)(?=^###[ \t]+|\z)")
    if ($subsections.Count -ne 1) {
        return ""
    }

    $content = $subsections[0].Groups[1].Value.Trim()
    $nestedHeading = [regex]::Match($content, '(?m)^#{4,6}\s+')
    if ($nestedHeading.Success) {
        return $content.Substring(0, $nestedHeading.Index).Trim()
    }
    return $content
}

function Get-MarkdownStatements {
    param([string]$Content)

    $Content = Remove-MarkdownFencedContent $Content
    $chunks = New-Object System.Collections.Generic.List[string]
    $buffer = New-Object System.Collections.Generic.List[string]

    foreach ($line in @($Content -split "\r?\n")) {
        $trimmed = $line.Trim()

        if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed -match '^#{1,6}\s+') {
            if ($buffer.Count -gt 0) {
                $chunks.Add(($buffer -join " ").Trim()) | Out-Null
                $buffer.Clear()
            }
            continue
        }

        if ($trimmed -match '^\|.*\|$') {
            if ($buffer.Count -gt 0) {
                $chunks.Add(($buffer -join " ").Trim()) | Out-Null
                $buffer.Clear()
            }
            foreach ($cell in @($trimmed.Trim('|') -split '\|' | ForEach-Object { $_.Trim() })) {
                if (-not [string]::IsNullOrWhiteSpace($cell) -and $cell -notmatch '^:?-{3,}:?$') {
                    $chunks.Add($cell) | Out-Null
                }
            }
            continue
        }

        if ($trimmed -match '^(?:[-*+]\s+|\d+\.\s+)') {
            if ($buffer.Count -gt 0) {
                $chunks.Add(($buffer -join " ").Trim()) | Out-Null
                $buffer.Clear()
            }
        }
        $buffer.Add($trimmed) | Out-Null
    }

    if ($buffer.Count -gt 0) {
        $chunks.Add(($buffer -join " ").Trim()) | Out-Null
    }

    $statements = New-Object System.Collections.Generic.List[string]
    foreach ($chunk in $chunks) {
        $normalized = [regex]::Replace($chunk, '\s+', ' ').Trim()
        foreach ($statement in @([regex]::Split($normalized, '(?<=[.!?])\s+'))) {
            if (-not [string]::IsNullOrWhiteSpace($statement)) {
                $statements.Add($statement.Trim()) | Out-Null
            }
        }
    }

    return @($statements)
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

function Get-SectionMarkdownTable {
    param(
        [string]$RelativePath,
        [string]$SectionName,
        [string]$SubsectionName = ""
    )

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        Add-Failure "Contract table source is missing: $RelativePath"
        return $null
    }

    $content = Get-MarkdownScopedContent (Read-Text $path) $SectionName $SubsectionName
    $scopeLabel = if ([string]::IsNullOrWhiteSpace($SubsectionName)) {
        "section '$SectionName'"
    } else {
        "subsection '$SubsectionName' under section '$SectionName'"
    }
    if ([string]::IsNullOrWhiteSpace($content)) {
        Add-Failure "Contract table scope $scopeLabel in $RelativePath is missing or empty"
        return $null
    }

    $lines = @($content -split "\r?\n")
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
        $rows = New-Object System.Collections.Generic.List[object]
        for ($rowIndex = $i + 2; $rowIndex -lt $lines.Count; $rowIndex++) {
            $rowLine = $lines[$rowIndex].Trim()
            if ($rowLine -notmatch '^\|.*\|$') {
                break
            }

            $rows.Add([pscustomobject]@{
                Cells = @($rowLine.Trim('|') -split '\|' | ForEach-Object { $_.Trim() })
                Text = $rowLine
            }) | Out-Null
        }

        return [pscustomobject]@{
            Headers = $headers
            Rows = $rows.ToArray()
        }
    }

    Add-Failure "Contract table scope $scopeLabel in $RelativePath must include a Markdown table"
    return $null
}

function Test-SectionTableColumns {
    param(
        [string]$RelativePath,
        [string]$SectionName,
        [string[]]$RequiredColumns,
        [string]$SubsectionName = ""
    )

    $table = Get-SectionMarkdownTable $RelativePath $SectionName $SubsectionName
    if ($null -eq $table) {
        return
    }

    foreach ($requiredColumn in $RequiredColumns) {
        if ($table.Headers -notcontains $requiredColumn) {
            Add-Failure "Contract table in section '$SectionName' of $RelativePath must include column '$requiredColumn'"
        }
    }

    if ($table.Rows.Count -eq 0) {
        Add-Failure "Contract table in section '$SectionName' of $RelativePath must include at least one contiguous data row"
        return
    }

    for ($rowIndex = 0; $rowIndex -lt $table.Rows.Count; $rowIndex++) {
        $cells = @($table.Rows[$rowIndex].Cells)
        foreach ($requiredColumn in $RequiredColumns) {
            $columnIndex = [array]::IndexOf([object[]]$table.Headers, $requiredColumn)
            if ($columnIndex -lt 0) {
                continue
            }
            if ($cells.Count -le $columnIndex -or [string]::IsNullOrWhiteSpace($cells[$columnIndex])) {
                Add-Failure "Contract table row $($rowIndex + 1) in section '$SectionName' of $RelativePath has an empty '$requiredColumn' value"
            }
        }
    }
}

function Test-SectionTableRowContains {
    param(
        [string]$RelativePath,
        [string]$SectionName,
        [string]$KeyColumn,
        [string]$RowKey,
        [string[]]$RequiredTerms,
        [string]$SubsectionName = ""
    )

    $table = Get-SectionMarkdownTable $RelativePath $SectionName $SubsectionName
    if ($null -eq $table) {
        return
    }

    $keyIndex = [array]::IndexOf([object[]]$table.Headers, $KeyColumn)
    if ($keyIndex -lt 0) {
        Add-Failure "Contract table row '$RowKey' in section '$SectionName' of $RelativePath requires key column '$KeyColumn'"
        return
    }

    $matches = @($table.Rows | Where-Object {
        $cells = @($_.Cells)
        $cells.Count -gt $keyIndex -and
            $cells[$keyIndex].Equals($RowKey, [System.StringComparison]::Ordinal)
    })
    if ($matches.Count -ne 1) {
        Add-Failure "Contract table row '$RowKey' in section '$SectionName' of $RelativePath must appear exactly once in the first contiguous table; found $($matches.Count)"
        return
    }

    $rowText = $matches[0].Text
    foreach ($term in $RequiredTerms) {
        if ($rowText.IndexOf($term, [System.StringComparison]::OrdinalIgnoreCase) -lt 0) {
            Add-Failure "Contract table row '$RowKey' in section '$SectionName' of $RelativePath must include '$term'"
        }
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

function Test-SectionLineContains {
    param(
        [string]$RelativePath,
        [string]$SectionName,
        [string]$LinePrefix,
        [string[]]$RequiredTerms,
        [string]$SubsectionName = ""
    )

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        Add-Failure "Contract locator source is missing: $RelativePath"
        return
    }

    $content = Get-MarkdownScopedContent (Read-Text $path) $SectionName $SubsectionName
    $scopeLabel = if ([string]::IsNullOrWhiteSpace($SubsectionName)) {
        "section '$SectionName'"
    } else {
        "subsection '$SubsectionName' under section '$SectionName'"
    }
    if ([string]::IsNullOrWhiteSpace($content)) {
        Add-Failure "Contract locator scope $scopeLabel in $RelativePath is missing or empty"
        return
    }

    $matchingLines = @($content -split "\r?\n" | Where-Object {
        $_.TrimStart().StartsWith($LinePrefix, [System.StringComparison]::Ordinal)
    })
    if ($matchingLines.Count -ne 1) {
        Add-Failure "Contract locator in $scopeLabel of $RelativePath must contain exactly one line beginning '$LinePrefix'; found $($matchingLines.Count)"
        return
    }

    foreach ($term in $RequiredTerms) {
        if ($matchingLines[0].IndexOf($term, [System.StringComparison]::OrdinalIgnoreCase) -lt 0) {
            Add-Failure "Contract locator beginning '$LinePrefix' in $scopeLabel of $RelativePath must include '$term'"
        }
    }
}

function Test-SectionRejectsPatterns {
    param(
        [string]$RelativePath,
        [string]$SectionName,
        [string[]]$ForbiddenPatterns,
        [string]$SubsectionName = "",
        [string]$TableKeyColumn = "",
        [string]$TableRowKey = ""
    )

    $path = Join-Path $Root $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        Add-Failure "Contract contradiction source is missing: $RelativePath"
        return
    }

    $scopeLabel = if ([string]::IsNullOrWhiteSpace($SubsectionName)) {
        "section '$SectionName'"
    } else {
        "subsection '$SubsectionName' under section '$SectionName'"
    }

    if (-not [string]::IsNullOrWhiteSpace($TableRowKey)) {
        $table = Get-SectionMarkdownTable $RelativePath $SectionName $SubsectionName
        if ($null -eq $table) {
            return
        }
        $keyIndex = [array]::IndexOf([object[]]$table.Headers, $TableKeyColumn)
        if ($keyIndex -lt 0) {
            return
        }
        $matches = @($table.Rows | Where-Object {
            $cells = @($_.Cells)
            $cells.Count -gt $keyIndex -and
                $cells[$keyIndex].Equals($TableRowKey, [System.StringComparison]::Ordinal)
        })
        if ($matches.Count -ne 1) {
            return
        }
        $content = $matches[0].Text
        $scopeLabel = "table row '$TableRowKey' in section '$SectionName'"
    } else {
        $content = Get-MarkdownScopedContent (Read-Text $path) $SectionName $SubsectionName
        if ([string]::IsNullOrWhiteSpace($content)) {
            Add-Failure "Contract contradiction scope $scopeLabel in $RelativePath is missing or empty"
            return
        }
    }

    $statements = @(Get-MarkdownStatements $content)
    $options = [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor
        [System.Text.RegularExpressions.RegexOptions]::CultureInvariant
    for ($index = 0; $index -lt $ForbiddenPatterns.Count; $index++) {
        $pattern = $ForbiddenPatterns[$index]
        foreach ($statement in $statements) {
            if ([regex]::IsMatch($statement, $pattern, $options)) {
                Add-Failure "Contract contradiction policy $($index + 1) rejected a claim in $scopeLabel of $RelativePath"
                break
            }
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
        $criteria = Get-MarkdownSection $spec "Acceptance Criteria"
        if ([string]::IsNullOrWhiteSpace($criteria)) {
            Add-Failure "Missing Acceptance Criteria section in docs/specs/$($FeatureDir.Name)/spec.md"
        } else {
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
        $tasks = Remove-MarkdownFencedContent (Read-Text $tasksPath)
        if ($tasks -notmatch "Verification:") {
            Add-Failure "Tasks must include verification mapping in docs/specs/$($FeatureDir.Name)/tasks.md"
        }
    }

    $debugPath = Join-Path $FeatureDir.FullName "debug-notes.md"
    if (Test-Path -LiteralPath $debugPath -PathType Leaf) {
        $debug = Read-Text $debugPath
        $activeDebug = Remove-MarkdownFencedContent $debug
        $status = Get-NormalizedStatus $debug
        if ($status -notin @("Not started", "Not needed")) {
            foreach ($heading in @("Reproduction", "Stable Evidence", "Failure Classification", "Hypotheses", "Experiments")) {
                $headingCount = [regex]::Matches($activeDebug, "(?m)^##[ \t]+$([regex]::Escape($heading))[ \t]*\r?$").Count
                if ($headingCount -ne 1) {
                    Add-Failure "Debug notes missing $heading in docs/specs/$($FeatureDir.Name)/debug-notes.md"
                }
            }
        }
    }

    $rcaPath = Join-Path $FeatureDir.FullName "root-cause-analysis.md"
    if (Test-Path -LiteralPath $rcaPath -PathType Leaf) {
        $rca = Read-Text $rcaPath
        $activeRca = Remove-MarkdownFencedContent $rca
        $status = Get-NormalizedStatus $rca
        if ($status -notmatch "Not started|Not needed") {
            foreach ($heading in @("Reproduction", "Confirmed Root Cause", "Fix", "Regression Coverage", "Memory Update")) {
                $headingCount = [regex]::Matches($activeRca, "(?m)^##[ \t]+$([regex]::Escape($heading))[ \t]*\r?$").Count
                if ($headingCount -ne 1) {
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
    @{ RelativePath = "docs/framework/executor-boundary.md"; SectionName = "Result Semantics"; LinePrefix = "For invoked work," },
    @{ RelativePath = "schemas/v1alpha1/README.md"; SectionName = "Execution Boundary"; LinePrefix = "For invoked work," },
    @{ RelativePath = "docs/ai/handbook.md"; SectionName = "20. Modular Orchestration Framework"; SubsectionName = "Bounded Executor Boundary"; LinePrefix = "Cancellation is cooperative after invocation." },
    @{ RelativePath = "docs/framework/capability-adapters.md"; SectionName = "Provider Executor Bridge"; LinePrefix = "4. After invocation," },
    @{ RelativePath = "docs/research/practice-register.md"; SectionName = "Current Practices"; KeyColumn = "Practice"; RowKey = "Cooperative cancellation with abort_unconfirmed" },
    @{ RelativePath = "docs/memory/patterns.md"; SectionName = "Documentation Patterns"; SubsectionName = "Honest Abort State"; LinePrefix = "Treat cancellation as observed protocol state, not a wish." },
    @{ RelativePath = "docs/specs/v10-executor-adapter/spec.md"; SectionName = "Requirements"; LinePrefix = "- If abort or deadline wins before invocation," },
    @{ RelativePath = "docs/specs/v10-executor-adapter/plan.md"; SectionName = "Risks And Mitigations"; LinePrefix = "- Mitigation: terminalize a pre-invocation abort or deadline" },
    @{ RelativePath = "docs/memory/active-context.md"; SectionName = "Important Current Constraints"; LinePrefix = "- Cancellation uses absolute monotonic observations." }
)
foreach ($surface in $executorLivenessSurfaces) {
    if ($surface.ContainsKey("RowKey")) {
        Test-SectionTableRowContains $surface.RelativePath $surface.SectionName $surface.KeyColumn $surface.RowKey @(
            $executorLivenessPhrase,
            "not acknowledgment"
        )
        continue
    }

    $locator = @{
        RelativePath = $surface.RelativePath
        SectionName = $surface.SectionName
        LinePrefix = $surface.LinePrefix
        RequiredTerms = @($executorLivenessPhrase, "not acknowledgment")
    }
    if ($surface.ContainsKey("SubsectionName")) {
        $locator.SubsectionName = $surface.SubsectionName
    }
    Test-SectionLineContains @locator
}

$lifecycleContradictionPatterns = @(
    '\b(?:timely|in-window|within-window|within (?:the )?(?:acknowledgment )?window)?\s*settlement\b.{0,160}(?<!not )(?<!never )(?<!cannot )(?<!can not )(?<!does not )(?<!do not )(?<!doesn''t )\b(?:proves?|guarantees?|means?|confirms?|ensures?|demonstrates?|establishes?)\b.{0,160}\b(?:work|activity|invocation effects?)\b.{0,80}\b(?:has |have |is |are )?stopped\b',
    '\b(?:transfer(?:ring|red)?|handoff|handing off)\b.{0,120}\blive work\b.{0,120}\b(?:is|counts as|constitutes|means|confirms)\b(?![^.!?]{0,60}\b(?:not|never)\b)[^.!?]{0,80}\backnowledg(?:e)?ment\b',
    '\bno-call\b.{0,120}(?<!not )(?<!never )(?<!cannot )(?<!can not )(?<!does not )(?<!do not )(?<!doesn''t )\b(?:requires?|needs?|must have|depends on)\b(?![^.!?]{0,50}\b(?:no|not|without)\s+executor acknowledgment\b)[^.!?]{0,80}\bexecutor acknowledgment\b'
)
foreach ($surface in $executorLivenessSurfaces) {
    $contradiction = @{
        RelativePath = $surface.RelativePath
        SectionName = $surface.SectionName
        ForbiddenPatterns = $lifecycleContradictionPatterns
    }
    if ($surface.ContainsKey("SubsectionName")) {
        $contradiction.SubsectionName = $surface.SubsectionName
    }
    if ($surface.ContainsKey("RowKey")) {
        $contradiction.TableKeyColumn = $surface.KeyColumn
        $contradiction.TableRowKey = $surface.RowKey
    }
    Test-SectionRejectsPatterns @contradiction
}

$grantNonGuaranteeSentence = "The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay."
$grantGuaranteeSurfaces = @(
    @{
        RelativePath = "docs/framework/executor-boundary.md"
        SectionName = "Host Responsibilities"
        LinePrefix = ([string][char]96 + "Invocation-scoped" + [string][char]96 + " describes")
    },
    @{
        RelativePath = "schemas/v1alpha1/README.md"
        SectionName = "Execution Boundary"
        LinePrefix = "ExecutionGrant is a closed runtime object"
    },
    @{
        RelativePath = "docs/ai/handbook.md"
        SectionName = "20. Modular Orchestration Framework"
        SubsectionName = "Bounded Executor Boundary"
        LinePrefix = "Use the [bounded executor boundary]"
    },
    @{
        RelativePath = "docs/framework/capability-adapters.md"
        SectionName = "Provider Executor Bridge"
        LinePrefix = "2. Check each invocation request"
    },
    @{
        RelativePath = "docs/research/practice-register.md"
        SectionName = "Current Practices"
        KeyColumn = "Practice"
        RowKey = "Invocation-scoped authority grant"
    },
    @{
        RelativePath = "docs/memory/patterns.md"
        SectionName = "Documentation Patterns"
        SubsectionName = "Guarantee-Calibrated Adjectives"
        LinePrefix = "Use lifecycle and security adjectives only"
    },
    @{
        RelativePath = "docs/specs/v10-executor-adapter/spec.md"
        SectionName = "Requirements"
        LinePrefix = "- The host must supply an invocation-scoped"
    },
    @{
        RelativePath = "docs/specs/v10-executor-adapter/plan.md"
        SectionName = "Security And Privacy"
        LinePrefix = "- Declarations never grant authority"
    },
    @{
        RelativePath = "docs/memory/active-context.md"
        SectionName = "Important Current Constraints"
        LinePrefix = ("- An " + [string][char]96 + "ExecutionGrant" + [string][char]96 + " carries")
    }
)
foreach ($surface in $grantGuaranteeSurfaces) {
    if ($surface.ContainsKey("RowKey")) {
        Test-SectionTableRowContains $surface.RelativePath $surface.SectionName $surface.KeyColumn $surface.RowKey @(
            $grantNonGuaranteeSentence
        )
        continue
    }

    $locator = @{
        RelativePath = $surface.RelativePath
        SectionName = $surface.SectionName
        LinePrefix = $surface.LinePrefix
        RequiredTerms = @($grantNonGuaranteeSentence)
    }
    if ($surface.ContainsKey("SubsectionName")) {
        $locator.SubsectionName = $surface.SubsectionName
    }
    Test-SectionLineContains @locator
}

$grantContradictionPatterns = @(
    '\b(?:stateless )?kernel\b.{0,160}(?<!not )(?<!never )(?<!cannot )(?<!can not )(?<!does not )(?<!do not )(?<!doesn''t )\b(?:authenticates|establishes|enforces|revokes|consumes)\b.{0,120}\b(?:issuer|freshness|single[- ]use|grant)\b',
    '\b(?:stateless )?kernel\b.{0,160}(?<!not )(?<!never )(?<!cannot )(?<!can not )(?<!does not )(?<!do not )(?<!doesn''t )\bprevents\b.{0,80}\b(?:grant )?(?:reuse|replay)\b',
    '\b(?:stateless )?kernel\b.{0,160}(?<!not )(?<!never )(?<!cannot )(?<!can not )(?<!does not )(?<!do not )(?<!doesn''t )\b(?:guarantees|ensures|confirms|provides)\b.{0,100}\b(?:fresh(?:ness)?|single[- ]use|authenticated|enforced|revoked|consumed|reuse prevention|replay prevention|replay[- ]resistant)\b',
    '(?<!not )\b(?:each|every|the|this|a)\s+grants?\b.{0,80}\b(?:is|are|becomes|remains)\b(?![^.!?]{0,40}\b(?:not|never)\b)[^.!?]{0,80}\b(?:fresh|single[- ]use|authenticated|enforced|revoked|consumed|replay[- ]resistant|non[- ]reusable)\b'
)
foreach ($surface in $grantGuaranteeSurfaces) {
    $contradiction = @{
        RelativePath = $surface.RelativePath
        SectionName = $surface.SectionName
        ForbiddenPatterns = $grantContradictionPatterns
    }
    if ($surface.ContainsKey("SubsectionName")) {
        $contradiction.SubsectionName = $surface.SubsectionName
    }
    if ($surface.ContainsKey("RowKey")) {
        $contradiction.TableKeyColumn = $surface.KeyColumn
        $contradiction.TableRowKey = $surface.RowKey
    }
    Test-SectionRejectsPatterns @contradiction
}

Test-SectionTableColumns "docs/research/practice-register.md" "Current Practices" @(
    "Practice",
    "Status",
    "Source",
    "Decision",
    "Rationale"
)
Test-SectionTableRowContains "docs/research/practice-register.md" "Current Practices" "Practice" "Absolute monotonic lifecycle bounds" @(
    "accepted",
    "absolute deadline",
    "acknowledgment"
)
Test-SectionTableRowContains "docs/research/practice-register.md" "Current Practices" "Practice" "Proxy rejection before reflection" @(
    "accepted",
    "Reject detectable proxies",
    "reflection"
)
Test-SectionTableRowContains "docs/research/practice-register.md" "Current Practices" "Practice" "Public contract parity checks" @(
    "accepted",
    "intended paragraph or table row",
    "contradictory positive claims"
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
$activeReadme = Remove-MarkdownFencedContent $readme
$readmeHeadingCount = [regex]::Matches($activeReadme, '(?m)^# SWECircuit[ \t]*\r?$').Count
if ($readmeHeadingCount -ne 1) {
    Add-Failure "README must use SWECircuit as the current project heading"
}
if ($activeReadme -notmatch [regex]::Escape("https://github.com/GarrettAudet/SWECircuit")) {
    Add-Failure "README must link the current GarrettAudet/SWECircuit repository"
}
if ($activeReadme -match [regex]::Escape("https://github.com/GarrettAudet/TraceRail")) {
    Add-Failure "README contains the retired GarrettAudet/TraceRail repository URL"
}
$currentOverviewPath = "docs/assets/swecircuit-overview.png"
$currentOverviewPattern = '(?m)^!\[[^\]\r\n]+\]\(' + [regex]::Escape($currentOverviewPath) + '\)[ \t]*\r?$'
if ($activeReadme -notmatch $currentOverviewPattern) {
    Add-Failure "README missing current SWECircuit overview visual embed: $currentOverviewPath"
}
$historicalOverviewPattern = '(?m)^!\[[^\]\r\n]+\]\(' + [regex]::Escape("docs/assets/tracerail-overview.png") + '\)[ \t]*\r?$'
if ($activeReadme -match $historicalOverviewPattern) {
    Add-Failure "README embeds the historical TraceRail overview instead of the current SWECircuit overview"
}

$requiredReadmeActiveText = @(
    "The V10 kernel can now validate and execute one host-selected work packet through a caller-injected executor",
    "External hosts still select and schedule work, enforce permissions, isolate runtimes, persist traces, and merge changes.",
    "These are repository-local development commands for the private workspace",
    "The V10 kernel does not dynamically load adapters, execute circuits, terminate process trees, merge branches, or update memory automatically."
)
foreach ($requiredText in $requiredReadmeActiveText) {
    if ($activeReadme -notmatch [regex]::Escape($requiredText)) {
        Add-Failure "README missing required active public-surface text: $requiredText"
    }
}

$requiredReadmeCommandExamples = @(
    "node dist/cli.js init --project <existing-empty-directory> --project-id quick-start",
    "node dist/cli.js validate --project examples/minimal",
    "node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl"
)
foreach ($requiredCommand in $requiredReadmeCommandExamples) {
    if ($readme -notmatch [regex]::Escape($requiredCommand)) {
        Add-Failure "README missing required command example: $requiredCommand"
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
    if ($activeReadme -notmatch $linkPattern) {
        Add-Failure "README missing required active local link: $linkTarget"
    }

    $resolvedLink = Join-Path $Root $linkTarget.TrimEnd('/')
    if (-not (Test-Path -LiteralPath $resolvedLink)) {
        Add-Failure "README local link target does not exist: $linkTarget"
    }
}

$forbiddenActiveReadmePatterns = @(
    @{ Pattern = '(?i)\bplanned executable kernel\b'; Message = "README still describes the implemented kernel as planned" },
    @{ Pattern = '(?i)\bSWECircuit\s+(?:launches\s+agents|schedules\s+agents|executes\s+circuits|writes\s+traces|retrieves\s+evidence|merges\s+branches|updates\s+memory\s+automatically)\b'; Message = "README positively claims a capability owned by an external runtime" },
    @{ Pattern = '(?i)\bSWECircuit\s+(?:enforces\s+(?:permissions|grants)|loads\s+(?:providers|adapters)|persists\s+(?:traces|events)|terminates\s+process(?:es|\s+trees))\b'; Message = "README positively claims host-owned execution authority or persistence" }
)
foreach ($rule in $forbiddenActiveReadmePatterns) {
    if ($activeReadme -match $rule.Pattern) {
        Add-Failure $rule.Message
    }
}

$forbiddenReadmeCommandPatterns = @(
    @{ Pattern = '(?i)\bnpx\s+swecircuit\b'; Message = "README implies a published npx command" },
    @{ Pattern = '(?i)\bnpm\s+install\s+(?:-g\s+)?swecircuit\b'; Message = "README implies an installable SWECircuit package" },
    @{ Pattern = '(?i)\b(?:published|public)\s+SWECircuit\s+CLI\b'; Message = "README implies a published SWECircuit CLI" }
)
foreach ($rule in $forbiddenReadmeCommandPatterns) {
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
    $pr = Remove-MarkdownFencedContent (Read-Text $prTemplatePath)
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

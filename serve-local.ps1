$ErrorActionPreference = "Stop"
$root = [IO.Path]::GetFullPath($PSScriptRoot)
if (-not $root.EndsWith([IO.Path]::DirectorySeparatorChar)) {
  $root += [IO.Path]::DirectorySeparatorChar
}

$port = 5500
$prefix = "http://localhost:$port/"
$pageUrl = "http://localhost:$port/src/index.html"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".htm"  = "text/html; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".webp" = "image/webp"
  ".wav"  = "audio/wav"
  ".mp3"  = "audio/mpeg"
  ".txt"  = "text/plain; charset=utf-8"
}

function Get-HttpSysListenerPids {
  param([int]$Port)
  $found = New-Object System.Collections.Generic.List[int]
  $blockPids = New-Object System.Collections.Generic.List[int]
  $blockMatchesPort = $false
  $portPattern = ":$Port(?!\d)"
  $lines = @(netsh.exe http show servicestate view=requestq)
  foreach ($line in $lines) {
    if ($line -match '^(Request queue name:|要求佇列名稱)') {
      if ($blockMatchesPort) {
        foreach ($owner in $blockPids) {
          if (-not $found.Contains($owner)) { [void]$found.Add($owner) }
        }
      }
      $blockPids = New-Object System.Collections.Generic.List[int]
      $blockMatchesPort = $false
      continue
    }
    if ($line -match '(?i)\b(?:ID|識別碼)\s*:\s*(\d+)') {
      $owner = [int]$Matches[1]
      if (-not $blockPids.Contains($owner)) { [void]$blockPids.Add($owner) }
    }
    if ($line -match $portPattern) { $blockMatchesPort = $true }
  }
  if ($blockMatchesPort) {
    foreach ($owner in $blockPids) {
      if (-not $found.Contains($owner)) { [void]$found.Add($owner) }
    }
  }
  return @($found)
}

function Get-PortListenerPids {
  param([int]$Port)
  $found = New-Object System.Collections.Generic.List[int]
  $connections = @(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
  foreach ($conn in $connections) {
    if ($null -eq $conn) { continue }
    $owner = [int]$conn.OwningProcess
    if ($owner -gt 4 -and -not $found.Contains($owner)) { [void]$found.Add($owner) }
  }
  if ($found.Count -eq 0) {
    $pattern = "^\s*TCP\s+\S+:$Port\s+\S+\s+\S+\s+(\d+)\s*$"
    foreach ($line in (& netstat.exe -ano -p TCP)) {
      if ($line -match $pattern) {
        $owner = [int]$Matches[1]
        if ($owner -gt 4 -and -not $found.Contains($owner)) { [void]$found.Add($owner) }
      }
    }
  }
  if ($found.Count -eq 0) {
    foreach ($owner in (Get-HttpSysListenerPids -Port $Port)) {
      if ($owner -gt 4 -and -not $found.Contains($owner)) { [void]$found.Add($owner) }
    }
  }
  return @($found)
}

function Stop-PortListeners {
  param([int]$Port)
  $owners = @(Get-PortListenerPids -Port $Port | Where-Object { $_ -gt 4 -and $_ -ne $PID })
  if ($owners.Count -eq 0) {
    Write-Host "找不到可結束的監聽程序。"
    return $false
  }
  $stopped = $false
  foreach ($ownerPid in $owners) {
    $proc = Get-Process -Id $ownerPid -ErrorAction SilentlyContinue
    $name = if ($proc) { $proc.ProcessName } else { "未知程序" }
    Write-Host "結束程序 PID $ownerPid ($name)..."
    try {
      Stop-Process -Id $ownerPid -Force -ErrorAction Stop
      $stopped = $true
    } catch {
      Write-Host "無法結束 PID ${ownerPid}：$($_.Exception.Message)"
    }
  }
  if ($stopped) { Start-Sleep -Milliseconds 600 }
  return $stopped
}

function Read-RestartChoice {
  Write-Host ""
  Write-Host "請選擇："
  Write-Host "  1. 結束在此之前的程序，重新啟用"
  Write-Host "  2. 直接開啟網頁"
  while ($true) {
    $choice = (Read-Host "請輸入 1 或 2").Trim()
    if ($choice -eq "1" -or $choice -eq "2") { return $choice }
    Write-Host "請輸入 1 或 2。"
  }
}

$listener = $null
while ($null -eq $listener) {
  $candidate = New-Object System.Net.HttpListener
  $candidate.Prefixes.Add($prefix)
  try {
    $candidate.Start()
    $listener = $candidate
  } catch {
    try { $candidate.Close() } catch {}
    Write-Host "無法啟動 $prefix"
    Write-Host $_.Exception.Message
    Write-Host "連接埠 $port 已被占用。"
    $choice = Read-RestartChoice
    if ($choice -eq "2") {
      Write-Host "開啟網頁：$pageUrl"
      Start-Process $pageUrl
      exit 0
    }
    if (-not (Stop-PortListeners -Port $port)) {
      Write-Host "無法結束占用連接埠的程序。可改選 2，或手動關閉另一個 run.bat 視窗。"
      continue
    }
    Write-Host "重新啟動伺服器..."
  }
}

Write-Host "本機位址：$pageUrl"
Write-Host "關閉這個視窗就會停止伺服器。"
Start-Process $pageUrl

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $response = $context.Response
    try {
      $relative = [Uri]::UnescapeDataString($context.Request.Url.LocalPath)
      if ([string]::IsNullOrWhiteSpace($relative) -or $relative -eq "/") {
        $relative = "/src/index.html"
      }
      $relative = $relative.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
      $full = [IO.Path]::GetFullPath((Join-Path $root $relative))
      $bytes = $null
      if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
        $response.StatusCode = 403
        $response.ContentType = "text/plain; charset=utf-8"
        $bytes = [Text.Encoding]::UTF8.GetBytes("Forbidden")
      } elseif (-not (Test-Path -LiteralPath $full -PathType Leaf)) {
        $response.StatusCode = 404
        $response.ContentType = "text/plain; charset=utf-8"
        $bytes = [Text.Encoding]::UTF8.GetBytes("Not Found")
      } else {
        $extension = [IO.Path]::GetExtension($full).ToLowerInvariant()
        $contentType = $mime[$extension]
        if (-not $contentType) { $contentType = "application/octet-stream" }
        $response.StatusCode = 200
        $response.ContentType = $contentType
        $bytes = [IO.File]::ReadAllBytes($full)
      }
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } catch {
      try { $response.StatusCode = 500 } catch {}
    } finally {
      try { $response.Close() } catch {}
    }
  }
} finally {
  if ($listener.IsListening) { $listener.Stop() }
  $listener.Close()
}

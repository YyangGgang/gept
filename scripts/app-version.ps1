param(
  [ValidateSet('Prepare', 'Restore', 'Publish')]
  [string]$Action = ''
)

try { chcp 65001 > $null } catch {}
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$script:GeptRoot = Split-Path -Parent $PSScriptRoot

function Write-Utf8File {
  param([string]$Path, [string]$Text)
  $utf8 = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText($Path, $Text, $utf8)
}

function Get-GeptTaipeiNow {
  $tz = [TimeZoneInfo]::FindSystemTimeZoneById('Taipei Standard Time')
  return [TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $tz)
}

function Get-NextGeptAppVersion {
  param(
    [int]$VersionCode,
    [string]$VersionName,
    [datetime]$Now
  )
  $day = $Now.ToString('yyyy.MM.dd')
  $seq = 1
  if ($VersionName -match '^(\d{4}\.\d{2}\.\d{2})\.(\d+)$' -and $Matches[1] -eq $day) {
    $seq = [int]$Matches[2] + 1
  }
  [pscustomobject]@{
    versionCode = $VersionCode + 1
    versionName = "$day.$seq"
    builtAt     = $Now.ToString('yyyy-MM-dd HH:mm:ss')
  }
}

function Read-GeptAppVersion {
  $path = Join-Path $script:GeptRoot 'android\app-version.json'
  if (-not (Test-Path -LiteralPath $path)) {
    return [pscustomobject]@{ versionCode = 0; versionName = ''; builtAt = '' }
  }
  $raw = [System.IO.File]::ReadAllText($path)
  $state = $raw | ConvertFrom-Json
  [pscustomobject]@{
    versionCode = [int]$state.versionCode
    versionName = [string]$state.versionName
    builtAt     = [string]$state.builtAt
  }
}

function Write-GeptAppVersion {
  param($Version)
  $path = Join-Path $script:GeptRoot 'android\app-version.json'
  $json = ($Version | ConvertTo-Json) + "`r`n"
  Write-Utf8File -Path $path -Text $json
}

function Update-GeptGradleVersionText {
  param([string]$Text, [int]$VersionCode, [string]$VersionName)
  $reCode = New-Object System.Text.RegularExpressions.Regex ('versionCode\s+\d+')
  $updated = $reCode.Replace($Text, "versionCode $VersionCode", 1)
  $reName = New-Object System.Text.RegularExpressions.Regex ('versionName\s+"[^"]*"')
  $nameLine = 'versionName "' + $VersionName + '"'
  $updated = $reName.Replace($updated, $nameLine, 1)
  $codeOk = $updated -match ('versionCode\s+' + $VersionCode + '\b')
  $nameOk = $updated -match ('versionName\s+"' + [regex]::Escape($VersionName) + '"')
  if (-not $codeOk -or -not $nameOk) { throw 'android/app/build.gradle 裡找不到 versionCode 或 versionName' }
  return $updated
}

function Update-GeptGradleVersion {
  param($Version)
  $path = Join-Path $script:GeptRoot 'android\app\build.gradle'
  $text = [System.IO.File]::ReadAllText($path)
  $updated = Update-GeptGradleVersionText -Text $text -VersionCode ([int]$Version.versionCode) -VersionName ([string]$Version.versionName)
  Write-Utf8File -Path $path -Text $updated
}

function Get-GeptWebVersionStub {
  @(
    '/* 網頁版不帶平板版次。build-apk.bat 只在編譯當下改寫這個檔，同步進 APK 後會還原。 */'
    'window.GEPT_APP_BUILD = { versionCode: 0, versionName: "", builtAt: "" };'
    ''
  ) -join "`n"
}

function Write-GeptWebVersionStamp {
  param($Version)
  $path = Join-Path $script:GeptRoot 'src\app-version.js'
  $name = [string]$Version.versionName
  $builtAt = [string]$Version.builtAt
  $js = @(
    '/* 此檔由 build-apk.bat 寫入 APK。網頁版的這份會在編譯結束後還原成版次 0。 */'
    ('window.GEPT_APP_BUILD = { versionCode: ' + [int]$Version.versionCode + ', versionName: "' + $name + '", builtAt: "' + $builtAt + '" };')
    ''
  ) -join "`n"
  Write-Utf8File -Path $path -Text $js
}

function Restore-GeptWebVersionStub {
  $path = Join-Path $script:GeptRoot 'src\app-version.js'
  Write-Utf8File -Path $path -Text (Get-GeptWebVersionStub)
}

function Read-GeptPublishToken {
  $path = Join-Path $script:GeptRoot 'gas\Code.gs'
  $text = [System.IO.File]::ReadAllText($path)
  $match = [regex]::Match($text, "const VERSION_PUBLISH_TOKEN = '([^']+)';")
  if (-not $match.Success -or $match.Groups[1].Value.Length -lt 16) {
    throw 'gas/Code.gs 裡找不到 VERSION_PUBLISH_TOKEN'
  }
  return $match.Groups[1].Value
}

function Read-GeptGasWebAppUrl {
  $path = Join-Path $script:GeptRoot 'src\index.html'
  $text = [System.IO.File]::ReadAllText($path)
  $match = [regex]::Match($text, "const GAS_WEBAPP_URL = '(https://script\.google\.com/macros/s/[^']+/exec)';")
  if (-not $match.Success) { throw 'src/index.html 裡找不到 GAS_WEBAPP_URL' }
  return $match.Groups[1].Value
}

function Invoke-GeptGasGet {
  param([string]$Url)
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  Add-Type -AssemblyName System.Net.Http
  $client = New-Object System.Net.Http.HttpClient
  $client.Timeout = [TimeSpan]::FromSeconds(45)
  try {
    return $client.GetStringAsync($Url).GetAwaiter().GetResult()
  } finally {
    $client.Dispose()
  }
}

function Test-GeptVersionResponse {
  param([string]$Text)
  if (-not $Text) { return $false }
  $start = $Text.IndexOf('{')
  $end = $Text.LastIndexOf('}')
  if ($start -lt 0 -or $end -le $start) { return $false }
  try {
    $data = $Text.Substring($start, $end - $start + 1) | ConvertFrom-Json
  } catch {
    return $false
  }
  $names = @($data.PSObject.Properties.Name)
  return ($data.ok -eq $true -and $names -contains 'versionCode')
}

function Invoke-GeptGasPost {
  param([string]$Url, [string]$JsonBody)
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
  Add-Type -AssemblyName System.Net.Http
  $handler = New-Object System.Net.Http.HttpClientHandler
  $handler.AllowAutoRedirect = $false
  $client = New-Object System.Net.Http.HttpClient($handler)
  $client.Timeout = [TimeSpan]::FromSeconds(45)
  try {
    $current = $Url
    for ($hop = 0; $hop -lt 4; $hop++) {
      $content = New-Object System.Net.Http.StringContent($JsonBody, [Text.Encoding]::UTF8, 'application/json')
      $resp = $client.PostAsync($current, $content).GetAwaiter().GetResult()
      $status = [int]$resp.StatusCode
      if ($status -ge 300 -and $status -lt 400 -and $resp.Headers.Location) {
        $loc = $resp.Headers.Location
        if (-not $loc.IsAbsoluteUri) {
          $loc = New-Object System.Uri((New-Object System.Uri($current)), $loc)
        }
        # 網頁應用程式把 POST 結果放在重新導向網址，必須用 GET 讀取。再 POST 會得到「找不到網頁」。
        $follow = $client.GetAsync($loc.AbsoluteUri).GetAwaiter().GetResult()
        return $follow.Content.ReadAsStringAsync().GetAwaiter().GetResult()
      }
      return $resp.Content.ReadAsStringAsync().GetAwaiter().GetResult()
    }
    throw '試算表網址重新導向次數過多'
  } finally {
    $client.Dispose()
    $handler.Dispose()
  }
}

function Publish-GeptAppVersion {
  $state = Read-GeptAppVersion
  if ([string]$state.versionName -notmatch '^\d{4}\.\d{2}\.\d{2}\.\d+$') {
    Write-Host "目前版次是「$($state.versionName)」，還沒有用 build-apk.bat 產生過新版次，所以沒有寫入試算表。"
    exit 1
  }
  $token = Read-GeptPublishToken
  $url = Read-GeptGasWebAppUrl
  $probe = $url + '?action=appVersion&t=' + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  try {
    $probeText = Invoke-GeptGasGet -Url $probe
  } catch {
    $probeText = ''
  }
  if (-not (Test-GeptVersionResponse -Text $probeText)) {
    Write-Host "試算表腳本還沒有版次功能，這次沒有寫入，避免被舊腳本當成一筆成績。請把 gas/Code.gs 部署成新版本後，再雙擊 publish-app-version.bat。"
    exit 1
  }
  $payload = [ordered]@{
    action      = 'publishAppVersion'
    token       = $token
    versionCode = [int]$state.versionCode
    versionName = [string]$state.versionName
    builtAt     = [string]$state.builtAt
  }
  $json = $payload | ConvertTo-Json -Compress
  try {
    $text = Invoke-GeptGasPost -Url $url -JsonBody $json
  } catch {
    Write-Host "沒有寫入試算表頁籤「App版次」：$($_.Exception.Message)"
    exit 1
  }
  $safe = $text
  if ($token) { $safe = $safe.Replace($token, '***') }
  $start = $safe.IndexOf('{')
  $end = $safe.LastIndexOf('}')
  if ($start -lt 0 -or $end -le $start) {
    $snippet = ($safe -replace '\s+', ' ')
    if ($snippet.Length -gt 180) { $snippet = $snippet.Substring(0, 180) }
    Write-Host "試算表沒有回傳版次結果。請把 gas/Code.gs 部署成新版本（執行身分選「我」、存取權選「所有人」）。$snippet"
    exit 1
  }
  try {
    $data = $safe.Substring($start, $end - $start + 1) | ConvertFrom-Json
  } catch {
    $snippet = ($safe -replace '\s+', ' ')
    if ($snippet.Length -gt 180) { $snippet = $snippet.Substring(0, 180) }
    Write-Host "試算表沒有回傳版次結果。請把 gas/Code.gs 部署成新版本（執行身分選「我」、存取權選「所有人」）。$snippet"
    exit 1
  }
  if (-not $data.ok) {
    $reason = [string]$data.error
    if (-not $reason) { $reason = '試算表拒絕寫入' }
    Write-Host "沒有寫入試算表頁籤「App版次」：$reason"
    exit 1
  }
  Write-Host "已寫入試算表頁籤「App版次」：$($state.versionName)（代碼 $($state.versionCode)）。D 欄為「是」的那一列是目前最新。"
  exit 0
}

if ($MyInvocation.InvocationName -ne '.') {
switch ($Action) {
  'Prepare' {
    $state = Read-GeptAppVersion
    $next = Get-NextGeptAppVersion -VersionCode ([int]$state.versionCode) -VersionName ([string]$state.versionName) -Now (Get-GeptTaipeiNow)
    Write-GeptAppVersion -Version $next
    Update-GeptGradleVersion -Version $next
    Write-GeptWebVersionStamp -Version $next
    Write-Host "這次版次：$($next.versionName)（代碼 $($next.versionCode)）"
    exit 0
  }
  'Restore' {
    Restore-GeptWebVersionStub
    exit 0
  }
  'Publish' {
    Publish-GeptAppVersion
  }
  default {
    Write-Host '請指定 -Action Prepare、Restore 或 Publish。'
    exit 1
  }
}
}

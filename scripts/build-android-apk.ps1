$ErrorActionPreference = "Stop"
try { chcp 65001 > $null } catch {}
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
$env:Path = "C:\Program Files\nodejs;" + $env:Path

$javaHome = Get-ChildItem "C:\Program Files\Eclipse Adoptium" -Directory -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like "jdk-21*" } |
  Select-Object -First 1
if ($javaHome) {
  $env:JAVA_HOME = $javaHome.FullName
  $env:Path = "$($javaHome.FullName)\bin;" + $env:Path
}

$sdk = "$env:LOCALAPPDATA\Android\Sdk"
if (-not $env:ANDROID_HOME -and (Test-Path $sdk)) {
  $env:ANDROID_HOME = $sdk
  $env:ANDROID_SDK_ROOT = $sdk
}

Write-Host ""
Write-Host "Google Cloud 需新增 Android 類型 OAuth 用戶端（與現有網頁用戶端同一個專案）："
Write-Host "  套件名稱：tw.gept.exam.tablet"
Write-Host "  SHA-1（debug 側載）："
Write-Host "    keytool -list -v -keystore `"$env:USERPROFILE\.android\debug.keystore`" -alias androiddebugkey -storepass android -keypass android"
Write-Host "  沒有這個用戶端時 APK 仍可安裝，但 Google 登入會失敗（開發者設定錯誤）。"
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "找不到 Node.js，無法同步網頁到 Android 專案。"
  exit 1
}
if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
  Write-Host "找不到 JDK 21。已保留 android 專案，但這台電腦無法組出 APK。"
  exit 1
}
if (-not $env:ANDROID_HOME -or -not (Test-Path $env:ANDROID_HOME)) {
  Write-Host "找不到 Android SDK。已保留 android 專案，但這台電腦無法組出 APK。"
  exit 1
}

& "$PSScriptRoot\app-version.ps1" -Action Prepare
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$buildCode = 0
try {
  npm run apk:debug
  $buildCode = $LASTEXITCODE
} finally {
  & "$PSScriptRoot\app-version.ps1" -Action Restore
}

if ($buildCode -ne 0) { exit $buildCode }

$built = Join-Path $root "android\app\build\outputs\apk\debug\app-debug.apk"
if (-not (Test-Path -LiteralPath $built)) {
  Write-Host "編譯結束，但找不到 $built"
  exit 1
}

$appName = "全民英檢"
$stringsPath = Join-Path $root "android\app\src\main\res\values\strings.xml"
if (Test-Path -LiteralPath $stringsPath) {
  [xml]$stringsXml = Get-Content -LiteralPath $stringsPath -Raw -Encoding UTF8
  $named = @($stringsXml.resources.string) | Where-Object { $_.name -eq "app_name" } | Select-Object -First 1
  if ($named -and $named.InnerText) { $appName = $named.InnerText.Trim() }
}
$safeName = ($appName -replace '[\\/:*?"<>|]', "").Trim()
if (-not $safeName) { $safeName = "全民英檢" }
$ready = Join-Path $root ($safeName + ".apk")
Copy-Item -LiteralPath $built -Destination $ready -Force

Write-Host ""
Write-Host "可安裝的 APK：$ready"
& "$PSScriptRoot\app-version.ps1" -Action Publish
if ($LASTEXITCODE -ne 0) {
  Write-Host "APK 已產出，但這一版沒有寫入試算表。請先重新部署 gas/Code.gs，再雙擊 publish-app-version.bat（不會重編，也不會再跳號）。"
}
Start-Process explorer.exe -ArgumentList "/select,`"$ready`""

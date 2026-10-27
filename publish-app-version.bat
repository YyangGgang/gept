@echo off
cd /d "%~dp0"
chcp 65001 >nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\app-version.ps1" -Action Publish
if errorlevel 1 (
  echo.
  echo The spreadsheet was not updated. See the messages above.
  pause
  exit /b 1
)
echo.
pause

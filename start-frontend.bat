@echo off
echo Starting FuzzForge Frontend...
echo.
cd /d "%~dp0"
call npm run dev
pause

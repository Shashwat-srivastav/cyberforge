@echo off
echo Starting FuzzForge Backend Server...
echo.
cd /d "%~dp0"
call npm run dev:server
pause

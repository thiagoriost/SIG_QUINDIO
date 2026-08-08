@echo off
setlocal

REM Ejecuta Docker Compose en modo desarrollo usando manage-compose.mjs.
REM Uso:
REM   Doble clic: up -d --build
REM   Terminal: run-dev.bat ps

set "SCRIPT_DIR=%~dp0"
pushd "%SCRIPT_DIR%" >nul

if "%~1"=="" (
  set "COMPOSE_ARGS=up -d --build"
) else (
  set "COMPOSE_ARGS=%*"
)

echo [run-dev] Ejecutando: node .\manage-compose.mjs dev %COMPOSE_ARGS%
node .\manage-compose.mjs dev %COMPOSE_ARGS%
set "EXIT_CODE=%ERRORLEVEL%"

echo.
if "%~1"=="" (
  echo [run-dev] Proceso finalizado con codigo %EXIT_CODE%.
  echo Presiona una tecla para cerrar esta ventana...
  pause >nul
)

popd >nul
exit /b %EXIT_CODE%

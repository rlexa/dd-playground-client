setlocal
set SKIP_SASS_BINARY_DOWNLOAD_FOR_CI=1
set SASS_BINARY_PATH=%~dp0sass-binaries\v4-9-0\win32-x64-57_binding.node

call npm install
rem call ng update @angular/cli @angular/core
rem call ng update @angular/material
call robocopy %~dp0sass-binaries\v4-9-0\vendor %~dp0node_modules\node-sass\vendor /s /e
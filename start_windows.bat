@echo off
chcp 65001 >nul
title CWT OEE System Dashboard

echo ==================================================
echo   CWT OEE System - Phraeksa Factory (2.5D)
echo ==================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] ไม่พบ Node.js ในเครื่องนี้
    echo กรุณาติดตั้ง Node.js LTS จาก https://nodejs.org แล้วรันไฟล์นี้อีกครั้ง
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo [1/2] กำลังติดตั้ง Dependencies ครั้งแรก (รอสักครู่)...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] ติดตั้ง Dependencies ไม่สำเร็จ
        pause
        exit /b 1
    )
)

echo [2/2] กำลังเปิด Dashboard ที่ http://localhost:5173 ...
start "" http://localhost:5173
call npm run dev
pause

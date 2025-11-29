# Deployment Check Script for Windows
Write-Host "`n🚀 Student Grade Tracker - Deployment Check`n" -ForegroundColor Cyan

# Check if in correct directory
if (-not (Test-Path "frontend") -or -not (Test-Path "backend")) {
    Write-Host "❌ Error: Run this script from the project root directory`n" -ForegroundColor Red
    exit 1
}

# Frontend check
Write-Host "1️⃣ Checking Frontend Build..." -ForegroundColor Green
Push-Location frontend
npm run build
$frontendBuild = $LASTEXITCODE
Pop-Location

if ($frontendBuild -eq 0) {
    Write-Host "`n✅ Frontend build successful!`n" -ForegroundColor Green
} else {
    Write-Host "`n❌ Frontend build failed!`n" -ForegroundColor Red
    exit 1
}

# Success message
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host "✅ Build Check Complete - Ready to Deploy!" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Cyan

Write-Host "`n📝 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Verify environment variables on Render" -ForegroundColor Gray
Write-Host "   2. Run: git add ." -ForegroundColor Gray
Write-Host "   3. Run: git commit -m 'Fix: Build errors and CORS'" -ForegroundColor Gray
Write-Host "   4. Run: git push" -ForegroundColor Gray
Write-Host "`n📖 See DEPLOYMENT_READY.md for details`n" -ForegroundColor Cyan

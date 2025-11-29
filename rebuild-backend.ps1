Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host "   Student Grade Tracker - Backend Rebuild Script" -ForegroundColor Cyan
Write-Host "===========================================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to backend directory
Set-Location -Path "P:\ASUS\Projects\khush project\student grade tracker\backend"

Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
mvn clean

Write-Host ""
Write-Host "🔨 Building application (skipping tests)..." -ForegroundColor Yellow
mvn package -DskipTests

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Starting application..." -ForegroundColor Yellow
    Write-Host "   Press Ctrl+C to stop the server" -ForegroundColor Gray
    Write-Host ""
    
    # Set environment variables
    $env:MONGODB_URI = "mongodb+srv://k:k@cluster0.wzxxhl9.mongodb.net/gradetracker_v2?retryWrites=true&w=majority"
    $env:ALLOWED_ORIGINS = "http://localhost:3000,http://localhost:5173,https://*.onrender.com"
    $env:JWT_SECRET = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970"
    $env:SPRING_PROFILES_ACTIVE = "prod"
    
    # Run the application
    mvn spring-boot:run
} else {
    Write-Host ""
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}

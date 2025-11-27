# Start KIRO Flask Backend

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║      KIRO MASTERBUILDER - Backend Startup Script         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check Python
Write-Host "🐍 Checking Python..." -ForegroundColor Cyan
$python = Get-Command python -ErrorAction SilentlyContinue

if (-not $python) {
    Write-Host "❌ Python not found!" -ForegroundColor Red
    Write-Host "Please install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "✅ Python found: $($python.Version)" -ForegroundColor Green

# Check Docker
Write-Host "🐳 Checking Docker..." -ForegroundColor Cyan
$docker = Get-Command docker -ErrorAction SilentlyContinue

if (-not $docker) {
    Write-Host "⚠️  Docker not found!" -ForegroundColor Yellow
    Write-Host "Install Docker Desktop from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    Write-Host "Backend will run in simulation mode without Docker" -ForegroundColor Yellow
} else {
    Write-Host "✅ Docker found" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Installing Python dependencies..." -ForegroundColor Cyan

# Install requirements
python -m pip install -r requirements.txt --quiet

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    pause
    exit
}

Write-Host "✅ Dependencies installed!" -ForegroundColor Green
Write-Host ""

# Start Flask
Write-Host "🚀 Starting Flask backend..." -ForegroundColor Cyan
Write-Host "🌐 Backend will be available at: http://localhost:5000" -ForegroundColor Green
Write-Host "🖥️  Frontend should connect to this URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

python app.py

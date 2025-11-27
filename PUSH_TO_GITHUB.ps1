# Automated GitHub Push Script
# This script commits and pushes changes to GitHub

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         KIRO MASTERBUILDER - GitHub Push Script          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path ".git")) {
    Write-Host "❌ Error: Not in a git repository!" -ForegroundColor Red
    Write-Host "Please run this script from the HTML_MASTERBUILDER folder" -ForegroundColor Yellow
    pause
    exit
}

# Check if remote is configured
$remoteUrl = git remote get-url origin 2>$null

if (-not $remoteUrl) {
    Write-Host "⚠️  GitHub remote not configured yet!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Your GitHub repo: iamthundervolt/SSF-MICK_MASTERBUILDER-KIRO---AI-TERMUX-AND-MORE" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Setting up remote..." -ForegroundColor Green
    
    git remote add origin https://github.com/iamthundervolt/SSF-MICK_MASTERBUILDER-KIRO---AI-TERMUX-AND-MORE.git
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Remote configured successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to configure remote" -ForegroundColor Red
        pause
        exit
    }
}

Write-Host ""
Write-Host "📊 Checking for changes..." -ForegroundColor Cyan

# Check if there are changes
$status = git status --porcelain

if ($status) {
    Write-Host "📝 Changes detected!" -ForegroundColor Yellow
    Write-Host ""
    git status --short
    Write-Host ""
    
    # Ask for commit message
    $commitMessage = Read-Host "Enter commit message (or press Enter for default)"
    
    if (-not $commitMessage) {
        $commitMessage = "Update from KIRO Masterbuilder - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    }
    
    Write-Host ""
    Write-Host "📦 Committing changes..." -ForegroundColor Cyan
    git add .
    git commit -m "$commitMessage"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Commit failed!" -ForegroundColor Red
        pause
        exit
    }
    
    Write-Host "✅ Changes committed!" -ForegroundColor Green
} else {
    Write-Host "✅ No new changes to commit" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  You will be asked for your GitHub credentials:" -ForegroundColor Yellow
Write-Host "   Username: iamthundervolt" -ForegroundColor White
Write-Host "   Password: [your GitHub password or token]" -ForegroundColor White
Write-Host ""

# Push to GitHub
git push -u origin master

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║                  ✅ SUCCESS!                               ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Your code is now on GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "View it at:" -ForegroundColor Cyan
    Write-Host "https://github.com/iamthundervolt/SSF-MICK_MASTERBUILDER-KIRO---AI-TERMUX-AND-MORE" -ForegroundColor White
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to your GitHub repo" -ForegroundColor White
    Write-Host "2. Click Settings > Pages" -ForegroundColor White
    Write-Host "3. Select 'master' branch" -ForegroundColor White
    Write-Host "4. Your app will be live at:" -ForegroundColor White
    Write-Host "   https://iamthundervolt.github.io/SSF-MICK_MASTERBUILDER-KIRO---AI-TERMUX-AND-MORE/login.html" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Wrong password - Use a Personal Access Token instead" -ForegroundColor White
    Write-Host "2. Repository doesn't exist - Create it on GitHub first" -ForegroundColor White
    Write-Host "3. No internet connection" -ForegroundColor White
    Write-Host ""
    Write-Host "To create a Personal Access Token:" -ForegroundColor Cyan
    Write-Host "1. Go to GitHub.com > Settings > Developer settings" -ForegroundColor White
    Write-Host "2. Personal access tokens > Tokens (classic)" -ForegroundColor White
    Write-Host "3. Generate new token > Select 'repo' scope" -ForegroundColor White
    Write-Host "4. Use the token as your password" -ForegroundColor White
}

Write-Host ""
pause

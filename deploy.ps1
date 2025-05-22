# Build the project
Write-Host "Building the project..." -ForegroundColor Cyan
npm run build

# Create a zip file
Write-Host "\nCreating deployment package..." -ForegroundColor Cyan
Compress-Archive -Path .\out\* -DestinationPath site.zip -Force

# Deploy to Netlify
Write-Host "\nDeploying to Netlify..." -ForegroundColor Cyan
$netlifySite = netlify deploy --prod --dir=out --json | ConvertFrom-Json

if ($netlifySite.deploy_url) {
    Write-Host "\n✅ Deployment successful!" -ForegroundColor Green
    Write-Host "🌐 Your site is live at: $($netlifySite.deploy_url)" -ForegroundColor Cyan
} else {
    Write-Host "\n❌ Deployment failed. Please check the error above." -ForegroundColor Red
}

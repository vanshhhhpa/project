# Run-local helper for Creative Hub (Windows PowerShell)
Write-Host "=== Creative Hub — Local dev helper ===" -ForegroundColor Green

# Install dependencies
if (-Not (Test-Path "node_modules")) {
  Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
  npm install
} else {
  Write-Host "Dependencies already installed." -ForegroundColor Cyan
}

# Ensure .env exists
if (-Not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env" -ErrorAction SilentlyContinue
  Write-Host "Created .env from .env.example — edit it and add your Stripe keys and MONGO_URI." -ForegroundColor Yellow
} else {
  Write-Host ".env exists." -ForegroundColor Cyan
}

Write-Host "Ensure MongoDB is running (mongod) or set MONGO_URI to a running MongoDB instance." -ForegroundColor Magenta

Write-Host "Starting dev server (nodemon)..." -ForegroundColor Green
Start-Process powershell -ArgumentList '-NoExit','-Command','npm run dev'

Start-Sleep -Seconds 1
Write-Host "Opening http://localhost:5000 in your browser..." -ForegroundColor Green
Start-Process "http://localhost:5000"

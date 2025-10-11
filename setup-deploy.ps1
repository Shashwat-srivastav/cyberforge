# Windows PowerShell Deployment Setup Script

# FuzzForge Deployment Setup Script
Write-Host "📦 Setting up FuzzForge for GitHub Pages + Render deployment..." -ForegroundColor Cyan

# 1. Make sure we're in the project root directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this script from the project root directory." -ForegroundColor Red
    exit 1
}

# 2. Create .env file for production
Write-Host "Creating .env.production..." -ForegroundColor Yellow
@"
# Production environment variables
VITE_API_PROXY_URL=https://fuzzforge-api.onrender.com/api/analyze
"@ | Set-Content -Path ".env.production"

Write-Host "✅ Created .env.production" -ForegroundColor Green

# 3. Update package.json with build script if needed
$packageJson = Get-Content -Raw -Path "package.json" | ConvertFrom-Json
if (-not $packageJson.scripts.build) {
    Write-Host "❌ Error: No build script found in package.json" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Package.json has build script" -ForegroundColor Green

# 4. Check if server/package.json exists
if (-not (Test-Path "server/package.json")) {
    Write-Host "Creating server/package.json..." -ForegroundColor Yellow
    if (-not (Test-Path "server")) {
        New-Item -ItemType Directory -Path "server" | Out-Null
    }
    Copy-Item -Path "package.json" -Destination "server/package.json" -Force
    Write-Host "✅ Created server/package.json" -ForegroundColor Green
}

# 5. Create a .gitignore file if it doesn't exist
if (-not (Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore file..." -ForegroundColor Yellow
    @"
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
"@ | Set-Content -Path ".gitignore"
    Write-Host "✅ Created .gitignore" -ForegroundColor Green
}

# 6. Reminder about repository setup
Write-Host @"

🚀 FuzzForge deployment setup complete!

Next steps:
1. Create a GitHub repository named 'fuzzforge'
2. Push your code to the repository:
   git init (if needed)
   git remote add origin https://github.com/YOUR-USERNAME/fuzzforge.git
   git add .
   git commit -m 'Initial commit'
   git push -u origin main

3. Set up the backend on Render.com:
   - Sign up at render.com
   - Create a new Web Service
   - Link to your GitHub repository
   - Set build command: cd server && npm install
   - Set start command: cd server && npm start
   - Add environment variables:
     - PORT: 10000
     - MISTRAL_API_KEY: (your API key)

4. Enable GitHub Pages:
   - Go to your repository settings
   - Navigate to Pages
   - Set source to GitHub Actions

For full instructions, see DEPLOYMENT.md
"@ -ForegroundColor Cyan
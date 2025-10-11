#!/bin/bash

# FuzzForge Deployment Setup Script
echo "📦 Setting up FuzzForge for GitHub Pages + Render deployment..."

# 1. Make sure we're in the project root directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory."
    exit 1
fi

# 2. Create .env file for production
echo "Creating .env.production..."
cat > .env.production << EOL
# Production environment variables
VITE_API_PROXY_URL=https://fuzzforge-api.onrender.com/api/analyze
EOL

echo "✅ Created .env.production"

# 3. Update package.json with build script if needed
if ! grep -q '"build":' package.json; then
    echo "❌ Error: No build script found in package.json"
    exit 1
fi

echo "✅ Package.json has build script"

# 4. Check if server/package.json exists
if [ ! -f "server/package.json" ]; then
    echo "Creating server/package.json..."
    mkdir -p server
    cp -n package.json server/package.json
    echo "✅ Created server/package.json"
fi

# 5. Reminder about repository setup
echo "
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
"
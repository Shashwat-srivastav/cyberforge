# FuzzForge Deployment Guide: GitHub Pages + Render

This guide provides step-by-step instructions to deploy FuzzForge using free services:
- **Frontend**: GitHub Pages
- **Backend API**: Render.com

## Prerequisites

1. GitHub account
2. Render.com account (free tier)
3. Mistral AI API key

## Step 1: Prepare Your Repository

1. Run the setup script from the project root:
   ```powershell
   # Windows
   .\setup-deploy.ps1
   
   # Linux/Mac
   chmod +x setup-deploy.sh
   ./setup-deploy.sh
   ```

2. Create a new GitHub repository named "fuzzforge"

3. Push your code to GitHub:
   ```bash
   git init (if needed)
   git remote add origin https://github.com/YOUR-USERNAME/fuzzforge.git
   git add .
   git commit -m "Initial commit for deployment"
   git push -u origin main
   ```

## Step 2: Deploy Backend API to Render

1. Sign up at [render.com](https://render.com) (free tier)

2. Create a new Web Service:
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Name: `fuzzforge-api`
   - Build command: `cd server && npm install`
   - Start command: `cd server && npm start`

3. Configure environment variables:
   - Click "Environment" tab
   - Add the following:
     - `PORT`: `10000`
     - `MISTRAL_API_KEY`: `your_mistral_ai_api_key_here`

4. Click "Create Web Service"

5. Wait for deployment (5-10 minutes)
   - Note the URL (e.g., `https://fuzzforge-api.onrender.com`)

## Step 3: Update Workflow for GitHub Pages

1. Edit `.github/workflows/deploy.yml`:
   - Update `VITE_API_PROXY_URL` with your Render service URL:
   ```yaml
   env:
     VITE_API_PROXY_URL: https://your-render-service-name.onrender.com/api/analyze
   ```

2. Commit and push the changes:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Update API URL for deployment"
   git push
   ```

## Step 4: Enable GitHub Pages Deployment

1. Go to your GitHub repository
2. Click "Settings" → "Pages"
3. Under "Build and deployment":
   - Source: "GitHub Actions"
4. The GitHub Actions workflow will automatically deploy your site

## Step 5: Configure CORS on Backend

After your frontend is deployed, update your backend:

1. Go to your Render dashboard
2. Select your `fuzzforge-api` service
3. Go to "Environment" tab
4. Add new environment variable:
   - `FRONTEND_URL`: `https://your-username.github.io/fuzzforge`
5. Click "Save Changes"
6. Redeploy the service

## Step 6: Testing Your Deployment

1. Wait for GitHub Actions workflow to complete (check "Actions" tab)
2. Visit your deployed site at: `https://your-username.github.io/fuzzforge/`
3. Test uploading and analyzing code to ensure API communication works

## Troubleshooting

### Frontend Issues
- **Blank Page**: Check browser console for errors (F12)
- **404 Errors**: Ensure `base: './'` is in vite.config.ts
- **API Connection Failed**: Verify API URL in GitHub workflow

### Backend Issues
- **CORS Errors**: Check FRONTEND_URL environment variable
- **API Key Issues**: Verify MISTRAL_API_KEY is properly set
- **Service Not Starting**: Check Render logs for errors

### Connection Issues
- **Frontend can't reach backend**: Ensure Render service is running
- **Backend can't reach frontend**: Verify CORS settings in api.js

## Maintenance

- **Update API Key**: Change it in Render environment variables
- **Code Updates**: Push to GitHub, services will auto-deploy
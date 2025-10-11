# GitHub Pages Deployment Guide

## Fixing the Custom Domain Error

If you're seeing this error:
```
The custom domain `shashwat-srivastav.github.io/fuzzforge` is not properly formatted.
```

This is because GitHub Pages already hosts your site at your username subdomain. You don't need to (and can't) set a custom domain that includes your username.

## Correct GitHub Pages Setup

1. Go to your GitHub repository: https://github.com/Shashwat-srivastav/fuzzforge
2. Click on "Settings" tab
3. In the left sidebar, click on "Pages"
4. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - **LEAVE THE CUSTOM DOMAIN FIELD EMPTY**
5. Click "Save"

## Where Your Site Will Be Available

After deployment completes, your site will automatically be available at:
```
https://shashwat-srivastav.github.io/fuzzforge/
```

## Update Render CORS Settings

To ensure your frontend can communicate with your backend API, update the CORS settings in Render:

1. Go to your Render dashboard: https://dashboard.render.com
2. Select your "fuzzforge" service
3. Go to the "Environment" tab
4. Update the FRONTEND_URL environment variable:
   ```
   FRONTEND_URL=https://shashwat-srivastav.github.io
   ```
5. Click "Save Changes" and wait for redeployment

## Checking Deployment Status

1. Go to the "Actions" tab in your GitHub repository
2. You should see a workflow running (or completed)
3. Once complete, navigate to your site URL to verify deployment

## Testing the Full Application

1. Visit: `https://shashwat-srivastav.github.io/fuzzforge/`
2. Open browser developer tools (F12 or right-click → Inspect)
3. Go to the "Console" tab to check for any CORS or API errors
4. Try uploading a code sample to test full functionality
# How to Fix GitHub Pages + CORS for FuzzForge

## Fixing GitHub Pages Deployment

1. **DO NOT** set a custom domain in GitHub Pages settings
   - GitHub Pages will automatically deploy to: `https://shashwat-srivastav.github.io/fuzzforge/`
   - The custom domain field should be empty

2. **Check deployment status** in the Actions tab of your GitHub repository
   - The workflow should complete without errors
   - Your site will be available at the URL above

## Updating CORS Settings on Render

For your frontend to communicate with your backend API, update the CORS settings:

1. Go to Render dashboard: https://dashboard.render.com
2. Select your "fuzzforge" service
3. Go to "Environment" tab
4. Set:
   ```
   FRONTEND_URL=https://shashwat-srivastav.github.io
   ```
   (Notice we don't include '/fuzzforge' here - the CORS setting needs just the domain)

5. Click "Save Changes" and wait for redeployment

## Checking if Everything Works

1. Open your deployed site: `https://shashwat-srivastav.github.io/fuzzforge/`
2. Open browser developer tools (F12 or right-click → Inspect)
3. Go to Console tab
4. Check for any errors:
   - If you see CORS errors, your CORS settings need updating
   - If you see API connection errors, check if your backend is running

## Common CORS Error Messages

If you see messages like these:

```
Access to fetch at 'https://fuzzforge.onrender.com/api/analyze' from origin 'https://shashwat-srivastav.github.io' has been blocked by CORS policy
```

This means your CORS settings on Render need to be updated with the exact origin URL (without any path).
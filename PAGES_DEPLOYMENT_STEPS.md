# GitHub Pages Deployment Steps

## 1. GitHub Pages Configuration ✓
You've already set up GitHub Pages to use GitHub Actions. Great!

## 2. Triggering the Deployment

The workflow should run automatically when you push changes to your repository. If it doesn't:

1. Make a small change to your repository
2. Push it to GitHub:
   ```bash
   git commit -m "Trigger GitHub Pages deployment" --allow-empty
   git push
   ```

## 3. Monitoring Deployment Progress

1. Go to your GitHub repository: https://github.com/Shashwat-srivastav/fuzzforge
2. Click on the "Actions" tab
3. Look for the "Deploy FuzzForge" workflow
4. Click on it to see the progress and logs

The workflow will:
- Check out your code
- Set up Node.js
- Install dependencies
- Build your project
- Deploy it to GitHub Pages

## 4. Verifying Deployment

Once the workflow completes successfully:

1. Go back to Settings → Pages
2. You should see a message: "Your site is live at https://shashwat-srivastav.github.io/fuzzforge/"
3. Click on the URL to visit your deployed site

## 5. Testing Your Application

1. Open your deployed site
2. Test uploading a code file to ensure the frontend-backend connection works
3. Check browser console (F12) for any errors

## 6. Troubleshooting

If your site doesn't appear after successful deployment:

1. Wait a few minutes (sometimes GitHub Pages takes time to update)
2. Check if there are any errors in the Actions workflow logs
3. Verify your vite.config.ts has `base: './'` set correctly

## 7. Updating CORS Settings (If Needed)

If you get CORS errors in the console when making API calls:

1. Go to your Render dashboard
2. Update the CORS settings with:
   ```
   FRONTEND_URL=https://shashwat-srivastav.github.io
   ```
3. Remember to save changes and wait for redeployment

## 8. Updating Your Application

To update your application in the future:

1. Make changes to your code
2. Push to GitHub
3. The GitHub Actions workflow will automatically rebuild and redeploy
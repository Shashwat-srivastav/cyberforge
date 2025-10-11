# GitHub Pages Deployment Permission Fix

## The Problem
GitHub Actions was failing to deploy to GitHub Pages with this error:
```
Permission to Shashwat-srivastav/fuzzforge.git denied to github-actions[bot]
```

## What I've Fixed
I've updated your GitHub Actions workflow file to include proper permissions:

1. Added explicit permissions to the workflow:
   ```yaml
   permissions:
     contents: write
     pages: write
     id-token: write
   ```

2. Updated the deployment step with token and branch information:
   ```yaml
   with:
     folder: dist
     token: ${{ secrets.GITHUB_TOKEN }}
     branch: gh-pages
     clean: true
   ```

## What You Need to Do

1. **Update GitHub Repository Settings**

   a. Go to your repository: https://github.com/Shashwat-srivastav/fuzzforge
   
   b. Click "Settings" tab
   
   c. In the left sidebar, click "Actions" → "General"
   
   d. Under "Workflow permissions", select:
      - "Read and write permissions"
      - Check "Allow GitHub Actions to create and approve pull requests"
   
   e. Click "Save"

2. **Update GitHub Pages Settings**

   a. Go to "Settings" → "Pages"
   
   b. Under "Build and deployment":
      - Source: "Deploy from a branch"
      - Branch: "gh-pages" / "/ (root)"
   
   c. Click "Save"

3. **Push the updated workflow file**
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Fix GitHub Pages deployment permissions"
   git push
   ```

4. **Wait for the deployment to complete**
   - Check the Actions tab to see the workflow run
   - Once complete, your site should be available

## Why This Works
GitHub Actions needs explicit permissions to push to the gh-pages branch. By configuring both the workflow file and repository settings, we're granting the necessary permissions for deployment.
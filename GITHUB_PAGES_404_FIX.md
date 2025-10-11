# GitHub Pages 404 Fix - Step by Step

## Current Status
✅ Backend is working: https://fuzzforge.onrender.com/
❌ Frontend showing 404: https://shashwat-srivastav.github.io/fuzzforge/

## Solution: Use GitHub's Native Pages Deployment

I've created a new workflow file that uses GitHub's official Pages deployment action.

### Step 1: Push the New Workflow

```bash
git add .github/workflows/deploy-pages.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

### Step 2: Configure GitHub Pages Settings

1. Go to your repository: https://github.com/Shashwat-srivastav/fuzzforge

2. Click **Settings** tab

3. In the left sidebar, click **Pages**

4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (NOT "Deploy from a branch")
   
5. Save (if there's a save button)

### Step 3: Check Workflow Permissions

1. Still in Settings, click **Actions** → **General** in the left sidebar

2. Scroll to **Workflow permissions**:
   - ✅ Select **Read and write permissions**
   - ✅ Check **Allow GitHub Actions to create and approve pull requests**
   
3. Click **Save**

### Step 4: Manually Trigger the Workflow (if needed)

1. Go to **Actions** tab: https://github.com/Shashwat-srivastav/fuzzforge/actions

2. Click on **"Deploy to GitHub Pages"** in the left sidebar

3. Click **"Run workflow"** button on the right

4. Click the green **"Run workflow"** button

### Step 5: Wait for Deployment

1. Watch the workflow progress in the Actions tab

2. It should take 2-5 minutes to complete

3. Look for a green checkmark ✅

4. Once complete, visit: https://shashwat-srivastav.github.io/fuzzforge/

## If Still Getting 404

### Option A: Check if gh-pages branch exists

1. Go to your repository
2. Click on the branch dropdown (says "main")
3. Look for a "gh-pages" branch
4. If it doesn't exist, that's the issue

### Option B: Try the old workflow with proper settings

If the new workflow doesn't work, ensure in Settings → Pages:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **/ (root)**
- Save

Then push a change to trigger the old workflow.

### Option C: Manual Deployment Test

Run locally to test the build:
```bash
npm run build
```

Check if the `dist` folder is created with your files.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Workflow not running | Check Actions are enabled in Settings → Actions |
| Permission denied | Update Workflow permissions in Settings → Actions → General |
| Build fails | Check Actions tab for error logs |
| 404 after successful deployment | Wait 5-10 minutes, GitHub Pages can be slow |

## Final Verification

Once deployed successfully, you should see:
- Your FuzzForge UI at the GitHub Pages URL
- No console errors in browser DevTools (F12)
- Ability to upload and analyze code files

## Expected URLs

- **Frontend**: https://shashwat-srivastav.github.io/fuzzforge/
- **Backend API**: https://fuzzforge.onrender.com/api/analyze
- **Backend Health**: https://fuzzforge.onrender.com/health
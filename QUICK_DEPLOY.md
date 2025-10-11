# FuzzForge Deployment Quick Start 🚀

## Setup & Deploy in 10 Minutes

### 1️⃣ Prepare Repository (2 min)
```powershell
# Run setup script
.\setup-deploy.ps1

# Push to GitHub
git remote add origin https://github.com/YOUR-USERNAME/fuzzforge.git
git push -u origin main
```

### 2️⃣ Deploy Backend to Render (3 min)
- 📝 Create new Web Service on render.com
- 🔗 Link your GitHub repo
- ⚙️ Configure:
  ```
  Build cmd: cd server && npm install
  Start cmd: cd server && npm start
  Env vars: MISTRAL_API_KEY=your_key_here
  ```

### 3️⃣ Deploy Frontend to GitHub Pages (5 min)
- 📝 Update in `.github/workflows/deploy.yml`:
  ```yaml
  VITE_API_PROXY_URL: https://your-render-url.onrender.com/api/analyze
  ```
- 🔄 Push changes
- ⚙️ Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)

## File Structure Ready for Deployment

```
fuzzforge/
├── .github/
│   └── workflows/
│       └── deploy.yml           👈 Frontend deployment workflow
├── server/
│   ├── api.js                   👈 Backend API service
│   ├── package.json             👈 Backend dependencies
│   └── RENDER_DEPLOYMENT.md     👈 Backend deployment guide
├── .env.production              👈 Production environment vars
├── GITHUB_RENDER_DEPLOYMENT.md  👈 This complete guide
└── setup-deploy.ps1             👈 Deployment setup script
```

## 🎉 That's it! Your app is live at:
- Frontend: https://your-username.github.io/fuzzforge/
- Backend: https://fuzzforge-api.onrender.com/

See `GITHUB_RENDER_DEPLOYMENT.md` for detailed instructions and troubleshooting.
# CORS Fix for FuzzForge

## The Problem
Your frontend and backend are deployed, but they can't communicate due to CORS (Cross-Origin Resource Sharing) restrictions.

**Error:** `TypeError: Failed to fetch`

This happens because your backend needs to explicitly allow requests from your GitHub Pages domain.

## The Solution

I've updated the CORS configuration in `server/api.js` to properly handle GitHub Pages requests.

### Changes Made:

**File: `server/api.js`**
```javascript
// Now properly handles GitHub Pages domains
const allowedOrigins = [
  'https://shashwat-srivastav.github.io',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.github.io')) {
      callback(null, true);
    } else {
      console.log('⚠️ Blocked CORS request from:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));
```

## Deploy the Fix

### Step 1: Push the changes to GitHub
```bash
git add server/api.js
git commit -m "Fix CORS configuration for GitHub Pages"
git push
```

### Step 2: Wait for Render to redeploy
- Render automatically detects changes and redeploys
- This takes 2-3 minutes
- Check the Render dashboard to see deployment progress

### Step 3: Verify the fix
Once Render finishes redeploying:

1. Clear your browser cache or open an incognito window
2. Visit: https://shashwat-srivastav.github.io/fuzzforge/
3. Try uploading a code file
4. Check browser console (F12) - CORS errors should be gone!

## How to Check if It Worked

### Before Fix:
```
❌ Failed to fetch
❌ CORS error
```

### After Fix:
```
✅ API calls work
✅ File upload succeeds
✅ Analysis completes
```

## Alternative: Set Environment Variable on Render

If you prefer not to hardcode the domain, you can also:

1. Go to Render dashboard
2. Select your service
3. Environment tab
4. Add/Update:
   ```
   FRONTEND_URL=https://shashwat-srivastav.github.io
   ```
5. Save and redeploy

The code already supports this via `process.env.FRONTEND_URL`.

## Testing the Backend CORS

You can test if CORS is working by running this in your browser console (F12):

```javascript
fetch('https://fuzzforge.onrender.com/health', {
  method: 'GET',
  headers: {
    'Origin': 'https://shashwat-srivastav.github.io'
  }
})
.then(r => r.json())
.then(d => console.log('✅ CORS working:', d))
.catch(e => console.error('❌ CORS failed:', e));
```

If it returns `{status: 'ok', apiKeyConfigured: true}`, CORS is working!

## Troubleshooting

If issues persist after deployment:

1. **Check Render logs** for "Blocked CORS request from:" messages
2. **Clear browser cache** completely
3. **Try incognito/private browsing mode**
4. **Check Network tab** (F12 → Network) to see the actual error
5. **Verify the backend is running** at https://fuzzforge.onrender.com/
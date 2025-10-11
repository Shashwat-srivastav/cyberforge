# API Key Error Fix - 401 Unauthorized

## The Problem
Your backend is getting a **401 Unauthorized** error from Mistral AI:
```
API error: 401 - {"detail":"Unauthorized"}
```

This means either:
1. The Mistral API key is not set in Render environment variables
2. The API key is incorrect or expired
3. The API key doesn't have the right permissions

## Solution: Update API Key on Render

### Step 1: Get Your Mistral AI API Key

1. Go to Mistral AI Console: https://console.mistral.ai/
2. Sign in to your account
3. Navigate to "API Keys" section
4. Copy your API key (or create a new one if needed)

### Step 2: Update Environment Variable on Render

1. Go to your Render dashboard: https://dashboard.render.com
2. Select your "fuzzforge" service
3. Click on the "Environment" tab
4. Look for `MISTRAL_API_KEY`
5. Update it with your valid API key
6. Click "Save Changes"

The service will automatically redeploy with the new key.

### Step 3: Verify the Key is Set

After redeployment, check the Render logs to confirm:
```
🔑 API Key configured: YES
```

If it says `NO`, the environment variable is not set correctly.

## Alternative: Use OpenRouter (Free Alternative)

If you're having trouble with Mistral AI, you can use OpenRouter which offers free models:

### Update server/api.js:

1. Get an OpenRouter API key from https://openrouter.ai
2. Update the backend to use OpenRouter instead:

```javascript
const MISTRAL_API_KEY = process.env.OPENROUTER_API_KEY || "";
const MISTRAL_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "deepseek/deepseek-chat"; // Free model
```

3. Update Render environment variables:
   ```
   OPENROUTER_API_KEY=your_openrouter_key_here
   ```

## Testing After Fix

1. Wait for Render to finish redeploying (2-3 minutes)
2. Clear browser cache or use incognito mode
3. Visit: https://shashwat-srivastav.github.io/fuzzforge/
4. Try uploading a code file
5. Check browser console - should see no more 401 errors

## How to Verify API Key is Working

Test the backend directly with curl:

```bash
curl -X GET https://fuzzforge.onrender.com/health
```

Should return:
```json
{
  "status": "ok",
  "apiKeyConfigured": true
}
```

If `apiKeyConfigured` is `false`, the key is not set.

## Common Issues

| Issue | Solution |
|-------|----------|
| API key not showing as configured | Check spelling of environment variable: `MISTRAL_API_KEY` |
| Still getting 401 after update | Wait for redeploy to complete, check Render logs |
| Key configured but still failing | Verify the API key is valid at Mistral AI console |
| Mistral AI account issues | Consider switching to OpenRouter (free alternative) |

## Check Render Logs

To see detailed error messages:

1. Go to your Render service dashboard
2. Click on "Logs" tab
3. Look for API-related errors
4. You should see the actual Mistral AI response

## Current Mistral API Key Location

The backend reads the API key from:
```javascript
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY || "";
```

This is set in Render's Environment variables, NOT in your code repository (for security).

## Next Steps

1. ✅ Get/verify your Mistral AI API key
2. ✅ Set it in Render environment variables
3. ✅ Wait for automatic redeployment
4. ✅ Test your application
5. ✅ Celebrate! 🎉
# FuzzForge API - Quick Start Guide for Render.com Deployment

This is a backend API service for the FuzzForge application that securely handles API key management and provides an interface to Mistral AI.

## Deployment on Render.com

1. Sign up for a free account at [render.com](https://render.com)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure the service with:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   
## Required Environment Variables

Configure these environment variables in your Render dashboard:

- `PORT`: `10000` (Render will automatically set a PORT variable, but we set this as a fallback)
- `MISTRAL_API_KEY`: Your Mistral AI API key
- `FRONTEND_URL`: URL of your GitHub Pages deployment (add this after frontend deployment)

## API Endpoints

- **POST /api/analyze**: Main endpoint that proxies requests to Mistral AI
- **GET /health**: Simple health check endpoint

## Testing Your Deployment

After deployment, test the API with:

```bash
curl -X GET https://your-render-url.onrender.com/health
```

You should see a message indicating the service is running.
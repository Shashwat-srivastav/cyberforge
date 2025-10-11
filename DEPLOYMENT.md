# FuzzForge Deployment Guide

This document provides step-by-step instructions on how to deploy FuzzForge to free hosting platforms.

## Prerequisites

1. A GitHub account
2. A Render.com account (free tier)
3. A Mistral AI API key

## Deployment Steps

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named "fuzzforge"
2. Clone your repository locally
3. Copy all project files to the cloned repository
4. Commit and push the changes to GitHub

### 2. Deploy the Backend API to Render.com

1. Log in to [Render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: fuzzforge-api
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment Variables**:
     - `PORT`: 10000
     - `MISTRAL_API_KEY`: (your Mistral API key)
     - `FRONTEND_URL`: (will add after frontend is deployed)
5. Click "Create Web Service"

### 3. Deploy the Frontend to GitHub Pages

1. In your GitHub repository, go to Settings > Pages
2. Set the source to "GitHub Actions"
3. The workflow file is already created at `.github/workflows/deploy.yml`
4. Update the environment variable in the workflow file:
   ```yaml
   VITE_API_PROXY_URL: https://your-render-backend-url.onrender.com/api/analyze
   ```
5. Push the updated workflow file to GitHub to trigger the deployment

### 4. Link the Frontend and Backend

1. Once your frontend is deployed on GitHub Pages, copy the URL
2. Go back to your Render.com backend service
3. Add/update the `FRONTEND_URL` environment variable with your GitHub Pages URL
4. Restart the backend service

## Accessing the Deployed Application

- Frontend: https://yourusername.github.io/fuzzforge/
- Backend API: https://fuzzforge-api.onrender.com/api/analyze

## Troubleshooting

- If CORS errors occur, verify the `FRONTEND_URL` environment variable in the backend
- If API calls fail, check the `VITE_API_PROXY_URL` in the frontend build configuration
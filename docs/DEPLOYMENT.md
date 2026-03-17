# Deployment (frontend)

For **running locally**, see the [README](../README.md).

## Vercel

*   **Build command:** `npm run build`
*   **Output directory:** `dist`
*   **Env:** `VITE_API_URL=https://your-api.onrender.com/api` (must end with `/api`)
*   **Redeploy** after changing `VITE_API_URL` so the new URL is baked into the build.

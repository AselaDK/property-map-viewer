# Deployment (Frontend)

For **running locally**, see the [README](../README.md).  
Do not put production API URLs or secrets in the repo — set them in Vercel.

## Vercel

- **Build command:** `npm run build`
- **Output directory:** `dist`

### Environment variables (Vercel → Settings → Environment Variables)

| Key | Description |
|-----|-------------|
| `VITE_API_URL` | Backend API base URL; must end with `/api` (e.g. `https://your-api.onrender.com/api`). |

Use your own backend URL; do not commit production values. After changing `VITE_API_URL`, trigger a **manual redeploy** so the new URL is baked into the build.

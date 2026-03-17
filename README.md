# Property Map Viewer — Frontend

React SPA for the Property Map app: map, property list, search, and auth. Built with **Vite**, **Tailwind CSS**, and **React Router**.

---

## Features

- **Interactive map** — Leaflet map with property markers and popups.
- **Property list & search** — Filters (city, price, type, bedrooms) and nearby search (lat/lng + radius).
- **Auth** — Login page; protected routes; Axios interceptors for JWT and refresh.
- **Roles** — Admin flows for create/edit/delete property (when backend supports it).
- **Responsive UI** — Tailwind-based layout for desktop and mobile.

---

## Architecture & design

- **Components** — Reusable UI in `components/` (common, layout, map, properties, auth).
- **Pages** — Route-level views (e.g. Login, map/dashboard, property detail).
- **Services** — `api/` (axios instance, auth + property API); `auth.service`, `token.service`.
- **State** — `AuthContext` for user/session; hooks (e.g. `useAuth`, `useProperties`) for data and side effects.
- **Config** — `VITE_API_URL` in `.env` for API base URL (no backend/EF knowledge in frontend).

---

## Run locally

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- Backend API running (see root [README](../README.md) or [PropertyMap/README](../PropertyMap/README.md))

### Steps

1. **Install**
   ```bash
   npm install
   ```

2. **Environment**  
   Create `.env` from `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5038/api
   ```

3. **Start dev server**
   ```bash
   npm run dev
   ```

4. Open **http://localhost:3000** (or the port Vite prints).

### Scripts

| Command           | Description                |
|------------------|----------------------------|
| `npm run dev`    | Start Vite dev server      |
| `npm run build`  | Production build → `dist/` |
| `npm run preview`| Serve production build    |

---

## Tech stack

- **React 18** — UI
- **Vite** — Build and dev server
- **Tailwind CSS** — Styling
- **React Router** — Routing
- **Leaflet / React-Leaflet** — Map
- **Axios** — API client (with interceptors)
- **React Hot Toast** — Notifications

More: [docs/API.md](docs/API.md), [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

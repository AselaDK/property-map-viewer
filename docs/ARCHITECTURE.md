# Architecture & design (frontend)

Component-based React app. For **running locally**, see the [README](../README.md).

## Structure

- **Components** — Reusable UI (common, layout, map, properties, auth).
- **Pages** — Route-level views.
- **Services** — Axios API client and interceptors (JWT, refresh).
- **State** — AuthContext; hooks (e.g. useAuth, useProperties).
- **Config** — `VITE_API_URL` only; no backend/DB details.

## Map

- Leaflet via `react-leaflet`; markers and popups from API property data.
- Search uses filters and nearby (lat/lng/radius) via the API.

For full-stack architecture and backend design, see the root **ARCHITECTURE.md** in the solution.

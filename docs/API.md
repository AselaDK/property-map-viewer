# API usage (frontend)

The frontend calls the Property Map REST API. For **running the frontend locally**, see the [README](../README.md).

## Base URL

Set in `.env` as `VITE_API_URL` (e.g. `http://localhost:5038/api` for local).

## Endpoints used

- **Auth:** `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`, `GET /auth/me`
- **Properties:** `GET /properties`, `GET /properties/{id}`, `GET /properties/search`, `POST /properties`, `PUT /properties/{id}`, `DELETE /properties/{id}`

See the backend API documentation for request/response shapes and auth details.

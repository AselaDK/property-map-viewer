# Property Map Viewer - Frontend

The frontend of the Property Map Viewer application, built with **React**, **Vite**, and **Tailwind CSS**.

## 🏗️ Architecture

The frontend follows a service-component pattern:

*   **Components:** Modular UI elements categorized into `common`, `layout`, `map`, `properties`, and `auth`.
*   **Services:** Handle API interaction using Axios with automatic token management.
*   **Context API:** Manages global state for authentication.
*   **Custom Hooks:** Encapsulate complex logic like property filtering and map interactions.

## 🛠️ Local Setup

### Prerequisites
*   [Node.js (v20+)](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)

### Steps
1.  Navigate to this directory: `cd property-map-viewer`
2.  Install dependencies: `npm install`
3.  Create a `.env` file based on `.env.example`:
    ```env
    VITE_API_URL=http://localhost:5038/api
    ```
4.  Run the development server: `npm run dev`
    *   Open `http://localhost:3000` in your browser.

## 🚀 Key Scripts
*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Builds the application for production.
*   `npm run preview`: Previews the production build locally.

## 🗺️ Tech Stack
*   **React 18**
*   **Vite** (Build Tool)
*   **Tailwind CSS** (Styling)
*   **Leaflet & React-Leaflet** (Interactive Maps)
*   **Axios** (API Requests)
*   **React Router** (Navigation)
*   **React Hot Toast** (Notifications)

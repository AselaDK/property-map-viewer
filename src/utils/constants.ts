export const APP_NAME = 'Property Map Viewer';

const env = typeof import.meta !== 'undefined' ? (import.meta as any).env : {};

export const API_BASE_URL =
  env.VITE_API_URL || (typeof process !== 'undefined' && (process as any).env?.REACT_APP_API_URL) || 'http://localhost:5038/api';

export const MAP_TILE_URL =
  env.VITE_MAP_TILE_URL || (typeof process !== 'undefined' && (process as any).env?.REACT_APP_MAP_TILE_URL) || 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

export const MAP_ATTRIBUTION =
  env.VITE_MAP_ATTRIBUTION || (typeof process !== 'undefined' && (process as any).env?.REACT_APP_MAP_ATTRIBUTION) || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

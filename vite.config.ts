import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

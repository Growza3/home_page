import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  json: {
    stringify: true, // Enable JSON imports
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Keep this alias
    },
  },
  server: {
    proxy: {
      '/api': 'http://192.168.5.246:5000', // Adjust the backend port
    },
  },
});

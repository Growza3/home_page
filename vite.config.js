import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  json: {
    stringify: true,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'public/_redirects'),
          dest: '.' // copies to dist/ root
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/api': 'http://192.168.5.246:5000',
    },
  },
});

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
        src: 'public/__redirects',
        dest: '.', // copied to dist/_redirects
        rename: '_redirects',
      },
    ],
  }),
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

/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    react(),
    svgr({ exportAsDefault: true }),
    VitePWA({
      registerType: 'autoUpdate',
      outDir: 'dist',
      manifest: {
        name: 'Europe.know',
        short_name: 'Europe.know',
        description: 'App for looking for a countries and adding them to favorites',
        theme_color: '#ffffff',
        icons: [
          {
            src: './icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globDirectory: 'dist/',
        globPatterns: ['**/*/{css,woff2,png,svg,jpg,jpeg,js}'],
        swDest: 'dist/sw.js'
      }
    })
  ]
});

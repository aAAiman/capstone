import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
        'index.css',
        'screenshots/landing-page.png',
        'screenshots/top-6.png',
        'screenshots/sign-in.png'
      ],
      manifest: {
        name: 'JelajahJava.ID',
        short_name: 'JelajahJava.ID',
        description: 'JelajahJava.ID adalah sebuah aplikasi web yang memberikan rekomendasi tempat wisata yang ada di pulau Jawa, Indonesia.',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',

          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshots/landing-page.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Beranda JelajahJava.ID',
          },
          {
            src: 'screenshots/top-6.png', 
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Top 6 Tempat Wisata',
          },
          {
            src: 'screenshots/sign-in.png', 
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Halaman Masuk',
          },
          {
            src: 'screenshots/landing-page.png',
            sizes: '1920x1043', 
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Beranda JelajahJava.ID (Mobile)',
          },
          {
            src: 'screenshots/top-6.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Top 6 Tempat Wisata (Mobile)',
          },
          {
            src: 'screenshots/sign-in.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Halaman Masuk (Mobile)',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,jsx,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            rlPattern : /^https?:\/\/capstone-backend-teal-sigma\.vercel\.app\/places/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
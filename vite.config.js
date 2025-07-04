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
        'screenshots/halaman rekomendasi.png',
        'screenshots/halaman whislist.png',
        'screenshots/halaman login.png',
        'screenshots/halaman register.png',
        'screenshots/landing-page mobile.png',
        'screenshots/halaman rekomendasi mobile.png',
        'screenshots/halaman whislist mobile.png',
        'screenshots/halaman login mobile.png',
        'screenshots/halaman register mobile.png',
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
            src: 'screenshots/halaman rekomendasi.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'wide',
            label: 'halaman rekomendasi',
          },
          {
            src: 'screenshots/halaman whislist.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'wide',
            label: 'halaman whislist',
          },
          {
            src: 'screenshots/halaman login.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'wide',
            label: 'halaman login',
          },
          {
            src: 'screenshots/halaman register.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'wide',
            label: 'halaman register',
          },
          {
            src: 'screenshots/landing-page mobile.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Beranda JelajahJava.ID (Mobile)',
          },
          {
            src: 'screenshots/halaman rekomendasi mobile.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'halaman rekomendasi (Mobile)',
          },
          {
            src: 'screenshots/halaman whislist mobile.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'halaman whislist (Mobile)',
          },
          {
            src: 'screenshots/halaman login mobile.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'halaman login (Mobile)',
          },
          {
            src: 'screenshots/halaman register mobile.png',
            sizes: '1920x1043',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'halaman register (Mobile)',
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
            urlPattern: /^https:\/\/capstone-backend-teal-sigma\.vercel\.app\/places/,
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
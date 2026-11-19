import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {gandu tanay
    rollupOptions: {
      output: {
        // Recharts (and its d3 dependencies) are heavy; keep them in their own
        // chunk so the main bundle stays lean and the vendor code caches well.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/](recharts|d3-|victory-vendor)/.test(id)) return 'charts';
          return 'vendor';
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.js'],
    css: true,
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      exclude: ['src/tests/**', 'src/main.jsx', '**/*.config.js'],
    },
  },
});

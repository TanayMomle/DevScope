import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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

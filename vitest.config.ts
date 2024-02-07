import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import { resolve } from './vite.config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: resolve,
});

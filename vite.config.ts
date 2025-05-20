// File: vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // 👇 This ensures imports like '../utils/timeUtilsFixed' are found
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Ensure we're using static mode (default, but being explicit)
  output: 'static',
  // Add base path if deploying to a subdirectory
  // base: '/',
  // Improve build performance
  build: {
    // Reduce the size of the final build
    inlineStylesheets: 'auto'
  },
  // Ensure proper handling of client-side scripts
  vite: {
    build: {
      // Improve CSS handling
      cssCodeSplit: true,
      // Reduce chunk size
      chunkSizeWarningLimit: 1000
    }
  }
});

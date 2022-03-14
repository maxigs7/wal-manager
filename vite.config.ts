import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

export default defineConfig({
  css: { preprocessorOptions: { scss: { charset: false } } },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-table')) {
              return 'vendor-react-table';
            } else if (id.includes('@chakra')) {
              return 'vendor-chakra';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@api': resolve(__dirname, './src/api'),
      '@app': resolve(__dirname, './src/app'),
      '@assets': resolve(__dirname, './src/assets'),
      '@layout': resolve(__dirname, './src/layout'),
      '@lib': resolve(__dirname, './src/lib'),
      '@models': resolve(__dirname, './src/models'),
      '@m': resolve(__dirname, './src/modules'),
      '@pages': resolve(__dirname, './src/pages'),
      '@routes': resolve(__dirname, './src/routes'),
      '@shared': resolve(__dirname, './src/shared'),
      '@theme': resolve(__dirname, './src/theme'),
    },
  },
  envPrefix: 'VITE_',
});

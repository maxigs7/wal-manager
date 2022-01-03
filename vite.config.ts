import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';

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
      '@entities': resolve(__dirname, './src/entities'),
      '@features': resolve(__dirname, './src/features'),
      '@pages': resolve(__dirname, './src/pages'),
      '@shared': resolve(__dirname, './src/shared'),
    },
  },
  envPrefix: 'VITE_',
});

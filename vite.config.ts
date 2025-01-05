import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: './src',
  base: './',
  publicDir: '../',
  build: {
    emptyOutDir: true,
    outDir: '../dist',
  },
  plugins: [
    react({ plugins: [] })
  ],
});

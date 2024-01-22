import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import loadVersion from 'vite-plugin-package-version';

export default defineConfig({
  plugins: [loadVersion(), solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});

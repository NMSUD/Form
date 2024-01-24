import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import loadVersion from 'vite-plugin-package-version';

export default defineConfig({
  plugins: [loadVersion(), solidPlugin()],
  server: {
    port: 4200,
    host: 'test.nmsud.com',
  },
  build: {
    target: 'esnext',
  },
});

import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';
import loadVersion from 'vite-plugin-package-version';

const testDef = {
  test: {
    exclude: [
      ...configDefaults.exclude,
      './build/**',
      './dist/**',
    ]
  },
};

export default defineConfig({
  plugins: [loadVersion(), solidPlugin()],
  server: {
    port: 3000,
    // host: 'test.nmsud.com',
  },
  build: {
    target: 'esnext',
  },
  ...testDef,
});

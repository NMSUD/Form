import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';
import loadVersion from 'vite-plugin-package-version';
import path from 'path';

const testDef = {
  test: {
    exclude: [...configDefaults.exclude, './build/**', './dist/**'],
    coverage: {
      extension: ['.ts'],
      include: ['src'],
      exclude: [
        'src/api/api.ts',
        'src/api/types',
        'src/api/contracts',
        'src/constants',
        'src/contracts',
        'src/data',
        'src/web/contracts',
        'src/web/hooks',
      ],
    },
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
    rollupOptions: {
      external: [new RegExp('/api/.*')],
    },
  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'),
      '@web': path.resolve(__dirname, './src/web'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@contracts': path.resolve(__dirname, './src/contracts'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@services': path.resolve(__dirname, './src/services'),
      '@validation': path.resolve(__dirname, './src/validation'),
    },
  },
  ...testDef,
});

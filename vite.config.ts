import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import loadVersion from 'vite-plugin-package-version';
import solidPlugin from 'vite-plugin-solid';
import { configDefaults } from 'vitest/config';

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const testDef = {
  test: {
    exclude: [...configDefaults.exclude, './build/**', './dist/**'],
    coverage: {
      enabled: true,
      reporter: ['html'],
      extension: ['.ts'],
      include: ['src'],
      exclude: [
        'src/api/api.ts',
        'src/api/types',
        'src/api/contracts',
        'src/constants',
        'src/contracts',
        'src/data',
        'src/services/external',
        'src/services/internal/apiFileService.ts',
        'src/web/contracts',
        'src/web/hooks',
        'src/web/types',
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
      '@api': path.resolve(currentDir, './src/api'),
      '@web': path.resolve(currentDir, './src/web'),
      '@constants': path.resolve(currentDir, './src/constants'),
      '@contracts': path.resolve(currentDir, './src/contracts'),
      '@helpers': path.resolve(currentDir, './src/helpers'),
      '@services': path.resolve(currentDir, './src/services'),
      '@validation': path.resolve(currentDir, './src/validation'),
    },
  },
  ...testDef,
});

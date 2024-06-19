import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import loadVersion from 'vite-plugin-package-version';
import solidPlugin from 'vite-plugin-solid';
import { configDefaults } from 'vitest/config';

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
  ...testDef,
  plugins: [loadVersion(), solidPlugin()],
  server: {
    port: 3000,
    // host: 'test.nmsud.com',
  },
  build: {
    target: 'esnext',
    // rollupOptions: {
    //   external: [new RegExp('/api/.*')],
    // },
  },
  resolve: {
    alias: [
      { find: '@api', replacement: fileURLToPath(new URL('./src/api', import.meta.url)) },
      { find: '@web', replacement: fileURLToPath(new URL('./src/web', import.meta.url)) },
      {
        find: '@constants',
        replacement: fileURLToPath(new URL('./src/constants', import.meta.url)),
      },
      {
        find: '@contracts',
        replacement: fileURLToPath(new URL('./src/contracts', import.meta.url)),
      },
      { find: '@helpers', replacement: fileURLToPath(new URL('./src/helpers', import.meta.url)) },
      { find: '@services', replacement: fileURLToPath(new URL('./src/services', import.meta.url)) },
      {
        find: '@validation',
        replacement: fileURLToPath(new URL('./src/validation', import.meta.url)),
      },
    ],
  },
});

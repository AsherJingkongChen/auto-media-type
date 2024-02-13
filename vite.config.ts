/// <reference types="vitest" />

import { PluginOption, defineConfig } from 'vite';
import ViteDtsPlugin from 'vite-plugin-dts';

export default defineConfig((env) => ({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName: 'auto-media-type',
      name: 'AutoMediaType',
    },
    minify: env.mode === 'production',
    outDir: 'dist',
  },
  esbuild: {
    drop: env.mode === 'production' ? ['console', 'debugger'] : undefined,
  },
  plugins: [BundleFinishBannerPlugin(env), DtsPlugin()],
  test: {
    coverage: {
      enabled: true,
      include: ['src/**/*.ts'],
      provider: 'istanbul',
      reporter: ['text', 'text-summary'],
      thresholds: {
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    include: ['tests/**/*.test.ts'],
  },
}));

function BundleFinishBannerPlugin(context: { mode: string }): PluginOption {
  return {
    name: 'bundle-finish-banner',
    apply: 'build',
    enforce: 'post',
    closeBundle: {
      order: 'post',
      handler() {
        this.info({
          message: '\x1b[32m' + `Built in ${context.mode} mode` + '\x1b[0m',
        });
      },
    },
  };
}

function DtsPlugin(): PluginOption {
  return ViteDtsPlugin({
    entryRoot: '.',
    include: 'src',
    insertTypesEntry: true,
    rollupTypes: true,
  });
}

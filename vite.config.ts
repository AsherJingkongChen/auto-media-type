/// <reference types="vitest" />

import { PluginOption, defineConfig } from 'vite';
import { default as ViteDtsPlugin } from 'vite-plugin-dts';

export default defineConfig((env) => ({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AutoMediaType',
    },
    minify: env.mode === 'production',
    outDir: 'dist',
  },
  esbuild: {
    drop: env.mode === 'production' ? ['console', 'debugger'] : undefined,
  },
  plugins: [BundleFinishBannerPlugin(env), DtsPlugin(env)],
  test: {
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text-summary', 'text'],
      thresholds: {
        100: true,
      },
    },
    include: ['tests/unit/**/*.test.ts'],
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

function DtsPlugin(context: { mode: string }): PluginOption {
  return context.mode === 'production'
    ? ViteDtsPlugin({
        include: 'src',
        entryRoot: '.',
        insertTypesEntry: true,
      })
    : undefined;
}

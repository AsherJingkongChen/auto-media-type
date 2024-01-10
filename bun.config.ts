import { BuildConfig, BuildOutput } from 'bun';
import BunDtsPlugin from 'bun-plugin-dts';
const { NODE_ENV } = import.meta.env;
import { mergeWith } from 'lodash';

buildLog(
  await Bun.build(
    mergeConfig(
      {
        entrypoints: ['src/index.ts'],
        format: 'esm',
        outdir: 'dist',
        target: 'browser',
        plugins: [],
      },
      extraConfig(),
    ),
  ),
);

function extraConfig(): Partial<BuildConfig> {
  switch (NODE_ENV ?? 'development') {
    case 'development':
      return {};
    case 'production':
      return {
        minify: true,
        plugins: [dtsPlugin()],
      };
    default:
      console.log(
        '\x1b[93m' +
          `Unrecognizable "NODE_ENV": ${NODE_ENV}, is this a mistake?` +
          '\x1b[0m',
      );
      return {};
  }
}

function dtsPlugin() {
  return BunDtsPlugin({
    output: {
      sortNodes: true,
    },
  });
}

function buildLog({ logs, outputs, success }: BuildOutput): void {
  if (success) {
    for (const { path } of outputs) {
      console.log(
        '\x1b[32;2m' +
          `Artifact generated successfully at "${path}"` +
          '\x1b[0m',
      );
    }
    console.log(
      '\x1b[92;1m' + `Build succeeded in ${NODE_ENV} mode` + '\x1b[0m',
    );
  } else {
    for (const log of logs) {
      console.error(log);
    }
    console.error(
      '\x1b[91;1m' + `Build failed in ${NODE_ENV} mode` + '\x1b[0m',
    );
  }
}

function mergeConfig(
  config: BuildConfig,
  ...restConfigs: Partial<BuildConfig>[]
): BuildConfig {
  for (const restConfig of restConfigs) {
    mergeWith(config, restConfig, mergeWithArrayCustomizer);
  }
  return config;
}

function mergeWithArrayCustomizer(a: any, b: any): any[] | undefined {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.concat(b);
  }
}

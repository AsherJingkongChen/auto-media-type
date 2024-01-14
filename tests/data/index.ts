import { readdirSync, readFileSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';
import { polyfillNodejs } from './utils';

await polyfillNodejs(process.version);

/**
 * ### Introduction
 * Manage the external data used in tests
 *
 * ### References
 * - [File Examples](https://file-examples.com/)
 * - [File Samples](https://filesamples.com/)
 * - [Samples Files](https://samples-files.com/)
 * - [APNG Sample](https://apng.onevcat.com/assets/elephant.png)
 * - [EXIF Samples](https://pixelpeeper.com/photos)
 */
export namespace Data {
  /**
   * ### Introduction
   * Walk through all the files in the directory `dir`
   *
   * ### Results
   * - `Generator<string>` - file paths
   */
  function* _paths(dir: string): Generator<string> {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        yield* _paths(join(dir, entry.name));
      } else {
        yield join(dir, entry.name);
      }
    }
  }

  /**
   * ### Introduction
   * Walk through all the files in the data directory
   *
   * ### Results
   * - `Generator<{ path: string; type: string }>` - paths and media types
   */
  export function* paths(): Generator<{ path: string; type: string }> {
    const assetsDir = join(fileURLToPath(import.meta.url), 'assets');
    for (const path of _paths(assetsDir)) {
      const dir = dirname(path);
      const type = relative(assetsDir, dir);
      yield { path, type };
    }
  }

  /**
   * ### Introduction
   * Walk through all the files in the data directory
   *
   * ### Results
   * - `Generator<File>` - file references
   *   - `File.type` - The media type is set to the directory name manually
   */
  export function* files(): Generator<File> {
    for (const { path, type } of paths()) {
      const buffer = readFileSync(path);
      const file = new File([buffer], path, { type });
      yield file;
    }
  }
}

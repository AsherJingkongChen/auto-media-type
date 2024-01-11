import { BunFile, file as readFile } from 'bun';
import { readdirSync } from 'fs';
import { join, relative, dirname } from 'path';

/**
 * ### Introduction
 * Manage the external data used in tests
 *
 * ### References
 * - [Samples Files](https://samples-files.com/)
 * - [APNG Sample](https://apng.onevcat.com/assets/elephant.png)
 */
export namespace Data {
  /**
   * ### Introduction
   * Walk through all the files in the directory `dir`
   *
   * ### Results
   * - `Generator<string>` - file paths
   */
  function* paths(dir: string): Generator<string> {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        yield* paths(join(dir, entry.name));
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
   * - `Iterable<File>` - file references
   *   - `File.type` - The media type is set to the directory name manually
   */
  export function* files(): Generator<File> {
    const assetsDir = join(import.meta.dir, 'assets');
    for (const path of paths(assetsDir)) {
      const type = relative(assetsDir, dirname(path));
      const file = readFile(path, { type });
      if (file.name === undefined) {
        throw new Error(
          `Requested file has no name. Check the path: ${path}`,
        );
      }
      yield file as File;
    }
  }
}

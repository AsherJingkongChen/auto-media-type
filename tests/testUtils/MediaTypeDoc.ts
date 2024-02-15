import { readdirSync } from 'fs';
import { dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

/**
 * ## Introduction
 * Manage the media type documentation
 */
export namespace MediaTypeDoc {
  /**
   * ## Introduction
   * Walk through all the files in the directory `dir`
   *
   * ## Yields
   * - `string`
   *   + A file path
   */
  function* _paths(dir: string): Generator<string> {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullEntry = join(entry.path, entry.name);
      if (entry.isDirectory()) {
        yield* _paths(fullEntry);
      } else {
        yield fullEntry;
      }
    }
  }

  /**
   * ## Introduction
   * Walk through all the media type documentation files
   *
   * ## Parameters
   * - `filter`: `(type: string) => boolean`
   *   + A function to filter paths by media types
   *
   * ## Yields
   * - `{ path: string; type: string }`
   *   + A doc file paths and its media type
   */
  export function* paths(
    filter?: (type: string) => boolean,
  ): Generator<{ path: string; type: string }> {
    const docDir = join(
      dirname(fileURLToPath(import.meta.url)),
      '../../docs/media-types',
    );
    for (const path of _paths(docDir)) {
      // Skip `../docs/media-types/README.md`
      if (path.endsWith('README.md')) {
        continue;
      }

      // Remove `.md` in the relative file path
      const type = relative(docDir, path).slice(0, -3);

      // Filter by media types
      if (filter && !filter(type)) {
        continue;
      }

      yield { path, type };
    }
  }
}

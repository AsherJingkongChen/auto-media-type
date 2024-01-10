import {
  findMediaTypesByExtension,
  findMediaTypesByMagicNumbers,
} from './find';

/**
 * ### Introduction
 * To guess all possible media types from the file
 *
 * ### Parameters
 * - `file` - `File` -
 *   The file for which media types are to be guessed
 *
 * ### Results
 * - `string[]` - An array of possible media types
 *
 * ### Process
 * There are three stages:
 * 1. Get Types by Extension {Extension, Type[]}
 * 2. Extend Types by Blob {Blob, Type}
 * 3. return Types
 */
export async function guessFile(file: File): Promise<string[]> {
  return Array.from(
    new Set(
      findMediaTypesByExtension(file.name).concat(
        await findMediaTypesByMagicNumbers(file),
      ),
    ),
  );
}

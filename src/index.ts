import {
  findMediaTypesByExtension,
  findMediaTypesByMagicNumbers,
} from './find';

/**
 * ### Introduction
 * `MediaType` stands for Internet Media Type (MIME Type)
 *
 * ### References
 * - [IANA - Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [RFC 6838](https://datatracker.ietf.org/doc/html/rfc6838)
 */
export namespace MediaType {
  export type Guessable = File;

  /**
   * ### Introduction
   * To guess all possible media types from the data
   * 
   * ### Parameters
   * - `data` - `Guessable` -
   *   The data for which media types are to be guessed
   * 
   * ### Results
   * - `string[]` - An array of possible media types
   * 
   * ### Note
   * - This function is a wrapper for
   *   - `.guessFile()`
   */
  export async function guess(data: Guessable): Promise<string[]> {
    // [TODO] `BunFile` is not compatible with `File`
    if (data instanceof Blob && data.name) {
      return guessFile(data);
    }
    throw new TypeError('Data is not a guessable');
  }

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
    let types = findMediaTypesByExtension(file.name);
    types = types.concat(await findMediaTypesByMagicNumbers(file));
    return Array.from(new Set(types));
  }
}

// export async function completeMediaType(file: File): Promise<File> {
//   file;
//   throw new Error('Not implemented yet');
// }

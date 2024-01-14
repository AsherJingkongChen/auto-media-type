import {
  guessMediaTypesByExtension,
  guessMediaTypesByMagicNumbers,
} from './guess';

/**
 * ### Introduction
 * `MediaType` stands for Internet Media Type (MIME Type)
 *
 * ### References
 * - [IANA - Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [RFC 6838](https://datatracker.ietf.org/doc/html/rfc6838)
 */
export namespace MediaType {
  /**
   * ### Introduction
   * To suggest media types for the data
   *
   * ### Parameters
   * - `data` - `File`
   *   + The query data
   *
   * ### Results
   * - `Promise<string[]>`
   *   + An array of possible media types for the `data`
   *
   * ### Note
   * - This function may call:
   *   + `.suggestFile()`
   */
  export async function suggest(data: File): Promise<string[]> {
    if (data instanceof File) {
      return suggestFile(data);
    }
    throw new TypeError('Data type is not valid');
  }

  /**
   * ### Introduction
   * To suggest media types for the file
   *
   * ### Parameters
   * - `file` - `File`
   *   + The query file
   *
   * ### Results
   * - `Promise<string[]>`
   *   + An array of possible media types for the `file`
   *
   * ### Process
   * There are three stages:
   * 1. Guess media types by file extension
   * 2. Guess media types by magic numbers
   * 3. return media types
   */
  export async function suggestFile(file: File): Promise<string[]> {
    let types = guessMediaTypesByExtension(file.name);
    types = types.concat(await guessMediaTypesByMagicNumbers(file));
    return Array.from(new Set(types));
  }
}

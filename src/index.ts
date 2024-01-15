// import { checkMediaTypes } from './check';
import {
  guessMediaTypesByExtension,
  guessMediaTypesByMagicNumbers,
} from './guess';

/**
 * ### Introduction
 * `MediaType` stands for Internet Media Type (MIME Type)
 *
 * ### References
 * - [IANA Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [RFC 2046](https://datatracker.ietf.org/doc/html/rfc2046)
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
   * To suggest media types for the blob
   *
   * ### Parameters
   * - `blob` - `Blob`
   *   + The query blob
   *
   * ### Results
   * - `Promise<string[]>`
   *   + An array of possible media types for the `blob`
   *
   * ### Process
   * There are four stages:
   * 1. Guess media types by magic numbers
   * 2. Check media types
   *    - Return filtered media types
   */
  export async function suggestBlob(blob: Blob): Promise<string[]> {
    // [TODO] Need a working check algorithm
    // return checkMediaTypes(file, await guessMediaTypesByMagicNumbers(file));
    return guessMediaTypesByMagicNumbers(blob);
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
   * There are four stages:
   * 1. Guess media types by file extension
   * 2. Check media types
   *    - Return if at least one of media types are valid
   * 3. Guess media types by magic numbers
   * 4. Check media types
   *    - Return filtered media types
   */
  export async function suggestFile(file: File): Promise<string[]> {
    // [TODO] Need a working check algorithm
    // const mediaTypes = checkMediaTypes(
    //   file,
    //   guessMediaTypesByExtension(file.name),
    // );
    // if (mediaTypes.length) {
    //   return mediaTypes;
    // }
    // return checkMediaTypes(file, await guessMediaTypesByMagicNumbers(file));
    return Array.from(
      new Set(
        guessMediaTypesByExtension(file.name).concat(
          await guessMediaTypesByMagicNumbers(file),
        ),
      ),
    );
  }
}

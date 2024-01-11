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
  export async function guess(data: Guessable): Promise<string[]> {
    if (data instanceof File) {
      return guessFile(data);
    }
    throw new Error('Not implemented yet');
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
    return Array.from(
      new Set(
        findMediaTypesByExtension(file.name).concat(
          await findMediaTypesByMagicNumbers(file),
        ),
      ),
    );
  }
}

export async function completeMediaType(file: File): Promise<File> {
  file;
  throw new Error('Not implemented yet');
}

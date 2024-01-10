import { guessFile } from './guess';

/**
 * ### Introduction
 * `MediaType` stands for Internet Media Type (MIME Type)
 *
 * ### References
 * - [IANA - Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [RFC 2231](https://datatracker.ietf.org/doc/html/rfc2231)
 * - [RFC 6838](https://datatracker.ietf.org/doc/html/rfc6838)
 */
export namespace MediaType {
  export async function guess(data: any): Promise<string[]> {
    return guessFile(data);
  }
}

export async function completeMediaType(file: File): Promise<File> {
  console.error('Not implemented yet');
  return file;
}

export default completeMediaType;

export type * from './find';
export type * from './guess';
export type * from './preset';

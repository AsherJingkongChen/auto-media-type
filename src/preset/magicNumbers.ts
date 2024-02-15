/**
 * ## Introduction
 * The magic numbers can be used to
 * guess the possible media types for the given data.
 *
 * The magic numbers can be represented in different format.
 * For convenience, we use the term `magic bytes` for
 * "the magic numbers represented in bytes".
 *
 * Magic bits are implemented using magic bytes with masks applied.
 */
declare module './magicNumbers.ts';

import { SparseArray, SparseArrayCollection } from '../core';
import { SupportedMediaTypes } from './supportedMediaTypes';

/**
 * ## Introduction
 * A collection of sparse arrays for media type and magic bytes
 *
 * ## Layout
 * `SparseArrayCollection`
 * - The key is a media type
 * - The sparse arrays are magic bytes with offsets
 *
 * ## Note
 * - The initialization list should be sorted for maintainability
 *   + in descending order
 *   + by media type and usage
 *
 * ## References
 * - [Gary Kessler's Library](https://www.garykessler.net/library/file_sigs.html)
 * - [IANA Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [LOC Digital Formats](https://www.loc.gov/preservation/digital/formats/fdd/browse_list.shtml)
 * - [Wikipedia - List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)
 */
export const mediaTypeAndMagicBytes: SparseArrayCollection = [
  ['application/gzip', [0, 2, 0x1f, 0x8b]],
  ['application/java-archive', [0, 4, 0x50, 0x4b, 0x03, 0x04]],
  ['application/pdf', [0, 5, 0x25, 0x50, 0x44, 0x46, 0x2d]],
  [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    [0, 4, 0x50, 0x4b, 0x03, 0x04],
  ],
  [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    [0, 4, 0x50, 0x4b, 0x03, 0x04],
  ],
  [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    [0, 4, 0x50, 0x4b, 0x03, 0x04],
  ],
  ['application/xml-dtd', [0, 2, 0x3c, 0x21]],
  ['application/xml', [0, 5, 0x3c, 0x3f, 0x78, 0x6d, 0x6c]],
  ['application/zip', [0, 4, 0x50, 0x4b, 0x03, 0x04]],
  ['application/zip', [0, 8, 0x50, 0x4b, 0x07, 0x08, 0x50, 0x4b, 0x03, 0x04]],
  ['application/zip', [0, 4, 0x50, 0x4b, 0x05, 0x06]],
  ['audio/mpeg', [0, 3, 0x49, 0x44, 0x33]],
  ['font/otf', [0, 4, 0x4f, 0x54, 0x54, 0x4f]],
  ['font/otf', [0, 4, 0x00, 0x01, 0x00, 0x00]],
  ['font/ttf', [0, 4, 0x00, 0x01, 0x00, 0x00]],
  ['font/woff', [0, 4, 0x77, 0x4f, 0x46, 0x46]],
  ['font/woff2', [0, 4, 0x77, 0x4f, 0x46, 0x32]],
  ['image/apng', [0, 8, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  ['image/avif', [4, 7, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69]],
  ['image/bmp', [0, 2, 0x42, 0x4d]],
  ['image/gif', [0, 3, 0x47, 0x49, 0x46]],
  ['image/heic', [4, 7, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69]],
  ['image/heic-sequence', [4, 7, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x76]],
  ['image/heif', [4, 7, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x69, 0x66]],
  ['image/heif-sequence', [4, 7, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x73, 0x66]],
  ['image/j2c', [0, 4, 0xff, 0x4f, 0xff, 0x51]],
  ['image/jp2', [0, 5, 0x00, 0x00, 0x00, 0x0c, 0x6a, 20, 3, 0x6a, 0x70, 0x32]],
  ['image/jpm', [0, 5, 0x00, 0x00, 0x00, 0x0c, 0x6a, 20, 3, 0x6a, 0x70, 0x6d]],
  ['image/jpx', [0, 5, 0x00, 0x00, 0x00, 0x0c, 0x6a, 20, 3, 0x6a, 0x70, 0x78]],
  ['image/jpeg', [0, 3, 0xff, 0xd8, 0xff]],
  ['image/png', [0, 8, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  ['image/svg+xml', [0, 4, 0x3c, 0x73, 0x76, 0x67]],
  ['image/svg+xml', [0, 5, 0x3c, 0x3f, 0x78, 0x6d, 0x6c]],
  ['image/tiff', [0, 4, 0x49, 0x49, 0x2a, 0x00]],
  ['image/tiff', [0, 4, 0x4d, 0x4d, 0x00, 0x2a]],
  ['image/vnd.djvu', [0, 8, 0x41, 0x54, 0x26, 0x54, 0x46, 0x4f, 0x52, 0x4d]],
  ['image/vnd.microsoft.icon', [0, 4, 0x00, 0x00, 0x01, 0x00]],
  ['image/vnd.wap.wbmp', [0, 2, 0x00, 0x00]],
  ['image/webp', [0, 4, 0x52, 0x49, 0x46, 0x46, 8, 4, 0x57, 0x45, 0x42, 0x50]],
  ['text/html', [0, 8, 0x3c, 0x21, 0x44, 0x4f, 0x43, 0x54, 0x59, 0x50]],
  ['text/html', [0, 8, 0x3c, 0x21, 0x64, 0x6f, 0x63, 0x74, 0x79, 0x70]],
  ['video/mj2', [0, 5, 0x00, 0x00, 0x00, 0x0c, 0x6a, 20, 2, 0x6d, 0x6a]],
  ['video/mp4', [4, 7, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f]],
  ['video/mp4', [4, 8, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32]],
  ['video/mp4', [4, 8, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x31]],
  ['video/mp4', [4, 8, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x63, 0x31]],
  ['video/mpeg', [0, 4, 0x00, 0x00, 0x01, 0xba]],
  ['video/mpeg', [0, 4, 0x00, 0x00, 0x01, 0xb3]],
] satisfies [SupportedMediaTypes, SparseArray][];

/**
 * ## Introduction
 * The end offset of magic bytes
 *
 * ## Layout
 * `number`
 */
export const magicBytesOffsetEnd: number = 23;

/**
 * ## Introduction
 * A collection of sparse arrays for media type and magic masked bytes
 *
 * ## Layout
 * `SparseArrayCollection`
 * - The key is a media type
 * - The sparse arrays are magic masked bytes with offsets
 *
 * ## Note
 * - The initialization list should be sorted for maintainability
 *   + in descending order
 *   + by media type and usage
 *
 * ## References
 * - [Gary Kessler's Library](https://www.garykessler.net/library/file_sigs.html)
 * - [IANA Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [LOC Digital Formats](https://www.loc.gov/preservation/digital/formats/fdd/browse_list.shtml)
 * - [Wikipedia - List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)
 */
export const mediaTypeAndMagicMaskedBytes: SparseArrayCollection = [
  ['audio/mpeg', [0, 2, 0xff, 0xe0]],
] satisfies [SupportedMediaTypes, SparseArray][];

/**
 * ## Introduction
 * The end offset of magic masked bytes
 *
 * ## Layout
 * `number`
 */
export const magicMaskedBytesOffsetEnd: number = 2;

/**
 * ## Introduction
 * Magic masks as a sparse byte array
 *
 * ## Layout
 * `SparseArray`
 */
export const magicMasks: SparseArray = [0, 2, 0xff, 0xe0];

/**
 * ## Introduction
 * The end offset of magic numbers.
 *
 * ## Layout
 * - `number`
 *
 * ## Note
 * - The magic numbers contain **magic bytes** and **magic bits**.
 *   Therefore, the end offset is the maximum of both.
 */
export const magicNumbersOffsetEnd: number = Math.max(
  magicBytesOffsetEnd,
  magicMaskedBytesOffsetEnd,
);

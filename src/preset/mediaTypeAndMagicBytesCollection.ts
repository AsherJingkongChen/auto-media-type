import { KeyedSerialCollection } from '../core';
import { SupportedMediaTypes } from './SupportedMediaTypes';

/**
 * ## Introduction
 * A keyed serial collection of media type and magic bytes (or magic numbers)
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
export const mediaTypeAndMagicBytesCollection: KeyedSerialCollection = [
  ['application/gzip', NaN, 0, 0x1f, 0x8b],
  ['application/java-archive', NaN, 0, 0x50, 0x4b, 0x03, 0x04],
  ['application/pdf', NaN, 0, 0x25, 0x50, 0x44, 0x46, 0x2d],
  [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    NaN,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ],
  [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    NaN,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ],
  [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    NaN,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ],
  ['application/xml-dtd', NaN, 0, 0x3c, 0x21],
  ['application/xml', NaN, 0, 0x3c, 0x3f, 0x78, 0x6d, 0x6c],
  ['application/zip', NaN, 0, 0x50, 0x4b, 0x03, 0x04],
  ['application/zip', NaN, 0, 0x50, 0x4b, 0x07, 0x08, 0x50, 0x4b, 0x03, 0x04],
  ['application/zip', NaN, 0, 0x50, 0x4b, 0x05, 0x06],
  ['audio/mpeg', NaN, 0, 0x49, 0x44, 0x33],
  ['audio/mpeg', NaN, 0, 0xff, 0xfb],
  ['audio/mpeg', NaN, 0, 0xff, 0xfd],
  ['audio/mpeg', NaN, 0, 0xff, 0xfe],
  ['font/otf', NaN, 0, 0x4f, 0x54, 0x54, 0x4f],
  ['font/otf', NaN, 0, 0x00, 0x01, 0x00, 0x00],
  ['font/ttf', NaN, 0, 0x00, 0x01, 0x00, 0x00],
  ['font/woff', NaN, 0, 0x77, 0x4f, 0x46, 0x46],
  ['font/woff2', NaN, 0, 0x77, 0x4f, 0x46, 0x32],
  ['image/apng', NaN, 0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  ['image/avif', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69],
  ['image/bmp', NaN, 0, 0x42, 0x4d],
  ['image/gif', NaN, 0, 0x47, 0x49, 0x46],
  ['image/heic', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69],
  ['image/heic-sequence', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x76],
  ['image/heif', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x69, 0x66],
  ['image/heif-sequence', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x73, 0x66],
  ['image/j2c', NaN, 0, 0xff, 0x4f, 0xff, 0x51],
  [
    'image/jp2',
    NaN,
    0,
    0x00,
    0x00,
    0x00,
    0x0c,
    0x6a,
    NaN,
    20,
    0x6a,
    0x70,
    0x32,
  ],
  [
    'image/jpm',
    NaN,
    0,
    0x00,
    0x00,
    0x00,
    0x0c,
    0x6a,
    NaN,
    20,
    0x6a,
    0x70,
    0x6d,
  ],
  [
    'image/jpx',
    NaN,
    0,
    0x00,
    0x00,
    0x00,
    0x0c,
    0x6a,
    NaN,
    20,
    0x6a,
    0x70,
    0x78,
  ],
  ['image/jpeg', NaN, 0, 0xff, 0xd8, 0xff],
  ['image/png', NaN, 0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  ['image/svg+xml', NaN, 0, 0x3c, 0x73, 0x76, 0x67],
  ['image/svg+xml', NaN, 0, 0x3c, 0x3f, 0x78, 0x6d, 0x6c],
  ['image/tiff', NaN, 0, 0x49, 0x49, 0x2a, 0x00],
  ['image/tiff', NaN, 0, 0x4d, 0x4d, 0x00, 0x2a],
  ['image/vnd.djvu', NaN, 0, 0x41, 0x54, 0x26, 0x54, 0x46, 0x4f, 0x52, 0x4d],
  ['image/vnd.microsoft.icon', NaN, 0, 0x00, 0x00, 0x01, 0x00],
  ['image/vnd.wap.wbmp', NaN, 0, 0x00, 0x00],
  [
    'image/webp',
    NaN,
    0,
    0x52,
    0x49,
    0x46,
    0x46,
    NaN,
    8,
    0x57,
    0x45,
    0x42,
    0x50,
  ],
  ['text/html', NaN, 0, 0x3c, 0x21, 0x44, 0x4f, 0x43, 0x54, 0x59, 0x50],
  ['text/html', NaN, 0, 0x3c, 0x21, 0x64, 0x6f, 0x63, 0x74, 0x79, 0x70],
  ['video/mj2', NaN, 0, 0x00, 0x00, 0x00, 0x0c, 0x6a, NaN, 20, 0x6d, 0x6a],
  ['video/mp4', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f],
  ['video/mp4', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32],
  ['video/mp4', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x31],
  ['video/mp4', NaN, 4, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x63, 0x31],
  ['video/mpeg', NaN, 0, 0x00, 0x00, 0x01, 0xba],
  ['video/mpeg', NaN, 0, 0x00, 0x00, 0x01, 0xb3],
] satisfies [SupportedMediaTypes, ...any[]][];

/**
 * ## Introduction
 * Pairs of index ranges to cover all magic bytes
 *
 * ## Layout
 * `[number, number][]`
 * - `[number, number]`
 *   + `[begin, end)` is a right-open index range.
 *
 * ## Note
 * - The ranges should be sorted and not overlapping
 *   + in ascending order
 *   + Assertion: `[i][0] < [i][1] <= [i+1][0]`
 * - The ranges should be compatible with `Blob.slice(begin, end)`
 */
export const magicBytesIndexRanges: [number, number][] = [
  [0, 12],
  [20, 23],
];

/**
 * ## Introduction
 * The maximum index of magic bytes
 *
 * ## Layout
 * `number`
 */
export const magicBytesIndexMax =
  magicBytesIndexRanges[magicBytesIndexRanges.length - 1]![1]!;

/**
 * ## Introduction
 * The minimum index of magic bytes
 *
 * ## Layout
 * `number`
 */
export const magicBytesIndexMin = magicBytesIndexRanges[0]![0]!;

/**
 * ## Introduction
 * The index range of magic bytes
 *
 * ## Layout
 * `number`
 * - `magicBytesIndexMax - magicBytesIndexMin`
 */
export const magicBytesIndexRange = magicBytesIndexMax - magicBytesIndexMin;

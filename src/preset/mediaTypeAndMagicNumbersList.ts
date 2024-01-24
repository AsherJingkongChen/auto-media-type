import { SupportedMediaTypes } from './SupportedMediaTypes';

/**
 * ## Introduction
 * The list of media types, offsets and magic numbers
 *
 * ## Layout
 * `[string, undefined, number, number, ...(number | undefined)[]][]`
 * - `string`
 *   + The media type
 * - `undefined`
 *   + The magic marker
 *   + It is followed by magic offset and numbers.
 * - `number`
 *   + The magic offset
 *   + If negative, the offset is counted from the end.
 * - `number, ...(number | undefined)[]`
 *   + The magic numbers, next markers and next offsets
 *   + `undefined` is the next magic marker followed by the next magic offset and numbers
 *
 * ## Note
 * - The list should be sorted for maintainability
 *   + in descending order
 *   + by media type and usage
 * - The media types can have duplicates
 * - The magic numbers should be available for all the files
 *
 * ## References
 * - [Gary Kessler's Library](https://www.garykessler.net/library/file_sigs.html)
 * - [IANA Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [LOC Digital Formats](https://www.loc.gov/preservation/digital/formats/fdd/browse_list.shtml)
 * - [Wikipedia - List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)
 */
export const mediaTypeAndMagicNumbersList: [
  string,
  undefined,
  number,
  number,
  ...(number | undefined)[],
][] = [
  ['application/gzip', undefined, 0, 0x1f, 0x8b],
  ['application/java-archive', undefined, 0, 0x50, 0x4b, 0x03, 0x04],
  ['application/pdf', undefined, 0, 0x25, 0x50, 0x44, 0x46, 0x2d],
  [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ],
  [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ],
  [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ],
  ['application/xml-dtd', undefined, 0, 0x3c, 0x21],
  ['application/xml-dtd', undefined, 0, 0xfe, 0xff, 0x00, 0x3c, 0x00, 0x21],
  ['application/xml-dtd', undefined, 0, 0xff, 0xfe, 0x3c, 0x00, 0x21, 0x00],
  ['application/xml', undefined, 0, 0x3c, 0x3f, 0x78, 0x6d, 0x6c],
  [
    'application/xml',
    undefined,
    0,
    0xfe,
    0xff,
    0x00,
    0x3c,
    0x00,
    0x3f,
    0x00,
    0x78,
  ],
  [
    'application/xml',
    undefined,
    0,
    0xff,
    0xfe,
    0x3c,
    0x00,
    0x3f,
    0x00,
    0x78,
    0x00,
  ],
  ['application/zip', undefined, 0, 0x50, 0x4b, 0x03, 0x04],
  [
    'application/zip',
    undefined,
    0,
    0x50,
    0x4b,
    0x07,
    0x08,
    0x50,
    0x4b,
    0x03,
    0x04,
  ],
  ['application/zip', undefined, 0, 0x50, 0x4b, 0x05, 0x06],
  ['audio/mpeg', undefined, 0, 0x49, 0x44, 0x33],
  ['audio/mpeg', undefined, -128, 0x54, 0x41, 0x47],
  ['audio/mpeg', undefined, 0, 0xff, 0xfd],
  ['audio/mpeg', undefined, 0, 0xff, 0xfe],
  ['font/otf', undefined, 0, 0x4f, 0x54, 0x54, 0x4f],
  ['font/otf', undefined, 0, 0x00, 0x01, 0x00, 0x00],
  ['font/ttf', undefined, 0, 0x00, 0x01, 0x00, 0x00],
  ['font/woff', undefined, 0, 0x77, 0x4f, 0x46, 0x46],
  ['font/woff2', undefined, 0, 0x77, 0x4f, 0x46, 0x32],
  ['image/apng', undefined, 0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  ['image/avif', undefined, 4, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69],
  ['image/vnd.microsoft.icon', undefined, 0, 0x00, 0x00, 0x01, 0x00],
  ['image/jpeg', undefined, -2, 0xff, 0xd9, 0xff, 0xd8],
  ['image/png', undefined, 0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  ['text/html', undefined, 0, 0x3c, 0x21, 0x44, 0x4f, 0x43, 0x54, 0x59, 0x50],
  ['text/html', undefined, 0, 0x3c, 0x21, 0x64, 0x6f, 0x63, 0x74, 0x79, 0x70],
  ['video/mp4', undefined, 4, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f],
  ['video/mp4', undefined, 4, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32],
  ['video/mp4', undefined, 4, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x31],
  ['video/mp4', undefined, 4, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x63, 0x31],
  ['video/mpeg', undefined, 0, 0x00, 0x00, 0x01, 0xba],
  ['video/mpeg', undefined, 0, 0x00, 0x00, 0x01, 0xb3],
] satisfies [SupportedMediaTypes, ...any[]][];

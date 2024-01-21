import { SupportedMediaTypes } from './SupportedMediaTypes';

/**
 * ## Introduction
 * The lookup table for guessing media types by file extension
 *
 * ## Layout
 * `Record<string, string[]>`
 * - `string`
 *   + The file extension
 * - `string[]`
 *   + The associated media types
 *
 * ## Note
 * - The table should be sorted by file extension for maintainability
 * - An extension can have multiple media types as fallbacks
 *
 * ## References
 * - [Apache HTTP MIME types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
 * - [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [IETF Datatracker](https://datatracker.ietf.org/)
 * - [LOC Digital Formats](https://www.loc.gov/preservation/digital/formats/fdd/browse_list.shtml)
 */
export const extensionToMediaTypes: Record<string, string[]> = {
  apng: ['image/apng'],
  avif: ['image/avif'],
  docx: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
  ],
  dtd: ['application/xml-dtd'],
  gz: ['application/gzip'],
  htm: ['text/html'],
  html: ['text/html'],
  ico: ['image/vnd.microsoft.icon'],
  jar: ['application/java-archive', 'application/zip'],
  jpe: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  jpg: ['image/jpeg'],
  m1a: ['audio/mpeg'],
  m1v: ['video/mpeg'],
  m2a: ['audio/mpeg'],
  m2v: ['video/mpeg'],
  mp1: ['audio/mpeg'],
  mp1a: ['audio/mpeg'],
  mp2: ['audio/mpeg'],
  mp2a: ['audio/mpeg'],
  mp3: ['audio/mpeg'],
  mp4: ['video/mp4'],
  mp4v: ['video/mp4'],
  mpeg: ['video/mpeg'],
  mpg4: ['video/mp4'],
  mpg: ['video/mpeg'],
  mpga: ['audio/mpeg'],
  odp: ['application/zip'],
  ods: ['application/zip'],
  odt: ['application/zip'],
  otf: ['font/otf'],
  pdf: ['application/pdf'],
  png: ['image/png', 'image/apng'],
  pptx: [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/zip',
  ],
  tgz: ['application/gzip'],
  ttf: ['font/ttf'],
  war: ['application/zip'],
  woff: ['font/woff'],
  woff2: ['font/woff2'],
  xlsx: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
  ],
  xml: ['application/xml'],
  z00: ['application/zip'],
  z01: ['application/zip'],
  z02: ['application/zip'],
  z03: ['application/zip'],
  z04: ['application/zip'],
  z05: ['application/zip'],
  z06: ['application/zip'],
  z07: ['application/zip'],
  z08: ['application/zip'],
  z09: ['application/zip'],
  zip: ['application/zip'],
  zipx: ['application/zip'],
} satisfies Record<string, SupportedMediaTypes[]>;

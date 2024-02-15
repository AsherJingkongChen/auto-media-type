import { SupportedMediaTypes } from './SupportedMediaTypes';

/**
 * ## Introduction
 * A lookup table to guess media types by file extension
 *
 * ## Layout
 * `Record<string, string[]>`
 * - The key is a file extension
 * - The value is an array of media types
 *
 * ## Note
 * - The table should be sorted by file extension for maintainability
 * - An file extension can have multiple associated media types as fallbacks
 *
 * ## References
 * - [Apache HTTP MIME types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
 * - [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [LOC Digital Formats](https://www.loc.gov/preservation/digital/formats/fdd/browse_list.shtml)
 */
export const extensionToMediaTypesTable: Record<string, string[]> = {
  apng: ['image/apng'],
  avif: ['image/avif'],
  avifs: ['image/avif'],
  bmp: ['image/bmp'],
  dib: ['image/bmp'],
  djv: ['image/vnd.djvu'],
  djvu: ['image/vnd.djvu'],
  docx: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
  ],
  dng: ['image/tiff'],
  dtd: ['application/xml-dtd'],
  gif: ['image/gif'],
  gz: ['application/gzip'],
  heic: ['image/heic'],
  heics: ['image/heic-sequence'],
  heif: ['image/heif'],
  heifs: ['image/heif-sequence'],
  hif: ['image/heic', 'image/heif'],
  htm: ['text/html'],
  html: ['text/html'],
  ico: ['image/vnd.microsoft.icon'],
  jar: ['application/java-archive', 'application/zip'],
  j2c: ['image/j2c'],
  j2k: ['image/j2c'],
  jfi: ['image/jpeg'],
  jfif: ['image/jpeg'],
  jif: ['image/jpeg'],
  jp2: ['image/jp2'],
  jpe: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  jpf: ['image/jpx'],
  jpg: ['image/jpeg'],
  jpg2: ['image/jp2'],
  jpgm: ['image/jpm'],
  jpm: ['image/jpm'],
  jpx: ['image/jpx'],
  m1a: ['audio/mpeg'],
  m1v: ['video/mpeg'],
  m2a: ['audio/mpeg'],
  m2v: ['video/mpeg'],
  mj2: ['video/mj2'],
  mjp2: ['video/mj2'],
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
  svg: ['image/svg+xml'],
  tgz: ['application/gzip'],
  tif: ['image/tiff'],
  tiff: ['image/tiff'],
  ttf: ['font/ttf'],
  war: ['application/zip'],
  wbmp: ['image/vnd.wap.wbmp'],
  webp: ['image/webp'],
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

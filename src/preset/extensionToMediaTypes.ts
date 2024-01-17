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
 * - [Apache MIME types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
 * - [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [IETF Datatracker](https://datatracker.ietf.org/)
 * - [LOC](https://www.loc.gov/)
 * - [W3C](https://www.w3.org/)
 */
export const extensionToMediaTypes: Record<string, string[]> = {
  apk: ['application/zip'], // .zip
  apng: ['image/apng'], // APNG: https://www.w3.org/TR/png/#image-apng
  avif: ['image/avif'], // AVIF: https://aomediacodec.github.io/av1-avif/#brands-overview
  epub: ['application/zip'], // .zip
  docx: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
  ], // .zip, DOCX: https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.wordprocessingml.document
  dtd: ['application/xml-dtd'], // DTD: https://datatracker.ietf.org/doc/html/rfc7303#section-9.5
  gz: ['application/gzip'], // GZIP: https://www.gnu.org/software/gzip/manual/gzip.html
  ico: ['image/vnd.microsoft.icon'], // ICO: https://www.iana.org/assignments/media-types/image/vnd.microsoft.icon
  jar: ['application/java-archive', 'application/zip'], // .zip, JAR: https://www.iana.org/assignments/media-types/application/java-archive
  jpe: ['image/jpeg'], // .jpeg
  jpeg: ['image/jpeg'], // JPEG: https://www.w3.org/Graphics/JPEG/
  jpg: ['image/jpeg'], // .jpeg
  htm: ['text/html'], // .html
  html: ['text/html'], // HTML: https://datatracker.ietf.org/doc/html/rfc2854#section-2
  m2v: ['video/mpeg'], // MPEG-2 Video Only: https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
  mp1: ['audio/mpeg'], // MPEG-1/2 Part 3 Layer I: https://datatracker.ietf.org/doc/html/rfc3003#section-2
  mp2: ['audio/mpeg'], // MPEG-1/2 Part 3 Layer II: https://datatracker.ietf.org/doc/html/rfc3003#section-2
  mp3: ['audio/mpeg'], // MPEG-1/2 Part 3 Layer III: https://datatracker.ietf.org/doc/html/rfc3003#section-2
  mp4: ['video/mp4'], // MPEG-4 Part 14: https://datatracker.ietf.org/doc/html/rfc4337#section-3.1
  mpeg: ['video/mpeg'], // MPEG-1/2 Part 2: https://www.loc.gov/preservation/digital/formats/fdd/fdd000028.shtml
  mpg: ['video/mpeg'], // .mpeg
  mpg4: ['video/mp4'], // .mp4
  odp: ['application/zip'], // .zip
  ods: ['application/zip'], // .zip
  odt: ['application/zip'], // .zip
  otf: ['font/otf', 'font/ttf'], // OpenType/TrueType Font: https://datatracker.ietf.org/doc/html/rfc8081#section-4.4.3
  pdf: ['application/pdf'], // PDF: https://datatracker.ietf.org/doc/html/rfc8118#section-8
  png: ['image/png', 'image/apng'], // PNG: https://www.w3.org/TR/png/#image-png
  pptx: [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/zip',
  ], // .zip, PPTX: https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.presentationml.presentation
  tgz: ['application/gzip'], // .gz
  ttf: ['font/ttf'], // TrueType Font: https://datatracker.ietf.org/doc/html/rfc8081#section-4.4.2
  war: ['application/zip'], // .zip
  woff: ['font/woff'], // WOFF 1.0: https://datatracker.ietf.org/doc/html/rfc8081#section-4.4.5
  woff2: ['font/woff2'], // WOFF 2.0: https://datatracker.ietf.org/doc/html/rfc8081#section-4.4.6
  xlsx: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
  ], // .zip, XLSX: https://www.loc.gov/preservation/digital/formats/fdd/fdd000401.shtml
  xml: ['application/xml'], // https://datatracker.ietf.org/doc/html/rfc7303#section-9.1
  z: ['application/gzip'], // .gz
  z00: ['application/zip'], // .zip
  z01: ['application/zip'], // .zip
  z02: ['application/zip'], // .zip
  z03: ['application/zip'], // .zip
  z04: ['application/zip'], // .zip
  z05: ['application/zip'], // .zip
  z06: ['application/zip'], // .zip
  z07: ['application/zip'], // .zip
  z08: ['application/zip'], // .zip
  z09: ['application/zip'], // .zip
  zip: ['application/zip'], // ZIP: https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.3.10.TXT
  zipx: ['application/zip'], // .zip
} satisfies Record<string, SupportedMediaTypes[]>;

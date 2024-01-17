import { SupportedMediaTypes } from './SupportedMediaTypes';

/**
 * ## Introduction
 * The list of media types, offsets and magic numbers
 *
 * ## Layout
 * `[string, undefined, number, number, ...(undefined | number)[]][]`
 * - `string`
 *   + The media type
 * - `undefined`
 *   + The magic marker
 *   + It is followed by magic offset and numbers.
 * - `number`
 *   + The magic offset
 *   + If negative, the offset is counted from the end.
 * - `number, ...(undefined | number)[]`
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
 * - [Wikipedia - List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)
 */
export const mediaTypeAndMagicNumbersList: [
  string,
  undefined,
  number,
  number,
  ...(number | undefined)[],
][] = [
  [
    'application/gzip',
    undefined,
    0,
    0x1f,
    0x8b,
  ] /** `\x1f\x8b` (GZIP): https://www.iana.org/assignments/media-types/application/gzip */,
  [
    'application/java-archive',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ] /** `PK\x03\x04`= (ZIP): https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.3.10.TXT, https://docs.oracle.com/en/java/javase/20/docs/specs/jar/jar.html */,
  [
    'application/pdf',
    undefined,
    0,
    0x25,
    0x50,
    0x44,
    0x46,
    0x2d,
  ] /** `%PDF-` (PDF): https://datatracker.ietf.org/doc/html/rfc8118#section-8 */,
  [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ] /** `PK\x03\x04` (ZIP): https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.presentationml.presentation, https://ecma-international.org/wp-content/uploads/OpenXML-White-Paper.pdf */,
  [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ] /** `PK\x03\x04` (ZIP): https://www.loc.gov/preservation/digital/formats/fdd/fdd000398.shtml, https://ecma-international.org/wp-content/uploads/OpenXML-White-Paper.pdf */,
  [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ] /** `PK\3\4` (ZIP): https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.wordprocessingml.document, https://ecma-international.org/wp-content/uploads/OpenXML-White-Paper.pdf */,
  [
    'application/xml',
    undefined,
    0,
    0x3c,
    0x3f,
    0x78,
    0x6d,
    0x6c,
  ] /** `<?xml` (XML Declaration): https://datatracker.ietf.org/doc/html/rfc7303#section-9.1 */,
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
  ] /** `<?x` (XML Declaration UTF-16BE): https://datatracker.ietf.org/doc/html/rfc7303#section-9.1 */,
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
  ] /** `<?x` (XML Declaration UTF-16LE): https://datatracker.ietf.org/doc/html/rfc7303#section-9.1 */,
  [
    'application/xml-dtd',
    undefined,
    0,
    0x3c,
    0x21,
  ] /** `<!` (XML Declaration Prefix): https://datatracker.ietf.org/doc/html/rfc7303#section-9.5 */,
  [
    'application/zip',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ] /** `PK\3\4` (PKZIP LFH): https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.3.10.TXT */,
  [
    'application/zip',
    undefined,
    0,
    0x50,
    0x4b,
    0x07,
    0x08,
  ] /** `PK\7\x08` (PKZIP Split): https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.3.10.TXT */,
  [
    'audio/mpeg',
    undefined,
    0,
    0x49,
    0x44,
    0x33,
  ] /** `ID3` (ID3v2.*): https://id3lib.sourceforge.net/id3/id3v2.3.0.html */,
  [
    'audio/mpeg',
    undefined,
    -128,
    0x54,
    0x41,
    0x47,
  ] /** `TAG` (ID3v1*): https://id3lib.sourceforge.net/id3/id3v1.html */,
  [
    'font/otf',
    undefined,
    0,
    0x4f,
    0x54,
    0x54,
    0x4f,
  ] /** `OTTO`: https://learn.microsoft.com/en-us/typography/opentype/spec/otff#table-directory */,
  [
    'font/otf',
    undefined,
    0,
    0x00,
    0x01,
    0x00,
    0x00,
  ] /** `\0\1\0\0`: https://learn.microsoft.com/en-us/typography/opentype/spec/otff#table-directory */,
  [
    'font/ttf',
    undefined,
    0,
    0x00,
    0x01,
    0x00,
    0x00,
  ] /** `\0\1\0\0`: https://datatracker.ietf.org/doc/html/rfc8081#section-4.4.2 */,
  [
    'font/woff',
    undefined,
    0,
    0x77,
    0x4f,
    0x46,
    0x46,
  ] /** `wOFF` (WOFF 1.0): https://www.w3.org/TR/WOFF/#WOFFHeader */,
  [
    'font/woff2',
    undefined,
    0,
    0x77,
    0x4f,
    0x46,
    0x32,
  ] /** `wOF2` (WOFF 2.0): https://www.w3.org/TR/WOFF2/#woff20Header */,
  [
    'image/apng',
    undefined,
    0,
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a,
  ] /** `\x89PNG\r\n\x1a\n` (PNG): https://www.w3.org/TR/png/#image-apng */,
  [
    'image/avif',
    undefined,
    4,
    0x66,
    0x74,
    0x79,
    0x70,
    0x61,
    0x76,
    0x69,
    0x66,
  ] /** `ftypavif` (AVIF Image Item): https://aomediacodec.github.io/av1-avif/#image-and-image-collection-brand */,
  [
    'image/vnd.microsoft.icon',
    undefined,
    0,
    0x00,
    0x00,
    0x01,
    0x00,
  ] /** `\0\0\1\0` (ICO): https://www.iana.org/assignments/media-types/image/vnd.microsoft.icon */,
  [
    'image/jpeg',
    undefined,
    0,
    0xff,
    0xd8,
    0xff,
    undefined,
    -2,
    0xff,
    0xd9,
  ] /** `\xff\xd8\xff`, `\xff\xd9` (JPEG SOI, APPn, EOI): https://www.w3.org/Graphics/JPEG/ */,
  ['image/png', undefined, 0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], //`\x89PNG\r\n\x1a\n` (PNG):  https://www.w3.org/TR/png/#image-png
  [
    'text/html',
    undefined,
    0,
    0x3c,
    0x21,
    0x44,
    0x4f,
  ] /** `<!DO` (HTML Preamble): https://datatracker.ietf.org/doc/html/rfc2854#section-5, https://html.spec.whatwg.org/#the-doctype */,
  [
    'text/html',
    undefined,
    0,
    0x3c,
    0x21,
    0x64,
    0x6f,
  ] /** `<!do` (HTML Preamble): https://datatracker.ietf.org/doc/html/rfc2854#section-5 */,
  [
    'text/html',
    undefined,
    0,
    0x3c,
    0x68,
    0x74,
    0x6d,
    0x6c,
    0x3e,
  ] /** `<html>` (HTML Root): https://datatracker.ietf.org/doc/html/rfc2854#section-5 */,
  [
    'video/mp4',
    undefined,
    4,
    0x66,
    0x74,
    0x79,
    0x70,
    0x69,
    0x73,
    0x6f,
  ] /** `ftypiso` (ISO Base Media): https://www.ftyps.com/ */,
  [
    'video/mp4',
    undefined,
    4,
    0x66,
    0x74,
    0x79,
    0x70,
    0x6d,
    0x70,
    0x34,
  ] /** `ftypmp4` (MP4 v*): https://www.ftyps.com/ */,
  [
    'video/mpeg',
    undefined,
    0,
    0x00,
    0x00,
    0x01,
  ] /** `\0\0\1` (MPEG-1/2 Part 2 Header Prefix): http://dvdnav.mplayerhq.hu/dvdinfo/mpeghdrs.html */,
] satisfies [SupportedMediaTypes, ...any[]][];

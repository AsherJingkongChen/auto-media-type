/**
 * ## Introduction
 * - Supported media types: `21`
 *
 * ## References
 * - [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 */
export type SupportedMediaTypes = (typeof SupportedMediaTypes)[number];
export const SupportedMediaTypes = [
  'application/gzip', // Extensions, Magic Numbers
  'application/java-archive', // Extensions, Magic Numbers
  'application/pdf', // Extensions, Magic Numbers
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // Extensions, Magic Numbers
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Extensions, Magic Numbers
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Extensions, Magic Numbers
  'application/xhtml+xml',
  'application/xml', // Extensions, Magic Numbers
  'application/xml-dtd',
  'application/xml-external-parsed-entity',
  'application/zip', // Extensions, Magic Numbers
  'audio/mpeg', // Extensions, Magic Numbers
  'font/otf', // Extensions, Magic Numbers
  'font/ttf', // Extensions, Magic Numbers
  'font/woff', // Extensions, Magic Numbers
  'font/woff2', // Extensions, Magic Numbers
  'image/apng', // Extensions, Magic Numbers
  'image/avif', // Extensions, Magic Numbers
  'image/jpeg', // Extensions, Magic Numbers
  'image/png', // Extensions, Magic Numbers
  'image/vnd.microsoft.icon', // Extensions, Magic Numbers
  'text/html', // Extensions, Magic Numbers
  'text/xml', // DEPRECATED by us
  'text/xml-external-parsed-entity', // DEPRECATED by us
  'video/mp4', // Extensions, Magic Numbers
  'video/mpeg', // Extensions, Magic Numbers
] as const;

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
  ['application/gzip', undefined, 0, 0x1f, 0x8b], // `\x1f\x8b` (GZIP): https://www.iana.org/assignments/media-types/application/gzip
  ['application/java-archive', undefined, 0, 0x50, 0x4b, 0x03, 0x04], // `PK\x03\x04`= (ZIP): https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.3.10.TXT, https://docs.oracle.com/en/java/javase/20/docs/specs/jar/jar.html
  ['application/pdf', undefined, 0, 0x25, 0x50, 0x44, 0x46, 0x2d], // `%PDF-` (PDF): https://datatracker.ietf.org/doc/html/rfc8118#section-8
  [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ], // `PK\x03\x04` (ZIP): https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.presentationml.presentation, https://ecma-international.org/wp-content/uploads/OpenXML-White-Paper.pdf
  [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ], // `PK\x03\x04` (ZIP): https://www.loc.gov/preservation/digital/formats/fdd/fdd000398.shtml, https://ecma-international.org/wp-content/uploads/OpenXML-White-Paper.pdf
  [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    undefined,
    0,
    0x50,
    0x4b,
    0x03,
    0x04,
  ], // `PK\3\4` (ZIP): https://www.iana.org/assignments/media-types/application/vnd.openxmlformats-officedocument.wordprocessingml.document, https://ecma-international.org/wp-content/uploads/OpenXML-White-Paper.pdf
  ['application/xml', undefined, 0, 0x3c, 0x3f, 0x78, 0x6d, 0x6c], // `<?xml` (XML Declaration): https://datatracker.ietf.org/doc/html/rfc7303#section-9.1
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
    0x00,
    0x6d,
  ], // `<?xm` (XML Declaration UTF-16BE): https://datatracker.ietf.org/doc/html/rfc7303#section-9.1
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
    0x6d,
    0x00,
  ], // `<?xm` (XML Declaration UTF-16LE): https://datatracker.ietf.org/doc/html/rfc7303#section-9.1
  ['application/zip', undefined, 0, 0x50, 0x4b, 0x03, 0x04], // `PK\3\4` (PKZIP LFH): https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.3.10.TXT
  ['application/zip', undefined, 0, 0x50, 0x4b, 0x07, 0x08], // `PK\7\x08` (PKZIP Split): https://pkware.cachefly.net/webdocs/APPNOTE/APPNOTE-6.3.10.TXT
  ['audio/mpeg', undefined, 0, 0x49, 0x44, 0x33], // `ID3` (ID3v2.*): https://id3lib.sourceforge.net/id3/id3v2.3.0.html
  ['audio/mpeg', undefined, -128, 0x54, 0x41, 0x47], // `TAG` (ID3v1*): https://id3lib.sourceforge.net/id3/id3v1.html
  ['font/otf', undefined, 0, 0x4f, 0x54, 0x54, 0x4f], // `OTTO`: https://learn.microsoft.com/en-us/typography/opentype/spec/otff#table-directory
  ['font/otf', undefined, 0, 0x00, 0x01, 0x00, 0x00], // `\0\1\0\0`: https://learn.microsoft.com/en-us/typography/opentype/spec/otff#table-directory
  ['font/ttf', undefined, 0, 0x00, 0x01, 0x00, 0x00], // `\0\1\0\0`: https://datatracker.ietf.org/doc/html/rfc8081#section-4.4.2
  ['font/woff', undefined, 0, 0x77, 0x4f, 0x46, 0x46], // `wOFF` (WOFF 1.0): https://www.w3.org/TR/WOFF/#WOFFHeader
  ['font/woff2', undefined, 0, 0x77, 0x4f, 0x46, 0x32], // `wOF2` (WOFF 2.0): https://www.w3.org/TR/WOFF2/#woff20Header
  ['image/apng', undefined, 0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], // `\x89PNG\r\n\x1a\n` (PNG): https://www.w3.org/TR/png/#image-apng
  ['image/avif', undefined, 4, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66], // `ftypavif` (AVIF Image Item): https://aomediacodec.github.io/av1-avif/#image-and-image-collection-brand
  ['image/vnd.microsoft.icon', undefined, 0, 0x00, 0x00, 0x01, 0x00], // `\0\0\1\0` (ICO): https://www.iana.org/assignments/media-types/image/vnd.microsoft.icon
  ['image/jpeg', undefined, 0, 0xff, 0xd8, 0xff, undefined, -2, 0xff, 0xd9], // `\xff\xd8\xff`, `\xff\xd9` (JPEG SOI, APPn, EOI): https://www.w3.org/Graphics/JPEG/
  ['image/png', undefined, 0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], //`\x89PNG\r\n\x1a\n` (PNG):  https://www.w3.org/TR/png/#image-png
  ['text/html', undefined, 0, 0x3c, 0x21, 0x44, 0x4f], // `<!DO` (HTML Preamble): https://datatracker.ietf.org/doc/html/rfc2854#section-5
  ['text/html', undefined, 0, 0x3c, 0x21, 0x64, 0x6f], // `<!do` (HTML Preamble): https://datatracker.ietf.org/doc/html/rfc2854#section-5
  ['text/html', undefined, 0, 0x3c, 0x68, 0x74, 0x6d, 0x6c], // `<html` (HTML Root): https://datatracker.ietf.org/doc/html/rfc2854#section-5
  ['video/mp4', undefined, 4, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f], // `ftypiso` (ISO Base Media): https://www.ftyps.com/
  ['video/mp4', undefined, 4, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34], // `ftypmp4` (MP4 v*): https://www.ftyps.com/
  ['video/mpeg', undefined, 0, 0x00, 0x00, 0x01], // `\0\0\1` (MPEG-1/2 Part 2 Header Prefix): http://dvdnav.mplayerhq.hu/dvdinfo/mpeghdrs.html
] satisfies [SupportedMediaTypes, ...any[]][];

/**
 * ## Introduction
 * Pairs of index ranges to cover all magic numbers
 *
 * ## Layout
 * `[number, number | undefined][]`
 * - `[number, number | undefined]`
 *   + `[begin, end)` is a right-open index range.
 *   + If `end` is `undefined`, it represents the end of the blob.
 *
 * ## Note
 * - The ranges should be sorted and not overlapping
 *   + in ascending order
 *   + assertion: `[i][0] < [i][1] <= [i+1][0]`
 * - The ranges should be compatible with `Blob.slice(begin, end)`
 *   + as the reason of the type of `end` is `number | undefined`
 */
export const magicNumberIndexRanges: [number, number | undefined][] = [
  [-128, -125],
  [-2, undefined],
  [0, 12],
];

// /**
//  * ## Introduction
//  * Update a media type
//  *
//  * ## Parameters
//  * - `context` - `object` - The context object
//  *   - `mediaType` - `string` - The media type to set
//  *   - `fileExtensions` - `string[]` - The file extensions to set
//  *   - `magic` - `object` - The magic numbers to add
//  *     - `offset` - `number` - The offset of the magic numbers
//  *     - `numbers` - `number[]` - The magic numbers
//  *
//  * ## Results
//  * - `boolean` - `true` if the update modifies entries that already exist
//  *
//  * ## Throws
//  * - `Error` - If the magic numbers are empty
//  */
// export function update(context: {
//   fileExtensions: string[];
//   mediaType: string;
//   magic: {
//     offset: number;
//     numbers: number[];
//   }[];
// }): boolean {
//   const { fileExtensions, mediaType, magic } = context;
//   let modified = false;

//   // Check `magic`
//   if (!magic.length || !magic[0]) {
//     throw new Error('Magic cannot be empty');
//   }

//   // 1. Update the lookup table with the file extensions
//   for (const extension of fileExtensions) {
//     const mediaTypes = extensionToMediaTypes[extension];
//     if (mediaTypes) {
//       mediaTypes.push(mediaType);
//       modified = true;
//     } else {
//       extensionToMediaTypes[extension] = [mediaType];
//     }
//   }

//   // 2. Update the media type to the magic numbers list
//   const magicTypeAndMagicNumbers: [string, number, ...number[]] = [
//     mediaType,
//     magic[0].offset,
//     ...magic[0].numbers,
//   ];
//   for (let i = 1; i < magic.length; i++) {
//     const { numbers, offset } = magic[i]!;
//     magicTypeAndMagicNumbers.push(NaN, offset, ...numbers);
//   }
//   mediaTypeAndMagicNumbersList.push(magicTypeAndMagicNumbers);

//   // [TODO] indexRanges should be updated
//   return modified;
// }

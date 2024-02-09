/**
 * ## Introduction
 * Supported media types
 * - Supported media types: `38`
 * - Deprecated media types: `2`
 *
 * ## References
 * - [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 */
export const SupportedMediaTypes = new Set([
  'application/gzip',
  'application/java-archive',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/xml-dtd',
  'application/xml',
  'application/zip',
  'audio/mpeg',
  'font/otf',
  'font/ttf',
  'font/woff',
  'font/woff2',
  'image/apng',
  'image/avif',
  'image/bmp',
  'image/gif',
  'image/heic-sequence',
  'image/heic',
  'image/heif-sequence',
  'image/heif',
  'image/j2c',
  'image/jp2',
  'image/jpeg',
  'image/jpm',
  'image/jpx',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/vnd.djvu',
  'image/vnd.microsoft.icon',
  'image/vnd.wap.wbmp',
  'image/webp',
  'text/html',
  'video/mj2',
  'video/mp4',
  'video/mpeg',
] as const);

// 'text/xml', // DEPRECATED by us, in favor of `application/xml`
// 'text/xml-external-parsed-entity', // DEPRECATED by us, in favor of `application/xml-external-parsed-entity`

export type SupportedMediaTypes =
  typeof SupportedMediaTypes extends Set<infer X> ? X : never;

/**
 * ## Introduction
 * - Supported media types: `22`
 * - Deprecated media types: `2`
 *
 * ## References
 * - [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 */
export type SupportedMediaTypes = (typeof SupportedMediaTypes)[number];
export const SupportedMediaTypes = [
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
  'image/heic',
  'image/heic-sequence',
  'image/heif',
  'image/heif-sequence',
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
  // 'text/xml', // DEPRECATED by us, in favor of `application/xml`
  // 'text/xml-external-parsed-entity', // DEPRECATED by us, in favor of `application/xml-external-parsed-entity`
  'video/mj2',
  'video/mp4',
  'video/mpeg',
] as const;

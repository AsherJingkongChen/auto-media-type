/**
 * ## Introduction
 * - Supported media types: `22`
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
  'application/xml', // Extensions, Magic Numbers
  'application/xml-dtd', // Extensions, Magic Numbers
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
  'text/xml', // DEPRECATED by us, in favor of `application/xml`
  'text/xml-external-parsed-entity', // DEPRECATED by us, in favor of `application/xml-external-parsed-entity`
  'video/mp4', // Extensions, Magic Numbers
  'video/mpeg', // Extensions, Magic Numbers
] as const;

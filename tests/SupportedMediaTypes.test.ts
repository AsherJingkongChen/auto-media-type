import { SupportedMediaTypes } from 'src/preset';
import { describe, expect, it } from 'vitest';
import mediaTypes from 'iana-media-type';

describe('SupportedMediaTypes', () => {
  it('It contains all the media types', () => {
    const ianaMediaTypes = new Set(mediaTypes);
    for (const mediaType of SupportedMediaTypes) {
      expect(ianaMediaTypes).toContain(mediaType);
    }
  });
});

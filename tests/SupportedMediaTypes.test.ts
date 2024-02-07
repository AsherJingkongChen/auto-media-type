import { SupportedMediaTypes } from 'src/preset';
import { describe, expect, it } from 'vitest';
import mediaTypes from 'iana-media-type';
import { Sample } from 'lots-of-sample-files';
import { MediaTypeDoc } from './MediaTypeDoc';

describe('SupportedMediaTypes', () => {
  it('They are all contained in IANA media types', () => {
    const ianaMediaTypes = new Set(mediaTypes);
    for (const mediaType of SupportedMediaTypes) {
      expect(ianaMediaTypes).toContain(mediaType);
    }
  });

  it('It contains the media type of all sample files', () => {
    const supportedMediaTypes = new Set(SupportedMediaTypes);
    for (const { type } of Sample.paths()) {
      expect(supportedMediaTypes).toContain(type);
    }
  });

  it('It equals to the media type document titles', () => {
    const titles = [...MediaTypeDoc.paths()].map(({ type }) => type);
    expect(SupportedMediaTypes).toEqual(titles);
  });
});

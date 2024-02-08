import { MediaType } from 'src';
import { describe, expect, it } from 'vitest';
import mediaTypes from 'iana-media-type';
import { Sample } from 'lots-of-sample-files';
import { MediaTypeDoc } from '../utils/MediaTypeDoc';

describe('MediaType.supportSet', () => {
  it('They are all contained in IANA media types', () => {
    const ianaMediaTypes = new Set(mediaTypes);
    for (const mediaType of MediaType.supportSet) {
      expect(ianaMediaTypes).toContain(mediaType);
    }
  });

  it('It contains the media type of all sample files', () => {
    for (const { type } of Sample.paths()) {
      expect(MediaType.supportSet).toContain(type);
    }
  });

  it('It equals to the media type document titles', () => {
    const docTitles = new Set(
      [...MediaTypeDoc.paths()].map(({ type }) => type),
    );
    expect(MediaType.supportSet).toEqual(docTitles);
  });
});

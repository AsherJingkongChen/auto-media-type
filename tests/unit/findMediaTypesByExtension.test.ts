import { findMediaTypesByExtension } from 'src/find';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('findMediaTypesByExtension()', () => {
  const output = Array.from(Data.paths()).map(({ path, type }) => ({
    expected: type,
    received: findMediaTypesByExtension(path),
  }));

  it('always contains the closest media type (Recall 100%)', () => {
    for (const { expected, received } of output) {
      expect<string[]>(received).toContain(expected);
    }
  });

  it('returns an empty array if no extension is matched', () => {
    expect(findMediaTypesByExtension('')).toEqual([]);
    expect(findMediaTypesByExtension('.x-undefined-file-extension')).toEqual(
      [],
    );
  });
});

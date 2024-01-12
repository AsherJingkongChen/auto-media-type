import { findMediaTypesByExtension } from 'src/find';
import { Data } from 'tests/data';
import { describe, expect, it } from 'bun:test';

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
});

import { findMediaTypesByMagicNumbers } from 'src/find';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('findMediaTypesByMagicNumbers()', async () => {
  const output = Promise.all(
    Array.from(Data.files()).map(async (file) => ({
      expected: file.type,
      received: await findMediaTypesByMagicNumbers(file),
    })),
  );

  it('always contains the closest media type (Recall 100%)', async () => {
    for (const { expected, received } of await output) {
      expect<string[]>(received).toContain(expected);
    }
  });
});

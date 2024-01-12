import { findMediaTypesByMagicNumbers } from 'src/find';
import { Data } from 'tests/data';
import { describe, expect, it } from 'bun:test';

describe('findMediaTypesByMagicNumbers()', async () => {
  const pendingOutput = Promise.all(
    Array.from(Data.files()).map(async (file) => ({
      expected: file.type,
      received: await findMediaTypesByMagicNumbers(file),
    })),
  );

  it('always contains the closest media type (Recall 100%)', async () => {
    for (const { expected, received } of await pendingOutput) {
      expect<string[]>(received).toContain(expected);
    }
  });
});

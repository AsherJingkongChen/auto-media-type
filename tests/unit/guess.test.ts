import { MediaType } from 'src';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('MediaType', () => {
  describe('.guess()', () => {
    const output = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.guess(file),
      })),
    );

    it('always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of await output) {
        expect<string[]>(received).toContain(expected);
      }
    });

    it('throws if the data is not a guessable', async () => {
      await expect(MediaType.guess({} as any)).rejects.toThrow();
    });
  });

  describe('.guessFile()', () => {
    const output = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.guessFile(file),
      })),
    );

    it('always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of await output) {
        expect<string[]>(received).toContain(expected);
      }
    });
  });
});

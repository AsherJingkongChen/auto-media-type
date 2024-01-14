import { MediaType } from 'src';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('MediaType', () => {
  describe('.suggest()', () => {
    const output = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.suggest(file),
      })),
    );

    it('It always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of await output) {
        expect<string[]>(received).toContain(expected);
      }
    });

    it('It throws if the data type is not valid', async () => {
      await expect(MediaType.suggest({} as any)).rejects.toThrow();
    });
  });

  describe('.suggestFile()', () => {
    const output = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.suggestFile(file),
      })),
    );

    it('It always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of await output) {
        expect<string[]>(received).toContain(expected);
      }
    });
  });
});

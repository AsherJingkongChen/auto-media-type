import { MediaType } from 'src';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('MediaType', () => {
  describe('.guess()', () => {
    const pendingOutput = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.guess(file),
      })),
    );

    it('always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of await pendingOutput) {
        expect<string[]>(received).toContain(expected);
      }
    });

    it('throws an error if the data is not a guessable', () => {
      expect(MediaType.guess({} as MediaType.Guessable)).rejects.toThrow();
    });
  });

  describe('.guessFile()', () => {
    const pendingOutput = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.guessFile(file),
      })),
    );

    it('always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of await pendingOutput) {
        expect<string[]>(received).toContain(expected);
      }
    });
  });
});

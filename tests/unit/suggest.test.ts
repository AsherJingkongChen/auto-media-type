import { MediaType } from 'src';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('MediaType', () => {
  describe('.suggest()', () => {
    const outputBlobs = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.suggest(file.slice()),
      })),
    );

    const outputFiles = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.suggest(file),
      })),
    );

    it('It always contains the closest media type for blobs (Recall 100%)', async () => {
      for (const { expected, received } of await outputBlobs) {
        expect(received).toContain(expected);
      }
    });

    it('It always contains the closest media type for files (Recall 100%)', async () => {
      for (const { expected, received } of await outputFiles) {
        expect(received).toContain(expected);
      }
    });

    it('It throws if the data type is not valid', async () => {
      await expect(MediaType.suggest({} as any)).rejects.toThrow();
    });
  });

  describe('.suggestBlob()', () => {
    const output = Promise.all(
      Array.from(Data.files()).map(async (file) => ({
        expected: file.type,
        received: await MediaType.suggestBlob(file),
      })),
    );

    it('It always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of await output) {
        expect(received).toContain(expected);
      }
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
        expect(received).toContain(expected);
      }
    });
  });
});

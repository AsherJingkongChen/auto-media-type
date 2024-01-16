import { MediaType } from 'src';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('MediaType', () => {
  describe('.suggest()', () => {
    const output = Array.from(Data.files()).map((file) => ({
      expected: file.type,
      receivedFromBlob: MediaType.suggest(file.slice()),
      receivedFromFile: MediaType.suggest(file),
    }));

    it('It always contains the closest media type for blobs (Recall 100%)', async () => {
      for (const { expected, receivedFromBlob } of output) {
        await expect(receivedFromBlob).resolves.toContain(expected);
      }
    });

    it('It always contains the closest media type for files (Recall 100%)', async () => {
      for (const { expected, receivedFromFile } of output) {
        await expect(receivedFromFile).resolves.toContain(expected);
      }
    });

    it('It throws if the data type is not valid', async () => {
      await expect(MediaType.suggest({} as any)).rejects.toThrow();
    });
  });

  describe('.suggestBlob()', () => {
    const output = Array.from(Data.files()).map((file) => ({
      expected: file.type,
      received: MediaType.suggestBlob(file),
    }));

    it('It always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of output) {
        await expect(received).resolves.toContain(expected);
      }
    });
  });

  describe('.suggestFile()', () => {
    const output = Array.from(Data.files()).map((file) => ({
      expected: file.type,
      received: MediaType.suggestFile(file),
    }));

    it('It always contains the closest media type (Recall 100%)', async () => {
      for (const { expected, received } of output) {
        await expect(received).resolves.toContain(expected);
      }
    });
  });
});

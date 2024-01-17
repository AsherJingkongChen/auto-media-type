import { MediaType } from 'src';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('MediaType', () => {
  describe('.suggest()', () => {
    const output = Array.from(Data.files()).map((file) => ({
      expected: file.type,
      receivedFromArrayBuffer: file.arrayBuffer().then(MediaType.suggest),
      receivedFromBlob: MediaType.suggest(file.slice()),
      receivedFromDataView: file
        .arrayBuffer()
        .then((a) => MediaType.suggest(new DataView(a))),
      receivedFromFile: MediaType.suggest(file),
      receivedFromUint8Array: file
        .arrayBuffer()
        .then((a) => MediaType.suggest(new Uint8Array(a))),
    }));

    it('It always contains the closest media type for array buffers (Recall 100%)', async () => {
      for (const { expected, receivedFromArrayBuffer } of output) {
        await expect(receivedFromArrayBuffer).resolves.toContain(expected);
      }
    });

    it('It always contains the closest media type for blobs (Recall 100%)', async () => {
      for (const { expected, receivedFromBlob } of output) {
        await expect(receivedFromBlob).resolves.toContain(expected);
      }
    });

    it('It always contains the closest media type for data views (Recall 100%)', async () => {
      for (const { expected, receivedFromDataView } of output) {
        await expect(receivedFromDataView).resolves.toContain(expected);
      }
    });

    it('It always contains the closest media type for files (Recall 100%)', async () => {
      for (const { expected, receivedFromFile } of output) {
        await expect(receivedFromFile).resolves.toContain(expected);
      }
    });

    it('It always contains the closest media type for uint8 arrays (Recall 100%)', async () => {
      for (const { expected, receivedFromUint8Array } of output) {
        await expect(receivedFromUint8Array).resolves.toContain(expected);
      }
    });

    it('It throws if the data type is not valid', async () => {
      await expect(MediaType.suggest({} as any)).rejects.toThrow();
    });
  });
});

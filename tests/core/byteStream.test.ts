import { readByteStream } from 'src/core';
import { describe, expect, it } from 'vitest';

describe('readByteStream', () => {
  const blob = new Blob([
    new Uint8Array([0x00, 0x00, 0x02]),
    new Uint8Array([0x0a, 0x08, 0x32, 0x00]),
    new Uint8Array([0x0d, 0x09, 0x56, 0x0a, 0x20]),
    new Uint8Array([0x20, 0x0a]),
    new Uint8Array([0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20]),
    new Uint8Array([0x57, 0x6f, 0x48, 0x65]),
  ]);

  it('It returns the correct chunk', async () => {
    const stream = blob.stream();
    await expect(readByteStream(stream, 12)).resolves.toEqual(
      new Uint8Array([
        0x00, 0x00, 0x02, 0x0a, 0x08, 0x32, 0x00, 0x0d, 0x09, 0x56, 0x0a, 0x20,
      ]),
    );
    await expect(readByteStream(stream, 1, 0)).resolves.toEqual(
      new Uint8Array([0x20]),
    );
    await expect(readByteStream(stream, 2, 1)).resolves.toEqual(
      new Uint8Array([0x65, 0x6c]),
    );
    await expect(readByteStream(stream, 8, 0)).resolves.toEqual(
      new Uint8Array([0x6c, 0x6f, 0x2c, 0x20, 0x57, 0x6f, 0x48, 0x65]),
    );
    await expect(readByteStream(stream, 8, 0)).resolves.toEqual(
      new Uint8Array(),
    );
    await expect(readByteStream(stream, 8, 1)).resolves.toEqual(
      new Uint8Array(),
    );
  });

  it('It returns all data in one chunk for a covering range', async () => {
    const stream = blob.stream();
    await expect(readByteStream(stream, blob.size + 1)).resolves.toEqual(
      new Uint8Array([
        0x00, 0x00, 0x02, 0x0a, 0x08, 0x32, 0x00, 0x0d, 0x09, 0x56, 0x0a, 0x20,
        0x20, 0x0a, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x57, 0x6f, 0x48, 0x65,
      ]),
    );
  });

  describe('It returns an empty chunk', async () => {
    it('for a stream which is both cancelled and closed', async () => {
      const stream = blob.stream();
      await stream.cancel();
      const reader = stream.getReader();
      await reader.closed;
      reader.releaseLock();
      await expect(readByteStream(stream, 1)).resolves.toEqual(
        new Uint8Array(),
      );
    });

    it('for an overflow range', async () => {
      const stream = blob.stream();
      await expect(
        readByteStream(stream, blob.size, blob.size),
      ).resolves.toEqual(new Uint8Array());
    });
  });

  it('It throws if the stream throws an error', async () => {
    const error = new Error('[Test] Stream error');
    const stream = new ReadableStream({
      type: 'bytes',
      start(controller) {
        controller.error(error);
      },
    });
    await expect(readByteStream(stream, 1)).rejects.toBe(error);
  });
});

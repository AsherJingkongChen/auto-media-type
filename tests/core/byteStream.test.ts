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
    expect(await readByteStream(stream, 12)).toEqual(
      new Uint8Array([
        0x00, 0x00, 0x02, 0x0a, 0x08, 0x32, 0x00, 0x0d, 0x09, 0x56, 0x0a, 0x20,
      ]),
    );
    expect(await readByteStream(stream, 1, 0)).toEqual(new Uint8Array([0x20]));
    expect(await readByteStream(stream, 2, 1)).toEqual(
      new Uint8Array([0x65, 0x6c]),
    );
    expect(await readByteStream(stream, 8, 0)).toEqual(
      new Uint8Array([0x6c, 0x6f, 0x2c, 0x20, 0x57, 0x6f, 0x48, 0x65]),
    );
    expect(await readByteStream(stream, 8, 0)).toEqual(new Uint8Array());
    expect(await readByteStream(stream, 8, 1)).toEqual(new Uint8Array());
  });

  it('It returns all data in one chunk for a covering range', async () => {
    const stream = blob.stream();
    expect(await readByteStream(stream, blob.size + 1)).toEqual(
      new Uint8Array([
        0x00, 0x00, 0x02, 0x0a, 0x08, 0x32, 0x00, 0x0d, 0x09, 0x56, 0x0a, 0x20,
        0x20, 0x0a, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x57, 0x6f, 0x48, 0x65,
      ]),
    );
  });

  describe('It returns an empty chunk', async () => {
    it('for a cancelled stream', async () => {
      const stream = blob.stream();
      await stream.cancel();
      expect(await readByteStream(stream, 1)).toEqual(new Uint8Array());
    });

    it('for a closed stream', async () => {
      const stream = blob.stream();
      await stream.cancel();
      const reader = stream.getReader();
      await reader.closed;
      reader.releaseLock();
      expect(await readByteStream(stream, 1)).toEqual(new Uint8Array());
    });

    it('for an overflow range', async () => {
      const stream = blob.stream();
      expect(await readByteStream(stream, blob.size, blob.size)).toEqual(
        new Uint8Array(),
      );
    });
  });

  it('It throws if the stream throws an error', async () => {
    const error = new Error('[Test] Stream error');
    const errorStream = new ReadableStream({
      type: 'bytes',
      start(controller) {
        controller.error(error);
      },
    });
    await expect(readByteStream(errorStream, 1)).rejects.toEqual(error);
  });
});

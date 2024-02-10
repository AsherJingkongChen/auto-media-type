import {
  KeyedSerialCollection,
  matchKeyedSerials,
  readKeyedSerial,
  readSerial,
  readByteStream,
} from 'src/core';
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

describe('matchKeyedSerials', () => {
  it('It compares target with all parts of serials', () => {
    const collection: KeyedSerialCollection = [
      ['a', NaN, 0, 0x1, 0x1, 0x2],
      ['b', NaN, 0, 0x1, 0x1, 0x2, NaN, 3, 0xa, 0xb],
    ];
    const target = [];

    target.push(0x1);
    expect(matchKeyedSerials(target, collection)).toEqual(new Set());
    target.push(0x1);
    expect(matchKeyedSerials(target, collection)).toEqual(new Set());
    target.push(0x2);
    expect(matchKeyedSerials(target, collection)).toEqual(new Set(['a']));
    target.push(0xa);
    expect(matchKeyedSerials(target, collection)).toEqual(new Set(['a']));
    target.push(0xb);
    expect(matchKeyedSerials(target, collection)).toEqual(new Set(['a', 'b']));
    target.push(0x0);
    expect(matchKeyedSerials(target, collection)).toEqual(new Set(['a', 'b']));
  });

  it('It compares target with all serials', () => {
    const collection: KeyedSerialCollection = [
      ['Sam', NaN, 0, 0x1],
      ['Sam', NaN, 0, 0x3],
    ];
    expect(matchKeyedSerials([], collection)).toEqual(new Set());
    expect(matchKeyedSerials([0x1], collection)).toEqual(new Set(['Sam']));
    expect(matchKeyedSerials([0x3], collection)).toEqual(new Set(['Sam']));
  });
});

describe('readKeyedSerial', () => {
  it('It yields the index and scalar correctly', () => {
    expect([
      ...readKeyedSerial([
        'Roll',
        NaN,
        0,
        0x1,
        0x1,
        0x2,
        NaN,
        3,
        0xa,
        0xb,
        NaN,
        6,
        -0x1,
        -0x2,
        -0x3,
      ]),
    ]).toEqual([
      [0, 0x1],
      [1, 0x1],
      [2, 0x2],
      [3, 0xa],
      [4, 0xb],
      [6, -0x1],
      [7, -0x2],
      [8, -0x3],
    ]);
  });
});

describe('readSerial', () => {
  it('It yields the index and scalar correctly', () => {
    expect([
      ...readSerial([
        NaN,
        0,
        0x1,
        0x1,
        0x2,
        NaN,
        3,
        0xa,
        0xb,
        NaN,
        -6,
        -0x1,
        -0x2,
        -0x3,
      ]),
    ]).toEqual([
      [0, 0x1],
      [1, 0x1],
      [2, 0x2],
      [3, 0xa],
      [4, 0xb],
      [-6, -0x1],
      [-5, -0x2],
      [-4, -0x3],
    ]);
  });
});

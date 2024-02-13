import {
  KeyedSparseArrayCollection,
  matchKeyedSparseArrayCollection,
  readKeyedSparseArray,
  readSparseArray,
} from 'src/core';
import { describe, expect, it } from 'vitest';

describe('matchKeyedSparseArrayCollection', () => {
  it('It searches the entire collection', () => {
    const collection: KeyedSparseArrayCollection = [
      ['a', 0, 3, 0x1, 0x1, 0x2],
      ['b', 0, 3, 0x1, 0x1, 0x2, 4, 2, 0xa, 0xb],
    ];
    const pattern = [];

    pattern.push(0x1);
    expect(matchKeyedSparseArrayCollection(collection, pattern)).toEqual(
      new Set(),
    );
    pattern.push(0x1);
    expect(matchKeyedSparseArrayCollection(collection, pattern)).toEqual(
      new Set(),
    );
    pattern.push(0x2);
    expect(matchKeyedSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a']),
    );
    pattern.push(0xf);
    expect(matchKeyedSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a']),
    );
    pattern.push(0xa);
    expect(matchKeyedSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a']),
    );
    pattern.push(0xb);
    expect(matchKeyedSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a', 'b']),
    );
    pattern.push(0x0);
    expect(matchKeyedSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a', 'b']),
    );
  });

  it('It accepts the collection with a same key appeared multiple times', () => {
    const collection: KeyedSparseArrayCollection = [
      ['Sam', 0, 1, 0x1],
      ['Sam', 0, 1, 0x3],
    ];
    expect(matchKeyedSparseArrayCollection(collection, [])).toEqual(new Set());
    expect(matchKeyedSparseArrayCollection(collection, [0x1])).toEqual(
      new Set(['Sam']),
    );
    expect(matchKeyedSparseArrayCollection(collection, [0x2])).toEqual(
      new Set([]),
    );
    expect(matchKeyedSparseArrayCollection(collection, [0x3])).toEqual(
      new Set(['Sam']),
    );
  });
});

describe('readKeyedSparseArray', () => {
  it('It yields the index and element correctly', () => {
    expect([
      ...readKeyedSparseArray([
        'Rolling',
        0,
        3,
        ...[0x1, 0x1, 0x2],
        3,
        2,
        ...[0xa, 0xb],
        6,
        4,
        ...[-0x1, -0x2, -0x3, -0x4],
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
      [9, -0x4],
    ]);
  });
});

describe('readSparseArray', () => {
  it('It yields the index and element correctly', () => {
    expect([
      ...readSparseArray([
        0,
        3,
        ...[0x1, 0x1, 0x2],
        3,
        2,
        ...[0xa, 0xb],
        -6,
        3,
        ...[-0x1, -0x2, -0x3],
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

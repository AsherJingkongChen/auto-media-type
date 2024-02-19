import {
  SparseArrayCollection,
  matchSparseArrayCollection,
  readSparseArray,
} from 'src/core';
import { describe, expect, it } from 'vitest';

describe('matchSparseArrayCollection', () => {
  it('It searches the entire collection', () => {
    const collection: SparseArrayCollection = [
      ['a', [0, 3, 0x1, 0x1, 0x2]],
      ['b', [0, 3, 0x1, 0x1, 0x2, 4, 2, 0xa, 0xb]],
    ];
    const pattern = [];

    pattern.push(0x1);
    expect(matchSparseArrayCollection(collection, pattern)).toEqual(new Set());
    pattern.push(0x1);
    expect(matchSparseArrayCollection(collection, pattern)).toEqual(new Set());
    pattern.push(0x2);
    expect(matchSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a']),
    );
    pattern.push(0xf);
    expect(matchSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a']),
    );
    pattern.push(0xa);
    expect(matchSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a']),
    );
    pattern.push(0xb);
    expect(matchSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a', 'b']),
    );
    pattern.push(0x0);
    expect(matchSparseArrayCollection(collection, pattern)).toEqual(
      new Set(['a', 'b']),
    );
  });

  it('It accepts the collection with a same key appeared multiple times', () => {
    const collection: SparseArrayCollection = [
      ['Sam', [0, 1, 0x1]],
      ['Sam', [0, 1, 0x3]],
    ];
    expect(matchSparseArrayCollection(collection, [])).toEqual(new Set());
    expect(matchSparseArrayCollection(collection, [0x1])).toEqual(
      new Set(['Sam']),
    );
    expect(matchSparseArrayCollection(collection, [0x2])).toEqual(new Set([]));
    expect(matchSparseArrayCollection(collection, [0x3])).toEqual(
      new Set(['Sam']),
    );
  });

  it('An empty sparse array matches any pattern', () => {
    const collection: SparseArrayCollection = [['e', [0, 0]]];
    expect(matchSparseArrayCollection(collection, [])).toEqual(new Set(['e']));
    expect(matchSparseArrayCollection(collection, [0x1])).toEqual(
      new Set(['e']),
    );
    expect(matchSparseArrayCollection(collection, [0x2])).toEqual(
      new Set(['e']),
    );
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

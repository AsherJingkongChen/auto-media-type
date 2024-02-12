import {
  KeyedSequenceCollection,
  matchKeyedSequences,
  readKeyedSequence,
  readSequence,
} from 'src/core';
import { describe, expect, it } from 'vitest';

describe('matchKeyedSequences', () => {
  it('It compares target with all parts of sequences', () => {
    const collection: KeyedSequenceCollection = [
      ['a', NaN, 0, 0x1, 0x1, 0x2],
      ['b', NaN, 0, 0x1, 0x1, 0x2, NaN, 3, 0xa, 0xb],
    ];
    const target = [];

    target.push(0x1);
    expect(matchKeyedSequences(target, collection)).toEqual(new Set());
    target.push(0x1);
    expect(matchKeyedSequences(target, collection)).toEqual(new Set());
    target.push(0x2);
    expect(matchKeyedSequences(target, collection)).toEqual(new Set(['a']));
    target.push(0xa);
    expect(matchKeyedSequences(target, collection)).toEqual(new Set(['a']));
    target.push(0xb);
    expect(matchKeyedSequences(target, collection)).toEqual(
      new Set(['a', 'b']),
    );
    target.push(0x0);
    expect(matchKeyedSequences(target, collection)).toEqual(
      new Set(['a', 'b']),
    );
  });

  it('It compares target with all sequences', () => {
    const collection: KeyedSequenceCollection = [
      ['Sam', NaN, 0, 0x1],
      ['Sam', NaN, 0, 0x3],
    ];
    expect(matchKeyedSequences([], collection)).toEqual(new Set());
    expect(matchKeyedSequences([0x1], collection)).toEqual(new Set(['Sam']));
    expect(matchKeyedSequences([0x3], collection)).toEqual(new Set(['Sam']));
  });
});

describe('readKeyedSequence', () => {
  it('It yields the index and element correctly', () => {
    expect([
      ...readKeyedSequence([
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

describe('readSequence', () => {
  it('It yields the index and element correctly', () => {
    expect([
      ...readSequence([
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

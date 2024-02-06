import {
  KeyedSerialCollection,
  matchKeyedSerials,
  readKeyedSerial,
  readSerial,
} from 'src/core';
import { describe, expect, it } from 'vitest';

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
  it('It yields the correct index and scalar', () => {
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
  it('It yields the correct index and scalar', () => {
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

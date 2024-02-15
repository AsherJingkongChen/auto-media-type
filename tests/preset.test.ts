import { readSparseArray } from 'src/core';
import {
  magicBytesOffsetEnd,
  magicMasks,
  magicMaskedBytesOffsetEnd,
  mediaTypeAndMagicBytes,
  mediaTypeAndMagicMaskedBytes,
} from 'src/preset';
import { describe, expect, it } from 'vitest';
import { validateSparseArray } from './utils';

describe('validateSparseArray', () => {
  it('mediaTypeAndMagicBytes is valid', () => {
    for (const [_, target] of mediaTypeAndMagicBytes) {
      expect(validateSparseArray(target)).toBe(0);
    }
  });

  it('mediaTypeAndMagicMaskedBytes is valid', () => {
    for (const [_, target] of mediaTypeAndMagicMaskedBytes) {
      expect(validateSparseArray(target)).toBe(0);
    }
  });

  it('magicMasks is valid', () => {
    expect(validateSparseArray(magicMasks)).toBe(0);
  });
});

describe('Magic bits', () => {
  it('The offsets of mediaTypeAndMagicMaskedBytes and magicMasks are equal', () => {
    const mediaTypeAndMagicMaskedBytesOffsets = new Array(
      (function* () {
        for (const [_, source] of mediaTypeAndMagicMaskedBytes) {
          for (const [offset] of readSparseArray(source)) {
            yield offset;
          }
        }
      })(),
    ).sort();
    const magicMasksOffsets = new Array(
      (function* () {
        for (const [offset] of readSparseArray(magicMasks)) {
          yield offset;
        }
      })(),
    ).sort();
    expect(mediaTypeAndMagicMaskedBytesOffsets).toEqual(magicMasksOffsets);
  });

  it('The value of magicMaskedBytesOffsetEnd is correct', () => {
    const magicMasksOffsetMax = Math.max(
      ...(function* () {
        for (const [offset] of readSparseArray(magicMasks)) {
          yield offset;
        }
      })(),
    );
    expect(magicMasksOffsetMax + 1).toBe(magicMaskedBytesOffsetEnd);
  });
});

describe('Magic bytes', () => {
  it('The value of magicBytesOffsetEnd is correct', () => {
    const mediaTypeAndMagicBytesOffsetMax = Math.max(
      ...(function* () {
        for (const [_, source] of mediaTypeAndMagicBytes) {
          for (const [offset] of readSparseArray(source)) {
            yield offset;
          }
        }
      })(),
    );
    expect(mediaTypeAndMagicBytesOffsetMax + 1).toBe(magicBytesOffsetEnd);
  });
});

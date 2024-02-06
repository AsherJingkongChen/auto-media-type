import { readKeyedSerial, readSerial } from 'src/core';
import {
  magicMaskBytes,
  magicBytesIndexEnd,
  magicBytesIndexStart,
  magicMaskBytesIndexEnd,
  magicMaskBytesIndexStart,
  mediaTypeAndMagicBytes,
  mediaTypeAndMagicMaskedBytes,
} from 'src/preset';
import { describe, expect, it } from 'vitest';

describe('magicMaskBytes', () => {
  it('The start and end indexs are correct', () => {
    function* readAllIndexs() {
      for (const [index] of readSerial(magicMaskBytes)) {
        yield index;
      }
    }
    const receivedIndexMax = Math.max(...readAllIndexs());
    const receivedIndexMin = Math.min(...readAllIndexs());
    expect(receivedIndexMax + 1).toBe(magicMaskBytesIndexEnd);
    expect(receivedIndexMin).toBe(magicMaskBytesIndexStart);
  });
});

describe('mediaTypeAndMagicBytes', () => {
  it('The start and end indexs are correct', () => {
    function* readAllIndexs() {
      for (const entry of mediaTypeAndMagicBytes) {
        for (const [index] of readKeyedSerial(entry)) {
          yield index;
        }
      }
    }
    const receivedIndexMax = Math.max(...readAllIndexs());
    const receivedIndexMin = Math.min(...readAllIndexs());
    expect(receivedIndexMax + 1).toBe(magicBytesIndexEnd);
    expect(receivedIndexMin).toBe(magicBytesIndexStart);
  });
});

describe('mediaTypeAndMagicMaskedBytes', () => {
  it('The start and end indexs are correct', () => {
    function* readAllIndexs() {
      for (const entry of mediaTypeAndMagicMaskedBytes) {
        for (const [index] of readKeyedSerial(entry)) {
          yield index;
        }
      }
    }
    const receivedIndexMax = Math.max(...readAllIndexs());
    const receivedIndexMin = Math.min(...readAllIndexs());
    expect(receivedIndexMax + 1).toBe(magicMaskBytesIndexEnd);
    expect(receivedIndexMin).toBe(magicMaskBytesIndexStart);
  });
});

it('magicBytesIndexEnd > magicMaskBytesIndexEnd', () => {
  expect(magicBytesIndexEnd).toBeGreaterThan(magicMaskBytesIndexEnd);
});

import { readKeyedSerial, readSerial } from 'src/core';
import {
  magicMaskBytes,
  magicBytesOffsetEnd,
  magicMaskBytesOffsetEnd,
  mediaTypeAndMagicBytes,
  mediaTypeAndMagicMaskedBytes,
} from 'src/preset';
import { describe, expect, it } from 'vitest';

describe('magicMaskBytes', () => {
  it('The end offset is correct', () => {
    function* readAllOffsets() {
      for (const [offset] of readSerial(magicMaskBytes)) {
        yield offset;
      }
    }
    const receivedOffsetMax = Math.max(...readAllOffsets());
    expect(receivedOffsetMax + 1).toBe(magicMaskBytesOffsetEnd);
  });
});

describe('mediaTypeAndMagicBytes', () => {
  it('The end offset is correct', () => {
    function* readAllOffsets() {
      for (const entry of mediaTypeAndMagicBytes) {
        for (const [offset] of readKeyedSerial(entry)) {
          yield offset;
        }
      }
    }
    const receivedOffsetMax = Math.max(...readAllOffsets());
    expect(receivedOffsetMax + 1).toBe(magicBytesOffsetEnd);
  });
});

describe('mediaTypeAndMagicMaskedBytes', () => {
  it('The end offset is correct', () => {
    function* readAllOffsets() {
      for (const entry of mediaTypeAndMagicMaskedBytes) {
        for (const [offset] of readKeyedSerial(entry)) {
          yield offset;
        }
      }
    }
    const receivedOffsetMax = Math.max(...readAllOffsets());
    expect(receivedOffsetMax + 1).toBe(magicMaskBytesOffsetEnd);
  });
});

it('magicBytesOffsetEnd > magicMaskBytesOffsetEnd', () => {
  expect(magicBytesOffsetEnd).toBeGreaterThan(magicMaskBytesOffsetEnd);
});

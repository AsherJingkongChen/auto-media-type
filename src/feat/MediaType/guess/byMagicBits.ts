import { matchSparseArrayCollection, readSparseArray } from '../../../core';
import {
  magicMasks,
  magicMaskedBytesOffsetEnd,
  mediaTypeAndMagicMaskedBytes,
} from '../../../preset';

/**
 * ## Introduction
 * Guess media types by the magic bits of data
 *
 * ## Parameters
 * - `data`: `Uint8Array`
 *   + A data as an unsigned 8-bit integer array
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function guessMediaTypesByMagicBits(
  data: Uint8Array,
): Promise<Set<string>> {
  // It should clone the given byte array
  const maskedBytes = data.slice(0, magicMaskedBytesOffsetEnd);

  for (const [offset, mask] of readSparseArray(magicMasks)) {
    maskedBytes[offset] &= mask;
  }
  return matchSparseArrayCollection(mediaTypeAndMagicMaskedBytes, maskedBytes);
}

export namespace guessMediaTypesByMagicBits {}

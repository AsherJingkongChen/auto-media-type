import { matchKeyedSparseArrayCollection, readSparseArray } from './core';
import {
  extensionToMediaTypesTable,
  magicMasks,
  magicMaskedBytesOffsetEnd,
  mediaTypeAndMagicBytes,
  mediaTypeAndMagicMaskedBytes,
} from './preset';

/**
 * ## Introduction
 * Guess media types by the file extension (case-insensitive)
 *
 * ## Parameters
 * - `name`: `string`
 *   + A file name
 *
 * ## Returns
 * - `Set<string>`
 *   + Possible media types
 */
export function guessMediaTypesByExtension(name: string): Set<string> {
  const extension = /\.([^\.]+)$/.exec(name)?.[1]?.toLowerCase();
  return new Set(
    extension ? extensionToMediaTypesTable[extension] ?? [] : undefined,
  );
}

/**
 * ## Introduction
 * Guess media types by the magic bytes for the given byte array
 *
 * ## Parameters
 * - `uint8Array`: `Uint8Array`
 *   + A byte array
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function guessMediaTypesByMagicBytes(
  uint8Array: Uint8Array,
): Promise<Set<string>> {
  return matchKeyedSparseArrayCollection(mediaTypeAndMagicBytes, uint8Array);
}

/**
 * ## Introduction
 * Guess media types by the magic masked bytes for the given byte array
 *
 * ## Parameters
 * - `uint8Array`: `Uint8Array`
 *   + A byte array
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function guessMediaTypesByMagicMaskedBytes(
  uint8Array: Uint8Array,
): Promise<Set<string>> {
  // It should clone the given byte array
  const maskedBytes = uint8Array.slice(0, magicMaskedBytesOffsetEnd);

  for (const [offset, mask] of readSparseArray(magicMasks)) {
    maskedBytes[offset] &= mask;
  }
  return matchKeyedSparseArrayCollection(
    mediaTypeAndMagicMaskedBytes,
    maskedBytes,
  );
}

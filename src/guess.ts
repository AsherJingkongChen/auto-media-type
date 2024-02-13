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
 * - `pathname`: `string`
 *   + A file path or name
 *
 * ## Returns
 * - `Set<string>`
 *   + A set of possible media types
 */
export function guessMediaTypesByExtension(pathname: string): Set<string> {
  const extension = /\.([^\.]+)$/.exec(pathname)?.[1]?.toLowerCase();
  if (extension) {
    return new Set(extensionToMediaTypesTable[extension] ?? []);
  }
  return new Set();
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
 *   + A set of possible media types
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
 *   + A set of possible media types
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

import { matchSparseArrayCollection } from '../../../core';
import { mediaTypeAndMagicBytes } from '../../../preset';

/**
 * ## Introduction
 * Guess media types by the magic bytes of data
 *
 * ## Parameters
 * - `data`: `Uint8Array`
 *   + A data as an unsigned 8-bit integer array
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function guessMediaTypesByMagicBytes(
  data: Uint8Array,
): Promise<Set<string>> {
  return matchSparseArrayCollection(mediaTypeAndMagicBytes, data);
}

export namespace guessMediaTypesByMagicBytes {}

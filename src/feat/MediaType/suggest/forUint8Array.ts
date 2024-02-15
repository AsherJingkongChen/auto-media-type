import { guessMediaTypes } from '../guess';

/**
 * ## Introduction
 * Suggest media types for data as an unsigned 8-bit integer array
 *
 * ## Parameters
 * - `uint8Array`: `Uint8Array`
 *   + The query data as an unsigned 8-bit integer array
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function suggestMediaTypesForUint8Array(
  uint8Array: Uint8Array,
): Promise<Set<string>> {
  return new Set([
    ...(await guessMediaTypes.byMagicBytes(uint8Array)),
    ...(await guessMediaTypes.byMagicBits(uint8Array)),
  ]);
}

export namespace suggestMediaTypesForUint8Array {}

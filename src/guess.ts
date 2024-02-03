import { matchKeyedSerials } from './core';
import {
  extensionToMediaTypesTable,
  magicBytesIndexMax,
  magicBytesIndexMin,
  mediaTypeAndMagicBytesCollection,
} from './preset';
import { getBytesOfBlob, getBytesOfUint8Array } from './utils';

/**
 * ## Introduction
 * Guess media types by the file extension (case-insensitive)
 *
 * ## Parameters
 * - `pathname` - `string`
 *   + A file path or name
 *
 * ## Results
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
 * Guess media types by the magic bytes for the given blob
 *
 * ## Parameters
 * - `blob` - `Blob`
 *   + The query data as a binary large object
 *
 * ## Results
 * - `Promise<Set<string>>`
 *   + A set of possible media types
 */
export async function guessMediaTypesByMagicBytesForBlob(
  blob: Blob,
): Promise<Set<string>> {
  const target = await getBytesOfBlob(
    blob,
    magicBytesIndexMin,
    magicBytesIndexMax,
  );
  return matchKeyedSerials(target, mediaTypeAndMagicBytesCollection);
}

/**
 * ## Introduction
 * Guess media types by the magic bytes for the given uint8 array
 *
 * ## Parameters
 * - `uint8Array` - `Uint8Array`
 *   + The query data as a typed array of 8-bit unsigned integers
 *
 * ## Results
 * - `Promise<Set<string>>`
 *   + A set of possible media types
 */
export async function guessMediaTypesByMagicBytesForUint8Array(
  uint8Array: Uint8Array,
): Promise<Set<string>> {
  const target = await getBytesOfUint8Array(
    uint8Array,
    magicBytesIndexMin,
    magicBytesIndexMax,
  );
  return matchKeyedSerials(target, mediaTypeAndMagicBytesCollection);
}

import { matchKeyedSerials, readSerial } from './core';
import {
  extensionToMediaTypesTable,
  magicBytesOffsetEnd,
  magicMaskBytes,
  magicMaskBytesOffsetEnd,
  mediaTypeAndMagicBytes,
  mediaTypeAndMagicMaskedBytes,
} from './preset';

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
 * Guess media types by the magic bytes for the given data
 */
export namespace guessMediaTypesByMagicBytes {
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
  export async function forBlob(blob: Blob): Promise<Set<string>> {
    return matchKeyedSerials(
      new Uint8Array(await blob.slice(0, magicBytesOffsetEnd).arrayBuffer()),
      mediaTypeAndMagicBytes,
    );
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
  export async function forUint8Array(
    uint8Array: Uint8Array,
  ): Promise<Set<string>> {
    return matchKeyedSerials(
      uint8Array.slice(0, magicBytesOffsetEnd),
      mediaTypeAndMagicBytes,
    );
  }
}

/**
 * ## Introduction
 * Guess media types by the magic masked bytes for the given data
 */
export namespace guessMediaTypesByMagicMaskedBytes {
  /**
   * ## Introduction
   * Guess media types by the magic masked bytes for the given blob
   *
   * ## Parameters
   * - `blob` - `Blob`
   *   + The query data as a binary large object
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function forBlob(blob: Blob): Promise<Set<string>> {
    const maskedBytes = new Uint8Array(
      await blob.slice(0, magicMaskBytesOffsetEnd).arrayBuffer(),
    );
    for (const [offset, mask] of readSerial(magicMaskBytes)) {
      maskedBytes[offset] &= mask;
    }
    return matchKeyedSerials(maskedBytes, mediaTypeAndMagicMaskedBytes);
  }

  /**
   * ## Introduction
   * Guess media types by the magic masked bytes for the given uint8 array
   *
   * ## Parameters
   * - `uint8Array` - `Uint8Array`
   *   + The query data as a typed array of 8-bit unsigned integers
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function forUint8Array(
    uint8Array: Uint8Array,
  ): Promise<Set<string>> {
    const maskedBytes = uint8Array.slice(0, magicMaskBytesOffsetEnd);
    for (const [offset, mask] of readSerial(magicMaskBytes)) {
      maskedBytes[offset] &= mask;
    }
    return matchKeyedSerials(maskedBytes, mediaTypeAndMagicMaskedBytes);
  }
}

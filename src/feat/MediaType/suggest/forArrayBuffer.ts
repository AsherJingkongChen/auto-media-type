import { suggestMediaTypesForUint8Array } from './forUint8Array';

/**
 * ## Introduction
 * Suggest media types for data as an array buffer
 *
 * ## Parameters
 * - `buffer`: `ArrayBufferLike`
 *   + The query data as an array buffer like object
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function suggestMediaTypesForArrayBuffer(
  buffer: ArrayBufferLike,
): Promise<Set<string>> {
  return suggestMediaTypesForUint8Array(new Uint8Array(buffer));
}

export namespace suggestMediaTypesForArrayBuffer {}

import { magicNumbersOffsetEnd } from '../../../preset';
import { suggestMediaTypesForUint8Array } from './forUint8Array';

/**
 * ## Introduction
 * Suggest media types for data as a blob
 *
 * ## Parameters
 * - `blob`: `Blob`
 *   + The query data as a binary large object
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function suggestMediaTypesForBlob(
  blob: Blob,
): Promise<Set<string>> {
  // [TODO] Need a working check algorithm
  // return checkMediaTypes(file, await guessMediaTypesByMagicBytes(file));
  return suggestMediaTypesForUint8Array(
    new Uint8Array(await blob.slice(0, magicNumbersOffsetEnd).arrayBuffer()),
  );
}

export namespace suggestMediaTypesForBlob {}

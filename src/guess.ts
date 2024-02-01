import {
  extensionToMediaTypesTable,
  magicNumberIndexRanges,
  mediaTypeAndMagicNumbersList,
} from './preset';
import { getBytesOfBlob, getBytesOfUint8Array } from './utils';

/**
 * ## Introduction
 * Guess media types by the file extension (case-insensitive)
 *
 * ## Parameters
 * - `pathname` - `string`
 *   + The file path or name
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
 * Guess media types by the magic numbers for the given blob
 *
 * ## Parameters
 * - `blob` - `Blob`
 *   + The query data as a binary large object
 *
 * ## Results
 * - `Promise<Set<string>>`
 *   + A set of possible media types
 */
export async function guessMediaTypesByMagicNumbersForBlob(
  blob: Blob,
): Promise<Set<string>> {
  return _guessMediaTypesByMagicNumbers(blob, getBytesOfBlob);
}

/**
 * ## Introduction
 * Guess media types by the magic numbers for the given uint8 array
 *
 * ## Parameters
 * - `uint8Array` - `Uint8Array`
 *   + The query data as a typed array of 8-bit unsigned integers
 *
 * ## Results
 * - `Promise<Set<string>>`
 *   + A set of possible media types
 */
export async function guessMediaTypesByMagicNumbersForUint8Array(
  uint8Array: Uint8Array,
): Promise<Set<string>> {
  return _guessMediaTypesByMagicNumbers(uint8Array, getBytesOfUint8Array);
}

/**
 * ## Introduction
 * The implementation of
 * - `guessMediaTypesByMagicNumbersForBlob()`
 * - `guessMediaTypesByMagicNumbersForUint8Array()`
 * 
 * ## Parameters
 * - `data` - `Blob | Uint8Array`
 *   + The query data
 * - `getBytes` - `typeof getBytesOfBlob | typeof getBytesOfUint8Array`
 *   + The function to get bytes from the data
 * 
 * ## Results
 * - `Promise<Set<string>>`
 *   + A set of possible media types
 */
async function _guessMediaTypesByMagicNumbers(
  data: Blob | Uint8Array,
  getBytes: typeof getBytesOfBlob | typeof getBytesOfUint8Array,
): Promise<Set<string>> {
  // 1. Get the byte table for the data
  const byteTable = new Map<number, number>();
  for (let i = 0; i < magicNumberIndexRanges.length; i++) {
    // Get the slice within the range
    const [beginIndex, endIndex] = magicNumberIndexRanges[i]!;
    const bytes = await getBytes(
      data as Blob & Uint8Array,
      beginIndex,
      endIndex,
    );

    // Copy bytes and write to the table
    let index = beginIndex;
    for (let i = 0; i < bytes.length; i++) {
      byteTable.set(index++, bytes[i]!);
    }
  }

  // 2. Match the magic numbers with the bytes
  const matches = new Set<string>();
  for (let i = 0; i < mediaTypeAndMagicNumbersList.length; i++) {
    const listItem = mediaTypeAndMagicNumbersList[i]!;
    const mediaType = listItem[0];

    // Early exit if the media type is already matched
    if (matches.has(mediaType)) {
      continue;
    }

    // Walk through and match the magic offsets and numbers
    const magics = listItem.slice(1) as (number | undefined)[];
    let index = 0;
    let matched = true;
    for (let i = 0; i < magics.length; i++) {
      let magic = magics[i];
      // Reset the index and magic number if undefined
      if (magic === undefined) {
        index = magics[++i]!;
        magic = magics[++i]!;
      }
      const byte = byteTable.get(index++);
      if (byte !== magic) {
        matched = false;
        break;
      }
    }
    if (matched) {
      matches.add(mediaType);
    }
  }

  // 3. Return the matches
  return matches;
}

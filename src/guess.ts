import {
  extensionToMediaTypes,
  magicNumberIndexRanges,
  mediaTypeAndMagicNumbersList,
} from './preset';

/**
 * ### Introduction
 * Guess media types by the file extension
 *
 * ### Parameters
 * - `pathname` - `string`
 *   + The file path or name
 *
 * ### Results
 * - `Set<string>`
 *   + A set of possible media types
 */
export function guessMediaTypesByExtension(pathname: string): Set<string> {
  const extension = /\.([^\.]+)$/.exec(pathname)?.[1]?.toLowerCase();
  if (extension) {
    return new Set(extensionToMediaTypes[extension] ?? []);
  }
  return new Set();
}

/**
 * ### Introduction
 * Guess media types by the magic numbers
 *
 * ### Parameters
 * - `blob` - `Blob`
 *   + The query byte data
 *
 * ### Results
 * - `Promise<Set<string>>`
 *   + A set of possible media types
 */
export async function guessMediaTypesByMagicNumbers(
  blob: Blob,
): Promise<Set<string>> {
  // 1. Get the target byte lookup table
  const indexToTargetByte = new Map<number, number>();
  for (let i = 0; i < magicNumberIndexRanges.length; i++) {
    const [beginIndex, endIndex] = magicNumberIndexRanges[i]!;
    const targetBytes = new Uint8Array(
      await blob.slice(beginIndex, endIndex).arrayBuffer(),
    );

    // Copy bytes and write to the table
    let index = beginIndex;
    for (let i = 0; i < targetBytes.length; i++) {
      indexToTargetByte.set(index++, targetBytes[i]!);
    }
  }

  // 2. Match the magic numbers with the target bytes
  const matches = new Set<string>();
  for (let i = 0; i < mediaTypeAndMagicNumbersList.length; i++) {
    const listItem = mediaTypeAndMagicNumbersList[i]!;
    const mediaType = listItem[0];

    // Early exit if the media type is already matched
    if (matches.has(mediaType)) {
      continue;
    }

    const magics = listItem.slice(1) as (number | undefined)[];

    // Walk through the magic offsets and numbers
    // Record the matched magic numbers
    let index = 0;
    let matched = true;
    for (let i = 0; i < magics.length; i++) {
      let magic = magics[i];
      // Reset the index and magic number if undefined
      if (magic === undefined) {
        index = magics[++i]!;
        magic = magics[++i]!;
      }
      const targetByte = indexToTargetByte.get(index++);
      if (targetByte !== magic) {
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

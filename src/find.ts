import {
  extensionToMediaTypes,
  indexRanges,
  mediaTypeAndMagicNumbersList,
} from './preset';

/**
 * ### Introduction
 * Find media types by the file extension
 *
 * ### Parameters
 * - `pathname` - `string`
 *   + The file path or name
 *
 * ### Results
 * - `string[]`
 *   + An array of possible media types
 */
export function findMediaTypesByExtension(pathname: string): string[] {
  const extension = /\.([^\.]+)$/.exec(pathname)?.[1]?.toLowerCase();
  return extension ? extensionToMediaTypes[extension] ?? [] : [];
}

/**
 * ### Introduction
 * Find media types by matching magic numbers in a blob
 *
 * ### Parameters
 * - `blob` - `Blob`
 *   + The blob to search for magic numbers
 *
 * ### Results
 * - `Promise<string[]>`
 *   + An array of possible media types
 */
export async function findMediaTypesByMagicNumbers(
  blob: Blob,
): Promise<string[]> {
  // 1. Get the target byte lookup table
  const indexToTargetByte = new Map<number, number>();
  for (let i = 0; i < indexRanges.length; i++) {
    const [beginIndex, endIndex] = indexRanges[i]!;
    const targetBytes = new Uint8Array(
      await blob.slice(beginIndex, endIndex).arrayBuffer(),
    );

    // Copy bytes and write to the table
    let index = beginIndex;
    for (let i = 0; i < targetBytes.length; i++) {
      const targetByte = targetBytes[i]!;
      indexToTargetByte.set(index++, targetByte);
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
    let matched = true;
    let index = 0;
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
  return Array.from(matches.values());
}

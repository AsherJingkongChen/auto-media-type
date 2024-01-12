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
 * - `pathname` - `string` - The path of the file
 *
 * ### Results
 * - `string[]` - An array of possible media types
 */
export function findMediaTypesByExtension(pathname: string): string[] {
  const extension = /\.([^\.]+)$/.exec(pathname)?.[1]?.toLowerCase();
  if (extension) {
    return extensionToMediaTypes[extension] ?? [];
  }
  return [];
}

/**
 * ### Introduction
 * Find media types by matching magic numbers in a blob
 *
 * ### Parameters
 * - `blob` - `Blob` - The blob to search for magic numbers
 *
 * ### Results
 * - `Promise<string[]>` - A promise that resolves to an array of matched media types
 *
 * ### Note
 * - Index ranges should not overlap inclusively (assert-on-debug)
 * - The list should be sorted for maintainability
 */
export async function findMediaTypesByMagicNumbers(
  blob: Blob,
): Promise<string[]> {
  // 1. Get the target byte lookup table
  const indexToTargetByte = new Map<number, number>();
  for (const [beginIndex, endIndex] of indexRanges) {
    // [TODO] Blob.slice(beginIndex, endIndex) is buggy in Bun v1.0.22
    const targetBytes = new Uint8Array(
      await blob.slice(0).arrayBuffer(),
    );

    // Build the table
    for (let index = beginIndex; index < endIndex; index++) {
      const targetByte = targetBytes.at(index);
      if (targetByte !== undefined) {
        indexToTargetByte.set(index, targetByte);
      }
    }
  }

  // const decoder = new TextDecoder();
  // console.debug(
  //   new Map(
  //     [...indexToTargetByte.entries()].map(([index, byte]) => [
  //       index,
  //       decoder.decode(new Uint8Array([byte])),
  //     ]),
  //   ),
  // );

  // 2. Match the magic numbers with the target bytes
  const matches = new Set<string>();
  for (let i = 0; i < mediaTypeAndMagicNumbersList.length; i++) {
    const item = mediaTypeAndMagicNumbersList[i]!;
    const mediaType = item[0];

    // Early exit if the media type is already matched
    if (matches.has(mediaType)) {
      continue;
    }

    const magicOffset = item[1];
    const magicNumbers = item.slice(2) as number[];

    console.assert(
      !Number.isNaN(magicOffset),
      'Initial magic offset cannot be NaN',
    );

    // Go through the magic numbers
    // Check if equals to the target byte
    let index = magicOffset;
    let matched = true;
    for (let i = 0; i < magicNumbers.length; i++) {
      let magicNumber = magicNumbers[i]!;
      // Reset the index and magic number if NaN
      if (Number.isNaN(magicNumber)) {
        index = magicNumbers[++i]!;
        magicNumber = magicNumbers[++i]!;
      }

      const targetByte = indexToTargetByte.get(index++);
      if (targetByte !== magicNumber) {
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

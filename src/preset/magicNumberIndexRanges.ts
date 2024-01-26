/**
 * ## Introduction
 * Pairs of index ranges to cover all magic numbers
 *
 * ## Layout
 * `[number, number | undefined][]`
 * - `[number, number | undefined]`
 *   + `[begin, end)` is a right-open index range.
 *   + If `end` is `undefined`, it represents the end of the blob.
 *
 * ## Note
 * - The ranges should be sorted and not overlapping
 *   + in ascending order
 *   + assertion: `[i][0] < [i][1] <= [i+1][0]`
 * - The ranges should be compatible with `Blob.slice(begin, end)`
 *   + as the reason of the type of `end` is `number | undefined`
 */
export const magicNumberIndexRanges: [number, number | undefined][] = [
  [-128, -125],
  [-5, undefined],
  [0, 12],
  [20, 23],
];

// /**
//  * ## Introduction
//  * Update a media type
//  *
//  * ## Parameters
//  * - `context` - `object` - The context object
//  *   - `mediaType` - `string` - The media type to set
//  *   - `fileExtensions` - `string[]` - The file extensions to set
//  *   - `magic` - `object` - The magic numbers to add
//  *     - `offset` - `number` - The offset of the magic numbers
//  *     - `numbers` - `number[]` - The magic numbers
//  *
//  * ## Results
//  * - `boolean` - `true` if the update modifies entries that already exist
//  *
//  * ## Throws
//  * - `Error` - If the magic numbers are empty
//  */
// export function update(context: {
//   fileExtensions: string[];
//   mediaType: string;
//   magic: {
//     offset: number;
//     numbers: number[];
//   }[];
// }): boolean {
//   const { fileExtensions, mediaType, magic } = context;
//   let modified = false;

//   // Check `magic`
//   if (!magic.length || !magic[0]) {
//     throw new Error('Magic cannot be empty');
//   }

//   // 1. Update the lookup table with the file extensions
//   for (const extension of fileExtensions) {
//     const mediaTypes = extensionToMediaTypes[extension];
//     if (mediaTypes) {
//       mediaTypes.push(mediaType);
//       modified = true;
//     } else {
//       extensionToMediaTypes[extension] = [mediaType];
//     }
//   }

//   // 2. Update the media type to the magic numbers list
//   const magicTypeAndMagicNumbers: [string, number, ...number[]] = [
//     mediaType,
//     magic[0].offset,
//     ...magic[0].numbers,
//   ];
//   for (let i = 1; i < magic.length; i++) {
//     const { numbers, offset } = magic[i]!;
//     magicTypeAndMagicNumbers.push(NaN, offset, ...numbers);
//   }
//   mediaTypeAndMagicNumbersList.push(magicTypeAndMagicNumbers);

//   // [TODO] indexRanges should be updated
//   return modified;
// }

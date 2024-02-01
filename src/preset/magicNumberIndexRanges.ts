/**
 * ## Introduction
 * Pairs of index ranges to cover all magic numbers
 *
 * ## Layout
 * `[number, number][]`
 * - `[number, number]`
 *   + `[begin, end)` is a right-open index range.
 *
 * ## Note
 * - The ranges should be sorted and not overlapping
 *   + in ascending order
 *   + Assertion: `[i][0] < [i][1] <= [i+1][0]`
 * - The ranges should be compatible with `Blob.slice(begin, end)`
 */
export const magicNumberIndexRanges: [number, number][] = [
  [0, 12],
  [20, 23],
];

/**
 * ## Introduction
 * The maximum index of magic numbers
 *
 * ## Layout
 * `number`
 */
export const magicNumberIndexMax =
  magicNumberIndexRanges[magicNumberIndexRanges.length - 1]![1]!;

/**
 * ## Introduction
 * The minimum index of magic numbers
 *
 * ## Layout
 * `number`
 */
export const magicNumberIndexMin = magicNumberIndexRanges[0]![0]!;

/**
 * ## Introduction
 * The index range of magic numbers
 *
 * ## Layout
 * `number`
 * - `magicNumberIndexMax - magicNumberIndexMin`
 */
export const magicNumberIndexRange = magicNumberIndexMax - magicNumberIndexMin;

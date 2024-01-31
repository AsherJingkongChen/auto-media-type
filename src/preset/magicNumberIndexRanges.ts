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

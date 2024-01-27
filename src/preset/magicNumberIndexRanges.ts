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
 *   + Assertion: `[i][0] < [i][1] <= [i+1][0]`
 * - The ranges should be compatible with `Blob.slice(begin, end)`
 *   + as the reason of the type of `end` is `number | undefined`
 */
export const magicNumberIndexRanges: [number, number | undefined][] = [
  [-128, -125],
  [-5, undefined],
  [0, 12],
  [20, 23],
];

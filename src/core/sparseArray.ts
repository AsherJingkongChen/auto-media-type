/**
 * ## Introduction
 * An array with potentially many missing elements
 * represented in a compressed format.
 *
 * ## Layout
 * `[number, number, ...number[]]`
 * - An array splitted into one or more sections
 * - For each section:
 *   + The first number is the start index
 *   + The second number is the length
 *   + The rest numbers are the elements
 */
export type SparseArray = [number, number, ...number[]];

/**
 * ## Introduction
 * A collection of sparse arrays
 *
 * ## Layout
 * `[string, SparseArray][]`
 * - An array of pairs
 * - For each pair:
 *   + The first element is a key
 *   + The second element is a sparse array
 */
export type SparseArrayCollection = [string, SparseArray][];

/**
 * ## Introduction
 * Match a collection of sparse arrays with an array pattern,
 * and collect keys of the matches.
 *
 * ## Parameters
 * - `collection`: `SparseArrayCollection`
 *   + A collection of sparse arrays
 * - `pattern`: `Record<number, number>`
 *   + An array pattern
 *     + The key is an index
 *     + The value is an element
 *
 * ## Returns
 * - `Set<string>`
 *   + Keys of the matches
 *
 * ## Note
 * - A key can have multiple sparse arrays
 */
export function matchSparseArrayCollection(
  collection: SparseArrayCollection,
  pattern: Record<number, number>,
): Set<string> {
  const matches = new Set<string>();
  for (let i = 0, end = collection.length; i < end; i++) {
    const [key, target] = collection[i]!;

    // Skip if the key is already recorded
    if (matches.has(key)) {
      continue;
    }

    // Search for the pattern
    let matched = true;
    for (const [index, element] of readSparseArray(target)) {
      if (pattern[index] !== element) {
        matched = false;
        break;
      }
    }

    // Record the key if matched
    if (matched) {
      matches.add(key);
    }
  }
  return matches;
}

/**
 * ## Introduction
 * Read a sparse array and yield its index and element
 *
 * ## Parameters
 * - `source`: `SparseArray`
 *   + A sparse array
 *
 * ## Yields
 * - `[number, number]`
 *   + The first number is an index
 *   + The second number is an element
 */
export function* readSparseArray(
  source: SparseArray,
): Generator<[number, number]> {
  for (let i = 0, end = source.length; i < end; ) {
    let index = source[i] as number;
    let length = source[++i] as number;
    for (const end = i + ++length; ++i < end; ) {
      const element = source[i] as number;
      yield [index++, element];
    }
  }
}

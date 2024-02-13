/**
 * ## Introduction
 * A collection of keyed sparse arrays
 *
 * ## Layout
 * `KeyedSparseArray[]`
 * - An array of keyed sparse arrays
 *
 * ## Note
 * - A key can appear multiple times
 */
export type KeyedSparseArrayCollection = KeyedSparseArray[];

/**
 * ## Introduction
 * A sparse array with a key
 *
 * ## Layout
 * `[string, ...SparseArray]`
 * - `string`
 *   + A key
 * - `...SparseArray`
 *   + A sparse array
 */
export type KeyedSparseArray = [string, ...SparseArray];

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
 * Match the keyed sparse array collection with an array pattern,
 * and collect the matched keys.
 *
 * ## Parameters
 * - `collection`: `KeyedSparseArrayCollection`
 *   + A collection of keyed sparse arrays
 * - `pattern`: `Record<number, number>`
 *   + An array pattern
 *     + The key is an index
 *     + The value is an element
 *
 * ## Returns
 * - `Set<string>`
 *   + Keys of the matches
 */
export function matchKeyedSparseArrayCollection(
  collection: KeyedSparseArrayCollection,
  pattern: Record<number, number>,
): Set<string> {
  const matches = new Set<string>();
  for (let i = 0; i < collection.length; i++) {
    const entry = collection[i]!;
    const key = entry[0];

    // Skip if the key is already recorded
    if (matches.has(key)) {
      continue;
    }

    // Search for the pattern
    let matched = true;
    for (const [index, element] of readKeyedSparseArray(entry)) {
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
 * Read a keyed sparse array and yield its index and element
 *
 * ## Parameters
 * - `keyedSparseArray`: `KeyedSparseArray`
 *   + A keyed sparse array
 *
 * ## Yields
 * - `[number, number]`
 *   + The first number is an index
 *   + The second number is an element
 */
export function* readKeyedSparseArray(
  keyedSparseArray: KeyedSparseArray,
): Generator<[number, number]> {
  yield* _readSparseArray(keyedSparseArray, 1);
}

/**
 * ## Introduction
 * Read a sparse array and yield its index and element
 *
 * ## Parameters
 * - `sparseArray`: `SparseArray`
 *   + A sparse array
 *
 * ## Yields
 * - `[number, number]`
 *   + The first number is an index
 *   + The second number is an element
 */
export function* readSparseArray(
  sequence: SparseArray,
): Generator<[number, number]> {
  yield* _readSparseArray(sequence, 0);
}

/**
 * ## Introduction
 * The implementation of these functions:
 * - `readKeyedSparseArray`
 * - `readSparseArray`
 *
 * ## Parameters
 * - `target`: `KeyedSparseArray | SparseArray`
 *   + A keyed sparse array or a sparse array
 * - `offset`: `number`
 *   + The offset of the sparse array
 *
 * ## Yields
 * - `[number, number]`
 *   + The first number is an index
 *   + The second number is an element
 */
function* _readSparseArray(
  target: KeyedSparseArray | SparseArray,
  offset: number,
): Generator<[number, number]> {
  for (const end = target.length; offset < end; ) {
    let index = target[offset]! as number;
    let length = target[++offset]! as number;
    for (const end = offset + ++length; ++offset < end; ) {
      const element = target[offset]! as number;
      yield [index++, element];
    }
  }
  // [index, length, elem_1, elem_2, elem_3, index, length]
  // [     ,       , offset,      o,      o,   end,       ]
}

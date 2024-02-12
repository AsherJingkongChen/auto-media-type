/**
 * ## Introduction
 * A collection of keyed sequences
 *
 * ## Layout
 * `KeyedSequence[]`
 * - An array of keyed sequences
 *
 * ## Note
 * - A key can appear multiple times
 */
export type KeyedSequenceCollection = KeyedSequence[];

/**
 * ## Introduction
 * A sequence with a key
 *
 * ## Layout
 * `[string, ...Sequence]`
 * - `string`
 *   + A key
 * - `...Sequence`
 *   + A sequence
 */
export type KeyedSequence = [string, ...Sequence];

/**
 * ## Introduction
 * A series of numbers
 *
 * ## Layout
 * `[number, number, ...number[]]`
 * - The first number is the marker with value `NaN`
 * - The second number is the offset
 * - The rest numbers are the sequence
 *   - The number with value `NaN` is the marker of the next part
 */
export type Sequence = [number, number, ...number[]];

/**
 * ## Introduction
 * Compare the target with the sequences and collect matched keys
 *
 * ## Parameters
 * - `target`: `Record<number, number>`
 *   + A sequence mapping
 *     + The key is an index
 *     + The value is a sequence element
 * - `collection`: `KeyedSequenceCollection`
 *   + A collection of keyed sequences
 *
 * ## Results
 * - `Set<string>`
 *   + Matched sequence keys
 */
export function matchKeyedSequences(
  target: Record<number, number>,
  collection: KeyedSequenceCollection,
): Set<string> {
  // Collect the matched sequence keys
  const matches = new Set<string>();
  for (let i = 0; i < collection.length; i++) {
    const entry = collection[i]!;
    const key = entry[0];

    // Skip if the key is already recorded
    if (matches.has(key)) {
      continue;
    }

    // Compare target with all sequences
    let matched = true;
    for (const [index, element] of readKeyedSequence(entry)) {
      if (target[index] !== element) {
        matched = false;
        break;
      }
    }

    // Record the matched key
    if (matched) {
      matches.add(key);
    }
  }
  return matches;
}

/**
 * ## Introduction
 * Read a keyed sequence and yield its index and element
 *
 * ## Parameters
 * - `keyedSequence`: `KeyedSequence`
 *   + A keyed sequence
 *
 * ## Yields
 * - `[number, number]`
 *   + The first number is an index
 *   + The second number is an element
 */
export function* readKeyedSequence(
  keyedSequence: KeyedSequence,
): Generator<[number, number]> {
  yield* _readSequence(keyedSequence, 1);
}

/**
 * ## Introduction
 * Read a sequence and yield its index and element
 *
 * ## Parameters
 * - `sequence`: `Sequence`
 *   + A sequence
 *
 * ## Yields
 * - `[number, number]`
 *   + A tuple of index and element
 */
export function* readSequence(sequence: Sequence): Generator<[number, number]> {
  yield* _readSequence(sequence, 0);
}

/**
 * ## Introduction
 * The implementation of these functions
 * - `readKeyedSequence`
 * - `readSequence`
 *
 * ## Parameters
 * - `s`: `(string | number)[]`
 *   + A sequence or keyed sequence
 * - `i`: `number`
 *   + The index of the initial sequence
 *
 * ## Yields
 * - `[number, number]`
 *   + A tuple of index and element
 */
function* _readSequence(
  s: KeyedSequence | Sequence,
  i: number,
): Generator<[number, number]> {
  for (let index = 0; i < s.length; i++) {
    let element = s[i]!;
    // Move to the next part if NaN
    if (Number.isNaN(element)) {
      index = s[++i]! as number;
      element = s[++i]!;
    }
    yield [index++, element] as [number, number];
  }
}

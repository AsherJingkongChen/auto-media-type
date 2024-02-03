/**
 * ## Introduction
 * A collection of keyed serials
 *
 * ## Layout
 * `KeyedSerial[]`
 * - An array of keyed serials
 *
 * ## Note
 * - A key can appear multiple times
 */
export type KeyedSerialCollection = KeyedSerial[];

/**
 * ## Introduction
 * A serial with a key
 *
 * ## Layout
 * `[string, ...Serial]`
 * - `string`
 *   + A key
 * - `...Serial`
 *   + A serial
 */
export type KeyedSerial = [string, ...Serial];

/**
 * ## Introduction
 * A series of numbers
 *
 * ## Layout
 * `[number, number, ...number[]]`
 * - The first number is the marker with value `NaN`
 * - The second number is the offset
 * - The rest numbers are the serial
 *   - The number with value `NaN` is the marker of the next part
 */
export type Serial = [number, number, ...number[]];

/**
 * ## Introduction
 * Compare the target with the serials and collect matched keys
 *
 * ## Parameters
 * - `target` - `Record<number, number>`
 *   + A serial mapping
 *     + The key is an index
 *     + The value is a serial scalar
 * - `collection` - `KeyedSerialCollection`
 *   + A collection of keyed serials
 *
 * ## Results
 * - `Set<string>`
 *   + Matched serial keys
 */
export function matchKeyedSerials(
  target: Record<number, number>,
  collection: KeyedSerialCollection,
): Set<string> {
  // Collect the matched serial keys
  const matches = new Set<string>();
  for (let i = 0; i < collection.length; i++) {
    const entry = collection[i]!;
    const key = entry[0];

    // Skip if the key is already recorded
    if (matches.has(key)) {
      continue;
    }

    // Compare target with all serials
    const serial = entry.slice(1) as number[];
    let matched = true;
    for (let i = 0, index = 0; i < serial.length; i++) {
      let scalar = serial[i]!;
      // Move to the next part if NaN
      if (Number.isNaN(scalar)) {
        index = serial[++i]!;
        scalar = serial[++i]!;
      }
      // Compare the scalar
      if (target[index++] !== scalar) {
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

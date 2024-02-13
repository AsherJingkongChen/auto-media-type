import { KeyedSparseArray, SparseArray } from 'src/core';

/**
 * ## Introduction
 * Validate a sparse array
 *
 * ## Parameters
 * - `target`: `KeyedSparseArray | SparseArray`
 *   + A keyed sparse array or a sparse array
 *
 * ## Returns
 * - `number`
 *   + `0` if the sparse array is valid;
 *     otherwise, a negative number is returned
 */
export function validateSparseArray(
  target: KeyedSparseArray | SparseArray,
): number {
  let offset: number | undefined;
  switch (typeof target[0]) {
    case 'string':
      offset = 1;
      break;
    case 'number':
      offset = 0;
      break;
    default:
      return -1;
  }
  for (const end = target.length; offset < end; ) {
    let index = target[offset];
    let length = target[++offset];
    if (typeof index !== 'number' || typeof length !== 'number') {
      return -2;
    }
    if (length < 0) {
      return -3;
    }
    for (const end = offset + ++length; ++offset < end; ) {
      const element = target[offset];
      if (typeof element !== 'number') {
        return -4;
      }
      index++;
    }
  }
  return 0;
}

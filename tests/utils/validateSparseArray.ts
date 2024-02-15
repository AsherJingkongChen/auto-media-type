import { SparseArray } from 'src/core';

/**
 * ## Introduction
 * Validate a sparse array
 *
 * ## Parameters
 * - `target`: `SparseArray`
 *   + A sparse array
 *
 * ## Returns
 * - `number`
 *   + `0` if the sparse array is valid;
 *     otherwise, a negative number is returned
 */
export function validateSparseArray(target: SparseArray): number {
  for (let i = 0, end = target.length; i < end; ) {
    let index = target[i];
    let length = target[++i];
    if (typeof index !== 'number' || typeof length !== 'number') {
      return -2;
    }
    if (length < 0) {
      return -3;
    }
    for (const end = i + ++length; ++i < end; ) {
      const element = target[i];
      if (typeof element !== 'number') {
        return -4;
      }
      index++;
    }
  }
  return 0;
}

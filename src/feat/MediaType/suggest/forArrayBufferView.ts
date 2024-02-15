import { suggestMediaTypesForUint8Array } from './forUint8Array';

/**
 * ## Introduction
 * Suggest media types for data as an array buffer view
 *
 * ## Parameters
 * - `view`: `ArrayBufferView`
 *   + The query data as an array buffer view
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 *
 * ## Note
 * - Typed arrays like `Uint8Array` and `DataView` are `ArrayBufferView`.
 */
export async function suggestMediaTypesForArrayBufferView(
  view: ArrayBufferView,
): Promise<Set<string>> {
  return suggestMediaTypesForUint8Array(
    view instanceof Uint8Array ? view : new Uint8Array(view.buffer),
  );
}

export namespace suggestMediaTypesForArrayBufferView {}

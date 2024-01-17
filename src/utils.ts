/**
 * ## Introduction
 * Get bytes of the blob in the certain range
 *
 * ## Parameters
 * - `blob` - `Blob`
 *   + The target blob
 * - `start` - `number`
 *   + The start index
 * - `end` - `number`
 *   + The end index
 *
 * ## Results
 * - `Promise<Uint8Array>`
 *   + The bytes
 */
export async function getBytesOfBlob(
  blob: Blob,
  start: number,
  end?: number,
): Promise<Uint8Array> {
  return new Uint8Array(await blob.slice(start, end).arrayBuffer());
}

/**
 * ## Introduction
 * Get bytes of the uint8 array in the certain range
 *
 * ## Parameters
 * - `uint8Array` - `Uint8Array`
 *   + The target uint8 array
 * - `start` - `number`
 *   + The start index
 * - `end` - `number`
 *   + The end index
 *
 * ## Results
 * - `Promise<Uint8Array>`
 *   + The bytes
 */
export async function getBytesOfUint8Array(
  uint8Array: Uint8Array,
  start: number,
  end?: number,
): Promise<Uint8Array> {
  return uint8Array.slice(start, end);
}

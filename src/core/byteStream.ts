/**
 * ## Introduction
 * Read the data in the given length from a byte stream.
 *
 * ## Parameters
 * - `byteStream`: `ReadableStream<Uint8Array>`
 *   + The query data as a byte stream
 *   + The stream will not be cancelled after the function call
 * - `byteLength`: `number`
 *   + The length of the data to read
 *
 * ## Results
 * - `Promise<Uint8Array | undefined>`
 *   + The byte data read from the stream
 *
 * ## Note
 * - The remaining data will be left unread,
 *   which means the stream will be left
 *   in a readable state after the function call.
 */
export async function readByteStream(
  byteStream: ReadableStream<Uint8Array>,
  byteLength: number,
): Promise<Uint8Array | undefined> {
  const reader = byteStream.getReader({ mode: 'byob' });
  try {
    return (await reader.read(new Uint8Array(byteLength))).value;
  } finally {
    reader.releaseLock();
  }
}

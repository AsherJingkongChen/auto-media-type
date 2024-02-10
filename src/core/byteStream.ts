/**
 * ## Introduction
 * Read the data chunk from a byte stream.
 *
 * ## Parameters
 * - `byteStream`: `ReadableStream<Uint8Array>`
 *   + A byte stream
 *   + The stream will not be cancelled after the function call
 * - `byteLength`: `number`
 *   + The chunk length in byte
 * - `byteOffset`: `number | undefined`
 *   + The chunk offset in byte
 *   + The default value is `0`
 *
 * ## Results
 * - `Promise<Uint8Array | undefined>`
 *   + The chunk read from the stream
 *
 * ## Note
 * - The consumed data size in byte will be `byteOffset + byteLength`
 * - The remaining data will be left unread,
 *   which means the stream will be left
 *   in a readable state after the function call.
 */
export async function readByteStream(
  byteStream: ReadableStream<Uint8Array>,
  byteLength: number,
  byteOffset: number = 0,
): Promise<Uint8Array> {
  let buffer = new ArrayBuffer(byteOffset + byteLength);
  let offset = 0;
  let reader = byteStream.getReader({ mode: 'byob' });
  try {
    while (offset < buffer.byteLength) {
      const { done, value } = await reader.read(
        new Uint8Array(buffer, offset, buffer.byteLength - offset),
      );
      if (value) {
        buffer = value.buffer;
        offset += value.byteLength;
      }
      if (done) {
        break;
      }
    }
  } finally {
    reader.releaseLock();
  }
  return new Uint8Array(buffer.slice(byteOffset, offset), 0);
}

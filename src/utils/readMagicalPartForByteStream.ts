import { magicBytesOffsetEnd, magicMaskBytesOffsetEnd } from '../preset';

const magicalPartByteLength = Math.max(
  magicBytesOffsetEnd,
  magicMaskBytesOffsetEnd,
);

/**
 * ## Introduction
 * Read the magical part of a byte stream.
 *
 * The magical part of a byte stream contains file magic numbers,
 * which are used to guess the possible media type.
 *
 * ## Parameters
 * - `byteStream`: `ReadableStream<Uint8Array>`
 *   + The query data as a byte stream
 *   + The stream will not be cancelled after the function call
 *
 * ## Results
 * - `Promise<Uint8Array | undefined>`
 *   + Bytes of the magical part
 *
 * ## Note
 * - The remaining data of given stream will be left unread,
 *   which means the stream will be left in a readable state.
 */
export async function readMagicalPartForByteStream(
  byteStream: ReadableStream<Uint8Array>,
): Promise<Uint8Array | undefined> {
  const reader = byteStream.getReader({ mode: 'byob' });
  try {
    return (await reader.read(new Uint8Array(magicalPartByteLength))).value;
  } finally {
    reader.releaseLock();
  }
}

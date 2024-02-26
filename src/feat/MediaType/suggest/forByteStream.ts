import { readByteStream } from '../../../core';
import { magicNumbersOffsetEnd } from '../../../preset';
import { suggestMediaTypesForUint8Array } from './forUint8Array';

/**
 * ## Introduction
 * Suggest media types for data as a byte stream
 *
 * ## Parameters
 * - `stream`: `ReadableStream<Uint8Array>`
 *   + The query data as a byte stream
 *   + The stream will be locked after the function call
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 *
 * ## Note
 * - The given stream is seen as a disposable resource,
 *   so no one should use it after the function call.
 * - The given stream will be cloned using `ReadableStream.prototype.tee()`
 *   in the implementation.
 */
export async function suggestMediaTypesForByteStream(
  stream: ReadableStream<Uint8Array>,
): Promise<Set<string>> {
  const streams = stream.tee();
  try {
    return suggestMediaTypesForUint8Array(
      await readByteStream(streams[0], magicNumbersOffsetEnd),
    );
  } finally {
    await Promise.all(streams.map((s) => s.cancel()));
  }
}

export namespace suggestMediaTypesForByteStream {}

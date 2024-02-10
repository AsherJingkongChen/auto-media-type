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
  const reader = byteStream.getReader({ mode: 'byob' });
  let buffer = new ArrayBuffer(byteOffset + byteLength);
  let offset = 0;
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

// export async function copyFromByteStream(
//   byteStream: ReadableStream<Uint8Array>,
//   byteOffset: number,
//   byteLength: number,
// ): Promise<[ReadableStream<Uint8Array>, Uint8Array]> {
//   // Read the data chunk with size `byteOffset + byteLength`
//   let chunk = new Uint8Array(),
//     data = chunk;
//   const reader = byteStream.getReader({ mode: 'byob' });
//   try {
//     const { value } = await reader.read(
//       new Uint8Array(byteOffset + byteLength),
//     );
//     // Record the chunk and truncate the data chunk from `byteOffset`
//     if (value) {
//       chunk = value.slice(byteOffset);
//       data = value;
//     }
//   } finally {
//     reader.releaseLock();
//     console.log({ byteStream, e: 'releasedLock 1' });
//   }

//   // Create a stream to read the consumed and remaining data
//   const stream = new ReadableStream({
//     type: 'bytes',
//     async start(controller) {
//       controller.enqueue(data);
//       const reader = byteStream.getReader({ mode: 'byob' });
//       try {
//         while (true) {
//           const { byobRequest } = controller;
//           const ownView = byobRequest?.view;
//           if (ownView) {
//             const { buffer, byteOffset, byteLength } = ownView;
//             const { done, value } = await reader.read(
//               new Uint8Array(buffer, byteOffset, byteLength),
//             );
//             if (done) {
//               break;
//             }
//             byobRequest.respondWithNewView(value);
//           } else {
//             const { done, value } = await reader.read(new Uint8Array(1024));
//             if (done) {
//               break;
//             }
//             controller.enqueue(value);
//           }
//         }
//       } catch (error) {
//         controller.error(error);
//       } finally {
//         reader.releaseLock();
//         controller.close();
//         console.log({ byteStream, e: 'releasedLock 2' });
//       }
//     },
//   });

//   console.log({ byteStream, stream });

//   // Return the fixed stream and the data chunk
//   return [stream, chunk];
// }

import { readByteStream } from './core';
import {
  guessMediaTypesByExtension,
  guessMediaTypesByMagicBytes,
  guessMediaTypesByMagicMaskedBytes,
} from './guess';
import { SupportedMediaTypes, magicNumbersOffsetEnd } from './preset';

/**
 * ## Introduction
 * `MediaType` stands for Internet Media Type (MIME Type)
 *
 * ## References
 * - [IANA Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [RFC 2046](https://datatracker.ietf.org/doc/html/rfc2046)
 * - [RFC 6838](https://datatracker.ietf.org/doc/html/rfc6838)
 */
export namespace MediaType {
  /**
   * ## Introduction
   * Suggest media types for the given array buffer view
   *
   * ## Parameters
   * - `arrayBufferView`: `ArrayBufferView`
   *   + The query data as an array buffer view
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   */
  export async function suggest(
    arrayBufferView: ArrayBufferView,
  ): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given array buffer
   *
   * ## Parameters
   * - `arrayBuffer`: `ArrayBufferLike`
   *   + The query data as an array buffer like object
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   */
  export async function suggest(
    arrayBuffer: ArrayBufferLike,
  ): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given file
   *
   * ## Parameters
   * - `file`: `File`
   *   + The query data as a file reference
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   *
   * ## Note
   * - This function will suggest media types by the file name and content.
   */
  export async function suggest(file: File): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given blob
   *
   * ## Parameters
   * - `blob`: `Blob`
   *   + The query data as a binary large object
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   */
  export async function suggest(blob: Blob): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given response
   *
   * ## Parameters
   * - `response`: `Response`
   *   + The query data as a response
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   *
   * ## Note
   * - The given response will be cloned using `Response.prototype.clone()`
   * - Don't call with a response using the GET or HEAD method
   *   since it doesn't have a body.
   */
  export async function suggest(response: Response): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given request
   *
   * ## Parameters
   * - `request`: `Request`
   *   + The query data as a request
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   *
   * ## Note
   * - The given request will be cloned using `Request.prototype.clone()`
   * - The request body must be provided.
   *   + Don't call with a request using the GET or HEAD method
   *     since it doesn't have a body.
   */
  export async function suggest(request: Request): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given byte stream
   *
   * ## Parameters
   * - `byteStream`: `ReadableStream<ArrayBufferView>`
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
  export async function suggest(
    byteStream: ReadableStream<ArrayBufferView>,
  ): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given data
   *
   * ## Parameters
   * - `data`: `unknown`
   *   + The query data
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   */
  export async function suggest(data: unknown): Promise<Set<string>> {
    if (data && typeof data === 'object') {
      // `suggestForArrayBuffer`
      // `suggestForArrayBufferView`
      if ('byteLength' in data) {
        if (ArrayBuffer.isView(data)) {
          return suggestForArrayBufferView(data);
        }
        if (data instanceof ArrayBuffer || data instanceof SharedArrayBuffer) {
          return suggestForArrayBuffer(data);
        }
      }

      // `suggestForBlob`
      // `suggestForFile`
      if (data instanceof Blob) {
        if (data instanceof File) {
          return suggestForFile(data);
        }
        return suggestForBlob(data);
      }

      // `suggestForResponse`
      // `suggestForRequest`
      if ('body' in data) {
        if (data instanceof Response) {
          return suggestForResponse(data);
        }
        if (data instanceof Request) {
          return suggestForRequest(data);
        }
      }

      // `suggestForByteStream`
      if (data instanceof ReadableStream) {
        return suggestForByteStream(data);
      }
    }
    throw new TypeError('The data type is not valid');
  }

  /**
   * ## Introduction
   * Suggest media types for the given array buffer
   *
   * ## Parameters
   * - `arrayBuffer`: `ArrayBufferLike`
   *   + The query data as an array buffer like object
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   */
  export async function suggestForArrayBuffer(
    arrayBuffer: ArrayBufferLike,
  ): Promise<Set<string>> {
    return suggestForUint8Array(new Uint8Array(arrayBuffer));
  }

  /**
   * ## Introduction
   * Suggest media types for the given array buffer view
   *
   * ## Parameters
   * - `arrayBufferView`: `ArrayBufferView`
   *   + The query data as an array buffer view
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   *
   * ## Note
   * - Typed arrays like `Uint8Array` and `DataView` are `ArrayBufferView`.
   */
  export async function suggestForArrayBufferView(
    arrayBufferView: ArrayBufferView,
  ): Promise<Set<string>> {
    return suggestForUint8Array(
      arrayBufferView instanceof Uint8Array
        ? arrayBufferView
        : new Uint8Array(arrayBufferView.buffer),
    );
  }

  /**
   * ## Introduction
   * Suggest media types for the given blob
   *
   * ## Parameters
   * - `blob`: `Blob`
   *   + The query data as a binary large object
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   */
  export async function suggestForBlob(blob: Blob): Promise<Set<string>> {
    // [TODO] Need a working check algorithm
    // return checkMediaTypes(file, await guessMediaTypesByMagicBytes(file));
    return suggestForUint8Array(
      new Uint8Array(await blob.slice(0, magicNumbersOffsetEnd).arrayBuffer()),
    );
  }

  /**
   * ## Introduction
   * Suggest media types for the given byte stream
   *
   * ## Parameters
   * - `byteStream`: `ReadableStream<ArrayBufferView>`
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
  export async function suggestForByteStream(
    byteStream: ReadableStream<ArrayBufferView>,
  ): Promise<Set<string>> {
    const byteStreams = byteStream.tee();
    try {
      return suggestForUint8Array(
        await readByteStream(byteStreams[0], magicNumbersOffsetEnd),
      );
    } finally {
      await Promise.all(byteStreams);
    }
  }

  /**
   * ## Introduction
   * Suggest media types for the given file
   *
   * ## Parameters
   * - `file`: `File`
   *   + The query data as a file reference
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   *
   * ## Note
   * - This function will suggest media types by the file name and content.
   */
  export async function suggestForFile(file: File): Promise<Set<string>> {
    // [TODO] Need a working check algorithm
    // const mediaTypes = checkMediaTypes(
    //   file,
    //   guessMediaTypesByExtension(file.name),
    // );
    // if (mediaTypes.length) {
    //   return mediaTypes;
    // }
    // return checkMediaTypes(file, await guessMediaTypesByMagicBytes(file));
    return new Set([
      ...guessMediaTypesByExtension(file.name),
      ...(await suggestForBlob(file)),
    ]);
  }

  /**
   * ## Introduction
   * Suggest media types for the given response
   *
   * ## Parameters
   * - `response`: `Response`
   *   + The query data as a response
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   *
   * ## Note
   * - The given response will be cloned using `Response.prototype.clone()`
   * - Don't call with a response using the GET or HEAD method
   *   since it doesn't have a body.
   */
  export async function suggestForResponse(
    response: Response,
  ): Promise<Set<string>> {
    if (!response.body) {
      throw new TypeError('The response does not have a body');
    }
    return suggestForBlob(await response.clone().blob());
  }

  /**
   * ## Introduction
   * Suggest media types for the given request
   *
   * ## Parameters
   * - `request`: `Request`
   *   + The query data as a request
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   *
   * ## Note
   * - The given request will be cloned using `Request.prototype.clone()`
   * - Don't call with a request using the GET or HEAD method
   *   since it doesn't have a body.
   */
  export async function suggestForRequest(
    request: Request,
  ): Promise<Set<string>> {
    if (!request.body) {
      throw new TypeError('The request does not have a body');
    }
    return suggestForBlob(await request.clone().blob());
  }

  /**
   * ## Introduction
   * Suggest media types for the given byte array
   *
   * ## Parameters
   * - `uint8Array`: `Uint8Array`
   *   + The query data as an unsigned byte array
   *
   * ## Returns
   * - `Promise<Set<string>>`
   *   + Possible media types
   */
  export async function suggestForUint8Array(
    uint8Array: Uint8Array,
  ): Promise<Set<string>> {
    return new Set([
      ...(await guessMediaTypesByMagicBytes(uint8Array)),
      ...(await guessMediaTypesByMagicMaskedBytes(uint8Array)),
    ]);
  }

  /**
   * ## Introduction
   * Supported media types
   * - Supported media types: `38`
   * - Deprecated media types: `2`
   *
   * ## References
   * - [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
   */
  export const supportSet = SupportedMediaTypes;
  export type supportSet = SupportedMediaTypes;
}

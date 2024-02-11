import { readByteStream } from './core';
import {
  guessMediaTypesByExtension,
  guessMediaTypesByMagicBytes,
  guessMediaTypesByMagicMaskedBytes,
} from './guess';
import { SupportedMediaTypes, magicalPartByteLength } from './preset';

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
   * Suggest media types for the given file
   *
   * ## Parameters
   * - `file`: `File`
   *   + The query data as a file reference
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
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
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggest(blob: Blob): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given typed array
   *
   * ## Parameters
   * - `typedArray`: `TypedArray`
   *   + The query data as a typed array
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggest(typedArray: TypedArray): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given data view
   *
   * ## Parameters
   * - `dataView`: `DataView`
   *   + The query data as a data view
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggest(dataView: DataView): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given array buffer view
   *
   * ## Parameters
   * - `arrayBufferView`: `ArrayBufferView`
   *   + The query data as an array buffer view
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
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
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggest(
    arrayBuffer: ArrayBufferLike,
  ): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given byte stream
   *
   * ## Parameters
   * - `byteStream`: `ReadableStream<Uint8Array>`
   *   + The query data as a byte stream
   *   + The stream will be cancelled after the function call
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   *
   * ## Note
   * - The given stream is taken as a disposable resource,
   *   so no one should use the stream after the function call.
   */
  export async function suggest(
    byteStream: ReadableStream<Uint8Array>,
  ): Promise<Set<string>>;

  /**
   * ## Introduction
   * Suggest media types for the given data
   *
   * ## Parameters
   * - `data`: `
   *     ArrayBufferLike | ArrayBufferView |
   *     Blob | DataView | File |
   *     ReadableStream<Uint8Array> | TypedArray`
   *   + The query data
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggest(
    data:
      | ArrayBufferLike
      | ArrayBufferView
      | Blob
      | DataView
      | File
      | ReadableStream<Uint8Array>
      | TypedArray,
  ): Promise<Set<string>> {
    if (data instanceof File) {
      return suggestForFile(data);
    } else if (data instanceof Blob) {
      return suggestForBlob(data);
    }
    if (ArrayBuffer.isView(data)) {
      return suggestForArrayBufferView(data);
    } else if (
      data instanceof ArrayBuffer ||
      data instanceof SharedArrayBuffer
    ) {
      return suggestForArrayBuffer(data);
    }
    if (data instanceof ReadableStream) {
      return suggestForByteStream(data);
    }
    throw new TypeError('The query data type is not valid');
  }

  /**
   * ## Introduction
   * Suggest media types for the given array buffer
   *
   * ## Parameters
   * - `arrayBuffer`: `ArrayBufferLike`
   *   + The query data as an array buffer like object
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggestForArrayBuffer(
    arrayBuffer: ArrayBufferLike,
  ): Promise<Set<string>> {
    return new Set([
      ...(await guessMediaTypesByMagicBytes.forUint8Array(
        new Uint8Array(arrayBuffer),
      )),
      ...(await guessMediaTypesByMagicMaskedBytes.forUint8Array(
        new Uint8Array(arrayBuffer),
      )),
    ]);
  }

  /**
   * ## Introduction
   * Suggest media types for the given array buffer view
   *
   * ## Parameters
   * - `arrayBufferView`: `ArrayBufferView | DataView | TypedArray`
   *   + The query data as an array buffer view
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggestForArrayBufferView(
    arrayBufferView: ArrayBufferView | DataView | TypedArray,
  ): Promise<Set<string>> {
    return arrayBufferView instanceof Uint8Array
      ? suggestForUint8Array(arrayBufferView)
      : new Set([
          ...(await guessMediaTypesByMagicBytes.forUint8Array(
            new Uint8Array(arrayBufferView.buffer),
          )),
          ...(await guessMediaTypesByMagicMaskedBytes.forUint8Array(
            new Uint8Array(arrayBufferView.buffer),
          )),
        ]);
  }

  /**
   * ## Introduction
   * Suggest media types for the given blob
   *
   * ## Parameters
   * - `blob`: `Blob`
   *   + The query data as a binary large object
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggestForBlob(blob: Blob): Promise<Set<string>> {
    // [TODO] Need a working check algorithm
    // return checkMediaTypes(file, await guessMediaTypesByMagicBytes(file));
    return new Set([
      ...(await guessMediaTypesByMagicBytes.forBlob(blob)),
      ...(await guessMediaTypesByMagicMaskedBytes.forBlob(blob)),
    ]);
  }

  /**
   * ## Introduction
   * Suggest media types for the given byte stream
   *
   * ## Parameters
   * - `byteStream`: `ReadableStream<Uint8Array>`
   *   + The query data as a byte stream
   *   + The stream will be locked after the function call
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   *
   * ## Note
   * - The given stream is seen as a disposable resource,
   *   so no one should use it after the function call.
   */
  export async function suggestForByteStream(
    byteStream: ReadableStream<Uint8Array>,
  ): Promise<Set<string>> {
    const byteStreams = byteStream.tee();
    try {
      const magicalPart = await readByteStream(
        byteStreams[0],
        magicalPartByteLength,
      );
      return new Set(
        magicalPart && [
          ...(await guessMediaTypesByMagicBytes.forUint8Array(magicalPart)),
          ...(await guessMediaTypesByMagicMaskedBytes.forUint8Array(
            magicalPart,
          )),
        ],
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
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   *
   * ## Note
   * This function has 3 stages:
   * 1. Guess media types by file extension
   * 2. Guess media types by magic bytes
   * 3. Collect and return the guessed media types
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
      ...(await guessMediaTypesByMagicBytes.forBlob(file)),
      ...(await guessMediaTypesByMagicMaskedBytes.forBlob(file)),
    ]);
  }

  /**
   * ## Introduction
   * Suggest media types for the given uint8 array
   *
   * ## Parameters
   * - `uint8Array`: `Uint8Array`
   *   + The query data as a typed array of 8-bit unsigned integers
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types
   */
  export async function suggestForUint8Array(
    uint8Array: Uint8Array,
  ): Promise<Set<string>> {
    return new Set([
      ...(await guessMediaTypesByMagicBytes.forUint8Array(uint8Array)),
      ...(await guessMediaTypesByMagicMaskedBytes.forUint8Array(uint8Array)),
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

/**
 * ## Introduction
 * A ***TypedArray*** object describes an array-like view of an underlying
 * [binary data buffer](
 *   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
 * ).
 * There is no global property named `TypedArray`,
 * nor is there a directly visible `TypedArray` constructor.
 * Instead, there are a number of different global properties,
 * whose values are typed array constructors for specific element types,
 * listed below.
 *
 * ## Note
 * - `TypedArray` is a union type of all typed array types.
 * - `TypedArray` is a subtype of [`ArrayBufferView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView).
 *
 * ## References
 * [MDN - TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
 */
export type TypedArray =
  | BigInt64Array
  | BigUint64Array
  | Float32Array
  | Float64Array
  | Int8Array
  | Int16Array
  | Int32Array
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array;

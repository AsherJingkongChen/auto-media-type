// import { checkMediaTypes } from './check';
import {
  guessMediaTypesByExtension,
  guessMediaTypesByMagicNumbers,
} from './guess';

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
   * To suggest media types for the data
   *
   * ## Parameters
   * - `data` - `ArrayBufferLike | ArrayBufferView | Blob | DataView | File | TypedArray`
   *   + The query data
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types for the `data`
   *
   * ## Note
   * - This function may call:
   *   + `.suggestArrayBufferLike()`
   *   + `.suggestArrayBufferView()`
   *   + `.suggestBlob()`
   *   + `.suggestFile()`
   */
  export async function suggest(
    data:
      | ArrayBufferLike
      | ArrayBufferView
      | Blob
      | DataView
      | File
      | TypedArray,
  ): Promise<Set<string>> {
    if (data instanceof File) {
      return suggestFile(data);
    } else if (data instanceof Blob) {
      return suggestBlob(data);
    }
    if (ArrayBuffer.isView(data)) {
      return suggestArrayBufferView(data);
    } else if (
      data instanceof ArrayBuffer ||
      data instanceof SharedArrayBuffer
    ) {
      return suggestArrayBufferLike(data);
    }
    throw new TypeError('Data type is not valid');
  }

  /**
   * ## Introduction
   * To suggest media types for the array buffer
   *
   * ## Parameters
   * - `arrayBufferLike` - `ArrayBufferLike`
   *   + The query array buffer like object
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types for the `arrayBufferLike`
   */
  export async function suggestArrayBufferLike(
    arrayBufferLike: ArrayBufferLike,
  ): Promise<Set<string>> {
    return guessMediaTypesByMagicNumbers(new Uint8Array(arrayBufferLike));
  }

  /**
   * ## Introduction
   * To suggest media types for the array buffer view
   *
   * ## Parameters
   * - `arrayBufferView` - `ArrayBufferView | DataView | TypedArray`
   *   + The query array buffer view
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types for the `arrayBufferView`
   *
   * ## Note
   * - This function may call:
   *   + `.suggestUint8Array()`
   */
  export async function suggestArrayBufferView(
    arrayBufferView: ArrayBufferView | DataView | TypedArray,
  ): Promise<Set<string>> {
    if (arrayBufferView instanceof Uint8Array) {
      return suggestUint8Array(arrayBufferView);
    } else {
      return guessMediaTypesByMagicNumbers(
        new Uint8Array(arrayBufferView.buffer),
      );
    }
  }

  /**
   * ## Introduction
   * To suggest media types for the blob
   *
   * ## Parameters
   * - `blob` - `Blob`
   *   + The query blob
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types for the `blob`
   *
   * ## Note
   * This function has two stages:
   * 1. Guess media types by magic numbers
   * 2. Check media types
   *    - Return filtered media types
   */
  export async function suggestBlob(blob: Blob): Promise<Set<string>> {
    // [TODO] Need a working check algorithm
    // return checkMediaTypes(file, await guessMediaTypesByMagicNumbers(file));
    return guessMediaTypesByMagicNumbers(blob);
  }

  /**
   * ## Introduction
   * To suggest media types for the file
   *
   * ## Parameters
   * - `file` - `File`
   *   + The query file
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types for the `file`
   *
   * ## Note
   * This function has four stages:
   * 1. Guess media types by file extension
   * 2. Check media types
   *    - Return if at least one of media types are valid
   * 3. Guess media types by magic numbers
   * 4. Check media types
   *    - Return filtered media types
   */
  export async function suggestFile(file: File): Promise<Set<string>> {
    // [TODO] Need a working check algorithm
    // const mediaTypes = checkMediaTypes(
    //   file,
    //   guessMediaTypesByExtension(file.name),
    // );
    // if (mediaTypes.length) {
    //   return mediaTypes;
    // }
    // return checkMediaTypes(file, await guessMediaTypesByMagicNumbers(file));
    return new Set([
      ...guessMediaTypesByExtension(file.name),
      ...(await guessMediaTypesByMagicNumbers(file)),
    ]);
  }

  /**
   * ## Introduction
   * To suggest media types for the uint8 array
   *
   * ## Parameters
   * - `uint8Array` - `Uint8Array`
   *   + The query uint8 array
   *
   * ## Results
   * - `Promise<Set<string>>`
   *   + A set of possible media types for the `uint8Array`
   */
  export async function suggestUint8Array(
    uint8Array: Uint8Array,
  ): Promise<Set<string>> {
    return guessMediaTypesByMagicNumbers(uint8Array);
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
}

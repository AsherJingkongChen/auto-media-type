import { suggestMediaTypesForArrayBuffer } from './forArrayBuffer';
import { suggestMediaTypesForArrayBufferView } from './forArrayBufferView';
import { suggestMediaTypesForByteStream } from './forByteStream';
import { suggestMediaTypesForBlob } from './forBlob';
import { suggestMediaTypesForFile } from './forFile';
import { suggestMediaTypesForRequest } from './forRequest';
import { suggestMediaTypesForResponse } from './forResponse';

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
export async function suggestMediaTypes(
  arrayBufferView: ArrayBufferView,
): Promise<Set<string>>;

/**
 * ## Introduction
 * Suggest media types for data as an array buffer
 *
 * ## Parameters
 * - `buffer`: `ArrayBufferLike`
 *   + The query data as an array buffer like object
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function suggestMediaTypes(
  arrayBuffer: ArrayBufferLike,
): Promise<Set<string>>;

/**
 * ## Introduction
 * Suggest media types for data as a file
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
export async function suggestMediaTypes(file: File): Promise<Set<string>>;

/**
 * ## Introduction
 * Suggest media types for data as a blob
 *
 * ## Parameters
 * - `blob`: `Blob`
 *   + The query data as a binary large object
 *
 * ## Returns
 * - `Promise<Set<string>>`
 *   + Possible media types
 */
export async function suggestMediaTypes(blob: Blob): Promise<Set<string>>;

/**
 * ## Introduction
 * Suggest media types for data as a request
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
export async function suggestMediaTypes(request: Request): Promise<Set<string>>;

/**
 * ## Introduction
 * Suggest media types for data as a response
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
export async function suggestMediaTypes(
  response: Response,
): Promise<Set<string>>;

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
export async function suggestMediaTypes(
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
 *
 * ## Note
 * - The function will fully check the data type
 */
export async function suggestMediaTypes(data: unknown): Promise<Set<string>> {
  if (data && typeof data === 'object') {
    // `suggestMediaTypesForArrayBuffer`
    // `suggestMediaTypesForArrayBufferView`
    if ('byteLength' in data) {
      if (ArrayBuffer.isView(data)) {
        return suggestMediaTypesForArrayBufferView(data);
      }
      if (data instanceof ArrayBuffer || data instanceof SharedArrayBuffer) {
        return suggestMediaTypesForArrayBuffer(data);
      }
    }

    // `suggestMediaTypesForBlob`
    // `suggestMediaTypesForFile`
    if (data instanceof Blob) {
      if (data instanceof File) {
        return suggestMediaTypesForFile(data);
      }
      return suggestMediaTypesForBlob(data);
    }

    // `suggestMediaTypesForRequest`
    // `suggestMediaTypesForResponse`
    if ('body' in data) {
      if (data instanceof Request) {
        return suggestMediaTypesForRequest(data);
      }
      if (data instanceof Response) {
        return suggestMediaTypesForResponse(data);
      }
    }

    // `suggestMediaTypesForByteStream`
    if (data instanceof ReadableStream) {
      return suggestMediaTypesForByteStream(data);
    }
  }
  throw new TypeError('The data type is not valid');
}

/**
 * ## Introduction
 * Suggest media types
 */
export namespace suggestMediaTypes {
  export import forArrayBuffer = suggestMediaTypesForArrayBuffer;
  export import forArrayBufferView = suggestMediaTypesForArrayBufferView;
  export import forBlob = suggestMediaTypesForBlob;
  export import forFile = suggestMediaTypesForFile;
  export import forRequest = suggestMediaTypesForRequest;
  export import forResponse = suggestMediaTypesForResponse;
  export import forByteStream = suggestMediaTypesForByteStream;
}

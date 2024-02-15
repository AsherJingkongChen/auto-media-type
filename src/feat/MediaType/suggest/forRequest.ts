import { suggestMediaTypesForBlob } from './forBlob';

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
export async function suggestMediaTypesForRequest(
  request: Request,
): Promise<Set<string>> {
  if (!request.body) {
    throw new TypeError('The request does not have a body');
  }
  return suggestMediaTypesForBlob(await request.clone().blob());
}

export namespace suggestMediaTypesForRequest {}

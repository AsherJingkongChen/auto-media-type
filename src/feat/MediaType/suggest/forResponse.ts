import { suggestMediaTypesForBlob } from './forBlob';

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
export async function suggestMediaTypesForResponse(
  response: Response,
): Promise<Set<string>> {
  if (!response.body) {
    throw new TypeError('The response does not have a body');
  }
  return suggestMediaTypesForBlob(await response.clone().blob());
}

export namespace suggestMediaTypesForResponse {}

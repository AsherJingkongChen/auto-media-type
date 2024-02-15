import { guessMediaTypes } from '../guess';
import { suggestMediaTypesForBlob } from './forBlob';

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
export async function suggestMediaTypesForFile(
  file: File,
): Promise<Set<string>> {
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
    ...guessMediaTypes.byFileExtension(file.name),
    ...(await suggestMediaTypesForBlob(file)),
  ]);
}

export namespace suggestMediaTypesForFile {}

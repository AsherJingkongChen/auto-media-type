import { extensionToMediaTypesTable } from '../../../preset';

/**
 * ## Introduction
 * Guess media types by a file extension
 *
 * ## Parameters
 * - `filename`: `string`
 *   + A file name
 *
 * ## Returns
 * - `Set<string>`
 *   + Possible media types
 *
 * ## Note
 * - The file extension is case insensitive
 */
export function guessMediaTypesByFileExtension(filename: string): Set<string> {
  const extension = /\.([^\.]+)$/.exec(filename)?.[1]?.toLowerCase();
  return new Set(
    extension ? extensionToMediaTypesTable[extension] ?? [] : undefined,
  );
}

export namespace guessMediaTypesByFileExtension {}

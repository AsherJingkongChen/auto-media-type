import { guessMediaTypesByFileExtension } from './byFileExtension';
import { guessMediaTypesByMagicBits } from './byMagicBits';
import { guessMediaTypesByMagicBytes } from './byMagicBytes';

/**
 * ## Introduction
 * Guess media types
 */
export namespace guessMediaTypes {
  export import byFileExtension = guessMediaTypesByFileExtension;
  export import byMagicBits = guessMediaTypesByMagicBits;
  export import byMagicBytes = guessMediaTypesByMagicBytes;
}

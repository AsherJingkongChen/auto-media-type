import { magicMaskBytesOffsetEnd } from './magicBits';
import { magicBytesOffsetEnd } from './magicBytes';

/**
 * ## Introduction
 * The length of the magical part of a byte stream.
 *
 * The magical part of a byte stream contains file magic numbers,
 * which are used to guess the possible media types.
 *
 * ## Layout
 * - `number`
 */
export const magicalPartByteLength: number = Math.max(
  magicBytesOffsetEnd,
  magicMaskBytesOffsetEnd,
);

import { KeyedSerialCollection, Serial } from '../core';
import { SupportedMediaTypes } from './supportedMediaTypes';

/**
 * ## Introduction
 * A keyed serial collection of media type and magic masked bytes
 *
 * ## Layout
 * - The key is a media type
 * - The serial are magic masked bytes with offsets
 *
 * ## Note
 * - The initialization list should be sorted for maintainability
 *   + in descending order
 *   + by media type and usage
 *
 * ## References
 * - [Gary Kessler's Library](https://www.garykessler.net/library/file_sigs.html)
 * - [IANA Media types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [LOC Digital Formats](https://www.loc.gov/preservation/digital/formats/fdd/browse_list.shtml)
 * - [Wikipedia - List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures)
 */
export const mediaTypeAndMagicMaskedBytes: KeyedSerialCollection = [
  ['audio/mpeg', NaN, 0, 0xff, 0xe0],
] satisfies [SupportedMediaTypes, ...any[]][];

/**
 * ## Introduction
 * Magic masks in byte
 *
 * ## Layout
 * `Serial`
 */
export const magicMaskBytes: Serial = [NaN, 0, 0xff, 0xe0];

/**
 * ## Introduction
 * The end offset of magic mask(ed) bytes
 *
 * ## Layout
 * `number`
 */
export const magicMaskBytesOffsetEnd: number = 2;

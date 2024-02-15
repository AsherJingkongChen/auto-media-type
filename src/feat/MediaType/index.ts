import { SupportedMediaTypes } from '../../preset';
import { suggestMediaTypes } from './suggest';

/**
 * ## Introduction
 * `MediaType` stands for Internet Media Type (MIME Type)
 *
 * ## References
 * - [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
 * - [RFC 2046](https://datatracker.ietf.org/doc/html/rfc2046)
 * - [RFC 6838](https://datatracker.ietf.org/doc/html/rfc6838)
 */
export namespace MediaType {
  export import suggest = suggestMediaTypes;
  export import supported = SupportedMediaTypes;
}

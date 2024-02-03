# [⎗](../README.md) `text/html`

## File Extensions

`html`, `htm`

## Magic Bytes

1. HTML preamble prefix in upper caase
   | Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x3c | 0x21 | 0x44 | 0x4f | 0x43 | 0x54 | 0x59 | 0x50 |
   | Char | < | ! | D | O | C | T | Y | P |

2. HTML preamble prefix in lower caase
   | Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x3c | 0x21 | 0x64 | 0x6f | 0x63 | 0x74 | 0x79 | 0x70 |
   | Char | < | ! | d | o | c | t | y | p |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/text/html)
- [RFC 2854 - Registration of MIME media type text/html](https://datatracker.ietf.org/doc/html/rfc2854#section-2)
- [WHATWG HTML Spec - The DOCTYPE](https://html.spec.whatwg.org/#the-doctype)

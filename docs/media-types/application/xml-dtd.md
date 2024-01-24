# [⎗](../README.md) `application/xml-dtd`

## File Extensions

`dtd`

## Magic Numbers

1. UTF-8 / ISO 8859-1 encoding
   | | 0 | 1 |
   | ---- | ---- | ---- |
   | Byte | 0x3c | 0x21 |
   | Char | < | ! |

2. UTF-16BE encoding
   | | 0 | 1 | 2 | 3 | 4 | 5 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0xfe | 0xff | 0x00 | 0x3c | 0x00 | 0x21 |
   | Char | | | < | | ! | |

3. UTF-16LE encoding
   | | 0 | 1 | 2 | 3 | 4 | 5 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0xff | 0xfe | 0x3c | 0x00 | 0x21 | 0x00 |
   | Char | | | < | | ! | |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/application/xml-dtd)
- [RFC 7303 - application/xml-dtd Registration](https://datatracker.ietf.org/doc/html/rfc7303#section-9.5)

# [⎗](../README.md) `application/xml`

## File Extensions

`xml`

## Magic Numbers

1. XML declaration prefix in UTF-8 / ISO 8859-1 encoding
   | | 0 | 1 | 2 | 3 | 4 |
   | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x3c | 0x3f | 0x78 | 0x6d | 0x6c |
   | Char | < | ? | x | m | l |

2. XML declaration prefix in UTF-16BE encoding
   | | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0xfe | 0xff | 0x00 | 0x3c | 0x00 | 0x3f | 0x00 | 0x78 |
   | Char | | | < | | ? | | x | |

3. XML declaration prefix in UTF-16LE encoding
   | | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0xff | 0xfe | 0x3c | 0x00 | 0x3f | 0x00 | 0x78 | 0x00 |
   | Char | | | < | | ? | | x | |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/application/xml)
- [RFC 7303 - application/xml Registration](https://datatracker.ietf.org/doc/html/rfc7303#section-9.1)

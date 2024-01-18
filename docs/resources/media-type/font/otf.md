# `font/otf`

## File Extensions

`otf`

## Magic Numbers

1.  OpenType fonts containing TrueType outlines
    | | 0 | 1 | 2 | 3 |
    | ---- | ---- | ---- | ---- | ---- |
    | Byte | 0x4f | 0x54 | 0x54 | 0x4f |
    | Char | O | T | T | O |

2.  OpenType fonts containing CFF data
    | | 0 | 1 | 2 | 3 |
    | ---- | ---- | ---- | ---- | ---- |
    | Byte | 0x00 | 0x01 | 0x00 | 0x00 |
    | Char | | | | |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/font/otf)
- [RFC 8081 - OpenType Layout (OTF) Font Type](https://datatracker.ietf.org/doc/html/rfc8081#section-4.4.3)
- [Microsoft Learn - The OpenType Font File - Table Directory](https://learn.microsoft.com/en-us/typography/opentype/spec/otff#table-directory)

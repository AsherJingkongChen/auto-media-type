# [⎗](../README.md) `image/jpeg`

## File Extensions

`jfi`, `jfif`, `jif`, `jpg`, `jpeg`, `jpe`

## Magic Numbers

1. JPEG SOI + APPn + EOI
   | | 0 | 1 | 2 | -2 | -1 |
   | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0xff | 0xd8 | 0xff | 0xff | 0xd9 |
   | Char | | | | | |

## References

- [RFC 2046 - Image Media Type](https://datatracker.ietf.org/doc/html/rfc2046#section-4.2)
- [W3C JPEG](https://www.w3.org/Graphics/JPEG/)
- [LOC Digital Formats - JPEG](https://www.loc.gov/preservation/digital/formats/fdd/fdd000017.shtml)

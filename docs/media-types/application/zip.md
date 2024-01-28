# [⎗](../README.md) `application/zip`

## File Extensions

`docx`, `jar`, `odt`, `ods`, `odp`, `pptx`, `war`, `xlsx`, `z00`, `z01`, `z02`, `z03`, `z04`, `z05`, `z06`, `z07`, `z08`, `z09`, `zip`, `zipx`

## Magic Numbers

1. Local file header signature
   | Offset | 0 | 1 | 2 | 3 |
   | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x50 | 0x4b | 0x03 | 0x04 |
   | Char | P | K | | |

2. Spanning signature
   | Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x50 | 0x4b | 0x07 | 0x08 | 0x50 | 0x4b | 0x03 | 0x04 |
   | Char | P | K | | | P | K | | |

3. End of central directory signature
   | Offset | 0 | 1 | 2 | 3 |
   | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x50 | 0x4b | 0x05 | 0x06 |
   | Char | P | K | | |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/application/zip)
- [PKWARE's APPNOTE.TXT](https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT)
- [ECMA-376 - OOXML](https://ecma-international.org/publications-and-standards/standards/ecma-376/)

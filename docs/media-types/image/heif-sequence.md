# [⎗](../README.md) `image/heif-sequence`

## File Extensions

`heifs`, `hif`

## Magic Bytes

1. ISOBMFF file type box code + major brand prefix for HEIF sequence with any coding format
   | Offset | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x66 | 0x74 | 0x79 | 0x70 | 0x6d | 0x73 | 0x66 |
   | Char | f | t | y | p | m | s | f |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/image/heif-sequence)
- [HEIF Technical information](https://nokiatech.github.io/heif/technical.html)
- [MP4RA Brands](https://mp4ra.org/registered-types/brands)
- [ISOBMFF Major Brand Explanation](https://www.ftyps.com/what.html)

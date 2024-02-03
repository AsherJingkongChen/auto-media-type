# [⎗](../README.md) `image/heic`

## File Extensions

`heic`, `hif`

## Magic Bytes

1. ISOBMFF file type box code + major brand prefix for HEIF image with HEVC format
   | Offset | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x66 | 0x74 | 0x79 | 0x70 | 0x68 | 0x65 | 0x69 |
   | Char | f | t | y | p | h | e | i |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/image/heic)
- [HEIF Technical information](https://nokiatech.github.io/heif/technical.html)
- [MP4RA Brands](https://mp4ra.org/registered-types/brands)
- [ISOBMFF Major Brand Explanation](https://www.ftyps.com/what.html)

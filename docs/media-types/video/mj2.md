# [⎗](../README.md) `video/mj2`

## File Extensions

`mj2`, `mjp2`

## Magic Numbers

1. JPEG 2000 signature (size + box code prefix) + ISOBMFF major brand for JPEG 2000 Part 3
   | | 0 | 1 | 2 | 3 | 4 | 20 | 21 | 22 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x00 | 0x00 | 0x00 | 0x0c | 0x6a | 0x6d | 0x6a | 0x70 |
   | Char | | | | | j | m | j | p |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/video/jp2)
- [RFC 3745 - Compound Image Registration](https://datatracker.ietf.org/doc/html/rfc3745#section-4.4)
- [MP4RA Brands](https://mp4ra.org/registered-types/brands)
- [ISOBMFF Major Brand Explanation](https://www.ftyps.com/what.html)

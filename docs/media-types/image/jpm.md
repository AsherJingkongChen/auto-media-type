# [⎗](../README.md) `image/jpm`

## File Extensions

`jpgm`, `jpm`

## Magic Numbers

1. JPEG 2000 signature (size + box code prefix) + ISOBMFF major brand for JPEG 2000 Part 6
   | | 0 | 1 | 2 | 3 | 4 | 20 | 21 | 22 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x00 | 0x00 | 0x00 | 0x0c | 0x6a | 0x6a | 0x70 | 0x6d |
   | Char | | | | | j | j | p | m |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/image/jpm)
- [RFC 3745 - Compound Image Registration](https://datatracker.ietf.org/doc/html/rfc3745#section-4.4)
- [LOC Digital Formats - JPEG 2000 Part 6](https://www.loc.gov/preservation/digital/formats/fdd/fdd000144.shtml)
- [MP4RA Brands](https://mp4ra.org/registered-types/brands)
- [ISOBMFF Major Brand Explanation](https://www.ftyps.com/what.html)

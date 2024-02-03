# [⎗](../README.md) `image/jp2`

## File Extensions

`jp2`, `jpg2`

## Magic Bytes

1. JPEG 2000 signature (size + box code prefix) + ISOBMFF major brand prefix for JPEG 2000 Part 1
   | Offset | 0 | 1 | 2 | 3 | 4 | 20 | 21 | 22 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x00 | 0x00 | 0x00 | 0x0c | 0x6a | 0x6a | 0x70 | 0x32 |
   | Char | | | | | j | j | p | 2 |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/image/jp2)
- [RFC 3745 - Still Image Registration](https://datatracker.ietf.org/doc/html/rfc3745#section-4.1)
- [LOC Digital Formats - JPEG 2000 Part 1](https://www.loc.gov/preservation/digital/formats/fdd/fdd000143.shtml)
- [MP4RA Brands](https://mp4ra.org/registered-types/brands)
- [ISOBMFF Major Brand Explanation](https://www.ftyps.com/what.html)

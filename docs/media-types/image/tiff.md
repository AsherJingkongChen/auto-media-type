# [⎗](../README.md) `image/tiff`

## File Extensions

`dng`, `tif`, `tiff`

## Magic Numbers

1. Little endian
   | Offset | 0 | 1 | 2 | 3 |
   | ---- | --- | --- | --- | --- |
   | Byte | 0x49 | 0x49 | 0x2a | 0x00 |
   | Char | I | I | \* | |

2. Big endian
   | Offset | 0 | 1 | 2 | 3 |
   | ---- | --- | --- | --- | --- |
   | Byte | 0x4d | 0x4d | 0x00 | 0x2a |
   | Char | M | M | | \* |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/image/tiff)
- [RFC 3302 - IANA Registration](https://datatracker.ietf.org/doc/html/rfc3302#section-6)
- [Adobe DNG Specification - File Extensions](https://helpx.adobe.com/content/dam/help/en/photoshop/pdf/DNG_Spec_1_7_1_0.pdf)

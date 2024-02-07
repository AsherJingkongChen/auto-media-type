# [⎗](../README.md) `video/mpeg`

## File Extensions

`mpeg`, `mpg`, `mpe`, `m1v`, `m2v`

## Magic Bytes

1. MPEG-1/2 Part 1 pack header start code
   | Offset | 0 | 1 | 2 | 3 |
   | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x00 | 0x00 | 0x01 | 0xba |
   | Char | | | | |

2. MPEG-1/2 Part 2 sequence header start code
   | Offset | 0 | 1 | 2 | 3 |
   | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x00 | 0x00 | 0x01 | 0xb3 |
   | Char | | | | |

## References

- [RFC 2046 - Initial Media Types](https://datatracker.ietf.org/doc/html/rfc2046#section-3)
- [LOC Digital Formats - MPEG-2](https://www.loc.gov/preservation/digital/formats/fdd/fdd000028.shtml)
- [Apache HTTP MIME Types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
- [MPEG Video Headers Quick Reference](https://dvd.sourceforge.net/dvdinfo/mpeghdrs.html)
- [Treasured - MPEG](https://aeroquartet.com/treasured/mpeg.en.html)

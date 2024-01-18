# `video/mpeg`

## File Extensions

`mpeg`, `mpg`, `mpe`, `m1v`, `m2v`

## Magic Numbers

1. MPEG Video Pack Header
   | | 0 | 1 | 2 | 3 |
   | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x00 | 0x00 | 0x01 | 0xba |
   | Char | | | | |

2. MPEG Video Sequence Header
   | | 0 | 1 | 2 | 3 |
   | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x00 | 0x00 | 0x01 | 0xb3 |
   | Char | | | | |

## References

- [RFC 2046 - Video Media Type](https://datatracker.ietf.org/doc/html/rfc2046#section-4.4)
- [LOC Digital Formats - MPEG-2](https://www.loc.gov/preservation/digital/formats/fdd/fdd000028.shtml)
- [Apache HTTP MIME types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
- [MPEG Video Headers Quick Reference](https://dvd.sourceforge.net/dvdinfo/mpeghdrs.html)

# [⎗](../README.md) `audio/mpeg`

## File Extensions

`m1a`, `m2a`, `mp1`, `mp2`, `mp3`, `mp1a`, `mp2a`, `mpga`

## Magic Bytes

1. ID3v2 tag signature
   | Offset | 0 | 1 | 2 |
   | ---- | ---- | ---- | ---- |
   | Byte | 0x49 | 0x44 | 0x33 |
   | Char | I | D | 3 |

## Magic Bits

1. MPEG-1/2 Audio frame sync
   | Offset | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Bit | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/audio/mpeg)
- [RFC 3003](https://datatracker.ietf.org/doc/html/rfc3003)
- [ID3v2.3 Specification](https://id3lib.sourceforge.net/id3/id3v2.3.0.html)
- [Apache HTTP MIME Types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
- [MPEG Audio Frame Header](https://www.datavoyage.com/mpgscript/mpeghdr.htm)

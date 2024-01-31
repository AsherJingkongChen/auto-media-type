# [⎗](../README.md) `audio/mpeg`

## File Extensions

`m1a`, `m2a`, `mp1`, `mp2`, `mp3`, `mp1a`, `mp2a`, `mpga`

## Magic Numbers

1. ID3v2 tag signature
   | Offset | 0 | 1 | 2 |
   | ---- | ---- | ---- | ---- |
   | Byte | 0x49 | 0x44 | 0x33 |
   | Char | I | D | 3 |

2. MPEG-1 Audio Layer III header prefix with CRC-16 protection
   | Offset | 0 | 1 |
   | ---- | ---- | ---- |
   | Byte | 0xff | 0xfb |
   | Char | | |

3. MPEG-1 Audio Layer II header prefix with CRC-16 protection
   | Offset | 0 | 1 |
   | ---- | ---- | ---- |
   | Byte | 0xff | 0xfd |
   | Char | | |

4. MPEG-1 Audio Layer I header prefix without CRC-16 protection
   | Offset | 0 | 1 |
   | ---- | ---- | ---- |
   | Byte | 0xff | 0xfe |
   | Char | | |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/audio/mpeg)
- [RFC 3003](https://datatracker.ietf.org/doc/html/rfc3003)
- [ID3v2.3 Specification](https://id3lib.sourceforge.net/id3/id3v2.3.0.html)
- [ID3v1 Specification](https://id3lib.sourceforge.net/id3/id3v1.html)
- [Apache HTTP MIME Types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
- [MPEG Audio Frame Header](https://www.datavoyage.com/mpgscript/mpeghdr.htm)

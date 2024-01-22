# [⎗](../README.md) `audio/mpeg`

## File Extensions

`m1a`, `m2a`, `mp1`, `mp2`, `mp3`, `mp1a`, `mp2a`, `mpga`

## Magic Numbers

1. ID3v2
   | | 0 | 1 | 2 |
   | ---- | ---- | ---- | ---- |
   | Byte | 0x49 | 0x44 | 0x33 |
   | Char | I | D | 3 |

2. ID3v1
   | | -128 | -127 | -126 |
   | ---- | ---- | ---- | ---- |
   | Byte | 0x54 | 0x41 | 0x47 |
   | Char | T | A | G |

3. MPEG-1 Audio Layer II with CRC-16 protection
   | | 0 | 1 |
   | ---- | ---- | ---- |
   | Byte | 0xff | 0xfd |
   | Char | | |

4. MPEG-1 Audio Layer I without CRC-16 protection
   | | 0 | 1 |
   | ---- | ---- | ---- |
   | Byte | 0xff | 0xfe |
   | Char | | |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/audio/mpeg)
- [RFC 3003](https://datatracker.ietf.org/doc/html/rfc3003)
- [ID3v2.3 Specification](https://id3lib.sourceforge.net/id3/id3v2.3.0.html)
- [ID3v1 Specification](https://id3lib.sourceforge.net/id3/id3v1.html)
- [Apache HTTP MIME types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
- [MPEG Audio Frame Header](https://www.datavoyage.com/mpgscript/mpeghdr.htm)

# [⎗](../README.md) `video/mp4`

## File Extensions

`mp4`, `mp4v`, `mpg4`

## Magic Numbers

1. ISOBMFF major brand for MP4 base media
   | | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x66 | 0x74 | 0x79 | 0x70 | 0x69 | 0x73 | 0x6f |
   | Char | f | t | y | p | i | s | o |

2. ISOBMFF major brand for MP4 v2
   | | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x66 | 0x74 | 0x79 | 0x70 | 0x6d | 0x70 | 0x34 | 0x32 |
   | Char | f | t | y | p | m | p | 4 | 2 |

3. ISOBMFF major brand for MP4 v1
   | | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x66 | 0x74 | 0x79 | 0x70 | 0x6d | 0x70 | 0x34 | 0x31 |
   | Char | f | t | y | p | m | p | 4 | 1 |

4. ISOBMFF major brand for MP4 with AVC extension
   | | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
   | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x66 | 0x74 | 0x79 | 0x70 | 0x61 | 0x76 | 0x63 | 0x31 |
   | Char | f | t | y | p | a | v | c | 1 |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/video/mp4)
- [RFC 4337 - MP4 File](https://datatracker.ietf.org/doc/html/rfc4337#section-3.1)
- [Apache HTTP MIME types](https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types)
- [ISOBMFF Major Brand Designations](https://www.ftyps.com/)

# [⎗](../README.md) `image/svg+xml`

## File Extensions

`svg`

## Magic Bytes

1. SVG element start tag
   | Offset | 0 | 1 | 2 | 3 |
   | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x3c | 0x73 | 0x76 | 0x67 |
   | Char | < | s | v | g |

2. XML declaration prefix
   | Offset | 0 | 1 | 2 | 3 | 4 |
   | ---- | ---- | ---- | ---- | ---- | ---- |
   | Byte | 0x3c | 0x3f | 0x78 | 0x6d | 0x6c |
   | Char | < | ? | x | m | l |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/image/svg+xml)
- [W3C SVG 1.1 - SVG Document Fragment](https://www.w3.org/TR/SVG11/struct.html#NewDocument)
- [W3C XML - Logical Structures](https://www.w3.org/TR/xml/#sec-logical-struct)

# [⎗](../README.md) `image/svg+xml`

## File Extensions

`svg`

## Magic Numbers

1. SVG element start tag in any ASCII compatible encoding
   | | 0 | 1 | 2 | 3 |
   | -- | -- | -- | -- | -- |
   | Byte | 0x3c | 0x73 | 0x76 | 0x67 |
   | Char | < | s | v | g |

2. SVG element end tag in any ASCII compatible encoding
   | | -4 | -3 | -2 | -1 |
   | -- | -- | -- | -- | -- |
   | Byte | 0x73 | 0x76 | 0x67 | 0x3e |
   | Char | s | v | g | > |

3. SVG element end tag with one padding in any ASCII compatible encoding
   | | -5 | -4 | -3 | -2 |
   | -- | -- | -- | -- | -- |
   | Byte | 0x73 | 0x76 | 0x67 | 0x3e |
   | Char | s | v | g | > |

## References

- [Media Type Assignment](https://www.iana.org/assignments/media-types/image/svg+xml)
- [W3C SVG 1.1 - SVG Document Fragment](https://www.w3.org/TR/SVG11/struct.html#NewDocument)

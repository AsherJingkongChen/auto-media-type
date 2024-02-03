import {
  magicBytesIndexRanges,
  mediaTypeAndMagicBytesCollection,
} from 'src/preset';
import { describe, expect, it } from 'vitest';

describe('magicBytesIndexRanges', () => {
  it('It is sorted and not overlapping', () => {
    for (let i = 1; i < magicBytesIndexRanges.length; i++) {
      const [[beginIndex, endIndex = 0], [prevBeginIndex, prevEndIndex = 0]] = [
        magicBytesIndexRanges[i]!,
        magicBytesIndexRanges[i - 1]!,
      ];
      expect(prevBeginIndex < prevEndIndex).toBe(true);
      expect(prevEndIndex <= beginIndex).toBe(true);
      expect(beginIndex < endIndex).toBe(true);
    }
  });

  it('Its generated indexs equal to the ones generated from mediaTypeAndMagicBytesCollection', () => {
    const indexs = new Set<number>();
    for (let i = 0; i < magicBytesIndexRanges.length; i++) {
      const [beginIndex, endIndex = 0] = magicBytesIndexRanges[i]!;
      for (let index = beginIndex; index < endIndex; index++) {
        indexs.add(index);
      }
    }

    const anotherIndexs = new Set<number>();
    for (let i = 0; i < mediaTypeAndMagicBytesCollection.length; i++) {
      const listItem = mediaTypeAndMagicBytesCollection[i]!;
      const magics = listItem.slice(1) as (number | undefined)[];
      let index = 0;
      for (let i = 0; i < magics.length; i++) {
        let magic = magics[i];
        if (Number.isNaN(magic)) {
          index = magics[++i]!;
          magic = magics[++i]!;
        }
        anotherIndexs.add(index++);
      }
    }

    expect(indexs).toEqual(anotherIndexs);
  });
});

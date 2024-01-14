import {
  magicNumberIndexRanges,
  mediaTypeAndMagicNumbersList,
} from 'src/preset';
import { describe, expect, it } from 'vitest';

describe('magicNumberIndexRanges', () => {
  it('It is sorted and not overlapping', () => {
    for (let i = 1; i < magicNumberIndexRanges.length; i++) {
      const [[beginIndex, endIndex = 0], [prevBeginIndex, prevEndIndex = 0]] = [
        magicNumberIndexRanges[i]!,
        magicNumberIndexRanges[i - 1]!,
      ];
      expect(prevBeginIndex).toBeLessThan(prevEndIndex);
      expect(prevEndIndex).toBeLessThanOrEqual(beginIndex);
      expect(beginIndex).toBeLessThan(endIndex);
    }
  });

  it('Its generated indexs equal to the ones generated from mediaTypeAndMagicNumbersList', () => {
    const indexs = new Set<number>();
    for (let i = 0; i < magicNumberIndexRanges.length; i++) {
      const [beginIndex, endIndex = 0] = magicNumberIndexRanges[i]!;
      for (let index = beginIndex; index < endIndex; index++) {
        indexs.add(index);
      }
    }

    const anotherIndexs = new Set<number>();
    for (let i = 0; i < mediaTypeAndMagicNumbersList.length; i++) {
      const listItem = mediaTypeAndMagicNumbersList[i]!;
      const magics = listItem.slice(1) as (number | undefined)[];
      let index = 0;
      for (let i = 0; i < magics.length; i++) {
        let magic = magics[i];
        // Reset the index and magic number if undefined
        if (magic === undefined) {
          index = magics[++i]!;
          magic = magics[++i]!;
        }
        anotherIndexs.add(index++);
      }
    }

    expect(indexs).toEqual(anotherIndexs);
  });
});

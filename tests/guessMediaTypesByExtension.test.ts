import { guessMediaTypesByExtension } from 'src/guess';
import { describe, expect, it } from 'vitest';
import { Sample } from 'lots-of-sample-files';

describe('guessMediaTypesByExtension()', () => {
  describe('It returns an empty set', () => {
    it('for an extensionless file name', () => {
      expect(guessMediaTypesByExtension('').size).toBe(0);
      expect(guessMediaTypesByExtension('an-extensionless-file').size).toBe(0);
    });
    it('for an unseen file extension', () => {
      expect(guessMediaTypesByExtension('filename.undefined').size).toBe(0);
      expect(guessMediaTypesByExtension('.undefined-2').size).toBe(0);
    });
  });

  it('It always contains the closest media type', () => {
    const output = Array.from(Sample.files()).map((file) => ({
      expected: file.type,
      received: guessMediaTypesByExtension(file.name),
    }));

    expect(output.length).toBeGreaterThan(0);

    for (const { expected, received } of output) {
      expect(received).toContain(expected);
    }
  });
});

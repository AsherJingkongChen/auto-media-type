import { guessMediaTypesByExtension } from 'src/guess';
import { describe, expect, it } from 'vitest';
import { Sample } from 'lots-of-sample-files';

describe('guessMediaTypesByExtension()', () => {
  it('It returns an empty set for an extensionless file name', () => {
    expect(guessMediaTypesByExtension('').size).toBe(0);
    expect(guessMediaTypesByExtension('an-extensionless-file').size).toBe(0);
  });

  it('It always contains the closest media type (Recall 100%)', () => {
    const output = Array.from(Sample.files()).map((file) => ({
      expected: file.type,
      received: guessMediaTypesByExtension(file.name),
      n: file.name,
    }));

    expect(output.length).toBeGreaterThan(0);

    for (const { expected, received, n } of output) {
      console.log(n);
      expect(received).toContain(expected);
    }
  });
});

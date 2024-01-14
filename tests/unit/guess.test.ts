import {
  guessMediaTypesByExtension,
  guessMediaTypesByMagicNumbers,
} from 'src/guess';
import { Data } from 'tests/data';
import { describe, expect, it } from 'vitest';

describe('guessMediaTypesByExtension()', () => {
  const output = Array.from(Data.paths()).map(({ path, type }) => ({
    expected: type,
    received: guessMediaTypesByExtension(path),
  }));

  it('It always contains the closest media type (Recall 100%)', () => {
    for (const { expected, received } of output) {
      expect<string[]>(received).toContain(expected);
    }
  });

  it('It returns an empty array if no extension is matched', () => {
    expect(guessMediaTypesByExtension('')).toEqual([]);
    expect(guessMediaTypesByExtension('.__x-unknown-file-ext__')).toEqual([]);
  });
});

describe('guessMediaTypesByMagicNumbers()', async () => {
  const output = Promise.all(
    Array.from(Data.files()).map(async (file) => ({
      expected: file.type,
      received: await guessMediaTypesByMagicNumbers(file),
    })),
  );

  it('It always contains the closest media type (Recall 100%)', async () => {
    for (const { expected, received } of await output) {
      expect<string[]>(received).toContain(expected);
    }
  });
});

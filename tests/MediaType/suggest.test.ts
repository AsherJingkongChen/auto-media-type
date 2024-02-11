import { MediaType } from 'src';
import { Sample } from 'lots-of-sample-files';
import { describe, expect, it } from 'vitest';

describe('MediaType', () => {
  describe('.suggest()', () => {
    it('It always contains the closest media type for array buffers and views', async () => {
      for (const file of Sample.files()) {
        const buffer = await file.arrayBuffer();
        await expect(MediaType.suggest(buffer)).resolves.toContain(file.type);
        await expect(
          MediaType.suggest(new Uint8Array(buffer)),
        ).resolves.toContain(file.type);
        await expect(
          MediaType.suggest(new DataView(buffer)),
        ).resolves.toContain(file.type);
      }
    });

    it('It always contains the closest media type for blobs', async () => {
      for (const file of Sample.files()) {
        await expect(MediaType.suggest(file.slice())).resolves.toContain(
          file.type,
        );
      }
    });

    it('It always contains the closest media type for byte streams', async () => {
      for (const file of Sample.files()) {
        await expect(MediaType.suggest(file.stream())).resolves.toContain(
          file.type,
        );
      }
    });

    it('It always contains the closest media type for files', async () => {
      for (const file of Sample.files()) {
        await expect(MediaType.suggest(file)).resolves.toContain(file.type);
      }
    });

    it('It throws if the data type is not valid', async () => {
      await expect(MediaType.suggest({} as any)).rejects.toThrow();
    });
  });

  describe('.suggestForByteStream()', () => {
    it('It locks the given stream', async () => {
      for (const stream of [
        new Blob([]).stream(),
        new Blob(['abc', '123']).stream(),
        new Blob([new Uint8Array(4 << 20)]).stream(),
      ]) {
        await expect(
          MediaType.suggestForByteStream(stream),
        ).resolves.toBeTruthy();
        expect(stream.locked).toBeTruthy();
        /**
         * ## Explanation
         * `ReadableStream.prototype.cancel()`
         * will reject with a TypeError if the stream is currently locked.
         *
         * ## Reference
         * - [WHATWG Streams Specification](https://streams.spec.whatwg.org/#rs-cancel)
         */
        await expect(stream.cancel()).rejects.toThrow(TypeError);
      }
    });
  });

  describe('.suggestForFile()', () => {
    describe('It returns an empty set', () => {
      it('for an extensionless file name', async () => {
        expect(MediaType.suggestForFile(new File([], ''))).resolves.toEqual(
          new Set(),
        );
        expect(
          MediaType.suggestForFile(new File([], 'an-extensionless-file')),
        ).resolves.toEqual(new Set());
      });

      it('for an unrecoginzable file extension', async () => {
        expect(
          MediaType.suggestForFile(new File([], 'filename.undefined')),
        ).resolves.toEqual(new Set());
        expect(
          MediaType.suggestForFile(new File([], '.undefined-2')),
        ).resolves.toEqual(new Set());
      });
    });
  });
});

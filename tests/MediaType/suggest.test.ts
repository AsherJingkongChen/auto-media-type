import { MediaType } from 'src';
import { Sample } from 'lots-of-sample-files';
import { describe, expect, it } from 'vitest';

describe('MediaType', () => {
  describe('suggest()', () => {
    describe('It contains the closest media type for all sample files', () => {
      it('It accepts array buffers and views', async () => {
        for (const file of Sample.files()) {
          const bufferPromise = file.arrayBuffer();
          await expect(bufferPromise).resolves.toBeTruthy();

          await expect(
            MediaType.suggest(await bufferPromise),
          ).resolves.toContain(file.type);
          await expect(
            MediaType.suggest(new Uint8Array(await bufferPromise)),
          ).resolves.toContain(file.type);
          await expect(
            MediaType.suggest(new DataView(await bufferPromise)),
          ).resolves.toContain(file.type);
        }
      });

      it('It accepts blobs', async () => {
        for (const file of Sample.files()) {
          await expect(MediaType.suggest(file.slice())).resolves.toContain(
            file.type,
          );
        }
      });

      it('It accepts byte streams', async () => {
        for (const file of Sample.files()) {
          await expect(MediaType.suggest(file.stream())).resolves.toContain(
            file.type,
          );
        }
      });

      it('It accepts files', async () => {
        for (const file of Sample.files()) {
          await expect(MediaType.suggest(file)).resolves.toContain(file.type);
        }
      });

      it('It accepts responses', async () => {
        for (const file of Sample.files()) {
          await expect(
            MediaType.suggest(new Response(file)),
          ).resolves.toContain(file.type);
        }
      });

      it('It accepts requests', async () => {
        for (const file of Sample.files()) {
          await expect(
            MediaType.suggest(
              new Request('http://localhost', { method: 'POST', body: file }),
            ),
          ).resolves.toContain(file.type);
        }
      });
    });

    it('It throws if the data type is not valid', async () => {
      await expect(MediaType.suggest({} as any)).rejects.toThrow();
    });
  });

  describe('suggestForByteStream()', () => {
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
      }
    });
  });

  describe('suggestForFile()', () => {
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

  describe('suggestForResponse()', () => {
    it('It clones the given response', async () => {
      const response = new Response(new Uint8Array(1));
      await expect(
        MediaType.suggestForResponse(response),
      ).resolves.toBeTruthy();
      expect(response.bodyUsed).toBeFalsy();
    });

    it('It throws if the body is empty', async () => {
      const response = new Response();
      await expect(MediaType.suggestForResponse(response)).rejects.toThrow();
    });
  });

  describe('suggestForRequest()', () => {
    it('It clones the given request', async () => {
      const request = new Request('http://localhost', {
        body: new Uint8Array(1),
        method: 'POST',
      });
      await expect(MediaType.suggestForRequest(request)).resolves.toBeTruthy();
      expect(request.bodyUsed).toBeFalsy();
    });

    it('It throws if the request body is empty', async () => {
      const request = new Request('http://localhost');
      await expect(MediaType.suggestForRequest(request)).rejects.toThrow();
    });
  });
});

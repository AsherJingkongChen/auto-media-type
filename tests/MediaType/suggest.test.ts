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
    it('It cancels the given stream to cause the stream closed', async () => {
      // A cancelled stream will be closed
      const cancelledStream = new ReadableStream({
        type: 'bytes',
        start(controller) {
          controller.enqueue(new Uint8Array([0x20]));
        },
      });
      await cancelledStream.cancel();
      // They are resolved if their streams are closed; otherwise, they will be pending forever.
      // Don't worry. The unit tests will be timed out on the case.
      await expect(cancelledStream.getReader().closed).resolves.toBeFalsy();

      // A closed stream will be closed
      const closedStream = new ReadableStream({
        type: 'bytes',
        start(controller) {
          controller.close();
        },
      });
      let reader = closedStream.getReader();
      await reader.read();
      await expect(reader.closed).resolves.toBeFalsy();

      // A short stream will be cancelled (and closed) after suggesting
      const shortStream = new Blob([' ']).stream();
      await expect(
        MediaType.suggestForByteStream(shortStream),
      ).resolves.toBeTruthy();
      await expect(shortStream.getReader().closed).resolves.toBeFalsy();

      // A long stream will be cancelled (and closed) after suggesting
      const longStream = new Blob([new Uint8Array(4 << 20)]).stream();
      await expect(
        MediaType.suggestForByteStream(longStream),
      ).resolves.toBeTruthy();
      await expect(longStream.getReader().closed).resolves.toBeFalsy();
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

import { MediaType } from 'src/index';
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

  describe('.suggestByteStream()', () => {
    it('It returns an empty set for a cancelled or a closed stream', async () => {
      const cancelledStream = new ReadableStream({ type: 'bytes' });
      await cancelledStream.cancel();
      await expect(
        MediaType.suggestByteStream(cancelledStream),
      ).resolves.toEqual(new Set());

      const closedStream = new ReadableStream({
        start(controller) {
          controller.close();
        },
        type: 'bytes',
      });
      await expect(MediaType.suggestByteStream(closedStream)).resolves.toEqual(
        new Set(),
      );
    });

    it('It throws if the stream throws an error', async () => {
      const error = new Error('[Test] Stream error');
      const errorStream = new ReadableStream({
        start(controller) {
          controller.error(error);
        },
        type: 'bytes',
      });
      await expect(MediaType.suggestByteStream(errorStream)).rejects.toEqual(
        error,
      );
    });

    it('It cancels the given stream', async () => {
      const cancelledStream = new ReadableStream({ type: 'bytes' });
      const closedStream = new ReadableStream({
        start(controller) {
          controller.close();
        },
        type: 'bytes',
      });
      const errorStream = new ReadableStream({
        start(controller) {
          controller.error(new Error('[Test] Stream error'));
        },
        type: 'bytes',
      });
      const normalStream = new ReadableStream({
        start(controller) {
          // Max buffer size for media type application/vnd.efi.iso
          controller.enqueue(new Uint8Array(0x9006));
          controller.close();
        },
        type: 'bytes',
      });

      await cancelledStream.cancel();

      await expect(
        MediaType.suggestByteStream(cancelledStream),
      ).resolves.toBeTruthy();
      await expect(
        MediaType.suggestByteStream(closedStream),
      ).resolves.toBeTruthy();
      await expect(
        MediaType.suggestByteStream(errorStream),
      ).rejects.toBeTruthy();
      await expect(
        MediaType.suggestByteStream(normalStream),
      ).resolves.toBeTruthy();

      // They are resolved if their streams are closed; otherwise, they will be pending forever.
      // Don't worry. The unit tests will be timed out on the case.
      await expect(cancelledStream.getReader().closed).resolves.toBeFalsy();
      await expect(closedStream.getReader().closed).resolves.toBeFalsy();
      await expect(normalStream.getReader().closed).resolves.toBeFalsy();
    });
  });

  describe('.suggestFile()', () => {
    describe('It returns an empty set', () => {
      it('for an extensionless file name', async () => {
        expect(MediaType.suggestFile(new File([], ''))).resolves.toEqual(
          new Set(),
        );
        expect(
          MediaType.suggestFile(new File([], 'an-extensionless-file')),
        ).resolves.toEqual(new Set());
      });
      it('for an unseen file extension', async () => {
        expect(
          MediaType.suggestFile(new File([], 'filename.undefined')),
        ).resolves.toEqual(new Set());
        expect(
          MediaType.suggestFile(new File([], '.undefined-2')),
        ).resolves.toEqual(new Set());
      });
    });
  });
});

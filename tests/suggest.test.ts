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

    it('It always contains the closest media type for files', async () => {
      for (const file of Sample.files()) {
        await expect(MediaType.suggest(file)).resolves.toContain(file.type);
      }
    });

    it('It always contains the closest media type for streams', async () => {
      for (const file of Sample.files()) {
        await expect(MediaType.suggest(file.stream())).resolves.toContain(
          file.type,
        );
      }
    });

    it('It throws if the data type is not valid', async () => {
      await expect(MediaType.suggest({} as any)).rejects.toThrow();
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

  describe('.suggestStream()', () => {
    it('It returns an empty set for a cancelled or a closed stream', async () => {
      const cancelledStream = new ReadableStream({ type: 'bytes' });
      cancelledStream.cancel();
      await expect(MediaType.suggestStream(cancelledStream)).resolves.toEqual(
        new Set(),
      );

      const closedStream = new ReadableStream({
        start(controller) {
          controller.close();
        },
        type: 'bytes',
      });
      await expect(MediaType.suggestStream(closedStream)).resolves.toEqual(
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
      await expect(MediaType.suggestStream(errorStream)).rejects.toEqual(error);
    });

    it('It releases the lock to the received stream', async () => {
      const closedStream = new ReadableStream({
        start(controller) {
          controller.close();
        },
        type: 'bytes',
      });
      await expect(MediaType.suggestStream(closedStream)).resolves.toBeTruthy();
      expect(closedStream.locked).toBeFalsy();

      const cancelledStream = new ReadableStream({ type: 'bytes' });
      cancelledStream.cancel();
      await expect(MediaType.suggestStream(cancelledStream)).resolves.toBeTruthy();
      expect(cancelledStream.locked).toBeFalsy();

      const errorStream = new ReadableStream({
        start(controller) {
          controller.error(new Error('[Test] Stream error'));
        },
        type: 'bytes',
      });
      await expect(MediaType.suggestStream(errorStream)).rejects.toBeTruthy();
      expect(errorStream.locked).toBeFalsy();

      const normalStream = new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(1));
          controller.close();
        },
        type: 'bytes',
      });
      await expect(MediaType.suggestStream(normalStream)).resolves.toBeTruthy();
      expect(normalStream.locked).toBeFalsy();
    });
  });
});

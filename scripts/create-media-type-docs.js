#! /usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cp, mkdir } from 'fs/promises';

const { argv } = process;
if (argv.length < 3) {
  throw new Error(
    'Missing required arguments: "Media types". ' +
      `Usage: ${argv[0]} ${argv[1]} <Media-types...>`,
  );
}

const mediaTypes = argv.slice(2);

Promise.all(
  mediaTypes.map(async (mediaType) => {
    const docsDir = join(dirname(fileURLToPath(import.meta.url)), '../docs');
    const docFilePath = join(docsDir, `media-types/${mediaType}.md`);
    const templateFilePath = join(docsDir, 'templates/media-type.md');

    await cp(templateFilePath, docFilePath, { recursive: true });
  }),
);

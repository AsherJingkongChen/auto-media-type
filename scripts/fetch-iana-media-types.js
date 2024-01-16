const typeAndLinkList = [
  'application',
  'audio',
  'font',
  'image',
  'message',
  'model',
  'multipart',
  'text',
  'video',
].map((type) => [
  type,
  `https://www.iana.org/assignments/media-types/${type}.csv`,
]);

const data = {
  entries: [],
  mediatypes: [],
  mediatypesLength: 0,
};

for (const [type, link] of typeAndLinkList) {
  const text = await (await fetch(link)).text();
  const lines = text.split('\n').slice(1, -1);
  const entries = lines.map((line) => {
    const [name, template, reference] = line.split(',');
    return {
      name,
      template,
      reference,
      mediatype: template || `${type}/${name}`,
    };
  });
  data.entries = data.entries.concat(entries);
  data.mediatypes = data.mediatypes.concat(
    entries.map(({ mediatype }) => mediatype),
  );
}

data.mediatypes = Array.from(new Set(data.mediatypes));
data.mediatypesLength = data.mediatypes.length;

console.log(JSON.stringify(data, undefined, 2));

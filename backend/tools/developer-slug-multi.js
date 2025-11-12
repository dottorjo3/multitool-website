// 🔧 File: backend/tools/developer-slug-multi.js
// 🔗 Genera slug per ciascuna riga di input

const removeAccents = (text) => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

function toSlug(line, { separator, lowercase, keepAccents }) {
  let slug = keepAccents ? line : removeAccents(line);
  slug = slug.replace(/[^a-zA-Z0-9\s._-]/g, ' ').replace(/[\s._-]+/g, separator);
  slug = lowercase ? slug.toLowerCase() : slug;
  slug = slug.replace(new RegExp(`${separator}{2,}`, 'g'), separator);
  return slug.replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');
}

module.exports = {
  async run({ params }) {
    const lines = params.lines?.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (!lines || !lines.length) {
      throw new Error('Inserisci almeno una riga da convertire');
    }

    const separator = params.separator || '-';
    const lowercase = params.lowercase !== 'false';
    const keepAccents = params.keepAccents === 'true';

    const slugs = lines.map((line) => ({
      original: line,
      slug: toSlug(line, { separator, lowercase, keepAccents }),
    }));

    return {
      count: slugs.length,
      separator,
      lowercase,
      keepAccents,
      slugs,
    };
  },
};



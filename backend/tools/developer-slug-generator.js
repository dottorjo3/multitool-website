// 🔧 File: backend/tools/developer-slug-generator.js
// 🔗 Genera slug URL-friendly

const removeAccents = (text) => text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    if (!text) {
      throw new Error('Inserisci un testo da convertire in slug');
    }

    const separator = params.separator || '-';
    const lowercase = params.lowercase !== 'false';
    const keepAccents = params.keepAccents === 'true';

    let slug = text;
    if (!keepAccents) {
      slug = removeAccents(slug);
    }

    slug = slug
      .replace(/[^a-zA-Z0-9\s._-]/g, ' ')
      .replace(/[\s._-]+/g, separator);

    if (lowercase) {
      slug = slug.toLowerCase();
    }

    slug = slug.replace(new RegExp(`${separator}{2,}`, 'g'), separator);
    slug = slug.replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');

    return {
      original: text,
      slug,
      options: {
        separator,
        lowercase,
        keepAccents,
      },
    };
  },
};



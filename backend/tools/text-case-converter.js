// 🔧 File: backend/tools/text-case-converter.js
// 🔗 Farm Ready — Converte testo in vari formati di maiuscole/minuscole

function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toSentenceCase(text) {
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (match) => match.toUpperCase());
}

function convert(text, mode) {
  switch (mode) {
    case 'upper':
      return text.toUpperCase();
    case 'lower':
      return text.toLowerCase();
    case 'title':
      return toTitleCase(text);
    case 'sentence':
      return toSentenceCase(text);
    default:
      return text;
  }
}

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const mode = params?.mode || 'upper';

    return {
      mode,
      output: convert(text, mode),
    };
  },
};



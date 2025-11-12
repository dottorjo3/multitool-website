// 🔧 File: backend/tools/whitespace-remover.js
// 🔗 Farm Ready — Gestione whitespace (trim, collapse, remove)

function cleanWhitespace(text, mode = 'trim') {
  switch (mode) {
    case 'collapse':
      return text.replace(/\s+/g, ' ').trim();
    case 'remove-all':
      return text.replace(/\s+/g, '');
    case 'trim-lines':
      return text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .join('\n')
        .trim();
    default:
      return text.trim();
  }
}

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const mode = params?.mode || 'trim';
    const output = cleanWhitespace(text, mode);

    return {
      mode,
      originalLength: text.length,
      outputLength: output.length,
      output,
    };
  },
};



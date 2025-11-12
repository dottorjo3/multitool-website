// 🔧 File: backend/tools/text-duplicate-remover.js
// 🔗 Farm Ready — Rimuove duplicati da righe o parole

function removeDuplicates(text, mode = 'lines', caseSensitive = false) {
  const comparator = caseSensitive ? (value) => value : (value) => value.toLowerCase();

  if (mode === 'words') {
    const words = text.split(/\s+/).filter(Boolean);
    const seen = new Set();
    return words
      .filter((word) => {
        const key = comparator(word);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .join(' ');
  }

  const lines = text.split(/\r?\n/);
  const seen = new Set();
  const filtered = lines.filter((line) => {
    const key = comparator(line.trim());
    if (seen.has(key) && key.length > 0) return false;
    seen.add(key);
    return true;
  });
  return filtered.join('\n');
}

module.exports = {
  async run({ params }) {
    const text = params?.text || '';
    const mode = params?.mode || 'lines';
    const caseSensitive = params?.caseSensitive === 'true';
    const output = removeDuplicates(text, mode, caseSensitive);

    return {
      mode,
      caseSensitive,
      originalLength: text.length,
      outputLength: output.length,
      output,
    };
  },
};



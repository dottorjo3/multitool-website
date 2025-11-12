// 🔧 File: backend/tools/text-word-frequency.js
// 🔗 Conta la frequenza delle parole in un testo

function tokenize(text, caseSensitive) {
  const normalized = caseSensitive ? text : text.toLowerCase();
  return normalized
    .replace(/[^a-zA-Z0-9àèéìòóùÁÈÉÌÒÓÙçÇñÑöÖüÜäÄß\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    const top = params.top ? Number(params.top) : null;
    const caseSensitive = params.caseSensitive === 'true';

    if (!text) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const tokens = tokenize(text, caseSensitive);
    const frequency = tokens.reduce((acc, token) => {
      acc[token] = (acc[token] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1]);

    const limited = top ? sorted.slice(0, top) : sorted;

    return {
      totalWords: tokens.length,
      uniqueWords: sorted.length,
      caseSensitive,
      frequencies: limited.map(([word, count]) => ({ word, count })),
    };
  },
};



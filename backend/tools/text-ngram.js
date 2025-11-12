// 🔧 File: backend/tools/text-ngram.js
// 🔗 Genera n-gram (1-5) e frequenze dal testo

function sanitize(text, caseSensitive) {
  const normalized = caseSensitive ? text : text.toLowerCase();
  return normalized.replace(/[^a-zA-Z0-9àèéìòóùÁÈÉÌÒÓÙçÇñÑöÖüÜäÄß\s']/g, ' ');
}

function buildNgrams(words, size) {
  const grams = [];
  for (let i = 0; i <= words.length - size; i += 1) {
    grams.push(words.slice(i, i + size).join(' '));
  }
  return grams;
}

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    const n = Number(params.n || 2);
    const top = params.top ? Number(params.top) : 20;
    const caseSensitive = params.caseSensitive === 'true';

    if (!text) {
      throw new Error('Inserisci un testo da analizzare');
    }
    if (Number.isNaN(n) || n < 1 || n > 5) {
      throw new Error('Il valore di N deve essere tra 1 e 5');
    }

    const cleaned = sanitize(text, caseSensitive);
    const words = cleaned.split(/\s+/).filter(Boolean);

    if (words.length < n) {
      throw new Error('Il testo è troppo corto per generare n-gram');
    }

    const ngrams = buildNgrams(words, n);
    const frequency = ngrams.reduce((acc, gram) => {
      acc[gram] = (acc[gram] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, top);

    return {
      n,
      caseSensitive,
      totalNgrams: ngrams.length,
      uniqueNgrams: Object.keys(frequency).length,
      frequencies: sorted.map(([gram, count]) => ({ gram, count })),
    };
  },
};



// 🔧 File: backend/tools/text-keyword-density.js
// 🔗 Calcola densità keyword (senza stopword)

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'have', 'this', 'from', 'your', 'about', 'sono', 'questo', 'questa',
  'una', 'alla', 'della', 'come', 'sono', 'anche', 'solo', 'quando', 'dove', 'mentre', 'perché', 'perche',
  'il', 'lo', 'la', 'i', 'gli', 'le', 'di', 'a', 'da', 'in', 'con', 'su', 'per', 'tra', 'fra',
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zàèéìòóùçñäöü0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    const minLength = params.minLength ? Number(params.minLength) : 3;
    const top = params.top ? Number(params.top) : 20;

    if (!text) {
      throw new Error('Inserisci un testo da analizzare');
    }

    const tokens = tokenize(text).filter((token) => token.length >= minLength && !STOPWORDS.has(token));

    if (!tokens.length) {
      throw new Error('Nessuna keyword trovata: prova a ridurre la lunghezza minima');
    }

    const frequency = tokens.reduce((acc, token) => {
      acc[token] = (acc[token] || 0) + 1;
      return acc;
    }, {});

    const total = tokens.length;

    const ranked = Object.entries(frequency)
      .map(([keyword, count]) => ({
        keyword,
        count,
        density: Number(((count / total) * 100).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, top);

    return {
      totalKeywords: total,
      uniqueKeywords: ranked.length,
      minLength,
      top,
      keywords: ranked,
    };
  },
};



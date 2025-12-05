// 🔧 File: backend/tools/text-keyword-extract-basic.js
// 🔗 Estrae keyword base dal testo (frequenza parole)

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'have', 'this', 'from', 'your', 'about',
  'sono', 'questo', 'questa', 'una', 'alla', 'della', 'come', 'anche', 'solo',
  'il', 'lo', 'la', 'i', 'gli', 'le', 'di', 'a', 'da', 'in', 'con', 'su', 'per',
]);

function extractKeywords(text, minLength = 3, topN = 20) {
  const words = text
    .toLowerCase()
    .replace(/[^a-zàèéìòóùçñäöü0-9\s']/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= minLength && !STOPWORDS.has(w));
  
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .map(([word, count]) => ({ word, count, frequency: ((count / words.length) * 100).toFixed(2) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const minLength = params.minLength ? parseInt(params.minLength, 10) : 3;
    const topN = params.topN ? parseInt(params.topN, 10) : 20;
    
    if (!input) {
      throw new Error('Inserisci il testo da analizzare');
    }

    const keywords = extractKeywords(input, minLength, topN);
    
    return {
      text: input,
      keywords,
      totalKeywords: keywords.length,
      minLength,
      topN,
    };
  },
};


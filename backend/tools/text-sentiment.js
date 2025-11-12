// 🔧 File: backend/tools/text-sentiment.js
// 🔗 Analisi di sentiment basata su dizionario (IT/EN)

const POSITIVE_WORDS = [
  'good', 'great', 'excellent', 'awesome', 'fantastic', 'amazing', 'love', 'like', 'happy', 'joy',
  'positivo', 'fantastico', 'eccellente', 'adoro', 'amo', 'felice', 'soddisfatto', 'bravo',
];

const NEGATIVE_WORDS = [
  'bad', 'terrible', 'awful', 'hate', 'dislike', 'sad', 'angry', 'poor', 'worst', 'problem',
  'negativo', 'orribile', 'pessimo', 'odio', 'triste', 'arrabbiato', 'scarso', 'deluso', 'problema',
];

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zàèéìòóùçñäöü\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

module.exports = {
  async run({ params }) {
    const text = params.text?.trim();
    if (!text) {
      throw new Error('Inserisci un testo da analizzare');
    }

    const tokens = tokenize(text);
    let positive = 0;
    let negative = 0;

    tokens.forEach((token) => {
      if (POSITIVE_WORDS.includes(token)) positive += 1;
      if (NEGATIVE_WORDS.includes(token)) negative += 1;
    });

    const score = positive - negative;
    let label = 'neutral';
    if (score > 0) label = 'positive';
    if (score < 0) label = 'negative';

    return {
      totalWords: tokens.length,
      positiveWords: positive,
      negativeWords: negative,
      score,
      label,
      samples: {
        positive: tokens.filter((token) => POSITIVE_WORDS.includes(token)),
        negative: tokens.filter((token) => NEGATIVE_WORDS.includes(token)),
      },
    };
  },
};



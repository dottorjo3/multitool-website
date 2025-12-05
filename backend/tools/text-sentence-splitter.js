// 🔧 File: backend/tools/text-sentence-splitter.js
// 🔗 Suddivide testo in frasi

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo da suddividere');
    }

    // Split per punti, punti esclamativi, punti interrogativi
    const sentences = input
      .split(/(?<=[.!?])\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    return {
      original: input,
      sentences,
      count: sentences.length,
      formatted: sentences.join('\n'),
    };
  },
};


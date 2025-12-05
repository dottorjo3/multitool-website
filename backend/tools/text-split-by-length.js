// 🔧 File: backend/tools/text-split-by-length.js
// 🔗 Suddivide testo in parti di lunghezza specifica

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const length = params.length ? parseInt(params.length, 10) : 100;
    
    if (!input) {
      throw new Error('Inserisci il testo da suddividere');
    }

    if (length < 1 || length > 10000) {
      throw new Error('La lunghezza deve essere tra 1 e 10000 caratteri');
    }

    const parts = [];
    for (let i = 0; i < input.length; i += length) {
      parts.push(input.slice(i, i + length));
    }
    
    return {
      original: input,
      parts,
      count: parts.length,
      length,
      formatted: parts.join('\n---\n'),
    };
  },
};


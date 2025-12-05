// 🔧 File: backend/tools/text-base32-encode.js
// 🔗 Codifica testo in Base32

const base32 = require('base32');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo da codificare in Base32');
    }

    try {
      const encoded = base32.encode(Buffer.from(input, 'utf8'));
      
      return {
        original: input,
        encoded,
        length: input.length,
        encodedLength: encoded.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la codifica: ${error.message}`);
    }
  },
};


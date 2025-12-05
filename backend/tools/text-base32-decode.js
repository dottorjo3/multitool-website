// 🔧 File: backend/tools/text-base32-decode.js
// 🔗 Decodifica testo da Base32

const base32 = require('base32');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci il testo Base32 da decodificare');
    }

    try {
      const decoded = base32.decode(input).toString('utf8');
      
      return {
        original: input,
        decoded,
        length: input.length,
        decodedLength: decoded.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la decodifica: ${error.message}. Assicurati che il testo sia Base32 valido.`);
    }
  },
};


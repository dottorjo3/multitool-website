// 🔧 File: backend/tools/security-hex-encode.js
// 🔗 Codifica Hex

module.exports = {
  async run({ params }) {
    const text = params.text?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo da codificare');
    }

    try {
      const encoded = Buffer.from(text, 'utf8').toString('hex');
      
      return {
        original: text,
        encoded,
        algorithm: 'Hex Encoding',
        originalLength: text.length,
        encodedLength: encoded.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la codifica: ${error.message}`);
    }
  },
};



// 🔧 File: backend/tools/security-rot13-encoder.js
// 🔗 Codifica/Decodifica ROT13

const rot13 = require('rot13');

module.exports = {
  async run({ params }) {
    const text = params.text?.trim() || '';
    
    if (!text) {
      throw new Error('Inserisci il testo da codificare/decodificare');
    }

    try {
      const encoded = rot13(text);
      
      return {
        original: text,
        encoded,
        algorithm: 'ROT13',
        note: 'ROT13 è una codifica a chiave simmetrica (applica due volte per ottenere l\'originale)',
      };
    } catch (error) {
      throw new Error(`Errore durante la codifica: ${error.message}`);
    }
  },
};



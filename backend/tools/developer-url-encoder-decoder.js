// 🔧 File: backend/tools/developer-url-encoder-decoder.js
// 🔗 Codifica/Decodifica URL

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const mode = params.mode || 'encode'; // 'encode' o 'decode'
    
    if (!input) {
      throw new Error('Inserisci del testo da codificare/decodificare');
    }

    let result;
    
    if (mode === 'encode') {
      result = encodeURIComponent(input);
    } else {
      try {
        result = decodeURIComponent(input);
      } catch (error) {
        throw new Error(`Errore durante la decodifica: ${error.message}`);
      }
    }
    
    return {
      original: input,
      result,
      mode,
      originalLength: input.length,
      resultLength: result.length,
    };
  },
};



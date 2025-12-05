// 🔧 File: backend/tools/developer-json-validator.js
// 🔗 Valida codice JSON

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci del JSON da validare');
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      
      return {
        isValid: true,
        original: input,
        formatted,
        type: Array.isArray(parsed) ? 'array' : typeof parsed === 'object' && parsed !== null ? 'object' : typeof parsed,
        keys: typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) ? Object.keys(parsed) : null,
        length: Array.isArray(parsed) ? parsed.length : null,
      };
    } catch (error) {
      return {
        isValid: false,
        original: input,
        error: error.message,
        errorPosition: error.message.match(/position (\d+)/)?.[1] || null,
      };
    }
  },
};



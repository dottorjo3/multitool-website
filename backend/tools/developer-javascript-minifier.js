// 🔧 File: backend/tools/developer-javascript-minifier.js
// 🔗 Minifica codice JavaScript

const { minify } = require('terser');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const compress = params.compress !== 'false';
    const mangle = params.mangle !== 'false';
    
    if (!input) {
      throw new Error('Inserisci del codice JavaScript da minificare');
    }

    try {
      const result = await minify(input, {
        compress,
        mangle,
        format: {
          comments: false,
        },
      });
      
      const minified = result.code || input;
      
      return {
        original: input,
        minified,
        originalLength: input.length,
        minifiedLength: minified.length,
        compressionRatio: ((1 - minified.length / input.length) * 100).toFixed(2) + '%',
      };
    } catch (error) {
      throw new Error(`Errore durante la minificazione: ${error.message}`);
    }
  },
};



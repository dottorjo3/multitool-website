// 🔧 File: backend/tools/data-json-flatten.js
// 🔗 Appiattisce JSON annidato

const flat = require('flat');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const delimiter = params.delimiter || '.';
    const maxDepth = params.maxDepth ? parseInt(params.maxDepth, 10) : null;
    
    if (!input) {
      throw new Error('Inserisci del JSON da appiattire');
    }

    try {
      const json = JSON.parse(input);
      
      const options = {
        delimiter,
      };
      
      if (maxDepth) {
        options.maxDepth = maxDepth;
      }
      
      const flattened = flat.flatten(json, options);
      
      return {
        original: input,
        flattened: JSON.stringify(flattened, null, 2),
        keys: Object.keys(flattened),
        keyCount: Object.keys(flattened).length,
        delimiter,
      };
    } catch (error) {
      throw new Error(`Errore durante l'appiattimento: ${error.message}`);
    }
  },
};



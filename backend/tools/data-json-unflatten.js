// 🔧 File: backend/tools/data-json-unflatten.js
// 🔗 Ricostruisce JSON annidato da JSON appiattito

const flat = require('flat');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const delimiter = params.delimiter || '.';
    
    if (!input) {
      throw new Error('Inserisci del JSON appiattito da ricostruire');
    }

    try {
      const flatJson = JSON.parse(input);
      
      const unflattened = flat.unflatten(flatJson, {
        delimiter,
      });
      
      return {
        original: input,
        unflattened: JSON.stringify(unflattened, null, 2),
        keys: Object.keys(flatJson),
        keyCount: Object.keys(flatJson).length,
        delimiter,
      };
    } catch (error) {
      throw new Error(`Errore durante la ricostruzione: ${error.message}`);
    }
  },
};



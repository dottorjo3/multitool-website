// 🔧 File: backend/tools/data-json-path-extractor.js
// 🔗 Estrae valori da JSON usando JSONPath

const jsonpath = require('jsonpath');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const path = params.path || '$.*';
    
    if (!input) {
      throw new Error('Inserisci del JSON da analizzare');
    }

    if (!path) {
      throw new Error('Inserisci un percorso JSONPath');
    }

    try {
      const json = JSON.parse(input);
      const results = jsonpath.query(json, path);
      
      return {
        original: input,
        path,
        results,
        count: results.length,
        extracted: JSON.stringify(results, null, 2),
      };
    } catch (error) {
      throw new Error(`Errore durante l'estrazione: ${error.message}`);
    }
  },
};



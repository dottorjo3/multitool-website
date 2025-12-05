// 🔧 File: backend/tools/data-yaml-to-json.js
// 🔗 Converte YAML a JSON

const yaml = require('js-yaml');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci del YAML da convertire');
    }

    try {
      const doc = yaml.load(input);
      const json = JSON.stringify(doc, null, 2);
      
      return {
        original: input,
        json,
        yamlLength: input.length,
        jsonLength: json.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione YAML: ${error.message}`);
    }
  },
};



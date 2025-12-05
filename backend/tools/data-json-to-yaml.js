// 🔧 File: backend/tools/data-json-to-yaml.js
// 🔗 Converte JSON a YAML

const yaml = require('js-yaml');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const indent = params.indent ? parseInt(params.indent, 10) : 2;
    
    if (!input) {
      throw new Error('Inserisci del JSON da convertire');
    }

    try {
      const json = JSON.parse(input);
      const yamlOutput = yaml.dump(json, {
        indent,
        lineWidth: -1,
      });
      
      return {
        original: input,
        yaml: yamlOutput,
        jsonLength: input.length,
        yamlLength: yamlOutput.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la conversione JSON: ${error.message}`);
    }
  },
};



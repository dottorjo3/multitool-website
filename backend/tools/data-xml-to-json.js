// 🔧 File: backend/tools/data-xml-to-json.js
// 🔗 Converte XML a JSON

const { parseString } = require('xml2js');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const compact = params.compact === 'true';
    
    if (!input) {
      throw new Error('Inserisci del XML da convertire');
    }

    return new Promise((resolve, reject) => {
      parseString(input, {
        explicitArray: !compact,
        mergeAttrs: true,
        explicitRoot: false,
      }, (error, result) => {
        if (error) {
          reject(new Error(`Errore durante la conversione XML: ${error.message}`));
        } else {
          resolve({
            original: input,
            json: JSON.stringify(result, null, 2),
            xmlLength: input.length,
            jsonLength: JSON.stringify(result).length,
            compact,
          });
        }
      });
    });
  },
};



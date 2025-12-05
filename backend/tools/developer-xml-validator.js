// 🔧 File: backend/tools/developer-xml-validator.js
// 🔗 Valida codice XML

const { parseString } = require('xml2js');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    
    if (!input) {
      throw new Error('Inserisci del XML da validare');
    }

    return new Promise((resolve) => {
      parseString(input, { explicitArray: false }, (error, result) => {
        if (error) {
          resolve({
            isValid: false,
            original: input,
            error: error.message,
            errorPosition: error.toString(),
          });
        } else {
          resolve({
            isValid: true,
            original: input,
            parsed: result,
            rootElement: Object.keys(result)[0] || null,
          });
        }
      });
    });
  },
};



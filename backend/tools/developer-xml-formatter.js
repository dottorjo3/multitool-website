// 🔧 File: backend/tools/developer-xml-formatter.js
// 🔗 Formatta codice XML

const { xml } = require('js-beautify');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const indentSize = params.indentSize ? parseInt(params.indentSize, 10) : 2;
    
    if (!input) {
      throw new Error('Inserisci del codice XML da formattare');
    }

    try {
      const formatted = xml(input, {
        indent_size: indentSize,
        indent_char: ' ',
        preserve_newlines: params.preserveNewlines === 'true',
      });
      
      return {
        original: input,
        formatted,
        indentSize,
        originalLength: input.length,
        formattedLength: formatted.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la formattazione: ${error.message}`);
    }
  },
};



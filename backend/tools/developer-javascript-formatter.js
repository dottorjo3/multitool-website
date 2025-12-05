// 🔧 File: backend/tools/developer-javascript-formatter.js
// 🔗 Formatta codice JavaScript

const { js } = require('js-beautify');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const indentSize = params.indentSize ? parseInt(params.indentSize, 10) : 2;
    
    if (!input) {
      throw new Error('Inserisci del codice JavaScript da formattare');
    }

    try {
      const formatted = js(input, {
        indent_size: indentSize,
        indent_char: ' ',
        max_preserve_newlines: params.preserveNewlines === 'true' ? 5 : 0,
        brace_style: params.braceStyle || 'collapse',
        space_before_conditional: params.spaceBeforeConditional === 'true',
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



// 🔧 File: backend/tools/developer-css-formatter.js
// 🔗 Formatta codice CSS

const { css } = require('js-beautify');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const indentSize = params.indentSize ? parseInt(params.indentSize, 10) : 2;
    
    if (!input) {
      throw new Error('Inserisci del codice CSS da formattare');
    }

    try {
      const formatted = css(input, {
        indent_size: indentSize,
        indent_char: ' ',
        selector_separator_newline: params.newlineBetweenSelectors === 'true',
        end_with_newline: params.endWithNewline === 'true',
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



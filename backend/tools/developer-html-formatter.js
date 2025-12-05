// 🔧 File: backend/tools/developer-html-formatter.js
// 🔗 Formatta codice HTML

const { html } = require('js-beautify');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const indentSize = params.indentSize ? parseInt(params.indentSize, 10) : 2;
    const wrapAttributes = params.wrapAttributes || 'auto';
    
    if (!input) {
      throw new Error('Inserisci del codice HTML da formattare');
    }

    try {
      const formatted = html(input, {
        indent_size: indentSize,
        wrap_attributes: wrapAttributes,
        wrap_attributes_indent_size: indentSize,
        indent_inner_html: params.indentInnerHtml === 'true',
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



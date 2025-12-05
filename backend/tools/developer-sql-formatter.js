// 🔧 File: backend/tools/developer-sql-formatter.js
// 🔗 Formatta query SQL

const { format } = require('sql-formatter');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const keywordCase = params.keywordCase || 'upper'; // 'upper', 'lower', 'preserve'
    const indentSize = params.indentSize ? parseInt(params.indentSize, 10) : 2;
    
    if (!input) {
      throw new Error('Inserisci una query SQL da formattare');
    }

    try {
      const formatted = format(input, {
        language: 'sql',
        keywordCase: keywordCase === 'upper' ? 'upper' : keywordCase === 'lower' ? 'lower' : 'preserve',
        indentStyle: 'standard',
        tabWidth: indentSize,
      });
      
      return {
        original: input,
        formatted,
        keywordCase,
        indentSize,
        originalLength: input.length,
        formattedLength: formatted.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la formattazione SQL: ${error.message}`);
    }
  },
};


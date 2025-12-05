// 🔧 File: backend/tools/text-csv-to-sentences.js
// 🔗 Converte CSV in frasi

const { parse } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const separator = params.separator || ',';
    
    if (!input) {
      throw new Error('Inserisci il CSV da convertire');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter: separator,
      });
      
      const sentences = records.map((row, index) => {
        const values = Object.values(row).filter(v => v && v.trim().length > 0);
        return `${index + 1}. ${values.join(' ')}.`;
      });
      
      return {
        original: input,
        sentences: sentences.join('\n'),
        count: sentences.length,
        records: records.length,
      };
    } catch (error) {
      throw new Error(`Errore durante il parsing CSV: ${error.message}`);
    }
  },
};


// 🔧 File: backend/tools/data-csv-normalize.js
// 🔗 Normalizza CSV (rimuove righe vuote, trim, etc.)

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const delimiter = params.delimiter || ',';
    const removeEmptyRows = params.removeEmptyRows !== 'false';
    const trimCells = params.trimCells !== 'false';
    
    if (!input) {
      throw new Error('Inserisci del CSV da normalizzare');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: removeEmptyRows,
        delimiter,
      });
      
      let normalized = records;
      
      if (trimCells) {
        normalized = records.map(row => {
          const trimmed = {};
          Object.keys(row).forEach(key => {
            trimmed[key] = (row[key] || '').toString().trim();
          });
          return trimmed;
        });
      }
      
      const output = stringify(normalized, {
        header: true,
        delimiter,
      });
      
      return {
        original: input,
        normalized: output,
        originalRows: records.length,
        normalizedRows: normalized.length,
        rowsRemoved: records.length - normalized.length,
        removeEmptyRows,
        trimCells,
      };
    } catch (error) {
      throw new Error(`Errore durante la normalizzazione: ${error.message}`);
    }
  },
};



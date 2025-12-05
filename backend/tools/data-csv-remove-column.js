// 🔧 File: backend/tools/data-csv-remove-column.js
// 🔗 Rimuove una colonna dal CSV

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const columnName = params.columnName || '';
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da modificare');
    }

    if (!columnName) {
      throw new Error('Specifica il nome della colonna da rimuovere');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      const modified = records.map(row => {
        const { [columnName]: removed, ...rest } = row;
        return rest;
      });
      
      const output = stringify(modified, {
        header: true,
        delimiter,
      });
      
      return {
        original: input,
        modified: output,
        columnRemoved: columnName,
        rows: modified.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la rimozione colonna: ${error.message}`);
    }
  },
};



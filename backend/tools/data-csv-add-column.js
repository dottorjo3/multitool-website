// 🔧 File: backend/tools/data-csv-add-column.js
// 🔗 Aggiunge una colonna al CSV

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const columnName = params.columnName || '';
    const defaultValue = params.defaultValue || '';
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da modificare');
    }

    if (!columnName) {
      throw new Error('Specifica il nome della colonna da aggiungere');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      const modified = records.map(row => ({
        ...row,
        [columnName]: defaultValue,
      }));
      
      const output = stringify(modified, {
        header: true,
        delimiter,
      });
      
      return {
        original: input,
        modified: output,
        columnName,
        defaultValue,
        rows: modified.length,
      };
    } catch (error) {
      throw new Error(`Errore durante l'aggiunta colonna: ${error.message}`);
    }
  },
};



// 🔧 File: backend/tools/data-csv-split-by-column.js
// 🔗 Divide CSV in base ai valori di una colonna

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const column = params.column || '';
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da dividere');
    }

    if (!column) {
      throw new Error('Specifica la colonna per la divisione');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      const groups = {};
      
      records.forEach(row => {
        const key = (row[column] || 'unknown').toString();
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(row);
      });
      
      const result = {};
      Object.keys(groups).forEach(key => {
        result[key] = stringify(groups[key], {
          header: true,
          delimiter,
        });
      });
      
      return {
        original: input,
        split: result,
        column,
        groups: Object.keys(groups),
        groupCount: Object.keys(groups).length,
        totalRows: records.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la divisione: ${error.message}`);
    }
  },
};



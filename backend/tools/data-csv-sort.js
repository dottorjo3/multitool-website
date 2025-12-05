// 🔧 File: backend/tools/data-csv-sort.js
// 🔗 Ordina righe CSV per colonna

const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const column = params.column || '';
    const order = params.order || 'asc'; // 'asc' o 'desc'
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da ordinare');
    }

    if (!column) {
      throw new Error('Specifica la colonna per l\'ordinamento');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      const sorted = [...records].sort((a, b) => {
        const aVal = a[column] || '';
        const bVal = b[column] || '';
        const comparison = aVal.localeCompare(bVal);
        return order === 'desc' ? -comparison : comparison;
      });
      
      const output = stringify(sorted, {
        header: true,
        delimiter,
      });
      
      return {
        original: input,
        sorted: output,
        column,
        order,
        rows: sorted.length,
      };
    } catch (error) {
      throw new Error(`Errore durante l'ordinamento: ${error.message}`);
    }
  },
};


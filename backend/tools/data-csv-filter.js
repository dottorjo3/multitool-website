// 🔧 File: backend/tools/data-csv-filter.js
// 🔗 Filtra righe CSV per condizione

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const column = params.column || '';
    const operator = params.operator || 'equals'; // 'equals', 'contains', 'greater', 'less'
    const value = params.value || '';
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da filtrare');
    }

    if (!column || !value) {
      throw new Error('Specifica colonna e valore per il filtro');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      const filtered = records.filter(row => {
        const cellValue = (row[column] || '').toString().toLowerCase();
        const filterValue = value.toLowerCase();
        
        switch (operator) {
          case 'equals':
            return cellValue === filterValue;
          case 'contains':
            return cellValue.includes(filterValue);
          case 'greater':
            return parseFloat(cellValue) > parseFloat(filterValue);
          case 'less':
            return parseFloat(cellValue) < parseFloat(filterValue);
          case 'startsWith':
            return cellValue.startsWith(filterValue);
          case 'endsWith':
            return cellValue.endsWith(filterValue);
          default:
            return cellValue.includes(filterValue);
        }
      });
      
      const output = stringify(filtered, {
        header: true,
        delimiter,
      });
      
      return {
        original: input,
        filtered: output,
        column,
        operator,
        value,
        originalRows: records.length,
        filteredRows: filtered.length,
      };
    } catch (error) {
      throw new Error(`Errore durante il filtraggio: ${error.message}`);
    }
  },
};



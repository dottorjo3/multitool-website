// 🔧 File: backend/tools/data-csv-transpose.js
// 🔗 Traspone CSV (righe diventano colonne)

const { parse, stringify } = require('csv-parse/sync');

module.exports = {
  async run({ params }) {
    const input = params.input?.trim() || '';
    const delimiter = params.delimiter || ',';
    
    if (!input) {
      throw new Error('Inserisci del CSV da trasporre');
    }

    try {
      const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
        delimiter,
      });
      
      if (records.length === 0) {
        throw new Error('CSV vuoto');
      }
      
      const headers = Object.keys(records[0]);
      const transposed = [];
      
      // Prima riga: headers originali
      transposed.push(['', ...headers]);
      
      // Righe successive: ogni riga originale diventa colonna
      records.forEach((row, rowIndex) => {
        headers.forEach((header, colIndex) => {
          if (!transposed[colIndex + 1]) {
            transposed[colIndex + 1] = [header];
          }
          transposed[colIndex + 1].push(row[header] || '');
        });
      });
      
      const output = transposed.map(row => row.join(delimiter)).join('\n');
      
      return {
        original: input,
        transposed: output,
        originalRows: records.length,
        originalColumns: headers.length,
      };
    } catch (error) {
      throw new Error(`Errore durante la trasposizione: ${error.message}`);
    }
  },
};


